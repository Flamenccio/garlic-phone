from flask import Flask, request, jsonify, abort, render_template
import ssl


from pymongo import MongoClient
from flask_cors import CORS
from typing import TypedDict
from bson import json_util
import json

uri = 'mongodb+srv://kenjiromai333:JMubL0jWPdXn5vXL@todo.tmfewz4.mongodb.net/?retryWrites=true&w=majority&appName=Todo'



app = Flask(__name__, 
            template_folder='../frontend/dist', 
            static_folder='../frontend/dist/assets')

client = MongoClient(uri)

DATABASE_NAME = "garlic-phone"
COLLECTION_NAME = "entries"

# Updated CORS configuration to include port 5173
CORS(app, resources={r'/*' : {'origins': ['http://localhost:5173', 'http://localhost:5137'], 
                           'methods': ['GET', 'POST', 'DELETE', 'OPTIONS']}})

def parse_json(data):
    return json.loads(json_util.dumps(data))

# Object representing an entry in the system
class Entry(TypedDict):
    entry_id: int
    parent_id: int
    body: str

@app.route('/')
def index():
    return render_template('index.html')
    


# Create an entry
@app.route('/api/entry/', methods = ['POST'])
def create_entry():
    database = client.get_database(DATABASE_NAME)
    collection = database.get_collection(COLLECTION_NAME)
    entry_data = request.get_json()

    body = entry_data['body']
    parent_id = entry_data['parent_ID'] ## you had typo over here, the ID was written as id -- Amir
    entry__id = entry_data['entry_ID'] ## you had typo over here, the ID was written as id -- Amir
    
    new_entry = Entry(entry_id=entry__id, parent_id=parent_id, body=body)

    collection.insert_one(new_entry)

    return parse_json(new_entry)

# Get entry with entry ID
@app.route('/api/entry/<int:entry_id>', methods = ['GET'])
def get_entry(entry_id):
    database = client.get_database(DATABASE_NAME)
    collection = database.get_collection(COLLECTION_NAME)
    query = {"entry_ID" : entry_id}
    


    result = entry_from_collection(entry_id, collection)

    count = collection.count_documents(query)
    print("Count of documents with entry_id:", count)


    if count > 1:
        print(f"Warning: duplicate entries with id {entry_id}")

    if result is None:
        abort(404, description=f"Entry with id {entry_id} not found")
    
    return parse_json(result)

## Find an entry with ID **entry_id** from collection
def entry_from_collection(entry_id, collection):
    query = {"entry_id" : entry_id}
    return collection.find_one(query)

# **last_id** is the ID of the entry at the 'end' of the story
@app.route('/api/results/<int:last_id>', methods = ['GET'])
def get_result(last_id):
    database = client.get_database(DATABASE_NAME)
    collection = database.get_collection(COLLECTION_NAME)
    entry_list = []

    # Get last entry in reply chain
    current_entry = entry_from_collection(last_id, collection)
    # Add body of current_entry to list
    if current_entry:
        entry_list.append(current_entry['body'])

    while current_entry and current_entry.get('parent_id') is not None:
        parent = current_entry['parent_id']
        current_entry = entry_from_collection(parent, collection)
        if current_entry:
            entry_list.append(current_entry['body'])

    return parse_json(entry_list)

@app.route('/api/clear', methods = ['DELETE'])
def clear_entries():
    database = client.get_database(DATABASE_NAME)
    collection = database.get_collection(COLLECTION_NAME)
    collection.delete_many({})

    return jsonify({"message": "Entries cleared"}), 200

@app.route("/api/test", methods =['GET'])
def test():
    return jsonify({
        "users": [
            'Elijah',
            'Kenjiro',
            'Jack',
            'James'
        ]
    })

# Running app
if __name__ == '__main__':
    app.run(debug=True, host = 'localhost', port = 5000)