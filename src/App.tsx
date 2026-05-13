import { useMemo } from 'react';
import { DAY_ORDER } from './constants/days';
import { useEvents } from './hooks/useEvents';
import { useEventFilters } from './hooks/useEventFilters';
import type { DayId, PrideEvent } from './types/event';
import { DaySection } from './components/DaySection';
import { FilterPanel } from './components/FilterPanel';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { Legend } from './components/Legend';
import { LinksSection } from './components/LinksSection';

function groupByDay(list: PrideEvent[]): Map<DayId, PrideEvent[]> {
  const map = new Map<DayId, PrideEvent[]>();
  for (const d of DAY_ORDER) {
    map.set(d, []);
  }
  for (const e of list) {
    map.get(e.day)?.push(e);
  }
  return map;
}

export default function App() {
  const { events, error, isLoading } = useEvents();
  const grouped = useMemo(() => groupByDay(events), [events]);
  const filter = useEventFilters(events);
  const showNoResults = !isLoading && events.length > 0 && !filter.anyVisible;

  return (
    <>
      <Hero />
      <Legend />
      <div className="container">
        {isLoading ? <div className="data-status">Loading events...</div> : null}
        {error ? (
          <div className="data-status data-status-error" role="alert">
            {error}
          </div>
        ) : null}
        {DAY_ORDER.map((day) => {
          const dayEvents = grouped.get(day) ?? [];
          const dayLabel = dayEvents[0]?.dayLabel ?? day;
          return (
            <DaySection
              key={day}
              day={day}
              dayLabel={dayLabel}
              events={dayEvents}
              isEventVisible={filter.isEventVisible}
            />
          );
        })}
        <div className={`no-results${showNoResults ? ' visible' : ''}`}>
          No events match your filters. Try clearing some! 🖤
        </div>
        <LinksSection />
      </div>
      <Footer />
      <div className="filter-fab">
        <button type="button" className="filter-toggle-btn" onClick={filter.togglePanel}>
          🎛️ Filter Events{' '}
          <span className={`filter-count${filter.activeFilterCount > 0 ? ' visible' : ''}`}>
            {filter.activeFilterCount}
          </span>
        </button>
      </div>
      <FilterPanel
        open={filter.panelOpen}
        isPillActive={filter.isPillActive}
        onTogglePill={filter.togglePill}
        onClearAll={filter.clearAll}
        onClose={filter.togglePanel}
      />
    </>
  );
}
