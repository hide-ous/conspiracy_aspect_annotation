#!/usr/bin/env python3

# Copyright (c) Facebook, Inc. and its affiliates.
# This source code is licensed under the MIT license found in the
# LICENSE file in the root directory of this source tree.

import db_connect

from mephisto.abstractions.blueprints.mixins.screen_task_required import (
    ScreenTaskRequired,
)
from mephisto.data_model.unit import Unit
from mephisto.operations.operator import Operator
from mephisto.tools.scripts import task_script, build_custom_bundle
from mephisto.abstractions.blueprints.abstract.static_task.static_blueprint import (
    SharedStaticTaskState,
)
from rich import print
from omegaconf import DictConfig

db_client = db_connect.get_mongo_client()



def my_screening_unit_generator():
    while True:
        yield {"text": "SCREENING UNIT: Press the red button", "is_screen": True}


def validate_screening_unit(unit: Unit):
    agent = unit.get_assigned_agent()
    if agent is not None:
        data = agent.state.get_data()
        print(data)
        if (
            data["outputs"] is not None
            and "rating" in data["outputs"]
            and data["outputs"]["rating"] == "bad"
        ):
            # User pressed the red button
            return True
    return False


def validate_aspect_test(input, output): 
    for input_highlight in input:
        is_correct_answer_exists = False
        for outputh_highlight in output:
            if (outputh_highlight["start"] == (input_highlight["start"] or 
                outputh_highlight["start"] == input_highlight["start"] - 1) and 
                (input_highlight["end"] or outputh_highlight["end"] == 
                input_highlight["end"] + 1)):
                is_correct_answer_exists = True;
        if (is_correct_answer_exists == False):
            return False
    
    return True



def handle_onboarding(onboarding_data):
    for key in onboarding_data["outputs"]["aspects"]:
        if len(onboarding_data["inputs"][key]) != len(onboarding_data["outputs"]["aspects"][key]):
            # Onboarding validation disabled as requested by the client
            # To enable it, uncomment the line below and remove the pass statement
            #return False
            pass

        if (validate_aspect_test(onboarding_data["inputs"][key], onboarding_data["outputs"]["aspects"][key]) == False):
            # Onboarding validation disabled as requested by the client
            # To enable it, uncomment the line below and remove the pass statement
            #return False
            pass
    
    surveys_db = db_client['surveys']
    surveys_collection = surveys_db['surveys']
    surveys_collection.insert_one(onboarding_data["outputs"]['survey'])
    
    return True


@task_script(default_config_file="config.yaml")
def main(operator: Operator, cfg: DictConfig) -> None:
    is_using_screening_units = cfg.mephisto.blueprint["use_screening_task"]
    shared_state = SharedStaticTaskState(onboarding_data={
        "text": "You better fight your government, and you better fight now. This is a full blown attempt to disarm and control you. They are taking down the internet, now they are taking your way to defend yourself and your families. If you don't fight now your children are as good as dead. Fucking dead. Stand up. We are with you here in the USA.",
        "Actor": [{"id": 1, "start": 4, "end": 4}],
        "Action": [{"id": 2, "start": 17, "end": 20}],
        "Pattern": [{"id": 3, "start": 10, "end": 20}],
        "Threat": [{"id": 4, "start": 23, "end": 26}],
        "Secrecy": [{"id": 5, "start": 30, "end": 38}],
    },   validate_onboarding=handle_onboarding,)

    if is_using_screening_units:
        """
        When using screening units there has to be a
        few more properties set on shared_state
        """
        shared_state.on_unit_submitted = ScreenTaskRequired.create_validation_function(
            cfg.mephisto,
            validate_screening_unit,
        )
        shared_state.screening_data_factory = my_screening_unit_generator()
        shared_state.qualifications += ScreenTaskRequired.get_mixin_qualifications(
            cfg.mephisto, shared_state
        )

    task_dir = cfg.task_dir

    build_custom_bundle(
        task_dir,
        force_rebuild=cfg.mephisto.task.force_rebuild,
        post_install_script=cfg.mephisto.task.post_install_script,
    )

    operator.launch_task_run(cfg.mephisto, shared_state)
    operator.wait_for_runs_then_shutdown(skip_input=True, log_rate=30)


if __name__ == "__main__":
    main()
