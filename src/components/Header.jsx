import React, { useState, useEffect } from 'react';
import { Award, Settings, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Header({ 
  profileName = 'Albin Sunny',
  onOpenSettings,
  onOpenCertifications,
  activeSection = 'hero'
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const navLinks = [
    { id: 'about', label: 'About' },
    { id: 'services', label: 'Services' },
    { id: 'projects', label: 'Projects' },
    { id: 'testimonials', label: 'Testimonials' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <>
      <header className={`creative-header ${scrolled ? 'creative-header-scrolled' : ''}`}>
        <div className="header-inner">
          
          {/* Brand Identity */}
          <div 
            className="brand-link" 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            role="button"
            tabIndex={0}
          >
            <div className="brand-avatar-mini-wrap">
              <img 
                src="/3d-avatar-hero.jpg" 
                alt={profileName} 
                className="brand-avatar-mini"
                onError={(e) => { e.target.src = "/avatar.png"; }}
              />
              <span className="brand-dot"></span>
            </div>
            <span className="brand-text">{profileName.toUpperCase()}</span>
            <span className="brand-badge">3D Avatar</span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="creative-nav-desktop" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <button
                key={link.id}
                className={`creative-nav-link ${activeSection === link.id ? 'creative-nav-link-active' : ''}`}
                onClick={() => scrollToSection(link.id)}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Action CTAs */}
          <div className="header-actions">
            
            {/* Certifications Trigger */}
            <button
              type="button"
              className="btn-header-pill"
              onClick={onOpenCertifications}
              title="View 13+ Certifications & Experience"
            >
              <Award size={15} />
              <span className="btn-header-pill-text">Credentials</span>
            </button>

            {/* Settings Customizer */}
            <button
              type="button"
              className="btn-header-icon"
              onClick={onOpenSettings}
              title="Customize Profile & Stats"
              aria-label="Settings"
            >
              <Settings size={18} />
            </button>

            {/* Gradient CTA */}
            <button
              type="button"
              className="btn-gradient-cta"
              onClick={() => scrollToSection('contact')}
            >
              <span>Let's Talk</span>
              <ArrowUpRight size={14} />
            </button>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>

          </div>

        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="mobile-nav-overlay" onClick={() => setMobileMenuOpen(false)}>
          <div className="mobile-nav-content" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-nav-header">
              <span className="brand-text">{profileName.toUpperCase()}</span>
              <button 
                className="btn-header-icon" 
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X size={20} />
              </button>
            </div>

            <div className="mobile-nav-links">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  className="mobile-nav-link-item"
                  onClick={() => scrollToSection(link.id)}
                >
                  {link.label}
                </button>
              ))}
            </div>

            <div className="mobile-nav-footer">
              <button
                type="button"
                className="btn-header-pill"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCertifications();
                }}
              >
                <Award size={16} />
                <span>View Certifications (13)</span>
              </button>

              <button
                type="button"
                className="btn-gradient-cta"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => scrollToSection('contact')}
              >
                <span>Let's Talk</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
