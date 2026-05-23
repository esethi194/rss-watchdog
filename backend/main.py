from fastapi import FastAPI
from database import create_tables

app = FastAPI()
create_tables()

@app.get("/")
def root():
    return {"message": "Watchdog is running!"}

