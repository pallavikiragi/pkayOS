import { getProject } from '../data/content';

interface ProjectWindowProps {
  projectId: string;
}

export function ProjectWindow({ projectId }: ProjectWindowProps) {
  const project = getProject(projectId);
  if (!project) {
    return <p className="doc-body">FILE NOT FOUND.</p>;
  }

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

      <div
        className="case-study__hero"
        style={{ backgroundImage: `url(${project.image})` }}
      />

      <section className="case-study__section">
        <h2 className="case-study__label">GOAL</h2>
        <p className="doc-body">{project.summary}</p>
      </section>

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

      <section className="case-study__section">
        <h2 className="case-study__label">TAGS</h2>
        <div className="case-study__tags">
          {project.tags.map((t) => (
            <span key={t} className="filter-chip filter-chip--static">
              {t}
            </span>
          ))}
        </div>
      </section>
    </article>
  );
}
