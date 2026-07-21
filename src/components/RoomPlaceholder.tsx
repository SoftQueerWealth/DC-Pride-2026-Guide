import { roomById, type RoomId } from '../data/rooms';
import { FOOTER_BAND, FOOTER_COPY } from '../data/home';

type RoomPlaceholderProps = {
  roomId: Exclude<RoomId, 'home'>;
};

export function RoomPlaceholder({ roomId }: RoomPlaceholderProps) {
  const room = roomById(roomId);

  return (
    <section className="screen active" id={`screen-${roomId}`} aria-label={room.label}>
      <div className="wrap">
        <div className="room-placeholder">
          <p className="eyebrow">{room.label}</p>
          <h1>{room.placeholderTitle}</h1>
          <p>{room.placeholderBody}</p>
        </div>
      </div>
      <div className="footer-band">{FOOTER_BAND}</div>
      <div className="site-footer">{FOOTER_COPY}</div>
    </section>
  );
}
