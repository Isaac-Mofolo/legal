import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import TemplateList from './components/TemplateList';
import TemplateDetail from './components/TemplateDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <header style={{ padding: '1rem', background: '#1a365d', color: 'white' }}>
          <h1>Legal Template Platform</h1>
          <nav>
            <a href="/" style={{ color: 'white', marginRight: '1rem' }}>Home</a>
          </nav>
        </header>
        
        <Routes>
          <Route path="/" element={<TemplateList />} />
          <Route path="/template/:id" element={<TemplateDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
