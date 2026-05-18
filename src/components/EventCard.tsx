import { Check, Clock, Lightbulb, MapPin } from 'lucide-react';
import type { PrideEvent } from '../types/event';
import { trackClick } from '../lib/analytics';
import { badgeClassForLabel } from '../lib/badgeClass';
import { parseDiscountDisplay, shouldHideDiscountCode } from '../lib/parseDiscountDisplay';
import { isMappableLocation, mapsSearchUrl } from '../lib/maps';

interface EventCardProps {
  event: PrideEvent;
  visible: boolean;
  going?: boolean;
  onToggleGoing?: () => void;
}

export function EventCard({ event, visible, going = false, onToggleGoing }: EventCardProps) {
  const mapsHref = isMappableLocation(event.location) ? mapsSearchUrl(event.location) : null;
  const discountParsed =
    event.discountCode && !shouldHideDiscountCode(event.discountCode)
      ? parseDiscountDisplay(event.discountCode)
      : null;

  return (
    <div
      className={`event-card ${event.cardClass}${visible ? '' : ' filtered-out'}${going ? ' event-card--going' : ''}`}
      data-event-id={event.id}
    >
      {onToggleGoing ? (
        <button
          type="button"
          className={`event-going-toggle${going ? ' active' : ''}`}
          aria-pressed={going}
          aria-label={going ? 'Remove from your itinerary' : 'Add to your itinerary'}
          title={going ? 'Remove from your itinerary' : 'Add to your itinerary'}
          onClick={onToggleGoing}
        >
          <Check size={14} strokeWidth={2.5} aria-hidden />
        </button>
      ) : null}
      <div className="event-info">
        {going ? <span className="event-itinerary-badge">In your itinerary</span> : null}
        <div className="event-badges">
          {event.badges.map((b) => (
            <span key={b} className={`badge ${badgeClassForLabel(b)}`}>
              {b}
            </span>
          ))}
        </div>
        <div className="event-name">{event.name}</div>
        {event.organizer ? <div className="event-organizer">{event.organizer}</div> : null}
        <div className="event-meta">
          <span className="meta-pill">
            <Clock size={10} strokeWidth={2} aria-hidden />
            {event.time}
          </span>
          <span className="meta-pill">
            <MapPin size={10} strokeWidth={2} aria-hidden />
            {mapsHref ? (
              <a
                href={mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="meta-pill-maplink"
                onClick={() => trackClick(event.name, 'Open in Maps')}
              >
                {event.location}
              </a>
            ) : (
              event.location
            )}
          </span>
        </div>
        <div className="event-vibes">
          {event.vibeTags.map((v) => (
            <span key={v} className="vibes-tag">
              {v}
            </span>
          ))}
        </div>
      </div>
      <div className="event-action">
        <a
          href={event.ctaHref}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn ${event.ctaButtonClass}`}
          onClick={() => trackClick(event.name, event.ctaLabel)}
        >
          {event.ctaLabel} →
        </a>
        {discountParsed ? (
          <div className="discount-code" role="note">
            {discountParsed.kind === 'code' ? (
              <span className="discount-code-row-inner">
                <span className="discount-code-emoji" aria-hidden>
                  🏷️
                </span>
                <span className="discount-code-label">Code:</span>
                <span className="discount-code-value">{discountParsed.code}</span>
                {discountParsed.expiresSuffix ? (
                  <span className="discount-code-expires">{discountParsed.expiresSuffix}</span>
                ) : null}
              </span>
            ) : (
              <span className="discount-code-row-inner discount-code-row-inner--tip">
                <Lightbulb className="discount-code-tip-icon" size={11} strokeWidth={2} aria-hidden />
                <span className="discount-code-tip-text">{discountParsed.text}</span>
              </span>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
}
