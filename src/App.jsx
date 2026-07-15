import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import SettingsModal from './components/SettingsModal';

import HomeView from './views/HomeView';
import ProjectsView from './views/ProjectsView';
import CertificationsView from './views/CertificationsView';
import AboutView from './views/AboutView';

export default function App() {
  const [currentTab, setCurrentTab] = useState('home');
  const [settingsOpen, setSettingsOpen] = useState(false);
  
  // Default Portfolio Profile State
  const [portfolioData, setPortfolioData] = useState(() => {
    const saved = localStorage.getItem('portfolio_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.stats && (parsed.stats.projects === 12 || parsed.stats.projects === 1 || parsed.stats.projects === 5)) {
          parsed.stats.projects = 6;
        }
        if (parsed.stats && parsed.stats.hackathons === 3) {
          parsed.stats.hackathons = 2;
        }
        if (parsed.stats && (parsed.stats.certifications === 5 || parsed.stats.certifications === 9)) {
          parsed.stats.certifications = 13;
        }
        if (parsed.name === 'Alex Rivera') {
          parsed.name = 'Albin Sunny';
        }
        return parsed;
      } catch (e) {
        console.error('Failed to parse portfolio data', e);
      }
    }
    return {
      name: 'Albin Sunny',
      statusText: 'Open for Internships',
      accent: 'teal',
      mode: 'light',
      stats: {
        projects: 6,
        certifications: 13,
        hackathons: 2,
      },
      avatarUrl: '/avatar.png'
    };
  });




  // Persist settings
  useEffect(() => {
    localStorage.setItem('portfolio_data', JSON.stringify(portfolioData));
  }, [portfolioData]);

  // Apply accent theme and light/dark mode changes
  useEffect(() => {
    const root = document.documentElement;
    
    // 1. Apply accent colors using CSS custom properties
    let hue = 173, sat = '80%', lig = '32%'; // Teal defaults
    
    if (portfolioData.accent === 'blue') {
      hue = 221; sat = '83%'; lig = '53%';
    } else if (portfolioData.accent === 'purple') {
      hue = 262; sat = '83%'; lig = '58%';
    } else if (portfolioData.accent === 'amber') {
      hue = 35; sat = '92%'; lig = '47%';
    }
    
    root.style.setProperty('--primary-hue', hue.toString());
    root.style.setProperty('--primary-sat', sat);
    root.style.setProperty('--primary-lig', lig);

    // 2. Apply Light/Dark/System Theme Mode
    const applyThemeMode = (themeMode) => {
      if (themeMode === 'dark') {
        root.setAttribute('data-theme', 'dark');
      } else if (themeMode === 'light') {
        root.setAttribute('data-theme', 'light');
      } else if (themeMode === 'system') {
        const matchesDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        root.setAttribute('data-theme', matchesDark ? 'dark' : 'light');
      }
    };

    applyThemeMode(portfolioData.mode);

    // Watch system theme change if 'system' is active
    if (portfolioData.mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = () => applyThemeMode('system');
      
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, [portfolioData.accent, portfolioData.mode]);

  // Render view depending on the selected tab
  const renderActiveView = () => {
    switch (currentTab) {
      case 'home':
        return <HomeView portfolioData={portfolioData} setCurrentTab={setCurrentTab} />;
      case 'projects':
        return <ProjectsView />;
      case 'certifications':
        return <CertificationsView />;
      case 'about':
        return <AboutView portfolioData={portfolioData} />;
      default:
        return <HomeView portfolioData={portfolioData} setCurrentTab={setCurrentTab} />;
    }
  };

  const handleSaveSettings = (newData) => {
    setPortfolioData((prev) => ({
      ...prev,
      ...newData
    }));
  };



  return (
    <div className="app-container">
      {/* Top Sticky Header */}
      <Header 
        profileName={portfolioData.name} 
        avatarUrl={portfolioData.avatarUrl}
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
      />

      {/* Main Tab View Panel */}
      <main className="main-content">
        {renderActiveView()}
      </main>

      {/* Shared Dark Footer */}
      <footer className="footer">
        <div className="footer-links">
          <a 
            href="mailto:albinsunny2028@mca.ajce.in"
            style={{ color: 'inherit', fontWeight: 'inherit', textDecoration: 'none' }}
          >
            Contact Me
          </a>
          <a 
            href="https://github.com/albinsunny-git" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'inherit', fontWeight: 'inherit', textDecoration: 'none' }}
          >
            GitHub
          </a>
          <a 
            href="https://www.linkedin.com/in/albin-sunny-7b0448290" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ color: 'inherit', fontWeight: 'inherit', textDecoration: 'none' }}
          >
            LinkedIn
          </a>
        </div>
        <p className="footer-copy">
          &copy; {new Date().getFullYear()} Student Portfolio. Built with precision.
        </p>
      </footer>

      {/* Bottom Navigation Tab Bar (Mobile View) */}
      <BottomNav currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Settings Dialog Overlay */}
      <SettingsModal 
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        portfolioData={portfolioData}
        onSaveData={handleSaveSettings}
      />
    </div>
  );
}
