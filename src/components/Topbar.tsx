import type { RoomId } from '../data/rooms';
import { ROOMS } from '../data/rooms';

type TopbarProps = {
  activeRoom: RoomId;
  drawerOpen: boolean;
  onGo: (room: RoomId) => void;
  onOpenPartner: () => void;
  onToggleDrawer: () => void;
};

export function Topbar({
  activeRoom,
  drawerOpen,
  onGo,
  onOpenPartner,
  onToggleDrawer,
}: TopbarProps) {
  return (
    <>
      <header className="topbar">
        <div className="topbar-inner">
          <button type="button" className="brand" onClick={() => onGo('home')}>
            <img className="logo-icon" src="/hero-logo.png" alt="" width={34} height={34} />
            <div className="brand-text">
              <div className="name">Soft Queer Wealth</div>
              <div className="tag">Care · Culture · Community</div>
            </div>
          </button>

          <nav
            className={`rooms${drawerOpen ? ' open' : ''}`}
            id="navrooms"
            aria-label="Site rooms"
          >
            {ROOMS.map((room) => (
              <button
                key={room.id}
                type="button"
                data-room={room.id}
                className={activeRoom === room.id ? 'active' : undefined}
                onClick={() => onGo(room.id)}
              >
                {room.label}
              </button>
            ))}
          </nav>

          <div className="topbar-actions">
            <button type="button" className="nav-cta" onClick={onOpenPartner}>
              Partner With Us
            </button>
            <button
              type="button"
              className="menu-toggle"
              aria-label={drawerOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={drawerOpen}
              aria-controls="navrooms"
              onClick={onToggleDrawer}
            >
              ☰
            </button>
          </div>
        </div>
      </header>

      <div
        className={`drawer-overlay${drawerOpen ? ' open' : ''}`}
        onClick={onToggleDrawer}
        aria-hidden={!drawerOpen}
      />
      <button
        type="button"
        className={`drawer-close${drawerOpen ? ' open' : ''}`}
        aria-label="Close menu"
        onClick={onToggleDrawer}
      >
        ✕
      </button>
    </>
  );
}
