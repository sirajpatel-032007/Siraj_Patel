import './Skills.css';

export default function Skills() {
  const skillCategories = [
    {
      title: 'Programming Languages',
      skills: [
        { name: 'C', level: 'Intermediate' },
        { name: 'C++', level: 'Intermediate' },
        { name: 'Java', level: 'Intermediate' },
        { name: 'Python', level: 'Advanced' },
        { name: 'SQL', level: 'Advanced' },
        { name: 'DSA', level: 'Advanced' }
      ]
    },
    {
      title: 'Web Development',
      skills: [
        { name: 'HTML5 / CSS3', level: 'Advanced' },
        { name: 'React.js', level: 'Advanced' },
        { name: 'Node.js', level: 'Intermediate' },
        { name: 'Express.js', level: 'Intermediate' },
        { name: 'MongoDB', level: 'Intermediate' },
        { name: 'MERN Stack', level: 'Advanced' }
      ]
    },
    {
      title: 'AI & Automation',
      skills: [
        { name: 'AI Agents', level: 'Advanced' },
        { name: 'Gemini API', level: 'Advanced' },
        { name: 'Process Automation', level: 'Advanced' },
        { name: 'Browser Automation', level: 'Advanced' },
        { name: 'Git & GitHub', level: 'Advanced' }
      ]
    }
  ];

  return (
    <section id="skills" className="skills-section scroll-container">
      <div className="section-header">
        <h2>Technical <span className="gradient-text">Skills</span></h2>
        <p>A compilation of tools, languages, and frameworks I work with to construct solutions.</p>
      </div>

      <div className="skills-grid">
        {skillCategories.map((category, idx) => (
          <div key={idx} className="skills-card glass-panel">
            <div className="card-header">
              <div className="terminal-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
              <h3 className="category-title">{category.title}</h3>
            </div>
            
            <div className="skills-list">
              {category.skills.map((skill, sIdx) => (
                <div key={sIdx} className="skill-badge">
                  <span className="skill-name">{skill.name}</span>
                  <span className="skill-level">{skill.level}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
