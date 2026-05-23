import {
  ABOUT_DISCIPLINES,
  ABOUT_PHOTO,
  ABOUT_PROFILE,
  ABOUT_RESUME,
} from '../data/about';

interface AboutContentProps {
  compact?: boolean;
}

export function AboutContent({ compact = false }: AboutContentProps) {
  return (
    <article
      className={`case-study about-doc ${compact ? 'about-doc--compact' : ''}`}
    >
      <div className="case-study__guides" aria-hidden>
        <span className="case-study__margin-left">OPERATOR</span>
        <span className="case-study__margin-right">PK-OS v1.0</span>
      </div>

      <div
        className="about-doc__photo"
        style={{ backgroundImage: `url(${ABOUT_PHOTO})` }}
        role="img"
        aria-label="Portrait of Pallavi Kiragi"
      />

      <header className="case-study__header">
        <p>SUBJECT: {ABOUT_PROFILE.name}</p>
        <p>ROLE: {ABOUT_PROFILE.role}</p>
        <p>STATUS: {ABOUT_PROFILE.status}</p>
      </header>

      <hr className="case-study__rule" />

      <section className="case-study__section">
        <h2 className="case-study__label">PROFILE</h2>
        <p className="doc-body">{ABOUT_PROFILE.summary}</p>
      </section>

      <section className="case-study__section">
        <h2 className="case-study__label">EXPERIENCE</h2>
        <ul className="about-resume-list">
          {ABOUT_RESUME.experience
            .slice(0, compact ? 2 : undefined)
            .map((job) => (
              <li key={job.org} className="about-resume-list__item">
                <p className="about-resume-list__head">
                  <strong>{job.role}</strong> — {job.org}
                </p>
                <p className="about-resume-list__meta">{job.period}</p>
                <p className="about-resume-list__detail">{job.detail}</p>
              </li>
            ))}
        </ul>
      </section>

      {!compact && (
        <section className="case-study__section">
          <h2 className="case-study__label">EDUCATION</h2>
          <ul className="about-resume-list">
            {ABOUT_RESUME.education.map((edu) => (
              <li key={edu.degree} className="about-resume-list__item">
                <p className="about-resume-list__head">
                  <strong>{edu.degree}</strong>
                </p>
                <p className="about-resume-list__meta">
                  {edu.school} · {edu.year}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="case-study__section">
        <h2 className="case-study__label">SKILLS</h2>
        <ul className="doc-list">
          {ABOUT_RESUME.skills.map((skill) => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      </section>

      <section className="case-study__section">
        <h2 className="case-study__label">DISCIPLINES</h2>
        <ol className="doc-list doc-list--numbered">
          {ABOUT_DISCIPLINES.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ol>
      </section>

      <section className="case-study__section">
        <h2 className="case-study__label">CONTACT</h2>
        <p className="doc-body">
          EMAIL: {ABOUT_RESUME.contact.email}
          <br />
          NETWORK: {ABOUT_RESUME.contact.links}
        </p>
      </section>
    </article>
  );
}
