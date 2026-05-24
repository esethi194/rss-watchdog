from fastapi import FastAPI, HTTPException
from database import create_tables, SessionLocal, Monitor
from schemas import MonitorCreate, MonitorResponse

app = FastAPI()
create_tables()

@app.get("/")
def root():
    return {"message": "Watchdog is running!"}

@app.get("/monitors", response_model=list[MonitorResponse])
def get_monitors():
    db = SessionLocal()
    monitors = db.query(Monitor).all()
    db.close()
    return monitors

@app.post("/monitors", response_model=MonitorResponse)
def create_monitors(monitor: MonitorCreate):
    db = SessionLocal()
    new_monitor = Monitor(name=monitor.name,
            feed_url=monitor.feed_url,
            keyword=monitor.keyword,
            action_type=monitor.action_type,
            action_config=monitor.action_config)
    db.add(new_monitor)
    db.commit()
    db.refresh(new_monitor)
    db.close()
    return new_monitor

@app.get("/monitors/{id}", response_model=MonitorResponse)
def get_monitors(id: int):
    db = SessionLocal()
    monitors = db.query(Monitor).filter(Monitor.id == id).first()
    if not monitors:
        raise HTTPException(status_code=404, detail="Monitor not found")
    db.close()
    return monitors

@app.delete("/monitors/{id}")
def delete_monitors(id: int):
    db = SessionLocal()
    monitors = db.query(Monitor).filter(Monitor.id == id).first()
    if not monitors:
        raise HTTPException(status_code=404, detail="Monitor not found")
    db.delete(monitors)
    db.commit()
    db.close()
    return {"message": f"Monitor {id} deleted"}