import { useMemo } from 'react';
import { DAY_ORDER } from './constants/days';
import { events } from './data';
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
  const grouped = useMemo(() => groupByDay(events), []);
  const filter = useEventFilters(events);

  return (
    <>
      <Hero />
      <Legend />
      <div className="container">
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
        <div className={`no-results${filter.anyVisible ? '' : ' visible'}`}>
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
