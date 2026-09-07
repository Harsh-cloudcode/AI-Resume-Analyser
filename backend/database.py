# from pymongo import MongoClient
# import os

# MONGO_URL = os.getenv("MONGO_URL")

# client = MongoClient(MONGO_URL)

# db = client["resume_analyzer"]

# candidates_collection = db["candidates"]
# # from pymongo import MongoClient
# # import os

# # MONGO_URL = os.getenv("MONGO_URL")

# # client = MongoClient(MONGO_URL)

# # db = client["resume_analyzer"]

# # candidates_collection = db["candidates"]
# from pymongo import MongoClient
# from dotenv import load_dotenv
# import os

# load_dotenv()

# MONGO_URL = os.getenv("MONGODB_URI")

# client = MongoClient(MONGO_URL)

# db = client["resume_analyzer"]

# candidates_collection = db["candidates"]

# try:
#     client.admin.command("ping")
#     print("MongoDB connected successfully!")
# except Exception as e:
#     print("MongoDB connection failed:", e)


from pymongo import MongoClient
from dotenv import load_dotenv
import os
import certifi 

load_dotenv()

MONGO_URL = os.getenv("MONGODB_URI")

# Pass the certifi certificate authority file to resolve the SSL handshake error
# client = MongoClient(MONGO_URL, tlsCAFile=certifi.where())

client = MongoClient(
    MONGO_URL,
    tlsCAFile=certifi.where(),
    serverSelectionTimeoutMS=10000,
    connectTimeoutMS=10000,
    socketTimeoutMS=20000
)

db = client["resume_analyzer"]

candidates_collection = db["candidates"]

try:
    client.admin.command("ping")
    print("MongoDB connected successfully!")
except Exception as e:
    print("MongoDB connection failed:", e)
