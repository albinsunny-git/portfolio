import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

export default function ProjectsView() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Mini Projects', 'Micro Projects'];

  const projectsData = [
    {
      id: 1,
      title: 'Financial Management System',
      type: 'Mini Project',
      description: 'A comprehensive financial management site and mobile app enabling automated generation of balance sheets and financial statements using voucher entries.',
      tags: ['Flutter', 'HTML5', 'PHP', 'JavaScript', 'CSS3'],
      image: '/project-dashboard.png',
      fallback: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 2,
      title: 'Nanotechnology Research Paper',
      type: 'Micro Project',
      description: 'Authored and published a scientific research paper in the field of Nanotechnology in an S1 journal, formatted and typeset using LaTeX.',
      tags: ['LaTeX', 'Nanotechnology', 'S1 Journal', 'Research'],
      image: '/project-desktop.png',
      fallback: 'https://images.unsplash.com/photo-1507668077129-56e32842fceb?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 3,
      title: 'Maze Solver Game',
      type: 'Micro Project',
      description: 'An interactive grid-based maze traversal and solver game developed in C and C++ utilizing graphical structures.',
      tags: ['C++', 'C', 'Algorithms', 'GameDev'],
      image: '/project-desktop.png',
      fallback: 'https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 4,
      title: 'Bank Management System',
      type: 'Micro Project',
      description: 'A console-based object-oriented bank database application in C++ supporting account creation, deposits, withdrawals, and persistent ledger storage.',
      tags: ['C++', 'OOP', 'Console App'],
      image: '/project-desktop.png',
      fallback: 'https://images.unsplash.com/photo-1501167786227-4cba60f6d58f?auto=format&fit=crop&w=600&q=80'
    },
    {
      id: 5,
      title: 'Bus Booking System',
      type: 'Micro Project',
      description: 'A clean, responsive web application for bus ticket reservations featuring seat selection, live price calculations, and input forms validation.',
      tags: ['HTML5', 'CSS3', 'JavaScript'],
      image: '/project-dashboard.png',
      fallback: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=600&q=80'
    }
  ];



  // Live filter and search logic
  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // 1. Filter by category
      if (activeCategory === 'Mini Projects' && project.type !== 'Mini Project') {
        return false;
      }
      if (activeCategory === 'Micro Projects' && project.type !== 'Micro Project') {
        return false;
      }
      
      // 2. Filter by search query
      if (searchQuery.trim() === '') return true;
      const query = searchQuery.toLowerCase();
      const matchesTitle = project.title.toLowerCase().includes(query);
      const matchesDesc = project.description.toLowerCase().includes(query);
      const matchesTag = project.tags.some(tag => tag.toLowerCase().includes(query));
      
      return matchesTitle || matchesDesc || matchesTag;
    });
  }, [searchQuery, activeCategory]);



  return (
    <div className="projects-view">
      
      {/* Search Header */}
      <div className="search-container">
        <Search className="search-icon" />
        <input
          type="text"
          placeholder="Search projects..."
          className="search-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Category Pills */}
      <div className="filters-wrapper">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`filter-pill ${activeCategory === cat ? 'filter-pill-active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid of Projects */}
      {filteredProjects.length > 0 ? (
        <div className="grid-container">
          {filteredProjects.map((project) => (
            <div key={project.id} className="featured-card" style={{ display: 'flex', flexDirection: 'column' }}>
              <div className="card-img-container">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="card-img"
                  onError={(e) => {
                    e.target.src = project.fallback;
                  }}
                />
                <span className="card-floating-badge">{project.type}</span>
              </div>
              <div className="card-content" style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
                <h3 className="card-title">{project.title}</h3>
                <p className="card-desc" style={{ flex: 1 }}>{project.description}</p>
                <div className="card-tags">
                  {project.tags.map((tag) => (
                    <span key={tag} className="badge-tag">{tag}</span>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '3rem 1rem', color: 'var(--text-light)' }}>
          <p>No projects match your search criteria. Try a different query!</p>
        </div>
      )}

    </div>
  );
}
