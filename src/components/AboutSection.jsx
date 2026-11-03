import React from 'react';
import { Award, GraduationCap, ArrowRight } from 'lucide-react';
import About3D from './About3D';

export default function AboutSection({ portfolioData, onOpenCertifications }) {
  const { name = 'Albin Sunny', stats = {} } = portfolioData || {};

  const techStack = [
    { name: 'React.js', color: '#38bdf8' },
    { name: 'Three.js / WebGL', color: '#8b5cf6' },
    { name: 'Node.js', color: '#22c55e' },
    { name: 'PHP & MySQL', color: '#ec4899' },
    { name: 'C / C++', color: '#3b82f6' },
    { name: 'Flutter', color: '#06b6d4' },
    { name: 'Figma & UI/UX', color: '#f43f5e' },
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
            <span className="pre-tag-label">BIOGRAPHY &amp; CAPABILITIES</span>
          </div>
          <h2 className="section-huge-heading">
            ABOUT <span className="text-gradient-purple">ME</span>
          </h2>
        </div>

        {/* 2-Column Showcase */}
        <div className="about-grid">
          
          {/* Left Column: Interactive 3D Floating Decorative Canvas */}
          <div className="about-3d-column">
            <div className="about-3d-card">
              <About3D />
              <div className="about-3d-caption">
                <span className="caption-dot"></span>
                <span>Interactive 3D Geometric Artifacts</span>
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
                Engineering with artistic precision, building digital experiences that leave a lasting mark.
              </h3>
              <p className="about-paragraph">
                I am <strong className="text-white">{name}</strong>, a computer science scholar and creative technologist. 
                My focus lies at the crossroads of intuitive user experience and performant system architecture. 
                From authoring published scientific research in nanotechnology to building full-stack financial management applications, I bridge theoretical concepts with production-ready software.
              </p>
              <p className="about-paragraph">
                Whether creating interactive 3D web spaces or writing optimized C++ algorithms, I treat code as a medium for creative expression and pragmatic problem solving.
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

            {/* Tech Stack Pills */}
            <div className="about-skills-section">
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
