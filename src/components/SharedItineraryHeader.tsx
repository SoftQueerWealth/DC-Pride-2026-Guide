import {
  ITINERARY_SHARE_FOOTER,
  ITINERARY_SHARED_VIEW_TITLE,
} from '../constants/itineraryShare';
import { ItineraryViewMode } from '../hooks/useItinerary';
import { groupItineraryEventsByDay } from '../lib/groupItineraryEvents';
import { trackItineraryViewToggle } from '../lib/analytics';
import type { PrideEvent } from '../types/event';

interface SharedItineraryHeaderProps {
  events: PrideEvent[];
  viewMode: ItineraryViewMode;
  onViewModeChange: (mode: ItineraryViewMode) => void;
  onClear: () => void;
}

export function SharedItineraryHeader({
  events,
  viewMode,
  onViewModeChange,
  onClear,
}: SharedItineraryHeaderProps) {
  const dayGroups = groupItineraryEventsByDay(events);

  const handleModeChange = (mode: ItineraryViewMode) => {
    if (mode === viewMode) return;
    trackItineraryViewToggle(mode);
    onViewModeChange(mode);
  };

  return (
    <section className="shared-itinerary-header" aria-label="Shared itinerary">
      <div className="shared-itinerary-welcome">
        <h2 className="shared-itinerary-title">{ITINERARY_SHARED_VIEW_TITLE}</h2>
        <p className="shared-itinerary-count">
          {events.length} event{events.length === 1 ? '' : 's'}
        </p>
        {dayGroups.length > 0 ? (
          <div className="shared-itinerary-list">
            {dayGroups.map(({ dayLabel, events: dayEvents }) => (
              <div key={dayLabel} className="shared-itinerary-day">
                <h3 className="shared-itinerary-day-label">{dayLabel}</h3>
                <ul className="shared-itinerary-day-events">
                  {dayEvents.map((event) => (
                    <li key={event.id} className="shared-itinerary-event">
                      <span className="shared-itinerary-event-name">{event.name}</span>
                      <span className="shared-itinerary-event-time">{event.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : null}
        <p className="shared-itinerary-footer">{ITINERARY_SHARE_FOOTER}</p>
      </div>
      <div className="shared-itinerary-controls">
        <div className="shared-itinerary-toggle" role="tablist" aria-label="Itinerary view">
          <button
            type="button"
            role="tab"
            className={`shared-itinerary-toggle-btn${viewMode === ItineraryViewMode.Shared ? ' active' : ''}`}
            aria-selected={viewMode === ItineraryViewMode.Shared}
            onClick={() => handleModeChange(ItineraryViewMode.Shared)}
          >
            Shared itinerary
          </button>
          <button
            type="button"
            role="tab"
            className={`shared-itinerary-toggle-btn${viewMode === ItineraryViewMode.Full ? ' active' : ''}`}
            aria-selected={viewMode === ItineraryViewMode.Full}
            onClick={() => handleModeChange(ItineraryViewMode.Full)}
          >
            Full guide
          </button>
        </div>
        <button type="button" className="shared-itinerary-clear" onClick={onClear}>
          Clear
        </button>
      </div>
    </section>
  );
}
