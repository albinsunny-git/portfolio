import React from 'react';
import { Mail, GraduationCap } from 'lucide-react';

const Github = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const Linkedin = ({ size = 24, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function AboutView({ portfolioData }) {
  const { name } = portfolioData;

  const techStack = [
    'React.js',
    'Node.js',
    'PHP',
    'HTML',
    'CSS3',
    'C',
    'C++',
    'MongoDB',
    'MySQL',
    'Microsoft Word',
    'PowerPoint',
    'Excel'
  ];

  const softSkills = [
    'Technical Writing',
    'Documentation',
    'Content Writing',
    'Problem Solving'
  ];



  return (
    <div className="about-view">

      {/* About Hero Header */}
      <section className="about-hero">
        <img
          src="/avatar.png"
          alt={name}
          className="about-avatar"
          onError={(e) => {
            e.target.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80"; // fallback
          }}
        />
        <h2 className="about-name">I'm {name}.</h2>
        <p className="about-bio">
          A dedicated Software Engineering student passionate about building scalable web applications and exploring the intersection of AI and user experience.
        </p>

        {/* Social / Direct Links */}
        <div className="about-links">
          <a
            href="https://github.com/albinsunny-git"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
            aria-label="GitHub Profile"
          >
            <Github size={14} />
            <span>GitHub</span>
          </a>
          <a
            href="https://www.linkedin.com/in/albin-sunny-7b0448290"
            target="_blank"
            rel="noopener noreferrer"
            className="about-link"
            aria-label="LinkedIn Profile"
          >
            <Linkedin size={14} />
            <span>LinkedIn</span>
          </a>
          <a
            href="mailto:albinsunny2028@mca.ajce.in"
            className="about-link"
            aria-label="Send Email"
          >
            <Mail size={14} />
            <span>Email</span>
          </a>
        </div>
      </section>

      {/* Story Narrative */}
      <section className="section-container">
        <div className="section-header">
          <h3 className="section-title">My Story</h3>
        </div>
        <div className="story-card">
          <p>
            Currently pursuing my Master of Computer Application(MCA)'s degree, I have spent the last three years diving deep into the world of full-stack development. My journey began with a simple "Hello World" in Python, which quickly evolved into a fascination with complex algorithms and elegant UI design.
          </p>
          <p>
            My career goal is to join a forward-thinking engineering team where I can contribute to meaningful projects while continuing to learn and grow. I am particularly interested in cloud architecture and how it can be leveraged to create more accessible digital tools.
          </p>
        </div>
      </section>

      {/* Education Block */}
      <section className="section-container">
        <div className="section-header">
          <h3 className="section-title">Education</h3>
        </div>
        <div className="education-card">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <h4 className="degree">INTEGRATED MCA</h4>
              <span className="school">AMAL JYOTHI COLLEGE OF ENGINEERING, KANJIRAPALLY</span>
            </div>
            <GraduationCap size={24} style={{ opacity: 0.8 }} />
          </div>
          <span className="gpa-badge">CGPA: 7.00</span>

          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', margin: '0.75rem 0' }}></div>

          <div>
            <span className="grad-title">Expected Graduation</span>
            <p className="grad-date">April 2028</p>
          </div>
        </div>
      </section>

      {/* Core Competencies */}
      <section className="section-container" style={{ marginBottom: 0 }}>
        <div className="section-header">
          <h3 className="section-title">Core Competencies</h3>
        </div>
        <div className="competencies-card">
          {/* Tech Stack */}
          <div className="skills-group">
            <span className="skills-title">Technical Stack</span>
            <div className="skills-pills">
              {techStack.map((tech) => (
                <span key={tech} className="badge-tag badge-tag-accent">{tech}</span>
              ))}
            </div>
          </div>

          {/* Soft Skills */}
          <div className="skills-group">
            <span className="skills-title">Soft Skills</span>
            <div className="skills-pills">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className="badge-tag"
                  style={{ backgroundColor: 'var(--accent-purple-light)', color: 'var(--accent-purple)', borderColor: 'transparent' }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
