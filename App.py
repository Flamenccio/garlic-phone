from flask import Flask, request
from pymongo import MongoClient

uri = 'mongodb+srv://kenjiromai333:JMubL0jWPdXn5vXL@todo.tmfewz4.mongodb.net/?retryWrites=true&w=majority&appName=Todo'
app = Flask(__name__)
client = MongoClient(uri)
DATABASE_NAME = "garlic-phone"
COLLECTION_NAME = "entries"

# Object representing an entry in the system
class Entry(TypedDict):
    entry_id: int,
    parent_id: int,
    author: str,
    body: str


@app.route('/')
def base():
    return 'home page'


@app.route('/api/entry/', methods=['POST'])
def create_entry():
    database = client.get_database(DATABASE_NAME)
    collection = database.get_collection(COLLECTION_NAME)

    new_entry = Entry(entry_id=request.json['entry_id'], parent_id=request.json['parent_id'], author=request.json['author'], body=request.json['body'])

    collection.insert_one(new_entry)
    database.close()


@app.route('/api/entry/<int:entry_id>', methods=['GET'])
def get_entry(entry_id):
    database = client.get_database(DATABASE_NAME)
    collection = database.get_collection(COLLECTION_NAME)

    query = {"entry_id" : n}
    result = collection.find_one(query)
    count = collection.count_documents(query)

    if count > 2:
        print(f"Warning: duplicate entries with id {n}")

    if result is None:
        print(f"Error: unable to find entry with id {n}")
    
    database.close()
    return result
