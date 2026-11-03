import React, { useState, useMemo } from 'react';
import { Search, ArrowUpRight, Sparkles, X, Layers } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const PROJECTS_DATA = [
  {
    id: 1,
    num: '01',
    featured: true,
    title: 'Financial Management System',
    type: 'Mini Project',
    role: 'Lead Full-Stack Developer',
    timeline: '2025 — 2026',
    description: 'A comprehensive, enterprise-grade financial management platform and responsive mobile application enabling automated generation of balance sheets, general ledgers, and audit-compliant statements using standard voucher entries.',
    longDescription: 'Engineered a dual web-and-mobile accounting architecture that converts raw journal entries and daybooks into automated trial balances and balance sheets. Features role-based access control, transaction validation pipelines, dynamic PDF export, and responsive dashboard data visualization.',
    tags: ['Flutter', 'PHP', 'MySQL', 'HTML5', 'CSS3', 'REST API'],
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=85',
    fallback: '/project-dashboard.png',
    githubUrl: 'https://github.com/albinsunny-git',
    demoUrl: 'https://github.com/albinsunny-git',
    metrics: ['100% Automated Balance Sheets', 'Real-time Voucher Calculation', 'Zero Discrepancy Auditing']
  },
  {
    id: 2,
    num: '02',
    featured: false,
    title: 'Nanotechnology Research Paper',
    type: 'Micro Project',
    role: 'First Author & Researcher',
    timeline: '2025',
    description: 'Authored and published a peer-reviewed scientific research paper exploring advanced nanomaterials and synthesis techniques in an indexed S1 journal, typeset with precision LaTeX formatting.',
    longDescription: 'Conducted rigorous literature synthesis and comparative experimental analysis on chemical vapor deposition and nanoscale structural characteristics. Formatted, mathematically formulated, and produced print-ready scientific publication materials using LaTeX.',
    tags: ['LaTeX', 'Nanotechnology', 'S1 Journal', 'Scientific Research', 'Data Analysis'],
    image: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=800&q=80',
    fallback: '/project-desktop.png',
    githubUrl: 'https://github.com/albinsunny-git',
    demoUrl: 'https://github.com/albinsunny-git',
    metrics: ['Peer-Reviewed S1 Publication', 'Precision Vector Diagrams', 'Extensive Citation Base']
  },
  {
    id: 3,
    num: '03',
    featured: false,
    title: 'Maze Solver Game',
    type: 'Micro Project',
    role: 'Game & Algorithm Developer',
    timeline: '2024',
    description: 'An interactive, grid-based maze traversal and solver game developed in C and C++ utilizing graph theory, Breadth-First Search (BFS), and Depth-First Search (DFS) algorithms.',
    longDescription: 'Implemented graph data representations and shortest-path pathfinding heuristics in pure C/C++. Built an interactive visual console grid displaying live backtracking steps, cycle detection, and real-time step counters.',
    tags: ['C++', 'C', 'Graph Theory', 'Algorithms', 'BFS/DFS'],
    image: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=800&q=80',
    fallback: '/project-desktop.png',
    githubUrl: 'https://github.com/albinsunny-git',
    demoUrl: 'https://github.com/albinsunny-git',
    metrics: ['Optimal Pathfinding Guarantee', 'Sub-millisecond Search Execution', 'Interactive Level Maps']
  },
  {
    id: 4,
    num: '04',
    featured: false,
    title: 'Bank Management System',
    type: 'Micro Project',
    role: 'Backend Architect',
    timeline: '2024',
    description: 'A console-based object-oriented bank database application in C++ supporting secure account registration, deposits, withdrawals, and persistent ledger file storage.',
    longDescription: 'Utilized pure Object-Oriented Programming (OOP) paradigms — encapsulation, inheritance, polymorphism — with robust file stream serialization (fstream) for crash-resilient persistent record preservation.',
    tags: ['C++', 'OOP', 'File Streams', 'Data Integrity', 'Console App'],
    image: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=800&q=80',
    fallback: '/project-desktop.png',
    githubUrl: 'https://github.com/albinsunny-git',
    demoUrl: 'https://github.com/albinsunny-git',
    metrics: ['Atomic Transaction Recording', 'Zero Memory Leaks', 'Clean OOP Architecture']
  },
  {
    id: 5,
    num: '05',
    featured: false,
    title: 'Bus Booking System',
    type: 'Micro Project',
    role: 'Frontend & UI Developer',
    timeline: '2024',
    description: 'A clean, responsive web application for bus ticket reservations featuring interactive seat map selection, live price computation, and rigorous client-side form validation.',
    longDescription: 'Designed an intuitive passenger reservation user journey with dynamic seat status indicators (available, reserved, selected), automated fare tallying, and booking receipt generation in pure HTML5, CSS3, and modern JavaScript.',
    tags: ['HTML5', 'CSS3', 'JavaScript', 'UI Components', 'Form Validation'],
    image: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    fallback: '/project-dashboard.png',
    githubUrl: 'https://github.com/albinsunny-git',
    demoUrl: 'https://github.com/albinsunny-git',
    metrics: ['Interactive SVG Seat Matrix', 'Mobile Responsive Layout', 'Instant Validation']
  },
  {
    id: 6,
    num: '06',
    featured: false,
    title: 'Car Rental Website Redesign',
    type: 'Micro Project',
    role: 'UI/UX Product Designer',
    timeline: '2024',
    description: 'A modern, high-fidelity UI redesign for an automotive rental service, focusing on streamlined fleet exploration, frictionless date pickers, and luxury editorial aesthetics.',
    longDescription: 'Created a comprehensive design system in Figma encompassing typography hierarchy, micro-states, dark-mode automotive components, and conversion-optimized checkout user flows.',
    tags: ['Figma', 'UI/UX', 'Design System', 'Prototyping', 'Editorial Layout'],
    image: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80',
    fallback: '/project-dashboard.png',
    githubUrl: 'https://github.com/albinsunny-git',
    demoUrl: 'https://github.com/albinsunny-git',
    metrics: ['40% Fewer Friction Points', 'Full Component Design Tokens', 'Figma Interactive Prototype']
  }
];

