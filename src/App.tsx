import { useMemo, useState } from 'react';
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

enum GuideTab {
  Events = 'events',
  Beauty = 'beauty',
}

const ENABLE_BEAUTY_TAB = false;

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
  const [activeTab, setActiveTab] = useState<GuideTab>(GuideTab.Events);
  const { events, error, isLoading } = useEvents();
  const grouped = useMemo(() => groupByDay(events), [events]);
  const filter = useEventFilters(events);
  const showNoResults = !isLoading && events.length > 0 && !filter.anyVisible;
  const showBeautyTab = ENABLE_BEAUTY_TAB && activeTab === GuideTab.Beauty;
  const showEventsTab = !showBeautyTab;

  const handleTabChange = (tab: GuideTab) => {
    if (tab === GuideTab.Beauty && !ENABLE_BEAUTY_TAB) return;
    setActiveTab(tab);
    if (tab !== GuideTab.Events) filter.setPanelOpen(false);
  };

  return (
    <>
      <Hero />
      <nav className="tab-nav" aria-label="Guide sections">
        <div className="tab-list" role="tablist">
          <button
            id="events-tab"
            type="button"
            className={`tab-button${showEventsTab ? ' active' : ''}`}
            role="tab"
            aria-selected={showEventsTab}
            aria-controls="events-panel"
            onClick={() => handleTabChange(GuideTab.Events)}
          >
            Events
          </button>
          {ENABLE_BEAUTY_TAB ? (
            <button
              id="beauty-tab"
              type="button"
              className={`tab-button${showBeautyTab ? ' active' : ''}`}
              role="tab"
              aria-selected={showBeautyTab}
              aria-controls="beauty-panel"
              onClick={() => handleTabChange(GuideTab.Beauty)}
            >
              Beauty
            </button>
          ) : null}
        </div>
      </nav>
      {showEventsTab ? (
        <div id="events-panel" role="tabpanel" aria-labelledby="events-tab">
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
        </div>
      ) : (
        <div id="beauty-panel" className="container" role="tabpanel" aria-labelledby="beauty-tab">
          <section className="beauty-card">
            <span className="beauty-kicker">Beauty</span>
            <h2>Beauty guide coming soon</h2>
            <p>Check back here for glam, grooming, and self-care picks for Pride weekend.</p>
          </section>
        </div>
      )}
      <Footer />
      {showEventsTab ? (
        <>
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
      ) : null}
    </>
  );
}
