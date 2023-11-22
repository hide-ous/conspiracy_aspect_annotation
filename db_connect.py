import pymongo

# Establish a connection to MongoDB
client = pymongo.MongoClient("mongodb://mongo:27017/")

# Retrieve a database client
def get_mongo_client():
    return client
