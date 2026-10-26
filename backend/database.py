"""
KrishiLink Dual Database Layer
Connects to MongoDB (local or Atlas) with seamless automatic fallback to a persistent
local JSON document store if MongoDB service is not active.
"""

import os
import json
import uuid
import datetime
import bcrypt
import jwt

JWT_SECRET = os.environ.get("JWT_SECRET", "krishilink_agri_secure_jwt_token_2026")
MONGO_URI = os.environ.get("MONGO_URI", "mongodb://localhost:27017/krishilink")
DATA_DIR = os.path.join(os.path.dirname(__file__), "data")
os.makedirs(DATA_DIR, exist_ok=True)

class JSONCollection:
    """A lightweight document collection mimicking MongoDB collections."""
    def __init__(self, filename):
        self.filepath = os.path.join(DATA_DIR, f"{filename}.json")
        if not os.path.exists(self.filepath):
            self._write([])

    def _read(self):
        try:
            with open(self.filepath, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return []

    def _write(self, data):
        with open(self.filepath, "w", encoding="utf-8") as f:
            json.dump(data, f, indent=2, default=str)

    def insert_one(self, doc):
        docs = self._read()
        if "_id" not in doc:
            doc["_id"] = str(uuid.uuid4())
        if "created_at" not in doc:
            doc["created_at"] = datetime.datetime.now(datetime.timezone.utc).isoformat()
        docs.append(doc)
        self._write(docs)
        return doc

    def find_one(self, query):
        docs = self._read()
        for doc in docs:
            match = True
            for k, v in query.items():
                if doc.get(k) != v:
                    match = False
                    break
            if match:
                return doc
        return None

    def find(self, query=None, sort_key="created_at", reverse=True):
        docs = self._read()
        if not query:
            filtered = docs
        else:
            filtered = []
            for doc in docs:
                match = True
                for k, v in query.items():
                    if doc.get(k) != v:
                        match = False
                        break
                if match:
                    filtered.append(doc)
        try:
            filtered.sort(key=lambda x: str(x.get(sort_key, "")), reverse=reverse)
        except Exception:
            pass
        return filtered

    def update_one(self, query, update):
        docs = self._read()
        set_vals = update.get("$set", {})
        for doc in docs:
            match = True
            for k, v in query.items():
                if doc.get(k) != v:
                    match = False
                    break
            if match:
                doc.update(set_vals)
                self._write(docs)
                return True
        return False

    def delete_one(self, query):
        docs = self._read()
        new_docs = []
        deleted = False
        for doc in docs:
            match = True
            for k, v in query.items():
                if doc.get(k) != v:
                    match = False
                    break
            if match and not deleted:
                deleted = True
                continue
            new_docs.append(doc)
        if deleted:
            self._write(new_docs)
        return deleted

class DatabaseManager:
    """Initializes MongoDB or provides JSON document collection fallback."""
    def __init__(self):
        self.is_mongo = False
        self.client = None
        self.db = None
        
        # Try connecting to MongoDB
        try:
            import pymongo
            client = pymongo.MongoClient(MONGO_URI, serverSelectionTimeoutMS=800)
            client.server_info() # trigger connection test
            self.client = client
            self.db = client.get_database("krishilink")
            self.is_mongo = True
            print("[KrishiLink DB] Successfully connected to live MongoDB!")
        except Exception as e:
            self.is_mongo = False
            print(f"[KrishiLink DB] MongoDB not reachable at {MONGO_URI}. Activating resilient local JSON document database.")

    def get_collection(self, name):
        if self.is_mongo:
            return self.db[name]
        return JSONCollection(name)

# Global DB manager instance
db_mgr = DatabaseManager()
users_col = db_mgr.get_collection("users")
recommendations_col = db_mgr.get_collection("recommendations")
disease_scans_col = db_mgr.get_collection("disease_scans")
bookmarks_col = db_mgr.get_collection("bookmarks")
inquiries_col = db_mgr.get_collection("inquiries")

# Auth Utilities
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    return bcrypt.hashpw(password.encode("utf-8"), salt).decode("utf-8")

def check_password(password: str, hashed: str) -> bool:
    try:
        return bcrypt.checkpw(password.encode("utf-8"), hashed.encode("utf-8"))
    except Exception:
        return False

def generate_jwt(user_data: dict) -> str:
    payload = {
        "user_id": str(user_data.get("_id")),
        "email": user_data.get("email"),
        "name": user_data.get("name"),
        "exp": datetime.datetime.now(datetime.timezone.utc) + datetime.timedelta(days=14)
    }
    return jwt.encode(payload, JWT_SECRET, algorithm="HS256")

def decode_jwt(token: str):
    try:
        return jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
    except Exception:
        return None

# Seed demo farmer if users empty
def seed_demo_user():
    demo_email = "farmer@krishilink.in"
    existing = users_col.find_one({"email": demo_email})
    if not existing:
        demo_user = {
            "name": "Ramesh Gowda",
            "email": demo_email,
            "phone": "+91 98450 12345",
            "password_hash": hash_password("farmer123"),
            "state": "Karnataka",
            "district": "Mandya",
            "village": "Maddur Taluk",
            "farm_size": "4.5 Acres",
            "soil_type": "Red Sandy Loam",
            "primary_crops": ["Ragi (Finger Millet)", "Paddy (Rice)", "Sugarcane"],
            "irrigation_type": "Drip & Tube-well",
            "created_at": datetime.datetime.now(datetime.timezone.utc).isoformat()
        }
        users_col.insert_one(demo_user)
        print("[KrishiLink DB] Seeded demo farmer profile (farmer@krishilink.in / farmer123)")

seed_demo_user()
