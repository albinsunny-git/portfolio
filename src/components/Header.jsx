import React from 'react';
import { Settings } from 'lucide-react';

export default function Header({ profileName, avatarUrl, onOpenSettings, currentTab, setCurrentTab }) {
  return (
    <header className="header">
      <div className="header-left" style={{ cursor: 'pointer' }} onClick={() => setCurrentTab('home')}>
        <img 
          src={avatarUrl || "/avatar.png"} 
          alt={profileName} 
          className="header-avatar"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80"; // fallback
          }}
        />
        <span className="header-title">Student Portfolio</span>
      </div>
      
      {/* Desktop Navigation */}
      <nav className="desktop-nav">
        <button 
          className={`desktop-nav-item ${currentTab === 'home' ? 'desktop-nav-item-active' : ''}`}
          onClick={() => setCurrentTab('home')}
        >
          Home
        </button>
        <button 
          className={`desktop-nav-item ${currentTab === 'projects' ? 'desktop-nav-item-active' : ''}`}
          onClick={() => setCurrentTab('projects')}
        >
          Projects
        </button>
        <button 
          className={`desktop-nav-item ${currentTab === 'certifications' ? 'desktop-nav-item-active' : ''}`}
          onClick={() => setCurrentTab('certifications')}
        >
          Certifications
        </button>
        <button 
          className={`desktop-nav-item ${currentTab === 'about' ? 'desktop-nav-item-active' : ''}`}
          onClick={() => setCurrentTab('about')}
        >
          About
        </button>
      </nav>

      <button className="header-settings-btn" onClick={onOpenSettings} aria-label="Open portfolio settings">
        <Settings size={20} />
      </button>
    </header>
  );
}
