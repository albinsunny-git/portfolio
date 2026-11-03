import React from 'react';
import { ArrowUp, Sparkles } from 'lucide-react';

const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const MailIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

export default function Footer({ profileName = 'Albin Sunny' }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="creative-footer">
      <div className="footer-container">
        
        {/* Upper Footer Row */}
        <div className="footer-top-row">
          
          <div className="footer-brand-col">
            <h3 className="footer-brand-title">{profileName.toUpperCase()}</h3>
            <p className="footer-brand-desc">
              Creative 3D Portfolio &bull; Software Engineering &amp; Design Systems.
            </p>
            <div className="footer-status-pill">
              <span className="footer-dot-pulse"></span>
              <span>Open to Software Roles &amp; Internships</span>
            </div>
          </div>

          <div className="footer-nav-col">
            <span className="footer-col-label">Navigation</span>
            <div className="footer-nav-links">
              <a href="#hero">Hero</a>
              <a href="#about">About</a>
              <a href="#services">Services</a>
              <a href="#projects">Work</a>
              <a href="#testimonials">Testimonials</a>
              <a href="#contact">Contact</a>
            </div>
          </div>

          <div className="footer-social-col">
            <span className="footer-col-label">Network</span>
            <div className="footer-social-links">
              <a 
                href="https://github.com/albinsunny-git" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-item"
              >
                <GithubIcon size={16} />
                <span>GitHub</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/albin-sunny-7b0448290" 
                target="_blank" 
                rel="noopener noreferrer"
                className="footer-social-item"
              >
                <LinkedinIcon size={16} />
                <span>LinkedIn</span>
              </a>
              <a 
                href="mailto:albinsunny2028@mca.ajce.in"
                className="footer-social-item"
              >
                <MailIcon size={16} />
                <span>Direct Mail</span>
              </a>
            </div>
          </div>

          {/* Back to Top */}
          <div className="footer-back-col">
            <button
              type="button"
              className="btn-back-to-top"
              onClick={scrollToTop}
              title="Return to top of page"
            >
              <ArrowUp size={18} />
              <span>Back to Top</span>
            </button>
          </div>

        </div>

        {/* Bottom Sub-footer */}
        <div className="footer-bottom-row">
          <p className="footer-copyright">
            &copy; {currentYear} {profileName}. Designed &amp; engineered with React, Three.js, &amp; Vite.
          </p>
          <div className="footer-credit">
            <Sparkles size={13} className="sparkle-icon" />
            <span>Award-Winning 3D Aesthetic Experience</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
