import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

interface Template {
  id: number;
  title: string;
  description: string;
  document_type: string;
  area_of_law: string;
  jurisdiction: string;
}

const TemplateList: React.FC = () => {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [documentType, setDocumentType] = useState('');
  const [areaOfLaw, setAreaOfLaw] = useState('');
  const [jurisdiction, setJurisdiction] = useState('');

  const fetchTemplates = async () => {
    let url = '/api/templates';
    const params = new URLSearchParams();
    
    if (searchQuery) params.append('q', searchQuery);
    if (documentType) params.append('document_type', documentType);
    if (areaOfLaw) params.append('area_of_law', areaOfLaw);
    if (jurisdiction) params.append('jurisdiction', jurisdiction);

    try {
      const response = await axios.get(`${url}?${params.toString()}`);
      setTemplates(response.data);
    } catch (error) {
      console.error('Error fetching templates:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, [searchQuery, documentType, areaOfLaw, jurisdiction]);

  if (loading) return <div>Loading templates...</div>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Available Legal Templates</h2>
      
      {/* Search and Filters */}
      <div style={{ marginBottom: '2rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <input
          type="text"
          placeholder="Search templates..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{ padding: '0.5rem', width: '300px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        
        <select value={documentType} onChange={(e) => setDocumentType(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px' }}>
          <option value="">All Document Types</option>
          <option value="Contract">Contract</option>
          <option value="Pleading">Pleading</option>
          <option value="Affidavit">Affidavit</option>
          <option value="Demand Letter">Demand Letter</option>
        </select>

        <select value={areaOfLaw} onChange={(e) => setAreaOfLaw(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px' }}>
          <option value="">All Areas of Law</option>
          <option value="Contract Law">Contract Law</option>
          <option value="Civil Litigation">Civil Litigation</option>
          <option value="Corporate">Corporate</option>
          <option value="Employment">Employment</option>
        </select>

        <select value={jurisdiction} onChange={(e) => setJurisdiction(e.target.value)} style={{ padding: '0.5rem', borderRadius: '4px' }}>
          <option value="">All Jurisdictions</option>
          <option value="Kenya">Kenya</option>
          <option value="Nigeria">Nigeria</option>
          <option value="South Africa">South Africa</option>
        </select>

        <button onClick={() => {
          setSearchQuery('');
          setDocumentType('');
          setAreaOfLaw('');
          setJurisdiction('');
        }} style={{ padding: '0.5rem 1rem' }}>
          Clear Filters
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '1rem' }}>
        {templates.map(template => (
          <div key={template.id} style={{ border: '1px solid #ddd', padding: '1rem', borderRadius: '8px' }}>
            <h3>{template.title}</h3>
            <p><strong>Type:</strong> {template.document_type}</p>
            <p><strong>Area:</strong> {template.area_of_law}</p>
            <p><strong>Jurisdiction:</strong> {template.jurisdiction}</p>
            <p>{template.description.substring(0, 100)}...</p>
            <Link to={`/template/${template.id}`}>View Details & Download</Link>
          </div>
        ))}
      </div>

      {templates.length === 0 && !loading && (
        <p>No templates found matching your criteria.</p>
      )}
    </div>
  );
};

export default TemplateList;
