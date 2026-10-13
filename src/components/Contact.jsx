import { useState } from 'react';
import emailjs from '@emailjs/browser';
import './Contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle'); // idle | sending | success | error

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleWhatsApp = (e) => {
    e.preventDefault();
    const defaultMsg = `Hello Siraj, I saw your portfolio and would like to connect!`;
    const userMsg = formData.name && formData.message 
      ? `Hi Vraj, my name is ${formData.name}. ${formData.message}` 
      : defaultMsg;
    const encodedText = encodeURIComponent(userMsg);
    window.open(`https://wa.me/919662202609?text=${encodedText}`, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    setStatus('sending');

    // FormSubmit AJAX API to send real emails to sirajpatel032007@gmail.com
    fetch("https://formsubmit.co/ajax/sirajpatel032007@gmail.com", {
      method: "POST",
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        Name: formData.name,
        Email: formData.email,
        Message: formData.message,
        _subject: `New Portfolio Message from ${formData.name}`
      })
    })
    .then((res) => {
      if (res.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setStatus('error');
        setTimeout(() => setStatus('idle'), 4000);
      }
    })
    .catch((err) => {
      console.error('Email submission error:', err);
      setStatus('error');
      setTimeout(() => setStatus('idle'), 4000);
    });
  };

  return (
    <section id="contact" className="contact-section scroll-container">
      <div className="section-header">
        <h2>Get In <span className="gradient-text">Touch</span></h2>
        <p>Feel free to reach out for collaborations, startup discussions, or job opportunities.</p>
      </div>

      <div className="contact-grid">
        <div className="contact-info glass-panel">
          <h3 className="info-title">Let's build something great</h3>
          <p className="info-desc">
            Have a project idea, want to discuss process automation, or need to hire a developer? Get in touch via email, social links, or directly on WhatsApp.
          </p>

          <div className="info-details">
            <div className="info-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              <div>
                <h4>Email</h4>
                <a href="mailto:sirajpatel032007@gmail.com">sirajpatel032007@gmail.com</a>
              </div>
            </div>

            <div className="info-item">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <div>
                <h4>Phone & WhatsApp</h4>
                <a href="tel:+919662202609">+91 9662202609</a>
              </div>
            </div>
          </div>

          <div className="social-links">
            <a href="https://github.com/sirajpatel032007-ai" target="_blank" rel="noreferrer" aria-label="GitHub">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
              </svg>
            </a>
            <a href="https://www.linkedin.com/in/siraj-patel-461748374/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                <rect x="2" y="9" width="4" height="12"></rect>
                <circle cx="4" cy="4" r="2"></circle>
              </svg>
            </a>
          </div>

          <button onClick={handleWhatsApp} className="btn-glow whatsapp-btn">
            Chat on WhatsApp
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="contact-form glass-panel">
          <div className="form-group">
            <label htmlFor="name">Your Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="xyz"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Your Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="xyz@gmail.com"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="message">Your Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Hey Siraj, I'd like to collaborate on..."
              rows="5"
              required
            ></textarea>
          </div>

          <button 
            type="submit" 
            className="btn-glow submit-btn"
            disabled={status === 'sending'}
          >
            {status === 'sending' ? (
              <span className="spinner"></span>
            ) : status === 'success' ? (
              'Message Sent!'
            ) : status === 'error' ? (
              'Failed. Try again'
            ) : (
              'Send Message'
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
