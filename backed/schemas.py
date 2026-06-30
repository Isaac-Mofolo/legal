from pydantic import BaseModel
from datetime import datetime
from typing import Optional, List

class TemplateBase(BaseModel):
    title: str
    description: str
    document_type: str
    area_of_law: str
    jurisdiction: str

class TemplateCreate(TemplateBase):
    pass

class TemplateResponse(TemplateBase):
    id: int
    file_path: str
    pdf_path: Optional[str] = None
    created_at: datetime
    updated_at: Optional[datetime] = None
    
    class Config:
        from_attributes = True
