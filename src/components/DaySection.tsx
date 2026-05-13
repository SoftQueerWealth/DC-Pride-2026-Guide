import type { DayId, PrideEvent } from '../types/event';
import { EventCard } from './EventCard';

interface DaySectionProps {
  day: DayId;
  dayLabel: string;
  events: PrideEvent[];
  isEventVisible: (e: PrideEvent) => boolean;
}

export function DaySection({ day, dayLabel, events, isEventVisible }: DaySectionProps) {
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
        <EventCard key={event.id} event={event} visible={isEventVisible(event)} />
      ))}
    </section>
  );
}
