import './Projects.css';

export default function Projects() {
  const projects = [
    {
      title: 'Neural AI Chatbox',
      description: 'An AI-powered conversational agent using the Gemini API. Integrates custom web-scraping to extract LinkedIn profile bios and map real-time personalized response drafting.',
      tags: ['Gemini API', 'React', 'Node.js', 'Web Scraping'],
      links: {
        github: 'https://github.com/sirajpatel-032007-ai',
        demo: '#'
      }
    },
    {
      title: 'University Software System',
      description: 'A comprehensive academic portal for college management, featuring role-based dashboards, grades entry pipelines, course registrations, and automated PDF report compilation.',
      tags: ['MongoDB', 'Express.js', 'React', 'Node.js'],
      links: {
        github: 'https://github.com/sirajpatel-032007-ai',
        demo: '#'
      }
    },
    {
      title: 'Disaster Management System',
      description: 'An emergency response coordination hub connecting regional relief teams. Provides real-time resource mapping, crisis report queues, and live SOS alert distribution.',
      tags: ['Full Stack', 'Socket.io', 'Node.js', 'SQL'],
      links: {
        github: 'https://github.com/sirajpatel-032007-ai',
        demo: '#'
      }
    },
    {
      title: 'Autocept Automation Core',
      description: 'The core codebase repository for Autocept startups. Drives automated client lead qualification, pipeline updates, and dynamic web app deployments using agentic workflows.',
      tags: ['AI Agents', 'Vite React', 'Workflow Automation', 'API integration'],
      links: {
        github: 'https://github.com/sirajpatel-032007-ai',
        demo: 'https://www.linkedin.com/company/autocept'
      }
    }
  ];

  return (
    <section id="projects" className="projects-section scroll-container">
      <div className="section-header">
        <h2>Featured <span className="gradient-text">Projects</span></h2>
        <p>A selection of projects that showcase my problem-solving ability and technical proficiency.</p>
      </div>

      <div className="projects-grid">
        {projects.map((project, idx) => (
          <div key={idx} className="project-card glass-panel">
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
              <p className="project-desc">{project.description}</p>
              <div className="project-tags">
                {project.tags.map((tag, tIdx) => (
                  <span key={tIdx} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
            
            <div className="project-actions">
              <a 
                href={project.links.github} 
                target="_blank" 
                rel="noreferrer" 
                className="project-link"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                </svg>
                Source
              </a>
              <a 
                href={project.links.demo} 
                target="_blank" 
                rel="noreferrer" 
                className="project-link demo"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                  <polyline points="15 3 21 3 21 9"></polyline>
                  <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
                {project.title.includes('Autocept') ? 'Website' : 'Live Demo'}
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
