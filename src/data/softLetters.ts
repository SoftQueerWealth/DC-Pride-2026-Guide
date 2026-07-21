import type { PlaceholderTone } from './home';

export type SoftLetterIssue = {
  number: string;
  eyebrow: string;
  title: string;
  body: string;
  coverLabel: string;
  tone: PlaceholderTone | '';
  comingSoon: boolean;
};

export type Softie = {
  name: string;
  title: string;
  body: string;
  coverLabel: string;
  tone: PlaceholderTone;
};

export type SoftLetterShareCta = {
  title: string;
  body: string;
};

export const SOFT_LETTER_ISSUES: SoftLetterIssue[] = [
  {
    number: '001',
    eyebrow: 'Issue No. 001 · DC · July 2026',
    title: 'STATIC — Queer Trans Fashion Show',
    body: 'Enter the exhibition →',
    coverLabel: 'Issue No. 001',
    tone: 'dark',
    comingSoon: false,
  },
  {
    number: '002',
    eyebrow: 'Issue No. 002 · Coming Soon',
    title: 'To Be Determined',
    body: 'Black Queer Art Gallery',
    coverLabel: 'Issue No. 002 · Coming Soon',
    tone: 'rose',
    comingSoon: true,
  },
];

export const SOFTIE_OF_THE_MONTH: Softie = {
  name: 'Kai V.',
  title: 'Kai V. — Visual Artist, Washington DC',
  body: 'Every month we spotlight a Black queer creative — their work, their story, and how they show up for the community.',
  coverLabel: 'Kai V.',
  tone: 'rose',
};

export const SOFT_LETTER_SHARE_CTAS: SoftLetterShareCta[] = [
  {
    title: 'Submit a Story',
    body: 'Share something you think we should tell.',
  },
  {
    title: 'Pitch an Article',
    body: 'Got a piece in you? We want to read it.',
  },
  {
    title: 'Suggest Coverage',
    body: 'A person, event, or cultural moment we should know about.',
  },
];
