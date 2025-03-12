from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from pymongo import MongoClient

app = Flask(__name__)

# Allow requests from any origin
CORS(app, resources={r"/*": {"origins": "*"}})

db_client = MongoClient("mongodb://mongodb:27017/")
results_db = db_client['results']
results_collection = results_db['results']

@app.route("/submit", methods=["POST"])
def receive_json():
    print('receiving')
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No JSON data received"}), 400

        entry = {
            "results": data["results"],  # Expecting the other service to send parsed params
            "params": data.get("params", {})  # Params should be included in the JSON body
        }

        results_collection.insert_one(entry)

        return jsonify({"message": "Data saved successfully"})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/health", methods=["GET"])
def health_check():
    return jsonify({"status": "healthy"}), 200

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=8008, debug=True)
