from flask import Flask, request
from pymongo import MongoClient
from flask_cors import CORS
from typing import TypedDict

uri = 'mongodb+srv://kenjiromai333:JMubL0jWPdXn5vXL@todo.tmfewz4.mongodb.net/?retryWrites=true&w=majority&appName=Todo'

# TODO replace `static_folder` with frontend
app = Flask(__name__, static_folder = "./")
client = MongoClient(uri)
DATABASE_NAME = "garlic-phone"
COLLECTION_NAME = "entries"

CORS(app)

# Object representing an entry in the system
class Entry(TypedDict):
    entry_id: int
    parent_id: int
    body: str


@app.route('/')
def base():
    return 'home page'


# Create an entry
# Must provide **author**, **parent ID**, **entry ID**, and **body**
@app.route('/api/entry', methods = ['POST'])
def create_entry():
    database = client.get_database(DATABASE_NAME)
    collection = database.get_collection(COLLECTION_NAME)
    entry_data = request.json

    new_entry = Entry(entry_id=entry_data['entry_id'], parent_id=entry_data['parent_id'], body=entry_data['body'])

    collection.insert_one(new_entry)
    database.close()


# Get entry with entry ID
@app.route('/api/entry/<int:entry_id>', methods = ['GET'])
def get_entry(entry_id):
    database = client.get_database(DATABASE_NAME)
    collection = database.get_collection(COLLECTION_NAME)

    query = {"entry_id" : entry_id}
    result = entry_from_collection(entry_id, collection)
    count = collection.count_documents(query)

    if count > 2:
        print(f"Warning: duplicate entries with id {n}")

    if result is None:
        print(f"Error: unable to find entry with id {n}")
    
    database.close()
    return result


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
    entry_list.Add(current_entry['body'])

    while(current_entry['parent_id'] != None):
        parent = current_entry['parent_id']
        current_entry = entry_from_collection(parent, collection)
        entry_list.Add(current_entry['body'])

    database.close()
    return entry_list


@app.route('/api/clear', methods = ['DELETE'])
def clear_entries():

    database = client.get_database(DATABASE_NAME)
    collection = database.get_collection(COLLECTION_NAME)
    collection.delete_many({})

    database.close()
    return 'Cleared'