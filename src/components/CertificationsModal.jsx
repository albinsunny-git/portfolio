import React, { useState, useMemo } from 'react';
import { X, Award, Briefcase, Trophy, ExternalLink, Search } from 'lucide-react';

const INTERNSHIPS = [
  {
    id: 1,
    role: 'AI / ML Developer Intern',
    company: 'Artificial Intelligence & Machine Learning Program',
    period: 'May 18, 2026 — June 6, 2026',
    current: false,
    description: 'Implemented machine learning algorithms and statistical predictive models in Python. Engineered data preprocessing pipelines, evaluation metrics, and feature extraction scripts.',
    tags: ['Python', 'Machine Learning', 'Data Preprocessing', 'Scikit-Learn']
  },
  {
    id: 2,
    role: 'Node.js Backend Developer Intern',
    company: 'Backend Systems & API Development Program',
    period: 'May 2025 — June 2025',
    current: false,
    description: 'Designed and deployed scalable server-side systems and RESTful API endpoints. Managed relational database schemas and optimized service query performance.',
    tags: ['Node.js', 'Express', 'REST APIs', 'PostgreSQL', 'System Architecture']
  }
];

const CERTS = [
  {
    id: 1,
    title: "Database Foundation",
    issuer: "Oracle Academy & AJCE",
    date: "Issued: Oct 2025",
    category: "Databases",
    image: "/cert-db-foundation.png"
  },
  {
    id: 2,
    title: "Database Design",
    issuer: "Oracle Academy & AJCE",
    date: "Issued: Oct 2025",
    category: "Databases",
    image: "/cert-db-design.png"
  },
  {
    id: 3,
    title: "UI/UX for Beginners",
    issuer: "Simplilearn SkillUp",
    date: "Issued: Oct 2025",
    category: "Design",
    image: "/cert-uiux-beginners.png"
  },
  {
    id: 4,
    title: "Introduction to Graphic Design; Basics of UI/UX",
    issuer: "Simplilearn SkillUp",
    date: "Issued: Oct 2025",
    category: "Design",
    image: "/cert-graphic-basics.png"
  },
  {
    id: 5,
    title: "Azure '25 Short Film Presentation",
    issuer: "Amal Jyothi College of Engineering (Autonomous)",
    date: "Issued: March 2025",
    category: "Media & Presentation",
    image: "/cert-azure.png"
  },
  {
    id: 6,
    title: "Light Talk: Alumni Interaction Session",
    issuer: "AJCE Department of Computer Applications",
    date: "Issued: Feb 2025",
    category: "Academic",
    image: "/cert-light-talk.png"
  },
  {
    id: 7,
    title: "AAVESH '25 SPORTS Volunteer",
    issuer: "Amal Jyothi College of Engineering (Autonomous)",
    date: "Issued: Jan 2025",
    category: "Leadership",
    image: "/cert-aavesh.png"
  },
  {
    id: 8,
    title: "MUFEST Event & No-Code Workshop",
    issuer: "μlearn AJC & Amal Jyothi College of Engineering",
    date: "Issued: Jan 2025",
    category: "Workshop",
    image: "/cert-mufest.png"
  },
  {
    id: 9,
    title: "Explore Tech Career Webinar",
    issuer: "AJCE Dept. of Computer Applications & Team IMPACT",
    date: "Issued: Oct 2024",
    category: "Webinar",
    image: "/cert-webinar.png"
  },
  {
    id: 10,
    title: "C Programming Basics: Kick start your programming career",
    issuer: "Simplilearn SkillUp",
    date: "Issued: March 2024",
    category: "Programming",
    image: "/cert-c-programming-basics-simplilearn.png"
  },
  {
    id: 11,
    title: "C for Beginners",
    issuer: "Great Learning Academy",
    date: "Issued: March 2024",
    category: "Programming",
    image: "/cert-c-beginners-greatlearning.png"
  },
  {
    id: 12,
    title: "Algorithms in C",
    issuer: "Great Learning Academy",
    date: "Issued: March 2024",
    category: "Algorithms",
    image: "/cert-algorithms-c-greatlearning.png"
  },
  {
    id: 13,
    title: "C Programming",
    issuer: "DataFlair",
    date: "Issued: Feb 2024",
    category: "Programming",
    image: "/cert-c-programming-dataflair.png"
  }
];

const HACKATHONS = [
  {
    id: 1,
    title: "NASA Space Apps Challenge 2025",
    role: "Volunteer Lead",
    date: "October 2025",
    award: "Leadership Appreciation",
    primary: true,
    image: "/cert-nasa.png",
    details: "Coordinated volunteer workflows, logistics, and technical helpdesks for regional participants solving NASA space challenges."
  },
  {
    id: 2,
    title: "Smart India Hackathon 2025",
    role: "Outstanding Participant",
    date: "September 2025",
    award: "Institute Level Nominee",
    primary: false,
    image: "/cert-sih.png",
    details: "Engineered rapid prototypes addressing national innovation problem statements at the collegiate level."
  }
];

