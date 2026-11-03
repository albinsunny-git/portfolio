import React, { useState } from 'react';
import { Send, Mail, MapPin, Check, Copy, ArrowUpRight, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import Contact3D from './Contact3D';

const GithubIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = ({ size = 20 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: 'Web Development',
    message: ''
  });
  const [copied, setCopied] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const emailAddress = 'albinsunny2028@mca.ajce.in';

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailAddress);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);

      // Trigger Confetti Celebration
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8B5CF6', '#EC4899', '#3B82F6', '#10B981']
      });

      // Reset form after delay
      setTimeout(() => {
        setFormData({ name: '', email: '', service: 'Web Development', message: '' });
        setSubmitted(false);
      }, 5000);
    }, 700);
  };

  return (
    <section id="contact" className="contact-section-light">
      <div className="contact-container">
        
        {/* Section Header */}
        <div className="contact-header-wrap">
          <div className="services-pre-tag">
            <span className="pre-tag-number">05</span>
            <span className="pre-tag-dash">/</span>
            <span className="pre-tag-label">INITIATE CONTACT</span>
          </div>
          <h2 className="contact-huge-title">
            LET'S GET IN <span className="text-gradient-purple">TOUCH</span>
          </h2>
          <p className="contact-subtext">
            Have an ambitious project, an internship opportunity, or a creative challenge? Let's connect and build something extraordinary.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="contact-layout-grid">
          
          {/* Left Column: Direct Links & 3D Interactive Canvas */}
          <div className="contact-details-col">
            
            {/* Contact Card */}
            <div className="contact-info-card">
              <h3 className="contact-info-heading">Direct Inquiries</h3>
              <p className="contact-info-desc">
                Feel free to email me directly or connect through my professional developer profiles.
              </p>

              {/* Email Copy Card */}
              <div className="email-copy-box">
                <div className="email-copy-left">
                  <Mail size={18} className="email-icon" />
                  <span className="email-text">{emailAddress}</span>
                </div>
                <button
                  type="button"
                  className="email-copy-btn"
                  onClick={handleCopyEmail}
                  title="Copy email to clipboard"
                >
                  {copied ? <Check size={16} color="#10B981" /> : <Copy size={16} />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              {/* Location Badge */}
              <div className="contact-meta-row">
                <div className="meta-badge">
                  <MapPin size={15} />
                  <span>Kerala, India &bull; Amal Jyothi MCA</span>
                </div>
                <div className="meta-badge">
                  <span className="status-live-dot"></span>
                  <span>Open for Opportunities</span>
                </div>
              </div>

              {/* Social Channels */}
              <div className="contact-social-row">
                <a
                  href="https://github.com/albinsunny-git"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-pill"
                >
                  <GithubIcon size={18} />
                  <span>GitHub</span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href="https://www.linkedin.com/in/albin-sunny-7b0448290"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="contact-social-pill"
                >
                  <LinkedinIcon size={18} />
                  <span>LinkedIn</span>
                  <ArrowUpRight size={14} />
                </a>

                <a
                  href={`mailto:${emailAddress}`}
                  className="contact-social-pill"
                >
                  <Mail size={18} />
                  <span>Direct Mail</span>
                  <ArrowUpRight size={14} />
                </a>
              </div>
            </div>

            {/* 3D Decorative Canvas */}
            <div className="contact-3d-card">
              <div className="contact-3d-banner">
                <Sparkles size={14} className="sparkle-icon" />
                <span>Interactive 3D Accents</span>
              </div>
              <Contact3D />
            </div>

          </div>

          {/* Right Column: Clean Elegant Contact Form */}
          <div className="contact-form-col">
            <div className="contact-form-card">
              <h3 className="form-title">Send a Message</h3>
              <p className="form-subtext">Fill out the form below and I'll respond within 24 hours.</p>

              {submitted ? (
                <div className="form-success-state">
                  <div className="success-icon-wrap">
                    <Check size={32} />
                  </div>
                  <h4>Message Sent Successfully!</h4>
                  <p>Thank you for reaching out. I look forward to reviewing your message and speaking soon.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-actual-form">
                  <div className="form-input-group">
                    <label htmlFor="contact-name" className="form-input-label">Your Name</label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder="e.g. Alex Rivera"
                      className="form-text-input"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    />
                  </div>

                  <div className="form-input-group">
                    <label htmlFor="contact-email" className="form-input-label">Email Address</label>
                    <input
                      id="contact-email"
                      type="email"
                      required
                      placeholder="e.g. alex@example.com"
                      className="form-text-input"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>

                  <div className="form-input-group">
                    <label htmlFor="contact-service" className="form-input-label">Area of Interest</label>
                    <select
                      id="contact-service"
                      className="form-select-input"
                      value={formData.service}
                      onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    >
                      <option value="Web Development">01 — Web Development</option>
                      <option value="UI/UX Design">02 — UI/UX Design</option>
                      <option value="Creative Development">03 — Creative 3D Development</option>
                      <option value="Branding & Visuals">04 — Branding and Visual Design</option>
                      <option value="Internship / Role">05 — Internship / Technical Role</option>
                      <option value="General Inquiries">06 — General Inquiries</option>
                    </select>
                  </div>

                  <div className="form-input-group">
                    <label htmlFor="contact-message" className="form-input-label">Your Message</label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      required
                      placeholder="Tell me about your goals, timelines, or role details..."
                      className="form-textarea-input"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className="contact-submit-btn"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}

