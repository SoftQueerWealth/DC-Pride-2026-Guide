import { useCallback, useEffect, useState } from 'react';
import { HomePage } from './components/home/HomePage';
import { MahoganyPages } from './components/mahogany/MahoganyPages';
import { PartnerModal } from './components/PartnerModal';
import { RoomPlaceholder } from './components/RoomPlaceholder';
import { Topbar } from './components/Topbar';
import type { RoomId } from './data/rooms';

const PLACEHOLDER_ROOMS: Exclude<RoomId, 'home' | 'neighborhood'>[] = ['reading', 'about'];

export default function App() {
  const [activeRoom, setActiveRoom] = useState<RoomId>('home');
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [partnerOpen, setPartnerOpen] = useState(false);

  const go = useCallback((room: RoomId) => {
    setActiveRoom(room);
    setDrawerOpen(false);
    window.scrollTo(0, 0);
  }, []);

  const toggleDrawer = useCallback(() => {
    setDrawerOpen((open) => !open);
  }, []);

  useEffect(() => {
    if (!drawerOpen && !partnerOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setDrawerOpen(false);
      setPartnerOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [drawerOpen, partnerOpen]);

  useEffect(() => {
    document.body.style.overflow = drawerOpen || partnerOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen, partnerOpen]);

  return (
    <>
      <Topbar
        activeRoom={activeRoom}
        drawerOpen={drawerOpen}
        onGo={go}
        onOpenPartner={() => setPartnerOpen(true)}
        onToggleDrawer={toggleDrawer}
      />

      {activeRoom === 'home' ? <HomePage onGo={go} /> : null}
      {activeRoom === 'neighborhood' ? <MahoganyPages /> : null}
      {PLACEHOLDER_ROOMS.map((roomId) =>
        activeRoom === roomId ? <RoomPlaceholder key={roomId} roomId={roomId} /> : null,
      )}

      <PartnerModal open={partnerOpen} onClose={() => setPartnerOpen(false)} />
    </>
  );
}
