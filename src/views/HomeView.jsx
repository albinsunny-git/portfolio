import React from 'react';
import { Folder, Award, Trophy, ChevronRight } from 'lucide-react';

export default function HomeView({ portfolioData, setCurrentTab }) {
  const { name, statusText, stats } = portfolioData;

  return (
    <div className="home-view">
      
      {/* Hero Header */}
      <section className="home-hero">
        <div className="badge-status">
          <span className="badge-status-dot"></span>
          {statusText}
        </div>
        <h1 className="home-title">
          Hi, I'm {name}, <br />
          <span>a passionate learner and developer.</span>
        </h1>
        <p className="home-desc">
          I build digital experiences that blend academic rigor with technical innovation. 
          Currently pursuing a Computer Science degree while exploring the intersection of AI and user-centric design.
        </p>
      </section>

      {/* Stats Counter Section */}
      <section className="stats-grid">
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => setCurrentTab('projects')}>
          <Folder className="stat-icon" />
          <span className="stat-value">{stats?.projects || 1}</span>
          <span className="stat-label">Projects Completed</span>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => setCurrentTab('certifications')}>
          <Award className="stat-icon" />
          <span className="stat-value">{stats?.certifications || 5}</span>
          <span className="stat-label">Certifications</span>
        </div>
        <div className="stat-card" style={{ cursor: 'pointer' }} onClick={() => setCurrentTab('certifications')}>
          <Trophy className="stat-icon" />
          <span className="stat-value">{stats?.hackathons || 3}</span>
          <span className="stat-label">Hackathons Won</span>
        </div>
      </section>

      {/* Featured Project Section */}
      <section className="section-container">
        <div className="section-header">
          <h2 className="section-title">Featured Project</h2>
          <span className="section-link" onClick={() => setCurrentTab('projects')}>
            View all projects &rarr;
          </span>
        </div>

        <div className="featured-card">
          <div className="card-img-container">
            <img 
              src="/project-dashboard.png" 
              alt="Financial Management System" 
              className="card-img" 
              onError={(e) => {
                e.target.src = "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80"; // fallback
              }}
            />
            <div className="card-floating-tags">
              <span className="badge-tag badge-tag-accent">Flutter</span>
              <span className="badge-tag badge-tag-accent">PHP</span>
            </div>
            <div className="card-floating-badge">Featured</div>
          </div>
          <div className="card-content">
            <h3 className="card-title">Financial Management System</h3>
            <p className="card-desc">
              A comprehensive financial management site and mobile app enabling automated generation of balance sheets and crucial financial documents using standard voucher entries.
            </p>
          </div>
        </div>
      </section>

      {/* Latest Certification Section */}
      <section className="section-container" style={{ marginBottom: 0 }}>
        <div className="section-header">
          <h2 className="section-title">Latest Certification</h2>
        </div>

        <div className="row-card" onClick={() => setCurrentTab('certifications')}>
          <div className="row-card-icon-wrapper">
            <Award size={20} />
          </div>
          <div className="row-card-info">
            <h4 className="row-card-title">NASA Space Apps Challenge 2025</h4>
            <p className="row-card-subtitle">Volunteer Lead &bull; Oct 2025</p>
          </div>
          <ChevronRight size={18} className="row-card-chevron" />
        </div>
      </section>

    </div>
  );
}
