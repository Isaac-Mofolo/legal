from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from database import get_db
from models import Template, LegalAuthority
from schemas import TemplateCreate, TemplateResponse
import os
import shutil
from datetime import datetime

router = APIRouter(prefix="/templates", tags=["templates"])

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/")
async def create_template(
    title: str,
    description: str,
    document_type: str,
    area_of_law: str,
    jurisdiction: str,
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    # Save file
    file_path = f"{UPLOAD_DIR}/{file.filename}"
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)
    
    template = Template(
        title=title,
        description=description,
        document_type=document_type,
        area_of_law=area_of_law,
        jurisdiction=jurisdiction,
        file_path=file_path,
        created_at=datetime.utcnow()
    )
    db.add(template)
    db.commit()
    db.refresh(template)
    return template

@router.get("/")
async def get_templates(
    q: str = None,
    document_type: str = None,
    area_of_law: str = None,
    jurisdiction: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(Template)
    
    if q:
        query = query.filter(
            (Template.title.ilike(f"%{q}%")) |
            (Template.description.ilike(f"%{q}%"))
        )
    
    if document_type:
        query = query.filter(Template.document_type == document_type)
    if area_of_law:
        query = query.filter(Template.area_of_law == area_of_law)
    if jurisdiction:
        query = query.filter(Template.jurisdiction == jurisdiction)
    
    return query.all()

@router.get("/{template_id}")
async def get_template(template_id: int, db: Session = Depends(get_db)):
    template = db.query(Template).filter(Template.id == template_id).first()
    if not template:
        raise HTTPException(status_code=404, detail="Template not found")
    return template
