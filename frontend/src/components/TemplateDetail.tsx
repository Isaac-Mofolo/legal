import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const TemplateDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [template, setTemplate] = useState<any>(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/templates/${id}`)
        .then(response => setTemplate(response.data))
        .catch(error => console.error('Error:', error));
    }
  }, [id]);

  const handleDownload = () => {
    if (template) {
      window.open(`http://localhost:8000${template.file_path}`, '_blank');
    }
  };

  if (!template) return <div>Loading...</div>;

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <h1>{template.title}</h1>
      <p><strong>Document Type:</strong> {template.document_type}</p>
      <p><strong>Area of Law:</strong> {template.area_of_law}</p>
      <p><strong>Jurisdiction:</strong> {template.jurisdiction}</p>
      <div>
        <h3>Description</h3>
        <p>{template.description}</p>
      </div>
      
      <button 
        onClick={handleDownload}
        style={{ 
          padding: '12px 24px', 
          background: '#1a365d', 
          color: 'white', 
          border: 'none', 
          borderRadius: '4px',
          fontSize: '16px',
          cursor: 'pointer'
        }}
      >
        Download .docx Template
      </button>
    </div>
  );
};

export default TemplateDetail;
