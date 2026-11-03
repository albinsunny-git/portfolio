import React, { useState } from 'react';
import { ArrowDown, ArrowUpRight, Sparkles, Eye, Box, Sliders } from 'lucide-react';
import Hero3D from './Hero3D';

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

export default function HeroSection({ portfolioData }) {
  const { name = 'Albin Sunny', statusText = 'Open for Internships & Projects' } = portfolioData || {};
  
  // 3D Viewport Controls (Cycles 8K vs Interactive 3D Viewport)
  const [viewMode, setViewMode] = useState('8k'); // '8k' | 'interactive'
  const [shadingMode, setShadingMode] = useState('rendered'); // 'rendered' | 'clay' | 'wireframe'
  const [tiltOffset, setTiltOffset] = useState({ x: 0, y: 0 });

  const handleMouseMoveParallax = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltOffset({ x: x * 18, y: -y * 18 });
  };

  const handleMouseLeaveParallax = () => {
    setTiltOffset({ x: 0, y: 0 });
  };

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 70;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      window.scrollTo({
        top: elementPosition - offset,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="hero-section">
      {/* Cinematic Ambient Glow Background */}
      <div className="hero-ambient-glow hero-ambient-glow-purple"></div>
      <div className="hero-ambient-glow hero-ambient-glow-pink"></div>
      <div className="hero-ambient-glow hero-ambient-glow-blue"></div>
      <div className="hero-grid-overlay"></div>

      <div className="hero-container">
        
        {/* Left / Upper: Typography & Intro */}
        <div className="hero-content">
          
          {/* Status Badge */}
          <div className="hero-badge">
            <span className="hero-badge-pulse"></span>
            <span className="hero-badge-dot"></span>
            <span className="hero-badge-text">{statusText}</span>
          </div>

          {/* Large Bold Brand / Personal Name */}
          <h1 className="hero-name">
            <span className="hero-name-first">{name.split(' ')[0] || 'ALBIN'}</span>
            <span className="hero-name-gradient">{name.split(' ')[1] || 'SUNNY'}</span>
          </h1>

          {/* Subtitle / Tagline */}
          <p className="hero-tagline">
            Creative Developer &amp; Software Engineering Student crafting immersive 3D digital experiences, Pixar/Blender-inspired visual interfaces, and scalable web architectures.
          </p>

          {/* Action CTAs */}
          <div className="hero-cta-group">
            <button
              type="button"
              className="hero-btn-primary"
              onClick={() => scrollToSection('projects')}
            >
              <span>Explore Projects</span>
              <ArrowDown size={16} />
            </button>

            <button
              type="button"
              className="hero-btn-secondary"
              onClick={() => scrollToSection('contact')}
            >
              <span>Get in Touch</span>
              <ArrowUpRight size={16} />
            </button>
          </div>

          {/* Social Icons & Highlights */}
          <div className="hero-social-row">
            <span className="hero-social-label">Connect:</span>
            <div className="hero-social-icons">
              <a 
                href="https://github.com/albinsunny-git" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hero-social-btn"
                aria-label="GitHub Profile"
              >
                <GithubIcon size={16} />
              </a>
              <a 
                href="https://www.linkedin.com/in/albin-sunny-7b0448290" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hero-social-btn"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon size={16} />
              </a>
              <a 
                href="mailto:albinsunny2028@mca.ajce.in"
                className="hero-social-btn"
                aria-label="Send Email"
              >
                <MailIcon size={16} />
              </a>
            </div>
            
            <div className="hero-location-pill">
              <Sparkles size={13} className="hero-sparkle-icon" />
              <span>MCA &bull; Amal Jyothi</span>
            </div>
          </div>

        </div>

        {/* Right / Center: 3D Cartoon Avatar & Blender Viewport Showcase */}
        <div 
          className="hero-3d-wrapper"
          onMouseMove={handleMouseMoveParallax}
          onMouseLeave={handleMouseLeaveParallax}
        >
          <div className="hero-3d-glow-backdrop"></div>

          {/* Blender Viewport HUD Header Bar */}
          <div className="blender-hud-top">
            <div className="blender-badge">
              <span className="blender-dot-pulse"></span>
              <span className="blender-badge-text">Blender 4.0 Cycles &bull; 8K Character</span>
            </div>

            {/* Mode Switcher */}
            <div className="blender-toggle-group">
              <button
                type="button"
                className={`blender-toggle-btn ${viewMode === '8k' ? 'blender-toggle-btn-active' : ''}`}
                onClick={() => setViewMode('8k')}
                title="View 8K Blender Cycles Character Render"
              >
                <Eye size={13} />
                <span>8K Render</span>
              </button>
              <button
                type="button"
                className={`blender-toggle-btn ${viewMode === 'interactive' ? 'blender-toggle-btn-active' : ''}`}
                onClick={() => setViewMode('interactive')}
                title="View Real-Time Interactive 3D Model"
              >
                <Box size={13} />
                <span>3D Viewport</span>
              </button>
            </div>
          </div>

          {/* VIEW MODE 1: 8K BLENDER CYCLES CARTOON AVATAR */}
          {viewMode === '8k' && (
            <div 
              className="avatar-8k-card"
              style={{
                transform: `perspective(1000px) rotateX(${tiltOffset.y}deg) rotateY(${tiltOffset.x}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              <div className="avatar-8k-image-frame">
                <img
                  src="/3d-avatar-hero.jpg"
                  alt="3D Cartoon Avatar of Albin Sunny (8K Blender Character)"
                  className="avatar-8k-img"
                  onError={(e) => {
                    e.target.src = "/avatar.png";
                  }}
                />
                
                {/* Specular Light Flare & Studio Rim Glare */}
                <div className="avatar-8k-rim-flare"></div>
                <div className="avatar-8k-glass-sheen"></div>

                {/* Floating 3D Blender Orbit Rings Overlay */}
                <div className="avatar-floating-badge top-right">
                  <Sparkles size={13} />
                  <span>Subsurface Skin (SSS)</span>
                </div>

                <div className="avatar-floating-badge bottom-left">
                  <Sliders size={13} />
                  <span>Ray Traced Studio Rim</span>
                </div>
              </div>
            </div>
          )}

          {/* VIEW MODE 2: REAL-TIME INTERACTIVE THREE.JS 3D CHARACTER */}
          {viewMode === 'interactive' && (
            <div className="avatar-interactive-container">
              <Hero3D shadingMode={shadingMode} />

              {/* Shading Mode Selector (Rendered / Clay / Wireframe) */}
              <div className="shading-controls-bar">
                <span className="shading-label">Shading:</span>
                <button
                  type="button"
                  className={`shading-btn ${shadingMode === 'rendered' ? 'shading-btn-active' : ''}`}
                  onClick={() => setShadingMode('rendered')}
                >
                  Rendered
                </button>
                <button
                  type="button"
                  className={`shading-btn ${shadingMode === 'clay' ? 'shading-btn-active' : ''}`}
                  onClick={() => setShadingMode('clay')}
                >
                  Clay
                </button>
                <button
                  type="button"
                  className={`shading-btn ${shadingMode === 'wireframe' ? 'shading-btn-active' : ''}`}
                  onClick={() => setShadingMode('wireframe')}
                >
                  Wireframe
                </button>
              </div>
            </div>
          )}

          {/* Blender Viewport Bottom Tech Meta */}
          <div className="blender-hud-bottom">
            <span>&bull; Camera: 50mm f/1.8 &bull; Samples: 4096 &bull; Drag to rotate 3D</span>
          </div>

        </div>

      </div>

      {/* Bottom Scroll Down Indicator */}
      <div 
        className="hero-scroll-indicator"
        onClick={() => scrollToSection('about')}
        role="button"
        tabIndex={0}
      >
        <span className="scroll-mouse">
          <span className="scroll-wheel"></span>
        </span>
        <span className="scroll-text">SCROLL TO DISCOVER</span>
      </div>
    </section>
  );
}