export default function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Mini Projects', 'Micro Projects'];

  const filteredProjects = useMemo(() => {
    return PROJECTS_DATA.filter((p) => {
      if (activeCategory === 'Mini Projects' && p.type !== 'Mini Project') return false;
      if (activeCategory === 'Micro Projects' && p.type !== 'Micro Project') return false;

      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase();
      return (
        p.title.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      );
    });
  }, [activeCategory, searchQuery]);

  const featuredProject = filteredProjects.find((p) => p.featured) || filteredProjects[0];
  const gridProjects = filteredProjects.filter((p) => p.id !== featuredProject?.id);

  return (
    <section id="projects" className="projects-section-dark">
      <div className="section-ambient-glow section-glow-pink"></div>

      <div className="projects-container">
        
        {/* Section Header */}
        <div className="projects-header-wrap">
          <div className="projects-pre-tag">
            <span className="pre-tag-number">03</span>
            <span className="pre-tag-dash">/</span>
            <span className="pre-tag-label">CURATED WORK</span>
          </div>
          <div className="projects-title-row">
            <h2 className="section-huge-heading">
              SELECTED <span className="text-gradient-pink">PROJECTS</span>
            </h2>
            <p className="projects-subtext">
              A curated collection of full-stack web applications, algorithmic software, published scientific research, and UI/UX case studies.
            </p>
          </div>
        </div>

        {/* Filter and Live Search Controls */}
        <div className="projects-controls-bar">
          {/* Category Tabs */}
          <div className="projects-categories">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                className={`projects-cat-btn ${activeCategory === cat ? 'projects-cat-btn-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Box */}
          <div className="projects-search-wrap">
            <Search size={16} className="projects-search-icon" />
            <input
              type="text"
              placeholder="Search by tech or keyword..."
              className="projects-search-input"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search projects"
            />
            {searchQuery && (
              <button
                type="button"
                className="search-clear-btn"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* =========================================
            FEATURED PROJECT (FULL-WIDTH SHOWCASE)
            ========================================= */}
        {featuredProject && (
          <div className="featured-project-card" onClick={() => setSelectedProject(featuredProject)}>
            <div className="featured-project-inner">
              
              {/* Left Info Column */}
              <div className="featured-info-col">
                <div className="featured-badge-row">
                  <span className="featured-pill-accent">
                    <Sparkles size={13} style={{ display: 'inline', marginRight: '4px' }} />
                    Featured Project
                  </span>
                  <span className="featured-number-tag">{featuredProject.num}</span>
                </div>

                <h3 className="featured-title">{featuredProject.title}</h3>
                <p className="featured-desc">{featuredProject.description}</p>

                {/* Key Metrics / Highlights */}
                {featuredProject.metrics && (
                  <div className="featured-metrics-row">
                    {featuredProject.metrics.map((metric) => (
                      <div key={metric} className="metric-badge">
                        <span className="metric-dot"></span>
                        <span>{metric}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* Tags */}
                <div className="featured-tags-row">
                  {featuredProject.tags.map((tag) => (
                    <span key={tag} className="project-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Action CTA */}
                <div className="featured-cta-row">
                  <button 
                    type="button" 
                    className="featured-view-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedProject(featuredProject);
                    }}
                  >
                    <span>View Case Study</span>
                    <ArrowUpRight size={16} />
                  </button>

                  <a
                    href={featuredProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-code-link"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <GithubIcon size={16} />
                    <span>Source Code</span>
                  </a>
                </div>
              </div>

              {/* Right Media Preview Container */}
              <div className="featured-image-col">
                <div className="featured-image-frame">
                  <img
                    src={featuredProject.image}
                    alt={featuredProject.title}
                    className="featured-image-element"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = featuredProject.fallback;
                    }}
                  />
                  <div className="featured-image-overlay">
                    <div className="featured-hover-pill">
                      <span>Click to Inspect Project</span>
                      <ArrowUpRight size={14} />
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* =========================================
            PROJECTS RESPONSIVE GRID
            ========================================= */}
        {gridProjects.length > 0 && (
          <div className="projects-grid">
            {gridProjects.map((project) => (
              <div
                key={project.id}
                className="project-grid-card"
                onClick={() => setSelectedProject(project)}
              >
                {/* Image Container with Hover Scale */}
                <div className="project-grid-media">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-grid-img"
                    loading="lazy"
                    onError={(e) => {
                      e.target.src = project.fallback;
                    }}
                  />
                  <div className="project-grid-badge">
                    <span>{project.num}</span>
                  </div>
                  <div className="project-grid-type-tag">
                    <span>{project.type}</span>
                  </div>
                  <div className="project-grid-overlay">
                    <span className="project-inspect-btn">
                      <span>Explore</span>
                      <ArrowUpRight size={14} />
                    </span>
                  </div>
                </div>

                {/* Project Meta & Content */}
                <div className="project-grid-content">
                  <h4 className="project-grid-title">{project.title}</h4>
                  <p className="project-grid-desc">{project.description}</p>

                  <div className="project-grid-tags">
                    {project.tags.slice(0, 4).map((tag) => (
                      <span key={tag} className="project-mini-tag">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 4 && (
                      <span className="project-mini-tag-more">+{project.tags.length - 4}</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <div className="projects-empty-state">
            <Layers size={40} className="empty-icon" />
            <h3>No projects found</h3>
            <p>No projects match "{searchQuery}". Try a different keyword or reset filters.</p>
            <button 
              type="button" 
              className="projects-cat-btn projects-cat-btn-active"
              style={{ margin: '1rem auto 0' }}
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('All');
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>

      {/* =========================================
          INTERACTIVE PROJECT DETAILS MODAL
          ========================================= */}
      {selectedProject && (
        <div className="project-modal-backdrop" onClick={() => setSelectedProject(null)}>
          <div className="project-modal-container" onClick={(e) => e.stopPropagation()}>
            
            <button 
              type="button" 
              className="project-modal-close" 
              onClick={() => setSelectedProject(null)}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>

            <div className="project-modal-media">
              <img 
                src={selectedProject.image} 
                alt={selectedProject.title} 
                className="project-modal-img"
                onError={(e) => {
                  e.target.src = selectedProject.fallback;
                }}
              />
              <div className="project-modal-header-overlay">
                <span className="project-modal-tag">{selectedProject.type}</span>
                <span className="project-modal-num">{selectedProject.num}</span>
              </div>
            </div>

            <div className="project-modal-body">
              <div className="modal-title-row">
                <h3 className="project-modal-title">{selectedProject.title}</h3>
                <span className="project-modal-role">{selectedProject.role}</span>
              </div>

              <p className="project-modal-long-desc">
                {selectedProject.longDescription || selectedProject.description}
              </p>

              {selectedProject.metrics && (
                <div className="modal-metrics-block">
                  <h5 className="modal-subheading">Key Highlights &amp; Metrics</h5>
                  <div className="modal-metrics-grid">
                    {selectedProject.metrics.map((m) => (
                      <div key={m} className="modal-metric-card">
                        <Sparkles size={14} className="metric-sparkle" />
                        <span>{m}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="modal-tags-block">
                <h5 className="modal-subheading">Technologies Used</h5>
                <div className="modal-tags-wrap">
                  {selectedProject.tags.map((tag) => (
                    <span key={tag} className="project-tag-pill">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="project-modal-actions">
                <a
                  href={selectedProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-btn-primary"
                >
                  <GithubIcon size={16} />
                  <span>View Repository</span>
                </a>
                <button
                  type="button"
                  className="modal-btn-secondary"
                  onClick={() => setSelectedProject(null)}
                >
                  Close
                </button>
              </div>

            </div>

          </div>
        </div>
      )}

    </section>
  );
}
