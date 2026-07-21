export type RoomId =
  | 'home'
  | 'neighborhood'
  | 'reading'
  | 'gallery'
  | 'community'
  | 'about';

export type RoomDef = {
  id: RoomId;
  label: string;
  placeholderTitle: string;
  placeholderBody: string;
};

export const ROOMS: RoomDef[] = [
  {
    id: 'home',
    label: 'Home',
    placeholderTitle: 'Home',
    placeholderBody: '',
  },
  {
    id: 'neighborhood',
    label: 'The Mahogany Pages',
    placeholderTitle: 'The Mahogany Pages',
    placeholderBody:
      'Weekend guides, vibes, and itineraries — coming next. This room will hold the event guides you know and love.',
  },
  {
    id: 'reading',
    label: 'Soft Letters',
    placeholderTitle: 'Soft Letters',
    placeholderBody:
      'Issues, exhibitions, and Softies of the Month — coming soon. The Soft Letter is where we tell our stories.',
  },
  {
    id: 'gallery',
    label: 'Archives',
    placeholderTitle: 'Archives',
    placeholderBody:
      'Past issues, albums, and cultural memory — coming soon. A place to revisit what we\'ve built together.',
  },
  {
    id: 'community',
    label: 'Community Perks',
    placeholderTitle: 'Community Perks',
    placeholderBody:
      'Discounts and hookups from Black & queer-owned businesses — coming soon. Your community headliners live here.',
  },
  {
    id: 'about',
    label: 'About Us',
    placeholderTitle: 'About Us',
    placeholderBody:
      'Who we are, how we grow, and how to work with us — coming soon. Softness is resistance. Joy is revolutionary.',
  },
];

export function roomById(id: RoomId): RoomDef {
  const room = ROOMS.find((r) => r.id === id);
  if (!room) throw new Error(`Unknown room: ${id}`);
  return room;
}
