import { useState, useEffect } from 'react';
import Hero3DModel from './Hero3DModel';
import './Hero.css';

export default function Hero() {
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [loopNum, setLoopNum] = useState(0);
  const [typingSpeed, setTypingSpeed] = useState(150);

  const words = [
    'Computer Engineering Student',
    'AI Agent Builder',
    'Startup Co-Founder (Autocept)',
    'Hackathon Enthusiast'
  ];

  useEffect(() => {
    let timer;
    const handleType = () => {
      const i = loopNum % words.length;
      const fullWord = words[i];

      if (isDeleting) {
        setText(fullWord.substring(0, text.length - 1));
        setTypingSpeed(50);
      } else {
        setText(fullWord.substring(0, text.length + 1));
        setTypingSpeed(100);
      }

      if (!isDeleting && text === fullWord) {
        timer = setTimeout(() => setIsDeleting(true), 2000);
      } else if (isDeleting && text === '') {
        setIsDeleting(false);
        setLoopNum(loopNum + 1);
        setTypingSpeed(200);
      }
    };

    if (!(isDeleting && text === '')) {
      timer = setTimeout(handleType, typingSpeed);
    } else {
      timer = setTimeout(handleType, 500);
    }

    return () => clearTimeout(timer);
  }, [text, isDeleting, loopNum, typingSpeed]);

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const target = document.getElementById(id);
    if (target) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const targetRect = target.getBoundingClientRect().top;
      const targetPosition = targetRect - bodyRect;
      const offsetPosition = targetPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section id="hero" className="hero-section">
      <div className="hero-grid">
        {/* Left Side: Personal Details */}
        <div className="hero-left-col">
          <div className="badge-container">
            <span className="hero-badge">Available for Projects & Internships</span>
          </div>
          <h1 className="hero-title">
            Hi, I am <span className="gradient-text">Siraj Patel</span>
          </h1>
          <div className="typewriter-container">
            <span className="typewriter-prefix">I am a </span>
            <span className="typewriter-text">{text}</span>
            <span className="typewriter-cursor">|</span>
          </div>
          <p className="hero-description">
            A passionate second-year Computer Engineering student building state-of-the-art web applications with 
            cutting-edge automation and AI agents. Co-founder of <strong>Autocept</strong>.
          </p>
          <div className="hero-ctas">
            <a href="#projects" className="btn-glow" onClick={(e) => scrollToSection(e, 'projects')}>
              View My Work
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
            <a href="#contact" className="btn-glow purple" onClick={(e) => scrollToSection(e, 'contact')}>
              Get In Touch
            </a>
          </div>
        </div>

        {/* Right Side: Interactive 3D Robot Whobee with Speech Cloud */}
        <div className="hero-right-col">
          <div className="hero-3d-model-wrapper">
            <Hero3DModel />
            
            {/* Speech Cloud/Bubble */}
            <div className="speech-cloud">
              <span className="speech-emoji">👋</span>
              <span className="speech-text">hello from Siraj patel </span>
              <div className="speech-arrow"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="scroll-indicator" onClick={(e) => scrollToSection(e, 'about')}>
        <div className="mouse">
          <div className="wheel"></div>
        </div>
        <div className="arrows">
          <span></span>
          <span></span>
        </div>
      </div>
    </section>
  );
}
