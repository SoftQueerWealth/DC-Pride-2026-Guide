import { useCallback, useMemo, useState } from 'react';
import { CityFilter } from '../CityFilter';
import { CitySection } from '../CitySection';
import { DaySection } from '../DaySection';
import { ItineraryBar } from '../ItineraryBar';
import { SharedItineraryHeader } from '../SharedItineraryHeader';
import { EventFilterSidebar } from './EventFilterSidebar';
import { festivalById } from '../../constants/festivals';
import { PUBLIC_SITE_ORIGIN } from '../../constants/site';
import { FOOTER_BAND, FOOTER_COPY } from '../../data/home';
import { useEvents } from '../../hooks/useEvents';
import { useEventFilters } from '../../hooks/useEventFilters';
import { useItinerary } from '../../hooks/useItinerary';
import { trackItineraryShare } from '../../lib/analytics';
import { formatItineraryShare } from '../../lib/formatItinerary';
import { groupEventsByCityThenDate, groupFestivalEvents } from '../../lib/groupFestivalEvents';
import { shareItinerary } from '../../lib/shareItinerary';
import { filterUpcomingEvents } from '../../lib/upcomingEvents';
import type { PrideEvent } from '../../types/event';

const JULY_FESTIVAL_ID = 'july-events';
const WNBA_FESTIVAL_ID = 'wnba-all-star-weekend';

