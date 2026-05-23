
import { useState } from 'react';
import { getProject } from '../data/content';

interface ProjectWindowProps {
  projectId: string;
}

export function ProjectWindow({ projectId }: ProjectWindowProps) {
  const project = getProject(projectId);
  const [activeAnchor, setActiveAnchor] = useState<string>('objective');

  if (!project) {
    return <p className="doc-body">FILE NOT FOUND.</p>;
  }

  const handleAnchorClick = (anchorId: string) => {
    setActiveAnchor(anchorId);
    const element = document.getElementById(`section-${anchorId}`);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const sections = project.sections || [
    { id: 'objective', label: 'OBJECTIVE', content: project.summary, type: 'text' },
    { id: 'context-mapping', label: 'CONTEXT MAPPING', content: 'Context and market positioning for this project initiative.', type: 'text' },
    { id: 'timeline-research', label: 'TIMELINE & RESEARCH', content: 'Research timeline and exploration methodology.', type: 'text' },
    { id: 'primary-research', label: 'PRIMARY RESEARCH', content: 'Direct user research and discovery findings.', type: 'text' },
    { id: 'secondary-research', label: 'SECONDARY RESEARCH', content: 'Industry analysis and competitive landscape insights.', type: 'text' },
    { id: 'narrowing-outputs', label: 'NARROWING OUTPUTS', content: 'Design iterations and refinement process.', type: 'text' },
  ];

  return (
    <article className="case-study">
      <div className="case-study__guides" aria-hidden>
        <span className="case-study__margin-left">REV_4.0</span>
        <span className="case-study__margin-right">ID: {project.id.toUpperCase()}</span>
      </div>

      <header className="case-study__header">
        <p>PROJECT: {project.title}</p>
        <p>SUBJECT: {project.subtitle}</p>
        <p>DATE: {project.year}</p>
        <p>ROLE: {project.role}</p>
      </header>

      <hr className="case-study__rule" />

      <nav className="case-study__anchors">
        {sections.map((section) => (
          <button
            key={section.id}
            className={`filter-chip ${activeAnchor === section.id ? 'filter-chip--active' : ''}`}
            onClick={() => handleAnchorClick(section.id)}
          >
            {section.label}
          </button>
        ))}
      </nav>

      <div
        className="case-study__hero"
        style={{ backgroundImage: `url(${project.image})` }}
      />

      {sections.map((section) => (
        <section key={section.id} id={`section-${section.id}`} className="case-study__section">
          <h2 className="case-study__label">{section.label}</h2>
          {section.type === 'text' && (
            <p className="doc-body">{section.content}</p>
          )}
          {section.type === 'list' && Array.isArray(section.content) && (
            <ul className="doc-list">
              {section.content.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}
          {section.type === 'numbered-list' && Array.isArray(section.content) && (
            <ol className="doc-list doc-list--numbered">
              {section.content.map((item, i) => (
                <li key={i}>{i + 1}. {item}</li>
              ))}
            </ol>
          )}
          {section.type === 'image' && section.image && (
            <img src={section.image} alt={section.label} className="case-study__inline-image" />
          )}
          {section.type === 'embed' && section.embedUrl && (
            <div className="case-study__embed">
              <iframe
                src={section.embedUrl}
                title={section.label}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </section>
      ))}

      <section className="case-study__section">
        <h2 className="case-study__label">TOOLS</h2>
        <ul className="doc-list">
          {project.tools.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </section>

      <section className="case-study__section">
        <h2 className="case-study__label">OUTCOMES</h2>
        <ol className="doc-list doc-list--numbered">
          {project.outcomes.map((o, i) => (
            <li key={o}>
              {i + 1}. {o}
            </li>
          ))}
        </ol>
      </section>
    </article>
  );
}

