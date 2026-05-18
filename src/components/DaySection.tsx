import type { DayId, PrideEvent } from '../types/event';
import { EventCard } from './EventCard';

interface DaySectionProps {
  day: DayId;
  dayLabel: string;
  events: PrideEvent[];
  isEventVisible: (e: PrideEvent) => boolean;
  isGoing?: (e: PrideEvent) => boolean;
  onToggleGoing?: (e: PrideEvent) => void;
}

export function DaySection({
  day,
  dayLabel,
  events,
  isEventVisible,
  isGoing,
  onToggleGoing,
}: DaySectionProps) {
  const visibleCount = events.filter(isEventVisible).length;
  const hidden = visibleCount === 0;

  return (
    <section className={`day-section${hidden ? ' hidden' : ''}`} data-day={day}>
      <div className="day-header">
        <div className="day-label">{dayLabel}</div>
        <div className="day-date" />
        <div className="day-count">
          {visibleCount} event{visibleCount === 1 ? '' : 's'}
        </div>
        <div className="day-line" />
      </div>
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          visible={isEventVisible(event)}
          going={isGoing?.(event)}
          onToggleGoing={onToggleGoing ? () => onToggleGoing(event) : undefined}
        />
      ))}
    </section>
  );
}
