import { useState } from 'react';
import {
  ABOUT_DISCIPLINES,
  ABOUT_PROFILE,
  ABOUT_RESUME,
} from '../data/about';
import portrait from '../assets/figma/profile/portrait.png';
import capgeminiFrog from '../assets/figma/profile/capgemini-frog.png';
import immersionX from '../assets/figma/profile/immersionx.png';
import indianMusicMuseum from '../assets/figma/profile/indian-music-museum.png';
import srishti from '../assets/figma/profile/srishti.png';
import emailIcon from '../assets/figma/profile/email.svg';
import matrixAxisX from '../assets/figma/profile/matrix-axis-x.svg';
import matrixAxisY from '../assets/figma/profile/matrix-axis-y.svg';
import { Button } from './Button';

type MatrixFilter = 'soft-skills' | 'hard-skills' | 'disciplines';
type MatrixPoint = {
  label: string;
  x: number;
  y: number;
  category: MatrixFilter;
};

const SKILL_POINTS: MatrixPoint[] = [
  { label: 'Prototyping', x: 59.2, y: 7.8, category: 'hard-skills' },
  { label: 'UX Research', x: 26.2, y: 32.4, category: 'hard-skills' },
  { label: 'Creative Coding', x: 11.8, y: 46.2, category: 'hard-skills' },
  { label: 'Data visualisation', x: 45.8, y: 40.8, category: 'hard-skills' },
  { label: 'Sound Design', x: 44.8, y: 17.6, category: 'hard-skills' },
  { label: 'AI Prototyping', x: 28.4, y: 60, category: 'hard-skills' },
  { label: 'Interaction Design', x: 25.2, y: 5.6, category: 'hard-skills' },
  { label: 'Communication', x: 40.8, y: 75, category: 'soft-skills' },
  { label: 'Collaboration', x: 40.8, y: 13.2, category: 'soft-skills' },
  { label: 'Problem-solving', x: 47.8, y: 36, category: 'soft-skills' },
  { label: 'Facilitation', x: 11.8, y: 42.4, category: 'soft-skills' },
  { label: 'Strategic thinking', x: 16.4, y: 54.8, category: 'soft-skills' },
  { label: 'Adaptability', x: 59.1, y: 51, category: 'soft-skills' },
  { label: 'Leadership', x: 12.6, y: 64.5, category: 'soft-skills' },
  { label: 'Storytelling', x: 27, y: 28.4, category: 'soft-skills' },
];

const DISCIPLINE_POSITIONS = [
  { x: 24, y: 9 },
  { x: 55, y: 24 },
  { x: 18, y: 45 },
  { x: 55, y: 58 },
  { x: 22, y: 76 },
];

const EXPERIENCE_LOGOS = [
  capgeminiFrog,
  immersionX,
  indianMusicMuseum,
];

const FILTER_LABELS: Array<{ id: MatrixFilter; label: string }> = [
  { id: 'soft-skills', label: 'SOFT SKILLS' },
  { id: 'hard-skills', label: 'HARD SKILLS' },
  { id: 'disciplines', label: 'DISCIPLINES' },
];

export function AboutContent({ compact = false }: { compact?: boolean }) {
  const [activeFilter, setActiveFilter] =
    useState<MatrixFilter>('soft-skills');
  const disciplinePoints = ABOUT_DISCIPLINES.map((label, index) => ({
    label,
    category: 'disciplines' as const,
    ...DISCIPLINE_POSITIONS[index],
  }));
  const visiblePoints =
    activeFilter === 'disciplines'
      ? disciplinePoints
      : SKILL_POINTS.filter((point) => point.category === activeFilter);

  return (
    <article className={`about-doc${compact ? ' about-doc--compact' : ''}`}>
      <header className="about-doc__hero">
        <img
          className="about-doc__portrait"
          src={portrait}
          alt={`Portrait of ${ABOUT_PROFILE.name}`}
        />
        <div className="about-doc__identity">
          <h1>{ABOUT_PROFILE.name}</h1>
          <p className="about-doc__role">{ABOUT_PROFILE.role}</p>
          <div className="about-doc__contact">
            <p>Say Hi!</p>
            <a href={`mailto:${ABOUT_RESUME.contact.email}`}>
              <img src={emailIcon} alt="" />
              <span>{ABOUT_RESUME.contact.email}</span>
            </a>
          </div>
        </div>
        <div className="about-doc__introduction">
          <p className="about-doc__statement">
            I design experiences that connect people, technology, and
            environments.
          </p>
          <p className="about-doc__summary">
            My practice spans <strong>enterprise UX, service design,
            interactive systems, accessibility, immersive media</strong>, and
            <strong> sound design</strong>, guided by
            <strong> experimentation and systems thinking.</strong>
          </p>
        </div>
      </header>

      <div className="about-doc__resume">
        <section className="about-doc__section">
          <h2>EXPERIENCE</h2>
          <div className="about-doc__experience-list">
            {ABOUT_RESUME.experience.map((job, index) => (
              <article className="about-doc__experience" key={job.org}>
                <img
                  className="about-doc__experience-logo"
                  src={EXPERIENCE_LOGOS[index]}
                  alt=""
                />
                <div className="about-doc__experience-copy">
                  <p className="about-doc__experience-title">
                    <strong>{job.role}</strong> — {job.org}
                  </p>
                  <p className="about-doc__meta">{job.period}</p>
                  <p className="about-doc__detail">{job.detail}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {!compact && (
          <section className="about-doc__section">
            <h2>EDUCATION</h2>
            <div className="about-doc__education-list">
              {ABOUT_RESUME.education.map((education) => (
                <article
                  className="about-doc__education"
                  key={education.degree}
                >
                  <img src={srishti} alt="" />
                  <div>
                    <p className="about-doc__education-degree">
                      {education.degree}
                    </p>
                    <p className="about-doc__meta">{education.year}</p>
                    <p className="about-doc__meta">
                      {education.school} · {education.year}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}
      </div>

      {!compact && (
        <section className="about-doc__matrix-section">
          <div className="about-doc__matrix">
            <div className="about-matrix__y-axis">
              <img src={matrixAxisY} alt="" />
              <span>Expert</span>
              <span>Beginner</span>
              <strong>Experience</strong>
            </div>
            <div
              className="about-matrix__plot"
              role="group"
              aria-label="Skills matrix"
            >
              <div className="about-matrix__quadrant" />
              <div className="about-matrix__quadrant" />
              <div className="about-matrix__quadrant" />
              <div className="about-matrix__quadrant" />
              {visiblePoints.map((point) => (
                <span
                  className={`about-matrix__point about-matrix__point--${point.category}`}
                  key={`${point.category}-${point.label}`}
                  style={{ left: `${point.x}%`, top: `${point.y}%` }}
                >
                  {point.label}
                </span>
              ))}
            </div>
            <div className="about-matrix__x-axis">
              <img src={matrixAxisX} alt="" />
              <span className="about-matrix__x-start">Exploratory</span>
              <span className="about-matrix__x-end">Specialist</span>
              <strong>Proficiency</strong>
            </div>
          </div>

          <div className="about-doc__matrix-filters">
            <h2>SKILLS &amp; DISCIPLINES</h2>
            <div role="group" aria-label="Filter matrix">
              {FILTER_LABELS.map((filter) => (
                <Button
                  key={filter.id}
                  variant={activeFilter === filter.id ? 'blue' : 'default'}
                  aria-pressed={activeFilter === filter.id}
                  onClick={() => setActiveFilter(filter.id)}
                >
                  {filter.label}
                </Button>
              ))}
            </div>
          </div>
        </section>
      )}
    </article>
  );
}
