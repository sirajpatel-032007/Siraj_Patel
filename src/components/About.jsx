import './About.css';
import SirajPhoto from '../assets/siraj_photo.jpg';

export default function About() {
  return (
    <section id="about" className="about-section scroll-container">
      <div className="section-header">
        <h2>My <span className="gradient-text">Story</span></h2>
        <p>A glimpse into my journey, passion, and what drives me as a developer.</p>
      </div>

      <div className="about-grid">
        <div className="about-image-container">
          <div className="image-frame glass-panel">
            <img 
              src={SirajPhoto} 
              alt="Siraj Patel" 
              className="about-image" 
              loading="lazy"
            />
            <div className="image-glow"></div>
          </div>
        </div>

        <div className="about-info glass-panel">
          <h3 className="about-subtitle">Computer Engineering Student & Tech Innovator</h3>
          <p className="about-text">
            I am Siraj Patel, a second-year Computer Engineering student. In 2025, my journey has been focused on intense hackathons, including the **Smart India Hackathon (SIH)**, college hackathons like **Impacthon**, and **Odoo** development sprints. These events challenged me to build rapid prototypes and collaborate in high-pressure team environments.
          </p>
          <p className="about-text">
            Currently, I am the **Co-Founder of Autocept**, a startup where we build advanced web applications integrated with powerful process automation and AI agents to streamline complex workflows and automate manual business operations.
          </p>

          <div className="about-highlights">
            <div className="highlight-item">
              <span className="highlight-number">03+</span>
              <span className="highlight-label">Hackathons Completed</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-number">02nd</span>
              <span className="highlight-label">Year CE Student</span>
            </div>
            <div className="highlight-item">
              <span className="highlight-number">01</span>
              <span className="highlight-label">Co-founded Startup</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
