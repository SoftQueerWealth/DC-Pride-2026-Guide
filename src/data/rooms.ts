export type RoomId = 'home' | 'neighborhood' | 'reading' | 'about';

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
