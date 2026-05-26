import { useState } from 'react';
import { getProject } from '../data/content';

interface ProjectWindowProps {
  projectId: string;
}

export function ProjectWindow({ projectId }: ProjectWindowProps) {
  const project = getProject(projectId);
  const [activeAnchor, setActiveAnchor] = useState<string>('overview');

  if (!project) {
    return <p className="doc-body">FILE NOT FOUND.</p>;
  }

  const handleAnchorClick = (anchorId: string) => {
    setActiveAnchor(anchorId);
    const element = document.getElementById(`section-${anchorId}`);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const overviewFields = [
    { label: 'PROJECT', value: project.title },
    { label: 'ROLE', value: project.role },
    { label: 'TIMELINE', value: project.year },
    { label: 'TOOLS', value: project.tools.join(' · ') },
    { label: 'SCOPE', value: 'Interaction · Systems · Strategy' },
  ];

  const standardAnchors = [
    { id: 'overview', label: 'Overview' },
    { id: 'context', label: 'Context' },
    { id: 'research', label: 'Research' },
    { id: 'insights', label: 'Insights' },
    { id: 'strategy', label: 'Strategy' },
    { id: 'experience-design', label: 'Experience Design' },
    { id: 'outcomes', label: 'Outcomes' },
    { id: 'validation', label: 'Validation' },
    { id: 'reflection', label: 'Reflection' },
  ];

  const restSections = [
    { id: 'research', label: 'RESEARCH', content: 'Methodology and research process.' },
    { id: 'insights', label: 'INSIGHTS', content: 'Synthesis of findings and narrowing outputs.' },
    { id: 'strategy', label: 'STRATEGY', content: 'Design principles and experience model.' },
    { id: 'experience-design', label: 'EXPERIENCE DESIGN', content: 'Flows, wireframes, and interaction design.' },
    { id: 'outcomes', label: 'OUTCOMES', content: 'Final experience and impact.' },
    { id: 'validation', label: 'VALIDATION', content: 'Testing, feedback, and learnings.' },
    { id: 'reflection', label: 'REFLECTION', content: 'Limitations and future opportunities.' },
  ];

  return (
    <article className="case-study">
      <div className="case-study__guides" aria-hidden>
        <span className="case-study__margin-left">REV_8.0</span>
        <span className="case-study__margin-right">ID: {project.id.toUpperCase()}</span>
      </div>

      <header className="case-study__header">
        <p>CASE STUDY: {project.title.toUpperCase()}</p>
        <p>IDENTIFIER: {project.id.toUpperCase()}</p>
      </header>

      <hr className="case-study__rule" />

      <div
        className="case-study__hero"
        style={{ backgroundImage: `url(${project.image})` }}
      />

      <nav className="case-study__anchors">
        {standardAnchors.map((anchor) => (
          <button
            key={anchor.id}
            className={`filter-chip ${activeAnchor === anchor.id ? 'filter-chip--active' : ''}`}
            onClick={() => handleAnchorClick(anchor.id)}
          >
            {anchor.label}
          </button>
        ))}
      </nav>

      <div className="case-study__top-grid">
        <section id="section-overview" className="case-study__mini-section">
          <h2 className="case-study__label">OVERVIEW</h2>
          <div className="case-study__metadata-list">
            {overviewFields.map((field) => (
              <div key={field.label} className="metadata-item">
                <span className="metadata-item__label">{field.label}:</span>
                <span className="metadata-item__value">{field.value}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="section-context" className="case-study__mini-section">
          <h2 className="case-study__label">CONTEXT</h2>
          <div className="case-study__content">
            <p className="doc-body">{project.summary}</p>
            <p className="doc-body--muted">Problem mapping · Business landscape · Strategic positioning.</p>
          </div>
        </section>
      </div>

      <div className="case-study__sample-area">
        <div className="sample-placeholder">
          <div className="sample-placeholder__graphic" />
          <span className="sample-placeholder__label">[ SAMPLE_ASSET_01.PNG ]</span>
        </div>
      </div>

      <div className="case-study__main-content">
        {restSections.map((section) => (
          <section key={section.id} id={`section-${section.id}`} className="case-study__section">
            <h2 className="case-study__label">{section.label}</h2>
            <div className="case-study__content">
              <p className="doc-body">{section.content}</p>
              <div className="sample-placeholder sample-placeholder--inline">
                <div className="sample-placeholder__graphic" />
              </div>
            </div>
          </section>
        ))}
      </div>
    </article>
  );
}