export default function CertificationsModal({ isOpen, onClose }) {
  const [activeTab, setActiveTab] = useState('certs');
  const [searchQuery, setSearchQuery] = useState('');
  const [lightboxCert, setLightboxCert] = useState(null);

  const filteredCerts = useMemo(() => {
    if (!searchQuery.trim()) return CERTS;
    const q = searchQuery.toLowerCase();
    return CERTS.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.issuer.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    );
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="credentials-modal-backdrop" onClick={onClose}>
      <div className="credentials-modal-dialog" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="credentials-modal-header">
          <div className="modal-header-titles">
            <div className="badge-tag" style={{ width: 'fit-content', marginBottom: '0.4rem', backgroundColor: 'rgba(139,92,246,0.15)', color: '#8B5CF6' }}>
              <Award size={13} style={{ marginRight: '4px' }} />
              <span>Verified Qualifications</span>
            </div>
            <h3 className="credentials-modal-title">Certifications &amp; Professional Experience</h3>
            <p className="credentials-modal-subtitle">
              A documented timeline of professional milestones, academic achievements, and 13 technical credentials.
            </p>
          </div>
          <button 
            type="button" 
            className="credentials-close-btn" 
            onClick={onClose}
            aria-label="Close dialog"
          >
            <X size={20} />
          </button>
        </div>

        {/* Modal Tabs Bar */}
        <div className="credentials-tabs-bar">
          <div className="credentials-tab-buttons">
            <button
              type="button"
              className={`credentials-tab-btn ${activeTab === 'certs' ? 'credentials-tab-active' : ''}`}
              onClick={() => setActiveTab('certs')}
            >
              <Award size={15} />
              <span>Certifications ({CERTS.length})</span>
            </button>
            <button
              type="button"
              className={`credentials-tab-btn ${activeTab === 'internships' ? 'credentials-tab-active' : ''}`}
              onClick={() => setActiveTab('internships')}
            >
              <Briefcase size={15} />
              <span>Internships ({INTERNSHIPS.length})</span>
            </button>
            <button
              type="button"
              className={`credentials-tab-btn ${activeTab === 'hackathons' ? 'credentials-tab-active' : ''}`}
              onClick={() => setActiveTab('hackathons')}
            >
              <Trophy size={15} />
              <span>Hackathons ({HACKATHONS.length})</span>
            </button>
          </div>

          {activeTab === 'certs' && (
            <div className="credentials-search-box">
              <Search size={14} className="cred-search-icon" />
              <input
                type="text"
                placeholder="Search certifications..."
                className="cred-search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          )}
        </div>

        {/* Tab Body Content */}
        <div className="credentials-modal-body">
          
          {/* TAB 1: CERTIFICATIONS */}
          {activeTab === 'certs' && (
            <div className="certs-grid-view">
              {filteredCerts.map((cert) => (
                <div
                  key={cert.id}
                  className="cert-card-item"
                  onClick={() => setLightboxCert(cert)}
                >
                  <div className="cert-card-icon-wrap">
                    <Award size={20} />
                  </div>
                  <div className="cert-card-meta">
                    <span className="cert-cat-pill">{cert.category}</span>
                    <h4 className="cert-card-title">{cert.title}</h4>
                    <p className="cert-card-issuer">{cert.issuer}</p>
                    <span className="cert-card-date">{cert.date}</span>
                  </div>
                  <button
                    type="button"
                    className="cert-inspect-link"
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxCert(cert);
                    }}
                  >
                    <span>View</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* TAB 2: INTERNSHIPS */}
          {activeTab === 'internships' && (
            <div className="internships-timeline-view">
              {INTERNSHIPS.map((intern) => (
                <div key={intern.id} className="intern-card-item">
                  <div className="intern-card-header">
                    <div className="intern-role-wrap">
                      <h4 className="intern-role">{intern.role}</h4>
                      <span className="intern-company">{intern.company}</span>
                    </div>
                    <span className="intern-period">{intern.period}</span>
                  </div>
                  <p className="intern-desc">{intern.description}</p>
                  <div className="intern-tags-wrap">
                    {intern.tags.map((t) => (
                      <span key={t} className="badge-tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* TAB 3: HACKATHONS */}
          {activeTab === 'hackathons' && (
            <div className="hackathons-cards-view">
              {HACKATHONS.map((h) => (
                <div 
                  key={h.id} 
                  className="hack-card-item"
                  onClick={() => setLightboxCert(h)}
                >
                  <div className="hack-header-row">
                    <div>
                      <h4 className="hack-title">{h.title}</h4>
                      <span className="hack-role">{h.role} &bull; {h.date}</span>
                    </div>
                    <span className="hack-award-badge">
                      <Trophy size={14} />
                      <span>{h.award}</span>
                    </span>
                  </div>
                  <p className="hack-details">{h.details}</p>
                  <button 
                    type="button" 
                    className="cert-inspect-link" 
                    style={{ marginTop: '0.75rem' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxCert(h);
                    }}
                  >
                    <span>Inspect Certificate</span>
                    <ExternalLink size={12} />
                  </button>
                </div>
              ))}
            </div>
          )}

        </div>

        {/* Footer */}
        <div className="credentials-modal-footer">
          <span className="cred-footer-note">
            All certifications verified through institution portals &bull; {CERTS.length} active credentials
          </span>
          <button type="button" className="btn-secondary" onClick={onClose}>
            Close
          </button>
        </div>

      </div>

      {/* Lightbox Preview */}
      {lightboxCert && (
        <div 
          className="cert-lightbox-overlay" 
          onClick={() => setLightboxCert(null)}
        >
          <div className="cert-lightbox-dialog" onClick={(e) => e.stopPropagation()}>
            <div className="cert-lightbox-top">
              <span className="cert-lightbox-title">{lightboxCert.title}</span>
              <button 
                type="button" 
                className="cert-lightbox-close"
                onClick={() => setLightboxCert(null)}
              >
                <X size={18} />
              </button>
            </div>
            <div className="cert-lightbox-frame">
              <img 
                src={lightboxCert.image} 
                alt={lightboxCert.title} 
                className="cert-lightbox-img"
                onError={(e) => {
                  e.target.src = "https://images.unsplash.com/photo-1606326608606-aa0b62935f2b?auto=format&fit=crop&w=800&q=80";
                }}
              />
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