export function MahoganyPages() {
  const [wnbaMode, setWnbaMode] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const festivalId = wnbaMode ? WNBA_FESTIVAL_ID : JULY_FESTIVAL_ID;
  const activeFestival = festivalById(festivalId);
  const { allEvents, eventsForFestival, error, isLoading } = useEvents();

  const festivalEvents = useMemo(
    () => filterUpcomingEvents(eventsForFestival(festivalId)),
    [eventsForFestival, festivalId],
  );

  const cityFilteredEvents = useMemo(
    () =>
      wnbaMode || !selectedCity
        ? festivalEvents
        : festivalEvents.filter((event) => event.city === selectedCity),
    [festivalEvents, selectedCity, wnbaMode],
  );

  const grouped = useMemo(() => {
    if (!activeFestival) return [];
    if (wnbaMode || selectedCity) {
      return groupFestivalEvents(cityFilteredEvents, activeFestival.grouping);
    }
    return [];
  }, [activeFestival, cityFilteredEvents, selectedCity, wnbaMode]);

  const cityGroups = useMemo(() => {
    if (wnbaMode || selectedCity) return [];
    return groupEventsByCityThenDate(festivalEvents);
  }, [festivalEvents, selectedCity, wnbaMode]);

  const filter = useEventFilters(festivalEvents);
  const itinerary = useItinerary(allEvents);

  const isEventShown = useCallback(
    (event: PrideEvent) => itinerary.isEventShownInView(event.id) && filter.isEventVisible(event),
    [filter, itinerary],
  );

  const anyEventsVisible = useMemo(
    () => cityFilteredEvents.some(isEventShown),
    [cityFilteredEvents, isEventShown],
  );

  const showNoResults = !isLoading && festivalEvents.length > 0 && !anyEventsVisible;

  const handleCityChange = (city: string) => {
    setWnbaMode(false);
    setSelectedCity(city);
    filter.clearAll();
  };

  const handleSelectWnba = () => {
    setWnbaMode(true);
    setSelectedCity('');
    filter.clearAll();
  };

  const handleShareItinerary = useCallback(async () => {
    const payload = formatItineraryShare(allEvents, itinerary.mySelection, PUBLIC_SITE_ORIGIN);
    if (!payload) return 'failed' as const;
    trackItineraryShare(itinerary.myCount);
    return shareItinerary({ text: payload.text });
  }, [allEvents, itinerary.myCount, itinerary.mySelection]);

  return (
    <section className="screen active" id="screen-neighborhood" aria-label="The Mahogany Pages">
      <div className={`wrap section-pad${itinerary.myCount > 0 ? ' has-itinerary-bar' : ''}`}>
        <div className="mahogany-intro">
          <div className="mahogany-intro-copy">
            <p className="eyebrow">Find Community</p>
            <h1 className="mahogany-title">The Mahogany Pages</h1>
            <p className="mahogany-lede">
              Events happening near you — curated, local, and by us.
            </p>
          </div>
          <div className="sidebar-box mahogany-vibe-box">
            <h3>✨ Find your vibe, save your favorites</h3>
            <p>
              Sort the guide by day, venue type, vibes, and price — then tap <b>Add</b> and share
              your itinerary with your people.
            </p>
          </div>
        </div>

        <div className="mahogany-controls">
          <CityFilter value={selectedCity} onChange={handleCityChange} className="mahogany-city-filter" />

          <button
            type="button"
            className={`mahogany-wnba-card${wnbaMode ? ' active' : ''}`}
            onClick={handleSelectWnba}
            aria-pressed={wnbaMode}
          >
            <span className="mahogany-wnba-chip">Featured</span>
            <span className="mahogany-wnba-title">WNBA All-Star Weekend</span>
            <span className="mahogany-wnba-meta">Chicago · July 2026</span>
          </button>
        </div>

        {itinerary.hasSharedContext ? (
          <SharedItineraryHeader
            viewMode={itinerary.viewMode}
            onViewModeChange={itinerary.setViewMode}
            onClear={itinerary.clearSharedView}
          />
        ) : null}

        <div className="mahogany-layout">
          <div className="mahogany-filters-desktop">
            <EventFilterSidebar
              activeFilterCount={filter.activeFilterCount}
              isPillActive={filter.isPillActive}
              onTogglePill={filter.togglePill}
              onClearAll={filter.clearAll}
            />
          </div>

          <div className="mahogany-events">
            <div className="mahogany-filters-mobile-bar">
              <button
                type="button"
                className="btn small mahogany-filters-toggle"
                aria-expanded={mobileFiltersOpen}
                onClick={() => setMobileFiltersOpen((open) => !open)}
              >
                Filters
                {filter.activeFilterCount > 0 ? (
                  <span className="filter-sidebar-count">{filter.activeFilterCount}</span>
                ) : null}
              </button>
            </div>

            {mobileFiltersOpen ? (
              <div className="mahogany-filters-mobile-panel">
                <EventFilterSidebar
                  activeFilterCount={filter.activeFilterCount}
                  isPillActive={filter.isPillActive}
                  onTogglePill={filter.togglePill}
                  onClearAll={filter.clearAll}
                />
              </div>
            ) : null}

            {isLoading ? <div className="data-status">Loading events...</div> : null}
            {error ? (
              <div className="data-status data-status-error" role="alert">
                {error}
              </div>
            ) : null}

            {wnbaMode || selectedCity
              ? grouped.map((dayGroup) => (
                  <DaySection
                    key={dayGroup.key}
                    day={dayGroup.day}
                    dayLabel={dayGroup.dayLabel}
                    dayDate={dayGroup.dayDate}
                    events={dayGroup.events}
                    isEventVisible={isEventShown}
                    isGoing={(event) => itinerary.isGoing(event.id)}
                    onToggleGoing={(event) => itinerary.toggleGoing(event.id)}
                  />
                ))
              : cityGroups.map((cityGroup) => (
                  <CitySection
                    key={cityGroup.cityKey}
                    cityLabel={cityGroup.cityLabel}
                    dayGroups={cityGroup.dayGroups}
                    isEventVisible={isEventShown}
                    isGoing={(event) => itinerary.isGoing(event.id)}
                    onToggleGoing={(event) => itinerary.toggleGoing(event.id)}
                  />
                ))}

            <div className={`no-results${showNoResults ? ' visible' : ''}`}>
              {itinerary.isInSharedView
                ? 'No shared events match your filters. Try clearing some or view the full guide.'
                : 'No events match your filters. Try clearing some!'}
            </div>
          </div>
        </div>
      </div>

      <ItineraryBar
        count={itinerary.myCount}
        onShare={handleShareItinerary}
        onClear={itinerary.clearMySelection}
      />

      <div className="footer-band">{FOOTER_BAND}</div>
      <div className="site-footer">{FOOTER_COPY}</div>
    </section>
  );
}
