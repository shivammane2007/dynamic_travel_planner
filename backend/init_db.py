import sqlite3
import os

db_path = 'travel.db'
if os.path.exists(db_path):
    os.remove(db_path)

conn = sqlite3.connect(db_path)
cursor = conn.cursor()

with open('src/main/resources/schema.sql', 'r') as f:
    schema = f.read()
    cursor.executescript(schema)

with open('src/main/resources/data.sql', 'r') as f:
    data = f.read()
    cursor.executescript(data)

conn.commit()
conn.close()
print("Database travel.db initialized successfully!")
