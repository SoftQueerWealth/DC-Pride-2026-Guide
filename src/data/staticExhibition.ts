import type { PlaceholderTone } from './home';
import type { RoomId } from './rooms';

export type ExhibitionStepKey =
  | 'welcome'
  | 'curator'
  | 'room1'
  | 'room2'
  | 'room3'
  | 'gallery'
  | 'archive'
  | 'continue';

export type ExhibitionStep = {
  key: ExhibitionStepKey;
  label: string;
  sub: string;
};

export type Contributor = {
  name: string;
  role: string;
  room: 'room1' | 'room2' | 'room3';
  roomLabel: string;
  bio: string;
  teaser: string;
};

export type RoomGroup = {
  title: string;
  subtitle: string;
  intro: string;
  quote: string;
  contributors: string[];
};

export type ContinueCard = {
  icon: string;
  title: string;
  body: string;
  action: 'softies' | 'room';
  room?: RoomId;
};

export const STATIC_ISSUE_META = {
  eyebrow: 'The Soft Letter · Issue No. 001 · DC · July 2026',
  title: 'STATIC — Queer Trans Fashion Show',
};

export const EXHIBITION_STEPS: ExhibitionStep[] = [
  { key: 'welcome', label: 'Welcome', sub: 'Exhibition Overview' },
  { key: 'curator', label: "Curator's Letter", sub: "Bri's Reflection" },
  { key: 'room1', label: 'Room One', sub: 'The Architects' },
  { key: 'room2', label: 'Room Two', sub: 'The Makers' },
  { key: 'room3', label: 'Room Three', sub: 'The Faces' },
  { key: 'gallery', label: 'Gallery', sub: 'Visual Storytelling' },
  { key: 'archive', label: 'Archive', sub: 'Documenting the Moment' },
  { key: 'continue', label: 'Continue Exploring', sub: 'Discover More Stories' },
];

export const CONTRIBUTORS: Record<string, Contributor> = {
  Fi: {
    name: 'Fi',
    role: 'Founder & Creative Director',
    room: 'room1',
    roomLabel: 'Room One',
    bio: 'Fi is a multidisciplinary creative and community organizer centering Black queer art, experiences, and liberation.',
    teaser: '"I wanted a room where nobody had to shrink to fit the theme."',
  },
  Zed: {
    name: 'Zed',
    role: 'Community Strategist',
    room: 'room1',
    roomLabel: 'Room One',
    bio: 'Zed builds the community rituals that hold every SQW gathering together, on and off the page.',
    teaser: 'The one who made sure the front row felt like family, not an audience.',
  },
  Rebattle: {
    name: 'Rebattle',
    role: 'Event Producer',
    room: 'room1',
    roomLabel: 'Room One',
    bio: 'Rebattle produces the live moments — from opening night to the last dance — that give STATIC its pulse.',
    teaser: 'Ran the floor plan, the timing, and somehow the vibe too.',
  },
  'Kai Collective': {
    name: 'Kai Collective',
    role: 'Set & Space Designers',
    room: 'room2',
    roomLabel: 'Room Two',
    bio: 'Kai Collective built every room of STATIC by hand, turning a gallery floor into a walk-through story.',
    teaser: 'Turned an empty gallery into a floor plan you could feel.',
  },
  'A. Brown': {
    name: 'A. Brown',
    role: 'Garment Designer',
    room: 'room2',
    roomLabel: 'Room Two',
    bio: "A. Brown's garments anchor the exhibition's central thesis: softness as armor.",
    teaser: '"Softness can be structural. That was the whole collection."',
  },
  'Studio L.': {
    name: 'Studio L.',
    role: 'Creative Director',
    room: 'room2',
    roomLabel: 'Room Two',
    bio: 'Studio L. shaped the visual language that carries STATIC from cover to closing room.',
    teaser: 'Every visual cue in this issue traces back to one moodboard.',
  },
  Jae: {
    name: 'Jae',
    role: 'Model',
    room: 'room3',
    roomLabel: 'Room Three',
    bio: 'Jae has walked every SQW exhibition since Issue No. 004, and brought that history into STATIC.',
    teaser: 'Four issues in, and the walk still gives chills.',
  },
  Azul: {
    name: 'Azul',
    role: 'Model',
    room: 'room3',
    roomLabel: 'Room Three',
    bio: "Azul's presence in Room Three is the exhibition's quiet center of gravity.",
    teaser: 'The stillest person in the room, and the hardest to look away from.',
  },
  Mali: {
    name: 'Mali',
    role: 'Model',
    room: 'room3',
    roomLabel: 'Room Three',
    bio: 'Mali closes out The Faces with a portrait series shot entirely in natural light.',
    teaser: 'Closed the show with a portrait series shot at golden hour.',
  },
};

export const ROOM_GROUPS: Record<'room1' | 'room2' | 'room3', RoomGroup> = {
  room1: {
    title: 'The Architects',
    subtitle: 'Organizers',
    intro:
      'The people who turned a shared note into a real night — organizers, strategists, and the producer who kept it all on time.',
    quote:
      '"None of this happens without someone willing to do the unglamorous work of holding a room together."',
    contributors: ['Fi', 'Zed', 'Rebattle'],
  },
  room2: {
    title: 'The Makers',
    subtitle: 'Designers',
    intro:
      'The hands that built what the room walked through — set, space, and garments made from scratch in weeks, not months.',
    quote:
      '"We didn\'t sketch pretty pictures. We built things people could actually wear and move in."',
    contributors: ['Kai Collective', 'A. Brown', 'Studio L.'],
  },
  room3: {
    title: 'The Faces',
    subtitle: 'Models',
    intro:
      'The faces who carried the collection down the floor — each one bringing their own history into someone else\'s design.',
    quote:
      '"A garment isn\'t finished until someone makes it theirs for the ninety seconds they wear it."',
    contributors: ['Jae', 'Azul', 'Mali'],
  },
};

export const GALLERY_TONES: PlaceholderTone[] = [
  'dark',
  'rose',
  'sage',
  'dark',
  'rose',
  'sage',
  'dark',
  'rose',
];

export const GALLERY_TABS = ['All', 'Event Day', 'Behind the Scenes', 'Press'] as const;

export const ARCHIVE_CARDS = [
  {
    eyebrow: 'Opening Night',
    title: 'A night of art, music, and community.',
  },
  {
    eyebrow: 'Behind the Scenes',
    title: 'Building the exhibition from the ground up.',
  },
  {
    eyebrow: 'Press & Features',
    title: 'See how others are sharing the story.',
  },
] as const;

export const CONTINUE_CARDS: ContinueCard[] = [
  {
    icon: '💛',
    title: 'Softies of the Month',
    body: 'More Black queer creatives doing the work',
    action: 'softies',
  },
  {
    icon: '🏳️‍🌈',
    title: 'About Soft Queer Wealth',
    body: 'Who we are and how we build together',
    action: 'room',
    room: 'about',
  },
  {
    icon: '🗺️',
    title: 'The Mahogany Pages',
    body: 'Get off your phone — go find community',
    action: 'room',
    room: 'neighborhood',
  },
  {
    icon: '🗃️',
    title: 'Soft Letters',
    body: 'Back to issues, Softies & stories',
    action: 'softies',
  },
];

export const CONTRIBUTOR_TABS = ['About', 'Interview', 'Intake', 'Gallery'] as const;
