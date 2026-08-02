import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Import Components
import ThreeBackground from './components/ThreeBackground';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';

// Styling
import './App.css';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
  useEffect(() => {
    // 3D Scroll Perspective Animation for Panels and Timeline items
    const triggerElements = document.querySelectorAll('.glass-panel, .timeline-item');
    
    triggerElements.forEach((element) => {
      // Set initial state
      gsap.set(element, { 
        perspective: 1000, 
        transformStyle: 'preserve-3d' 
      });

      gsap.fromTo(element,
        { 
          opacity: 0, 
          y: 60, 
          rotateX: -15, 
          scale: 0.95 
        },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          scale: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: element,
            start: 'top 88%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    // Custom fade-in for section headers
    const headers = document.querySelectorAll('.section-header');
    headers.forEach((header) => {
      gsap.fromTo(header,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: header,
            start: 'top 92%',
            toggleActions: 'play none none reverse'
          }
        }
      );
    });

    return () => {
      // Kill all scroll triggers on unmount
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      {/* 3D Liquid Background Canvas */}
      <ThreeBackground />

      {/* Glass Navigation Header */}
      <Header />

      {/* Main Sections Wrapper */}
      <main className="main-wrapper">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="footer-panel">
        <p>&copy; {new Date().getFullYear()} Vraj Patel. All rights reserved.</p>
        <p className="footer-built">Built with React, Three.js & GSAP</p>
      </footer>
    </>
  );
}
