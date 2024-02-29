# export_data.py
from mephisto.abstractions.databases.local_database import LocalMephistoDB
import json
from mephisto.tools.data_browser import DataBrowser

def export_jsonl(db, task_name, out_fpath):
    
    with open(out_fpath, 'w+', encoding='utf8') as f:
        data_browser = DataBrowser(db=db)
        units = data_browser.get_units_for_task_name(task_name)
        units.reverse()
        for unit in units:
            data = data_browser.get_data_from_unit(unit)
            f.write(json.dumps(data)+'\n')
    print(f'results written to {out_fpath}')

    
def main():
    db = LocalMephistoDB()
    export_jsonl(db, 'crowdwork', 'results.jsonl')


if __name__ == "__main__":
    main()
