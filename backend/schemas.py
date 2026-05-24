from pydantic import BaseModel
from typing import Optional
from datetime import datetime

class MonitorCreate(BaseModel):
    name: str
    feed_url: str
    keyword: str
    action_type: str
    action_config: Optional[str] = None

class MonitorResponse(BaseModel):
    id: int
    name: str 
    feed_url: str 
    keyword: str 
    action_type: str
    action_config: Optional[str] = None
    is_active: bool
    created_at: datetime 

    class Config:
        from_atrributes = True