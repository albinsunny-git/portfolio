import React, { useState } from 'react';
import { ArrowUpRight, Code, Palette, Sparkles, Layers, Compass } from 'lucide-react';

export default function ServicesSection() {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const services = [
    {
      num: '01',
      title: 'Web Development',
      subtitle: 'Performant, scalable, modern web architectures',
      description: 'Building blazing-fast web applications using React, modern JavaScript/TypeScript, and robust backend ecosystems. Clean code, state-of-the-art responsiveness, and SEO-optimized structures.',
      icon: Code,
      tags: ['React', 'Next.js', 'Node.js', 'REST APIs', 'Database Optimization'],
      accent: '#8B5CF6'
    },
    {
      num: '02',
      title: 'UI/UX Design',
      subtitle: 'Intuitive user journeys & intentional design systems',
      description: 'Designing high-converting, human-centered digital experiences in Figma. From wireframes to micro-interactions, turning complex workflows into effortless, delightful user journeys.',
      icon: Palette,
      tags: ['Figma', 'Design Systems', 'Interactive Prototypes', 'User Research', 'Accessibility'],
      accent: '#EC4899'
    },
    {
      num: '03',
      title: 'Creative Development',
      subtitle: '3D WebGL visuals & interactive storytelling',
      description: 'Pioneering immersive 3D digital experiences on the web using Three.js and WebGL. Fluid shaders, interactive canvas models, physics-driven particle simulations, and parallax depth.',
      icon: Sparkles,
      tags: ['Three.js', 'WebGL', 'Shaders', 'Interactive 3D', 'Canvas Animation'],
      accent: '#3B82F6'
    },
    {
      num: '04',
      title: 'Branding and Visual Design',
      subtitle: 'Distinctive visual identities & art direction',
      description: 'Crafting cohesive brand identities that stand apart from template mediocrity. High-impact typography, signature color palettes, custom iconography, and unified visual guidelines.',
      icon: Layers,
      tags: ['Identity Systems', 'Typography', 'Iconography', 'Art Direction', 'Editorial Layouts'],
      accent: '#F59E0B'
    },
    {
      num: '05',
      title: 'Digital Experiences',
      subtitle: 'Experimental web experiments & game mechanics',
      description: 'Creating memorable digital campaigns, interactive portfolios, and experimental web mechanics that engage users and deliver award-caliber aesthetic appeal.',
      icon: Compass,
      tags: ['Gamification', 'Micro-interactions', 'Experimental Web', 'Audio/Visual Sync'],
      accent: '#10B981'
    }
  ];

  return (
    <section id="services" className="services-section-light">
      <div className="services-container">
        
        {/* Section Header */}
        <div className="services-header-wrap">
          <div className="services-pre-tag">
            <span className="pre-tag-number">02</span>
            <span className="pre-tag-dash">/</span>
            <span className="pre-tag-label">WHAT I DO</span>
          </div>
          <div className="services-title-row">
            <h2 className="services-huge-title">SERVICES</h2>
            <p className="services-subtext">
              Transforming ambitious ideas into precision-engineered, award-grade digital realities through design and code.
            </p>
          </div>
        </div>

        {/* Numbered Services List */}
        <div className="services-list">
          {services.map((service, index) => {
            const isHovered = hoveredIndex === index;
            const IconComponent = service.icon;

            return (
              <div
                key={service.num}
                className={`service-item-row ${isHovered ? 'service-item-hovered' : ''}`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <div className="service-row-main">
                  
                  {/* Large Number */}
                  <div className="service-num-wrap">
                    <span className="service-num">{service.num}</span>
                  </div>

                  {/* Service Title & Subtitle */}
                  <div className="service-info-wrap">
                    <div className="service-title-wrap">
                      <h3 className="service-title">
                        <IconComponent size={20} className="service-title-icon" style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.65rem', color: isHovered ? service.accent : '#64748B' }} />
                        {service.title}
                      </h3>
                      <span className="service-subtitle">{service.subtitle}</span>
                    </div>

                    {/* Expandable / Hover Details */}
                    <div className={`service-expand-content ${isHovered ? 'service-expand-active' : ''}`}>
                      <p className="service-desc-text">{service.description}</p>
                      <div className="service-tags-list">
                        {service.tags.map((tag) => (
                          <span key={tag} className="service-tag-pill">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Right Side Arrow / Icon */}
                  <div className="service-arrow-wrap">
                    <div className="service-icon-badge" style={{ backgroundColor: isHovered ? service.accent : undefined }}>
                      <ArrowUpRight 
                        size={20} 
                        className={`service-arrow-icon ${isHovered ? 'service-arrow-rotated' : ''}`} 
                      />
                    </div>
                  </div>

                </div>

                {/* Subtle bottom separator line */}
                <div className="service-separator"></div>
              </div>
            );
          })}
        </div>

        {/* Bottom Callout banner */}
        <div className="services-footer-banner">
          <div className="banner-text">
            <h4>Have a unique project requirement in mind?</h4>
            <p>I build custom tailored solutions from concept prototype to production deployment.</p>
          </div>
          <a href="#contact" className="services-cta-button">
            <span>Start a Project</span>
            <ArrowUpRight size={18} />
          </a>
        </div>

      </div>
    </section>
  );
}
