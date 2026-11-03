import React, { useState } from 'react';
import { Award, GraduationCap, ArrowRight, Sparkles, Box, Sliders } from 'lucide-react';
import About3D from './About3D';

export default function AboutSection({ portfolioData, onOpenCertifications }) {
  const { name = 'Albin Sunny', stats = {} } = portfolioData || {};
  const [tiltOffset, setTiltOffset] = useState({ x: 0, y: 0 });

  const handleMouseMoveTilt = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTiltOffset({ x: x * 15, y: -y * 15 });
  };

  const handleMouseLeaveTilt = () => {
    setTiltOffset({ x: 0, y: 0 });
  };

  const techStack = [
    { name: 'React.js', color: '#38bdf8' },
    { name: 'Three.js / WebGL', color: '#8b5cf6' },
    { name: 'Node.js', color: '#22c55e' },
    { name: 'PHP & MySQL', color: '#ec4899' },
    { name: 'C / C++', color: '#3b82f6' },
    { name: 'Flutter', color: '#06b6d4' },
    { name: 'Figma & UI/UX', color: '#f43f5e' },
    { name: 'Blender 3D Modeling', color: '#f97316' },
    { name: 'LaTeX & Research', color: '#a855f7' },
  ];

  const softSkills = [
    'Creative Direction',
    'Algorithm Design',
    'Technical Writing',
    'Rapid Prototyping',
  ];

  return (
    <section id="about" className="about-section">
      <div className="section-ambient-glow section-glow-purple"></div>
      
      <div className="about-container">
        
        {/* Section Header */}
        <div className="about-header-row">
          <div className="section-pre-tag">
            <span className="pre-tag-number">01</span>
            <span className="pre-tag-dash">/</span>
            <span className="pre-tag-label">BIOGRAPHY &amp; 3D CAPABILITIES</span>
          </div>
          <h2 className="section-huge-heading">
            ABOUT <span className="text-gradient-purple">ME</span>
          </h2>
        </div>

        {/* 2-Column Showcase */}
        <div className="about-grid">
          
          {/* Left Column: 8K 3D Creative Character Card + Interactive 3D Canvas */}
          <div className="about-3d-column">
            
            {/* 8K 3D Creative Character Card with Perspective Tilt */}
            <div 
              className="about-character-card"
              onMouseMove={handleMouseMoveTilt}
              onMouseLeave={handleMouseLeaveTilt}
              style={{
                transform: `perspective(1000px) rotateX(${tiltOffset.y}deg) rotateY(${tiltOffset.x}deg)`,
                transition: 'transform 0.15s ease-out'
              }}
            >
              <div className="about-character-frame">
                <img
                  src="/3d-avatar-about.jpg"
                  alt="3D Creative Cartoon Character of Albin Sunny"
                  className="about-character-img"
                  onError={(e) => {
                    e.target.src = "/3d-avatar-hero.jpg";
                  }}
                />
                
                {/* Blender Metadata Badges */}
                <div className="about-char-badge top-left">
                  <Box size={13} />
                  <span>Blender 3D Cartoon Model</span>
                </div>

                <div className="about-char-badge bottom-right">
                  <Sparkles size={13} />
                  <span>8K Pixar Aesthetic</span>
                </div>
              </div>
            </div>

            {/* Floating 3D Geometric Canvas */}
            <div className="about-3d-card" style={{ minHeight: '320px' }}>
              <About3D />
              <div className="about-3d-caption">
                <span className="caption-dot"></span>
                <span>Interactive 3D Geometric Artifacts &bull; Cursor Parallax</span>
              </div>
            </div>

            {/* Quick Education Callout */}
            <div className="about-edu-card">
              <div className="edu-icon-wrap">
                <GraduationCap size={22} className="edu-icon" />
              </div>
              <div className="edu-content">
                <span className="edu-label">CURRENT PURSUIT</span>
                <h4 className="edu-degree">Master of Computer Application (Integrated MCA)</h4>
                <p className="edu-school">Amal Jyothi College of Engineering, Kanjirapally &bull; CGPA: 7.00</p>
                <span className="edu-year">Graduating April 2028</span>
              </div>
            </div>
          </div>

          {/* Right Column: Narrative, Stats, & Competencies */}
          <div className="about-info-column">
            
            {/* Bio Narrative */}
            <div className="about-bio-box">
              <h3 className="about-subheading">
                Engineering with artistic precision, blending 3D computer graphics with robust software systems.
              </h3>
              <p className="about-paragraph">
                I am <strong className="text-white">{name}</strong>, a computer science scholar, creative technologist, and 3D web enthusiast. 
                My focus lies at the crossroads of intuitive user experience, 3D character design, and performant backend architecture.
              </p>
              <p className="about-paragraph">
                From authoring published scientific research in nanotechnology to engineering full-stack financial platforms and interactive 3D WebGL scenes, I treat code as a medium for artistic expression and real-world utility.
              </p>
            </div>

            {/* Numbers / Stats Counter */}
            <div className="about-stats-grid">
              <div className="about-stat-item">
                <div className="stat-number-wrap">
                  <span className="stat-big-number">{stats?.projects || 6}</span>
                  <span className="stat-plus">+</span>
                </div>
                <span className="stat-desc-label">Projects Completed</span>
              </div>

              <div 
                className="about-stat-item about-stat-clickable"
                onClick={onOpenCertifications}
                title="Click to view all 13 certificates"
              >
                <div className="stat-number-wrap">
                  <span className="stat-big-number text-gradient-purple">{stats?.certifications || 13}</span>
                  <span className="stat-plus">+</span>
                </div>
                <span className="stat-desc-label">Certifications <ArrowRight size={12} style={{ display: 'inline' }} /></span>
              </div>

              <div className="about-stat-item">
                <div className="stat-number-wrap">
                  <span className="stat-big-number text-gradient-pink">{stats?.hackathons || 2}</span>
                  <span className="stat-plus">x</span>
                </div>
                <span className="stat-desc-label">Hackathons Recognized</span>
              </div>
            </div>

            {/* Blender Shading & Rendering Capabilities */}
            <div className="blender-specs-card">
              <div className="blender-specs-header">
                <Sliders size={15} className="specs-icon" />
                <span className="specs-title">3D Rendering &amp; Shading Specifications</span>
              </div>
              <div className="blender-specs-grid">
                <div className="spec-item">
                  <span className="spec-label">Render Pipeline</span>
                  <span className="spec-value">Blender Cycles X / Three.js WebGL</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Character Shading</span>
                  <span className="spec-value">Subsurface Scattering (SSS) 8K</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Lighting Model</span>
                  <span className="spec-value">Ray Traced 3-Point Studio Rig</span>
                </div>
                <div className="spec-item">
                  <span className="spec-label">Fidelity</span>
                  <span className="spec-value">High-Poly Pixar Cartoon Likeness</span>
                </div>
              </div>
            </div>

            {/* Tech Stack Pills */}
            <div className="about-skills-section" style={{ marginTop: '1.75rem' }}>
              <h4 className="skills-subheading">Core Tech Stack</h4>
              <div className="skills-tags-wrap">
                {techStack.map((tech) => (
                  <span 
                    key={tech.name} 
                    className="creative-skill-pill"
                    style={{ borderColor: `${tech.color}40`, boxShadow: `0 0 12px ${tech.color}15` }}
                  >
                    <span className="skill-dot" style={{ backgroundColor: tech.color }}></span>
                    {tech.name}
                  </span>
                ))}
              </div>
            </div>

            {/* Soft Skills */}
            <div className="about-skills-section" style={{ marginTop: '1.25rem' }}>
              <h4 className="skills-subheading">Capabilities</h4>
              <div className="skills-tags-wrap">
                {softSkills.map((skill) => (
                  <span key={skill} className="creative-soft-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Row */}
            <div className="about-actions-row">
              <button
                type="button"
                className="btn-credentials-trigger"
                onClick={onOpenCertifications}
              >
                <Award size={18} />
                <span>Explore Full Credentials &amp; Certifications</span>
                <ArrowRight size={16} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
