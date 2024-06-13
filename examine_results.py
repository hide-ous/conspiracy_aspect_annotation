# examine_results.py
from mephisto.abstractions.databases.local_database import LocalMephistoDB
from mephisto.tools.examine_utils import run_examine_or_review, print_results
from mephisto.data_model.worker import Worker
from mephisto.data_model.unit import Unit

db = None

def format_annotations_for_printing(annotations):
    output_string = "Annotations:\n"

    for annotation in annotations:
         if (isinstance(annotation, dict)):
            annotation_text = annotation["text"].strip().replace("\n", " ")
            output_string += f"\t{annotation['type']}: \"{annotation_text}\"\n"

    return output_string

def format_single_result_for_printing(result):
    text = f"Text: \"{result['text']}\""
    skipped = f"Skipped: {result['result']['isSkipped']}"
    conspiracy = f"Conspiracy: {result['result'].get('isConspiracy', 'N/A')}"
    annotations = format_annotations_for_printing(result["result"]["annotations"]) if result["result"].get("annotations", False) else "Annotations: None"

    return f"{text}\n{skipped}\n{conspiracy}\n{annotations}\n\n"

def format_data_for_printing(data):
    global db
    # Custom tasks can define methods for how to display their data in a relevant way
    worker_name = Worker.get(db, data["worker_id"]).worker_name
    contents = data["data"]

    print(data["task_end"])
    print(data["task_start"])
    

    duration = ''

    if data["task_end"] is not None and data["task_start"] is not None:
        duration = data["task_end"] - data["task_start"]
    else:
        duration = 0

    metadata_string = (
        f"Worker: {worker_name}\nUnit: {data['unit_id']}\n"
        f"Duration: {int(duration)}\nStatus: {data['status']}\n"
    )

 

    #inputs = contents["inputs"]
    #inputs_string = f"Provided input: {inputs}\n"
    outputs = contents["outputs"]
    output_string = f"Provided output: \n"

    for result in outputs["results"]:
        output_string += format_single_result_for_printing(result)

    return f"-------------------\n{metadata_string}{output_string}"


def main():
    global db
    db = LocalMephistoDB()
    run_examine_or_review(db, format_data_for_printing)


if __name__ == "__main__":
    main()
