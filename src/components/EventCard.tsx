import { Check, Clock, Lightbulb, MapPin } from 'lucide-react';
import type { PrideEvent } from '../types/event';
import { trackClick } from '../lib/analytics';
import { eventCtaButtonClass, eventCtaLabel } from '../lib/eventCta';
import { badgeClassForLabel } from '../lib/badgeClass';
import { parseDiscountDisplay, shouldHideDiscountCode } from '../lib/parseDiscountDisplay';
import { isMappableLocation, mapsSearchUrl, splitLocationParts } from '../lib/maps';

interface EventCardProps {
  event: PrideEvent;
  visible: boolean;
  going?: boolean;
  onToggleGoing?: () => void;
}

function LocationDisplay({
  location,
  mapsHref,
  onMapsClick,
}: {
  location: string;
  mapsHref: string | null;
  onMapsClick?: () => void;
}) {
  const { venue, address } = splitLocationParts(location);
  const linkProps = {
    href: mapsHref!,
    target: '_blank' as const,
    rel: 'noopener noreferrer',
    className: 'meta-pill-maplink',
    onClick: onMapsClick,
  };

  if (!mapsHref) {
    return <span className="meta-pill-location-text">{location}</span>;
  }

  if (venue && address) {
    return (
      <span className="meta-pill-location-text">
        <span className="meta-pill-venue">{venue}</span>
        <span className="meta-pill-sep" aria-hidden>
          {' · '}
        </span>
        <a {...linkProps}>{address}</a>
      </span>
    );
  }

  return (
    <span className="meta-pill-location-text">
      <a {...linkProps}>{address ?? location}</a>
    </span>
  );
}

export function EventCard({ event, visible, going = false, onToggleGoing }: EventCardProps) {
  const ctaLabel = eventCtaLabel(event);
  const ctaButtonClass = eventCtaButtonClass(event);
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
          role="checkbox"
          aria-checked={going}
          aria-label={going ? 'Remove from your itinerary' : 'Add to your itinerary'}
          title={going ? 'Remove from your itinerary' : 'Add to your itinerary'}
          onClick={onToggleGoing}
        >
          <span className="event-going-toggle-box" aria-hidden>
            <Check size={16} strokeWidth={2.5} />
          </span>
          <span className="event-going-toggle-label" aria-hidden>
            {going ? 'Added' : 'Add'}
          </span>
        </button>
      ) : null}
      <div className="event-info">
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
          <span className="meta-pill meta-pill--location">
            <MapPin size={10} strokeWidth={2} aria-hidden />
            <LocationDisplay
              location={event.location}
              mapsHref={mapsHref}
              onMapsClick={() => trackClick(event.name, 'Open in Maps')}
            />
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
          className={`btn ${ctaButtonClass}`}
          onClick={() => trackClick(event.name, ctaLabel)}
        >
          {ctaLabel} →
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
