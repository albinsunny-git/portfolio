import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import AboutSection from './components/AboutSection';
import ServicesSection from './components/ServicesSection';
import ProjectsSection from './components/ProjectsSection';
import TestimonialsSection from './components/TestimonialsSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import CertificationsModal from './components/CertificationsModal';
import SettingsModal from './components/SettingsModal';
import CustomCursor from './components/CustomCursor';

export default function App() {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [certificationsOpen, setCertificationsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  // Default Portfolio Profile State with LocalStorage Persistence
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
      statusText: 'Available for Internships & Projects',
      accent: 'purple',
      mode: 'dark',
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

    // Apply accent colors using CSS custom properties
    let hue = 262, sat = '83%', lig = '58%'; // Purple Default
    if (portfolioData.accent === 'teal') {
      hue = 173; sat = '80%'; lig = '32%';
    } else if (portfolioData.accent === 'blue') {
      hue = 221; sat = '83%'; lig = '53%';
    } else if (portfolioData.accent === 'pink') {
      hue = 330; sat = '81%'; lig = '60%';
    } else if (portfolioData.accent === 'amber') {
      hue = 35; sat = '92%'; lig = '47%';
    }

    root.style.setProperty('--primary-hue', hue.toString());
    root.style.setProperty('--primary-sat', sat);
    root.style.setProperty('--primary-lig', lig);

    // Apply Light/Dark/System Theme Mode
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

    if (portfolioData.mode === 'system') {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      const handleSystemThemeChange = () => applyThemeMode('system');
      mediaQuery.addEventListener('change', handleSystemThemeChange);
      return () => mediaQuery.removeEventListener('change', handleSystemThemeChange);
    }
  }, [portfolioData.accent, portfolioData.mode]);

  // Active Section Spy for Navigation Indicator
  useEffect(() => {
    const sections = ['hero', 'about', 'services', 'projects', 'testimonials', 'contact'];
    
    const handleScrollSpy = () => {
      const scrollPos = window.scrollY + 200;
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScrollSpy, { passive: true });
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const handleSaveSettings = (newData) => {
    setPortfolioData((prev) => ({
      ...prev,
      ...newData
    }));
  };

  return (
    <div className="portfolio-app-root">
      {/* Desktop Custom Precision & Glow Cursor */}
      <CustomCursor />

      {/* Floating Glassmorphic Navigation Bar */}
      <Header
        profileName={portfolioData.name}
        activeSection={activeSection}
        onOpenSettings={() => setSettingsOpen(true)}
        onOpenCertifications={() => setCertificationsOpen(true)}
      />

      {/* Main Single-Page Immersive 3D Experience */}
      <main className="creative-content-wrapper">
        {/* 1. Hero Section (Cinematic Black #050505 + 3D Cyber Character) */}
        <HeroSection portfolioData={portfolioData} />

        {/* 2. About Me Section (Visually Expressive + Floating 3D Geometric Artifacts) */}
        <AboutSection 
          portfolioData={portfolioData} 
          onOpenCertifications={() => setCertificationsOpen(true)} 
        />

        {/* 3. Services Section (Clean White Background + Numbered List 01-05 + Hover Expansion) */}
        <ServicesSection />

        {/* 4. Projects / Showcase Section (Curated Showcase, Featured Full-Width + Grid + Filter) */}
        <ProjectsSection />

        {/* 5. Testimonials Section (Clean Dark Cards + Verified Mentors & Leads) */}
        <TestimonialsSection />

        {/* 6. Contact Section (Clean White Background + Form + 3D Decorative Accents) */}
        <ContactSection />
      </main>

      {/* Premium Dark Signature Footer */}
      <Footer profileName={portfolioData.name} />

      {/* Preserved Certifications & Credentials Lightbox Drawer (13 Certs + 2 Internships + Hackathons) */}
      <CertificationsModal
        isOpen={certificationsOpen}
        onClose={() => setCertificationsOpen(false)}
      />

      {/* Preserved Profile Customizer Settings Dialog */}
      <SettingsModal
        isOpen={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        portfolioData={portfolioData}
        onSaveData={handleSaveSettings}
      />
    </div>
  );
}
