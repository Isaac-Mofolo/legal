from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Table
from sqlalchemy.orm import relationship, declarative_base
from datetime import datetime

Base = declarative_base()

# Association table for templates and authorities
template_authority = Table(
    'template_authority',
    Base.metadata,
    Column('template_id', Integer, ForeignKey('templates.id')),
    Column('authority_id', Integer, ForeignKey('legal_authorities.id'))
)

class Template(Base):
    __tablename__ = 'templates'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    description = Column(Text)
    document_type = Column(String(100))
    area_of_law = Column(String(100))
    jurisdiction = Column(String(100))
    file_path = Column(String(255))  # Path to .docx
    pdf_path = Column(String(255), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    authorities = relationship("LegalAuthority", secondary=template_authority, back_populates="templates")

class LegalAuthority(Base):
    __tablename__ = 'legal_authorities'
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255))
    type = Column(String(50))  # case, statute, regulation
    citation = Column(String(255))
    excerpt = Column(Text)
    jurisdiction = Column(String(100))
    
    templates = relationship("Template", secondary=template_authority, back_populates="authorities")
