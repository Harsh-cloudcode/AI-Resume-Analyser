# from pymongo import MongoClient
# import os

# MONGO_URL = os.getenv("MONGO_URL")

# client = MongoClient(MONGO_URL)

# db = client["resume_analyzer"]

# candidates_collection = db["candidates"]
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()

MONGO_URL = os.getenv("MONGODB_URI")

client = MongoClient(MONGO_URL)

db = client["resume_analyzer"]

candidates_collection = db["candidates"]

try:
    client.admin.command("ping")
    print("MongoDB connected successfully!")
except Exception as e:
    print("MongoDB connection failed:", e)