import './Experience.css';

export default function Experience() {
  const experiences = [
    {
      role: 'Co-Founder',
      company: 'Autocept',
      period: '2026',
      description: 'Co-founded Autocept, a software startup specializing in building state-of-the-art web applications integrated with process automation and agentic AI systems.',
      achievements: [
        'Co-developed automation workflows and integrated them with web app backends.',
        'Built modern, responsive client portals with custom styling and controls.',
        'Collaborated on system design, database configurations, and deployment strategies.'
      ]
    },
    {
      role: 'Hackathon Participant & AI Developer',
      company: 'SIH, Impacthon, Odoo & AI Projects',
      period: '2025',
      description: 'Engaged in competitive hackathons and built conversational AI agents. Rapidly prototyped products, configured backend architectures, and worked in high-pressure team setups.',
      achievements: [
        'Built a Neural AI Chatbox using the Gemini API that drafts dynamic LinkedIn insights.',
        'Participated in the Smart India Hackathon (SIH), designing disaster alert architectures.',
        'Collaborated in college Impacthon to build functional systems for social issues.',
        'Contributed to local Odoo sprints, customizing Kanban pipelines and database print views.'
      ]
    }
  ];

  return (
    <section id="experience" className="experience-section scroll-container">
      <div className="section-header">
        <h2>Professional <span className="gradient-text">Journey</span></h2>
        <p>A timeline of my work experience, startup creation, and hackathon involvements.</p>
      </div>

      <div className="timeline">
        {experiences.map((exp, idx) => (
          <div key={idx} className="timeline-item">
            <div className="timeline-dot"></div>
            <div className="timeline-date">{exp.period}</div>
            
            <div className="timeline-content glass-panel">
              <h3 className="timeline-role">{exp.role}</h3>
              <h4 className="timeline-company">{exp.company}</h4>
              <p className="timeline-desc">{exp.description}</p>
              
              <ul className="timeline-achievements">
                {exp.achievements.map((ach, aIdx) => (
                  <li key={aIdx}>{ach}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
