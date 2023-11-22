# examine_results.py
from mephisto.abstractions.databases.local_database import LocalMephistoDB
from mephisto.tools.examine_utils import run_examine_or_review, print_results
from mephisto.data_model.worker import Worker
from mephisto.data_model.unit import Unit

db = None

def format_data_for_printing(data):
    global db
    # Custom tasks can define methods for how to display their data in a relevant way
    worker_name = Worker.get(db, data["worker_id"]).worker_name
    contents = data["data"]

    print(data)
    

    duration = data["task_end"] - data["task_start"]
    metadata_string = (
        f"Worker: {worker_name}\nUnit: {data['unit_id']}\n"
        f"Duration: {int(duration)}\nStatus: {data['status']}\n"
    )

 

    inputs = contents["inputs"]
    inputs_string = f"Provided input: {inputs}\n"
    outputs = contents["outputs"]
    output_string = f"Provided output: {outputs}\n"
    return f"-------------------\n{metadata_string}{inputs_string}{output_string}"


def main():
    global db
    db = LocalMephistoDB()
    run_examine_or_review(db, format_data_for_printing)


if __name__ == "__main__":
    main()
