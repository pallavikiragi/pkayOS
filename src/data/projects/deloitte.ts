import type { CaseStudySection } from '../../types';

export const DELOITTE_CONTENT: CaseStudySection[] = [
  {
    id: 'objective',
    label: 'OBJECTIVE',
    type: 'text',
    content: 'To streamline complex data auditing workflows for consulting teams, reducing cognitive load and improving accuracy.',
  },
  {
    id: 'context-mapping',
    label: 'CONTEXT MAPPING',
    type: 'text',
    content: 'Deloitte auditors handle massive datasets across multiple regulatory frameworks. The tools need to be dense but legible.',
  },
  {
    id: 'outcomes',
    label: 'GOAL',
    type: 'numbered-list',
    content: [
      'Standardized data visualization patterns for audit findings.',
      'Accessibility-first design for diverse global teams.',
      'Integration with legacy data pipelines via modern UI layers.',
    ],
  },
];
