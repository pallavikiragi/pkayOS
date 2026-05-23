import type { CaseStudySection } from '../../types';

export const ORANGE_BUSINESS_CONTENT: CaseStudySection[] = [
  {
    id: 'objective',
    label: 'OBJECTIVE',
    type: 'text',
    content: 'To design a unified enterprise portal for B2B telecom customers, simplifying complex service management and billing workflows.',
  },
  {
    id: 'context-mapping',
    label: 'CONTEXT MAPPING',
    type: 'text',
    content: 'Orange Business serves thousands of global enterprises. The existing fragmented landscape led to high support costs and user frustration.',
  },
  {
    id: 'timeline-research',
    label: 'TIMELINE & RESEARCH',
    type: 'list',
    content: [
      'Discovery: Stakeholder interviews and current-state audit (4 weeks)',
      'Design: Iterative prototyping and testing (8 weeks)',
      'Refinement: High-fidelity specs and handoff (4 weeks)',
    ],
  },
  {
    id: 'outcomes',
    label: 'GOAL',
    type: 'text',
    content: 'A cohesive, scalable dashboard that empowers enterprise admins to manage their global connectivity from a single pane of glass.',
  },
];
