import React, { useState, useEffect } from 'react';
import { X, Sun, Moon, Laptop } from 'lucide-react';

export default function SettingsModal({ 
  isOpen, 
  onClose, 
  portfolioData, 
  onSaveData 
}) {
  const [name, setName] = useState('');
  const [statusText, setStatusText] = useState('');
  const [accent, setAccent] = useState('teal');
  const [mode, setMode] = useState('light');
  
  const [statProjects, setStatProjects] = useState(5);
  const [statCertifications, setStatCertifications] = useState(13);
  const [statHackathons, setStatHackathons] = useState(2);

  // Initialize fields on open
  useEffect(() => {
    if (isOpen && portfolioData) {
      setName(portfolioData.name || 'Albin Sunny');
      setStatusText(portfolioData.statusText || 'Open for Internships');
      setAccent(portfolioData.accent || 'teal');
      setMode(portfolioData.mode || 'light');
      setStatProjects(portfolioData.stats?.projects || 5);
      setStatCertifications(portfolioData.stats?.certifications || 13);
      setStatHackathons(portfolioData.stats?.hackathons || 2);
    }
  }, [isOpen, portfolioData]);

  if (!isOpen) return null;

  const handleSave = (e) => {
    e.preventDefault();
    onSaveData({
      name,
      statusText,
      accent,
      mode,
      stats: {
        projects: Number(statProjects),
        certifications: Number(statCertifications),
        hackathons: Number(statHackathons)
      }
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3 className="modal-title">Customize Portfolio</h3>
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={18} />
          </button>
        </div>
        
        <form onSubmit={handleSave}>
          <div className="modal-body">
            
            {/* General Info */}
            <div className="form-group">
              <label className="form-label" htmlFor="name-input">Profile Name</label>
              <input
                id="name-input"
                type="text"
                className="form-input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label" htmlFor="status-input">Status Badge Text</label>
              <input
                id="status-input"
                type="text"
                className="form-input"
                value={statusText}
                onChange={(e) => setStatusText(e.target.value)}
                required
              />
            </div>

            {/* Counter Stats */}
            <div className="form-group">
              <label className="form-label">Stats Counters</label>
              <div className="stats-input-grid">
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.65rem' }} htmlFor="projects-stat">Projects</label>
                  <input
                    id="projects-stat"
                    type="number"
                    min="0"
                    className="form-input"
                    value={statProjects}
                    onChange={(e) => setStatProjects(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.65rem' }} htmlFor="certs-stat">Certs</label>
                  <input
                    id="certs-stat"
                    type="number"
                    min="0"
                    className="form-input"
                    value={statCertifications}
                    onChange={(e) => setStatCertifications(e.target.value)}
                  />
                </div>
                <div className="form-group">
                  <label className="form-label" style={{ fontSize: '0.65rem' }} htmlFor="hackathons-stat">Hackathons</label>
                  <input
                    id="hackathons-stat"
                    type="number"
                    min="0"
                    className="form-input"
                    value={statHackathons}
                    onChange={(e) => setStatHackathons(e.target.value)}
                  />
                </div>
              </div>
            </div>

            {/* Accent Theme */}
            <div className="form-group">
              <label className="form-label">Accent Theme Color</label>
              <div className="theme-options">
                {['teal', 'blue', 'purple', 'amber'].map((color) => (
                  <button
                    key={color}
                    type="button"
                    className={`theme-dot-btn theme-${color} ${accent === color ? 'theme-dot-active' : ''}`}
                    onClick={() => setAccent(color)}
                    aria-label={`Select ${color} theme`}
                  />
                ))}
              </div>
            </div>

            {/* Light/Dark Mode */}
            <div className="form-group">
              <label className="form-label">Color Theme Mode</label>
              <div className="mode-toggle-group">
                <button
                  type="button"
                  className={`mode-btn ${mode === 'light' ? 'mode-btn-active' : ''}`}
                  onClick={() => setMode('light')}
                >
                  <Sun size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Light
                </button>
                <button
                  type="button"
                  className={`mode-btn ${mode === 'dark' ? 'mode-btn-active' : ''}`}
                  onClick={() => setMode('dark')}
                >
                  <Moon size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Dark
                </button>
                <button
                  type="button"
                  className={`mode-btn ${mode === 'system' ? 'mode-btn-active' : ''}`}
                  onClick={() => setMode('system')}
                >
                  <Laptop size={12} style={{ marginRight: '4px', verticalAlign: 'middle' }} /> Auto
                </button>
              </div>
            </div>

          </div>
          
          <div className="modal-footer">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
