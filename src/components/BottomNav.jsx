import React from 'react';
import { Home, Folder, Award, User } from 'lucide-react';

export default function BottomNav({ currentTab, setCurrentTab }) {
  const tabs = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'projects', label: 'Projects', icon: Folder },
    { id: 'certifications', label: 'Certifications', icon: Award },
    { id: 'about', label: 'About', icon: User },
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = currentTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`bottom-nav-item ${isActive ? 'bottom-nav-item-active' : ''}`}
            onClick={() => setCurrentTab(tab.id)}
          >
            <div className="bottom-nav-icon-container">
              <IconComponent size={20} />
            </div>
            <span className="bottom-nav-label">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
}
