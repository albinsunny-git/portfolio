import React, { useState } from 'react';
import { Briefcase, Trophy, X, Award as AwardIcon } from 'lucide-react';

export default function CertificationsView() {
  const [selectedCert, setSelectedCert] = useState(null);

  const internships = [
    {
      id: 1,
      role: 'AI / ML Developer Intern',
      company: 'Artificial Intelligence & Machine Learning Program',
      period: 'May 18, 2026 — June 6, 2026',
      current: false,
      description: 'Implemented machine learning algorithms and statistical models in Python. Engineered data preprocessing, model evaluation, and feature extraction scripts.'
    },
    {
      id: 2,
      role: 'Node.js Backend Developer Intern',
      company: 'Backend Systems & API Development Program',
      period: 'May 2025 — June 2025',
      current: false,
      description: 'Designed and deployed scalable server-side systems and RESTful API endpoints. Managed database logic and optimized service query performances.'
    }
  ];

  const certs = [
    {
      id: 1,
      title: "Database Foundation",
      issuer: "Oracle Academy & AJCE",
      date: "Issued: Oct 2025",
      image: "/cert-db-foundation.png"
    },
    {
      id: 2,
      title: "Database Design",
      issuer: "Oracle Academy & AJCE",
      date: "Issued: Oct 2025",
      image: "/cert-db-design.png"
    },
    {
      id: 3,
      title: "UI/UX for Beginners",
      issuer: "Simplilearn SkillUp",
      date: "Issued: Oct 2025",
      image: "/cert-uiux-beginners.png"
    },
    {
      id: 4,
      title: "Introduction to Graphic Design; Basics of UI/UX",
      issuer: "Simplilearn SkillUp",
      date: "Issued: Oct 2025",
      image: "/cert-graphic-basics.png"
    },
    {
      id: 5,
      title: "Azure '25 Short Film Presentation",
      issuer: "Amal Jyothi College of Engineering (Autonomous)",
      date: "Issued: March 2025",
      image: "/cert-azure.png"
    },
    {
      id: 6,
      title: "Light Talk: Alumni Interaction Session",
      issuer: "AJCE Department of Computer Applications",
      date: "Issued: Feb 2025",
      image: "/cert-light-talk.png"
    },
    {
      id: 7,
      title: "AAVESH '25 SPORTS Volunteer",
      issuer: "Amal Jyothi College of Engineering (Autonomous)",
      date: "Issued: Jan 2025",
      image: "/cert-aavesh.png"
    },
    {
      id: 8,
      title: "MUFEST Event & No-Code Workshop",
      issuer: "μlearn AJC & Amal Jyothi College of Engineering",
      date: "Issued: Jan 2025",
      image: "/cert-mufest.png"
    },
    {
      id: 9,
      title: "Explore Tech Career Webinar",
      issuer: "AJCE Dept. of Computer Applications & Team IMPACT",
      date: "Issued: Oct 2024",
      image: "/cert-webinar.png"
    },
    {
      id: 10,
      title: "C Programming Basics: Kick start your programming career",
      issuer: "Simplilearn SkillUp",
      date: "Issued: March 2024",
      image: "/cert-c-programming-basics-simplilearn.png"
    },
    {
      id: 11,
      title: "C for Beginners",
      issuer: "Great Learning Academy",
      date: "Issued: March 2024",
      image: "/cert-c-beginners-greatlearning.png"
    },
    {
      id: 12,
      title: "Algorithms in C",
      issuer: "Great Learning Academy",
      date: "Issued: March 2024",
      image: "/cert-algorithms-c-greatlearning.png"
    },
    {
      id: 13,
      title: "C Programming",
      issuer: "DataFlair",
      date: "Issued: Feb 2024",
      image: "/cert-c-programming-dataflair.png"
    }
  ];

  const hackathons = [
    {
      id: 1,
      title: "NASA Space Apps Challenge 2025",
      role: "Volunteer Lead",
      date: "October 2025",
      award: "Leadership Appreciation",
      primary: true,
      image: "/cert-nasa.png"
    },
    {
      id: 2,
      title: "Smart India Hackathon 2025",
      role: "Outstanding Participant",
      date: "September 2025",
      award: "Institute Level Nominee",
      primary: false,
      image: "/cert-sih.png"
    }
  ];

  return (
    <div className="certifications-view">
      
      <div style={{ marginBottom: '2rem' }}>
        <h1 className="home-title" style={{ fontSize: '1.75rem', marginBottom: '0.5rem' }}>
          Certifications &amp; Achievements
        </h1>
        <p className="home-desc" style={{ fontSize: '0.9rem' }}>
          A documented journey of professional growth, technical validation, and competitive problem-solving.
        </p>
      </div>

      {/* Internships Timeline */}
      <section className="section-container">
        <h3 className="timeline-section-title">
          <Briefcase size={18} style={{ color: 'var(--primary)' }} />
          Internships
        </h3>
        <div className="timeline-list">
          {internships.map((intern) => (
            <div key={intern.id} className={`timeline-item ${intern.current ? 'timeline-item-active' : ''}`}>
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                {intern.current && <span className="timeline-tag">Current</span>}
                <h4 className="timeline-title">{intern.role}</h4>
                <span className="timeline-company">{intern.company}</span>
                <span className="timeline-duration">{intern.period}</span>
                <p className="timeline-desc">{intern.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Certifications List */}
      <section className="section-container">
        <h3 className="timeline-section-title">
          <AwardIcon size={18} style={{ color: 'var(--primary)' }} />
          Certifications
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {certs.map((cert) => (
            <div 
              key={cert.id} 
              className="row-card" 
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedCert(cert)}
            >
              <div className="row-card-icon-wrapper">
                <AwardIcon size={20} />
              </div>
              <div className="row-card-info">
                <h4 className="row-card-title">{cert.title}</h4>
                <p className="row-card-subtitle">{cert.issuer} &bull; {cert.date}</p>
              </div>
              <button 
                type="button"
                className="section-link" 
                style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', flexShrink: 0, border: 'none', background: 'none' }}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedCert(cert);
                }}
              >
                View
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Hackathons Section */}
      <section className="section-container" style={{ marginBottom: 0 }}>
        <h3 className="timeline-section-title">
          <Trophy size={18} style={{ color: 'var(--primary)' }} />
          Hackathons
        </h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {hackathons.map((hack) => (
            <div 
              key={hack.id} 
              className="hackathon-card"
              style={{ cursor: 'pointer' }}
              onClick={() => setSelectedCert(hack)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                <div className="hackathon-header">
                  <h4 className="hackathon-name">{hack.title}</h4>
                  <div className="hackathon-meta">
                    <span>{hack.role}</span>
                    <span className="bullet"></span>
                    <span>{hack.date}</span>
                  </div>
                </div>
                <button 
                  type="button"
                  className="section-link" 
                  style={{ fontSize: '0.75rem', padding: '0.25rem 0.5rem', flexShrink: 0, border: 'none', background: 'none' }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedCert(hack);
                  }}
                >
                  View Certificate
                </button>
              </div>
              <div className={`hackathon-award ${!hack.primary ? 'hackathon-award-secondary' : ''}`} style={{ marginTop: '0.5rem' }}>
                <Trophy size={12} style={{ marginRight: '4px' }} />
                {hack.award}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Full-Screen Lightbox Modal Overlay */}
      {selectedCert && (
        <div 
          className="modal-overlay" 
          style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(15, 23, 42, 0.75)', zIndex: 1100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1.5rem', animation: 'fadeIn 0.2s ease' }}
          onClick={() => setSelectedCert(null)}
        >
          <div 
            className="modal-content" 
            style={{ position: 'relative', width: '100%', maxWidth: '850px', maxHeight: '85vh', backgroundColor: 'transparent', border: 'none', boxShadow: 'none', display: 'flex', flexDirection: 'column', gap: '0.75rem', animation: 'slideUp 0.3s cubic-bezier(0.16, 1, 0.3, 1)' }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button 
                type="button"
                onClick={() => setSelectedCert(null)}
                style={{ background: 'rgba(15, 23, 42, 0.85)', border: 'none', color: '#fff', padding: '0.45rem', borderRadius: '50%', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                aria-label="Close certificate lightbox"
              >
                <X size={18} />
              </button>
            </div>
            <div style={{ flex: 1, overflow: 'auto', borderRadius: '0.75rem', boxShadow: 'var(--shadow-premium)', display: 'flex', justifyContent: 'center' }}>
              <img 
                src={selectedCert.image} 
                alt={selectedCert.title} 
                style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }} 
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
