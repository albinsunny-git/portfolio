import React from 'react';
import { Quote, Star, CheckCircle2 } from 'lucide-react';

export default function TestimonialsSection() {
  const testimonials = [
    {
      id: 1,
      name: 'Dr. Neethu Joseph',
      role: 'Associate Professor & Academic Mentor',
      institution: 'Amal Jyothi College of Engineering',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
      quote: 'Albin consistently stands out with his analytical depth and problem-solving dedication. His capacity to conceptualize complex software architectures and deliver production-quality code under deadlines is exceptional.',
      rating: 5,
      highlight: 'Top 5% in Academic Rigor & Full-Stack Projects'
    },
    {
      id: 2,
      name: 'Karthik V. Nair',
      role: 'Hackathon Organizing Lead',
      institution: 'NASA Space Apps Challenge 2025',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
      quote: 'Working with Albin during the NASA Space Apps Challenge was an inspiring experience. He bridged team management with hands-on technical guidance, ensuring all participants had clear technical support.',
      rating: 5,
      highlight: 'Volunteer Leadership Recognition'
    },
    {
      id: 3,
      name: 'Rahul Mathew',
      role: 'Senior Software Engineer & Peer Collaborator',
      institution: 'Open Source Community',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
      quote: 'Albin combines a deep understanding of core computer science fundamentals with an eye for modern UI/UX and 3D web aesthetics. His code is clean, modular, and built to scale effortlessly.',
      rating: 5,
      highlight: 'Exceptional Code Quality & Systems Design'
    }
  ];

  return (
    <section id="testimonials" className="testimonials-section-dark">
      <div className="section-ambient-glow section-glow-purple"></div>

      <div className="testimonials-container">
        
        {/* Section Header */}
        <div className="testimonials-header-wrap">
          <div className="testimonials-pre-tag">
            <span className="pre-tag-number">04</span>
            <span className="pre-tag-dash">/</span>
            <span className="pre-tag-label">ENDORSEMENTS</span>
          </div>
          <div className="testimonials-title-row">
            <h2 className="section-huge-heading">
              CLIENT &amp; MENTOR <span className="text-gradient-purple">TESTIMONIALS</span>
            </h2>
            <p className="testimonials-subtext">
              What collaborators, mentors, and engineering leads say about working with me.
            </p>
          </div>
        </div>

        {/* Testimonial Cards Grid */}
        <div className="testimonials-grid">
          {testimonials.map((item) => (
            <div key={item.id} className="testimonial-card">
              
              {/* Top Row: Quote Icon & Star Ratings */}
              <div className="testimonial-card-top">
                <div className="quote-badge">
                  <Quote size={20} className="quote-icon" />
                </div>
                <div className="star-rating-row">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} size={15} className="star-icon" fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
              </div>

              {/* Quote Body */}
              <p className="testimonial-quote">
                "{item.quote}"
              </p>

              {/* Verified Badge Highlight */}
              <div className="testimonial-highlight-badge">
                <CheckCircle2 size={13} className="check-icon" />
                <span>{item.highlight}</span>
              </div>

              {/* Card Footer: Client Avatar, Name & Role */}
              <div className="testimonial-card-author">
                <img
                  src={item.avatar}
                  alt={item.name}
                  className="author-avatar"
                  loading="lazy"
                  onError={(e) => {
                    e.target.src = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80";
                  }}
                />
                <div className="author-info">
                  <h4 className="author-name">{item.name}</h4>
                  <span className="author-role">{item.role}</span>
                  <span className="author-institution">{item.institution}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

