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
from export_data import main as edm

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
                is_correct_answer_exists = True
        if (is_correct_answer_exists == False):
            return False
    
    return True



def handle_onboarding(onboarding_data):
#     for key in onboarding_data["outputs"]["aspects"]:
#         if len(onboarding_data["inputs"][key]) != len(onboarding_data["outputs"]["aspects"][key]):
#             # Onboarding validation disabled as requested by the client
#             # To enable it, uncomment the line below and remove the pass statement
#             #return False
#             pass
#
#         if (validate_aspect_test(onboarding_data["inputs"][key], onboarding_data["outputs"]["aspects"][key]) == False):
#             # Onboarding validation disabled as requested by the client
#             # To enable it, uncomment the line below and remove the pass statement
#             #return False
#             pass
    
    surveys_db = db_client['surveys']
    surveys_collection = surveys_db['surveys']
    surveys_collection.insert_one(onboarding_data["outputs"]['survey'])
    
    return True


@task_script(default_config_file="config.yaml")
def main(operator: Operator, cfg: DictConfig) -> None:
    is_using_screening_units = cfg.mephisto.blueprint["use_screening_task"]
    shared_state = SharedStaticTaskState(onboarding_data={
        "text": "Mark Sextons statement 18 Jan 2023. The MP's, Sir Graham Brady, and Nadhim Zahawi (vaccine minister) police and IPCO knew in 2021 that the vaccines were harming and killing people. They were given evidence from top experts in the world and they did NOTHING. Mark fully backs the statements of Cardiologist Aseem Malhotra and MP Andrew Bridgen. PLEASE SHARE",
        "Actor": [{"id": 1, "start": 6, "end": 18}, {"id": 9, "start": 30, "end": 30}, {"id": 10, "start": 41, "end": 41}],
        "Action": [{"id": 2, "start": 19, "end": 19}, {"id": 6, "start": 42, "end": 43}],
        "Effect": [{"id": 3, "start": 26, "end": 28}],
        "Victim": [{"id": 4, "start": 29, "end": 29}],
        "Evidence": [{"id": 5, "start": 0, "end": 2}, {"id": 7, "start": 33, "end": 39}, {"id": 8, "start": 47, "end": 56}],
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
    old_fun = shared_state.on_unit_submitted
    def new_shared_state_on_unit_submitted(args):
        print(args)
        print(args.__dict__)
        return old_fun(args)

    shared_state.on_unit_submitted = new_shared_state_on_unit_submitted
    task_dir = cfg.task_dir

    build_custom_bundle(
        task_dir,
        force_rebuild=cfg.mephisto.task.force_rebuild,
        post_install_script=cfg.mephisto.task.post_install_script,
    )

    operator.launch_task_run(cfg.mephisto, shared_state)
    operator.wait_for_runs_then_shutdown(skip_input=True, log_rate=30)
    edm()


if __name__ == "__main__":
    main()
