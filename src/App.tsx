import { useCallback, useMemo, useState } from 'react';
import { BeautySection } from './components/BeautySection';
import {
  ENABLED_FESTIVALS,
  festivalById,
} from './constants/festivals';
import { PUBLIC_SITE_ORIGIN } from './constants/site';
import { FILTER_SECTIONS, type FilterSectionDef } from './constants/filters';
import { useBeautyItems } from './hooks/useBeautyItems';
import { useEvents } from './hooks/useEvents';
import { useEventFilters } from './hooks/useEventFilters';
import { useItinerary } from './hooks/useItinerary';
import type { BeautyItem } from './types/beauty';
import type { PrideEvent } from './types/event';
import { CityFilter } from './components/CityFilter';
import { CitySection } from './components/CitySection';
import { DaySection } from './components/DaySection';
import { DonationSection } from './components/DonationSection';
import { FestivalSubheader } from './components/FestivalSubheader';
import { FilterPanel } from './components/FilterPanel';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { ItineraryBar } from './components/ItineraryBar';
import { ItineraryHint } from './components/ItineraryHint';
import { Legend } from './components/Legend';
import { LinksSection } from './components/LinksSection';
import { SharedItineraryHeader } from './components/SharedItineraryHeader';
import { trackItineraryShare } from './lib/analytics';
import { communityPerkTypeLabel } from './lib/communityPerks';
import { groupEventsByCityThenDate, groupFestivalEvents } from './lib/groupFestivalEvents';
import { formatItineraryShare } from './lib/formatItinerary';
import { shareItinerary } from './lib/shareItinerary';
import { filterUpcomingEvents } from './lib/upcomingEvents';

const BEAUTY_TAB = 'beauty';
const AUGUST_FESTIVAL_ID = 'august-events';
const COLLECTIVE_FESTIVAL_ID = 'nyc-collective-black-queer-takeover';
const NAV_FESTIVALS = ENABLED_FESTIVALS.filter((festival) => festival.id !== COLLECTIVE_FESTIVAL_ID);

enum BeautyFilterKind {
  BusinessType = 'business-type',
  Mobile = 'mobile',
}

const COMMUNITY_PERK_TYPES = ['Hair', 'Wellness', 'Brows'] as const;
const DEFAULT_TAB = NAV_FESTIVALS[0]?.id ?? BEAUTY_TAB;

function normalizeFilterValue(value: string): string {
  return value.toLowerCase().replace(/\s+/g, ' ').trim();
}

function communityPerkIsMobile(item: BeautyItem): boolean {
  return item.fields.some(
    (field) =>
      ['travels', 'travelsstatus', 'travel', 'travelstatus'].includes(field.key) &&
      ['yes', 'y', 'true'].includes(normalizeFilterValue(field.value)),
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState(DEFAULT_TAB);
  const [beautyFilterOpen, setBeautyFilterOpen] = useState(false);
  const [activeBeautyTypes, setActiveBeautyTypes] = useState<Set<string>>(() => new Set());
  const [activeMobileOnly, setActiveMobileOnly] = useState(false);
  const [selectedCity, setSelectedCity] = useState('');
  const { allEvents, eventsForFestival, error, isLoading } = useEvents();
  const beauty = useBeautyItems();
  const showBeautyTab = activeTab === BEAUTY_TAB;
  const showFestivalTab = !showBeautyTab;
  const collectiveMode = activeTab === COLLECTIVE_FESTIVAL_ID;
  const activeFestival = showFestivalTab ? festivalById(activeTab) : undefined;
  const isSingleCityFestival = (activeFestival?.cityInclude?.length ?? 0) === 1;
  const festivalEvents = useMemo(
    () => (showFestivalTab ? filterUpcomingEvents(eventsForFestival(activeTab)) : []),
    [activeTab, eventsForFestival, showFestivalTab],
  );
  const cityFilteredEvents = useMemo(
    () => (selectedCity ? festivalEvents.filter((e) => e.city === selectedCity) : festivalEvents),
    [festivalEvents, selectedCity],
  );
  const grouped = useMemo(
    () =>
      activeFestival && (isSingleCityFestival || selectedCity)
        ? groupFestivalEvents(cityFilteredEvents, activeFestival.grouping)
        : [],
    [activeFestival, cityFilteredEvents, isSingleCityFestival, selectedCity],
  );
  const cityGroups = useMemo(
    () =>
      !isSingleCityFestival && !selectedCity ? groupEventsByCityThenDate(festivalEvents) : [],
    [festivalEvents, isSingleCityFestival, selectedCity],
  );
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
  const beautyFilterSections = useMemo<FilterSectionDef<BeautyFilterKind>[]>(
    () => [
      {
        label: 'Business Type',
        pills: COMMUNITY_PERK_TYPES.map((type) => ({
          kind: BeautyFilterKind.BusinessType,
          value: normalizeFilterValue(type),
          label: type,
        })),
      },
      {
        label: 'Availability',
        pills: [{ kind: BeautyFilterKind.Mobile, value: 'true', label: 'Mobile' }],
      },
    ],
    [],
  );
  const filteredBeautyItems = useMemo(
    () =>
      beauty.items.filter((item) => {
        if (activeBeautyTypes.size > 0 && !activeBeautyTypes.has(normalizeFilterValue(communityPerkTypeLabel(item.businessType)))) {
          return false;
        }
        if (activeMobileOnly && !communityPerkIsMobile(item)) return false;
        return true;
      }),
    [activeBeautyTypes, activeMobileOnly, beauty.items],
  );
  const showBeautyNoResults = !beauty.isLoading && beauty.items.length > 0 && filteredBeautyItems.length === 0;
  const activeBeautyFilterCount = activeBeautyTypes.size + (activeMobileOnly ? 1 : 0);

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setSelectedCity('');
    if (tab === BEAUTY_TAB) filter.setPanelOpen(false);
    if (tab !== BEAUTY_TAB) setBeautyFilterOpen(false);
  };

  const isBeautyPillActive = (kind: BeautyFilterKind, value: string) => {
    if (kind === BeautyFilterKind.Mobile) return activeMobileOnly;
    return activeBeautyTypes.has(normalizeFilterValue(value));
  };

  const toggleBeautyPill = (kind: BeautyFilterKind, value: string) => {
    if (kind === BeautyFilterKind.Mobile) {
      setActiveMobileOnly((current) => !current);
      return;
    }

    const normalized = normalizeFilterValue(value);
    setActiveBeautyTypes((current) => {
      const next = new Set(current);
      if (next.has(normalized)) next.delete(normalized);
      else next.add(normalized);
      return next;
    });
  };

  const clearBeautyFilters = () => {
    setActiveBeautyTypes(new Set());
    setActiveMobileOnly(false);
  };

  const handleShareItinerary = useCallback(async () => {
    const payload = formatItineraryShare(allEvents, itinerary.mySelection, PUBLIC_SITE_ORIGIN);
    if (!payload) return 'failed' as const;
    trackItineraryShare(itinerary.myCount);
    return shareItinerary({ text: payload.text });
  }, [allEvents, itinerary.myCount, itinerary.mySelection]);

  return (
    <>
      <Hero />
      <nav className="tab-nav" aria-label="Guide sections">
        <div className="tab-list" role="tablist">
          {NAV_FESTIVALS.map((festival) => (
            <button
              key={festival.id}
              id={`${festival.id}-tab`}
              type="button"
              className={`tab-button${activeTab === festival.id || (festival.id === AUGUST_FESTIVAL_ID && collectiveMode) ? ' active' : ''}`}
              role="tab"
              aria-selected={activeTab === festival.id || (festival.id === AUGUST_FESTIVAL_ID && collectiveMode)}
              aria-controls={`${festival.id}-panel`}
              onClick={() => handleTabChange(festival.id)}
            >
              {festival.tabLabel}
            </button>
          ))}
          <button
            id="beauty-tab"
            type="button"
            className={`tab-button${showBeautyTab ? ' active' : ''}`}
            role="tab"
            aria-selected={showBeautyTab}
            aria-controls="beauty-panel"
            onClick={() => handleTabChange(BEAUTY_TAB)}
          >
            Community Perks
          </button>
        </div>
      </nav>
      {showFestivalTab && activeFestival ? (
        <div
          id={`${collectiveMode ? AUGUST_FESTIVAL_ID : activeTab}-panel`}
          role="tabpanel"
          aria-labelledby={`${AUGUST_FESTIVAL_ID}-tab`}
        >
          <FestivalSubheader festival={activeFestival} />
          {itinerary.hasSharedContext ? (
            <SharedItineraryHeader
              viewMode={itinerary.viewMode}
              onViewModeChange={itinerary.setViewMode}
              onClear={itinerary.clearSharedView}
            />
          ) : null}
          <Legend />
          <ItineraryHint count={itinerary.myCount} hidden={itinerary.hasSharedContext} />
          <div className="featured-controls">
            {!collectiveMode && !isSingleCityFestival ? (
              <CityFilter value={selectedCity} onChange={setSelectedCity} />
            ) : collectiveMode ? (
              <button
                type="button"
                className="btn-back-august"
                onClick={() => handleTabChange(AUGUST_FESTIVAL_ID)}
              >
                ← August Events
              </button>
            ) : null}
            <button
              type="button"
              className={`featured-card${collectiveMode ? ' active' : ''}`}
              onClick={() => handleTabChange(COLLECTIVE_FESTIVAL_ID)}
              aria-pressed={collectiveMode}
            >
              <span className="featured-chip">Featured</span>
              <span className="featured-title">NYC: The Collective Black Queer Takeover</span>
              <span className="featured-meta">New York · August 2026</span>
            </button>
          </div>
          <div className={`container${itinerary.myCount > 0 ? ' has-itinerary-bar' : ''}`}>
            {isLoading ? <div className="data-status">Loading events...</div> : null}
            {error ? (
              <div className="data-status data-status-error" role="alert">
                {error}
              </div>
            ) : null}
            {isSingleCityFestival || selectedCity
              ? grouped.map((dayGroup) => (
                  <DaySection
                    key={dayGroup.key}
                    day={dayGroup.day}
                    dayLabel={dayGroup.dayLabel}
                    dayDate={dayGroup.dayDate}
                    events={dayGroup.events}
                    isEventVisible={isEventShown}
                    isGoing={(e) => itinerary.isGoing(e.id)}
                    onToggleGoing={(e) => itinerary.toggleGoing(e.id)}
                  />
                ))
              : cityGroups.map((cityGroup) => (
                  <CitySection
                    key={cityGroup.cityKey}
                    cityLabel={cityGroup.cityLabel}
                    dayGroups={cityGroup.dayGroups}
                    isEventVisible={isEventShown}
                    isGoing={(e) => itinerary.isGoing(e.id)}
                    onToggleGoing={(e) => itinerary.toggleGoing(e.id)}
                  />
                ))}
            <div className={`no-results${showNoResults ? ' visible' : ''}`}>
              {itinerary.isInSharedView
                ? 'No shared events match your filters. Try clearing some or view the full guide.'
                : 'No events match your filters. Try clearing some! 🖤'}
            </div>
            <LinksSection />
          </div>
        </div>
      ) : (
        <div id="beauty-panel" className="container" role="tabpanel" aria-labelledby="beauty-tab">
          {beauty.isLoading ? <div className="data-status">Loading community perks...</div> : null}
          {beauty.error ? (
            <div className="data-status data-status-error" role="alert">
              {beauty.error}
            </div>
          ) : null}
          {!beauty.isLoading && !beauty.error && filteredBeautyItems.length > 0 ? (
            <BeautySection items={filteredBeautyItems} />
          ) : null}
          {!beauty.isLoading && !beauty.error && beauty.items.length === 0 ? (
            <section className="beauty-card">
              <span className="beauty-kicker">Community Perks</span>
              <h2>Community perks are coming soon</h2>
              <p>Check back soon for curated glam, grooming, and self-care perks from our confirmed partners.</p>
            </section>
          ) : null}
          <div className={`no-results${showBeautyNoResults ? ' visible' : ''}`}>
            No community perks match your filters. Try clearing some!
          </div>
        </div>
      )}
      <DonationSection />
      <Footer />
      {showFestivalTab ? (
        <>
          <ItineraryBar
            count={itinerary.myCount}
            onShare={handleShareItinerary}
            onClear={itinerary.clearMySelection}
          />
          <div className={`filter-fab${itinerary.myCount > 0 ? ' filter-fab--with-itinerary' : ''}`}>
            <button type="button" className="filter-toggle-btn" onClick={filter.togglePanel}>
              🎛️ Filter Events{' '}
              <span className={`filter-count${filter.activeFilterCount > 0 ? ' visible' : ''}`}>
                {filter.activeFilterCount}
              </span>
            </button>
          </div>
          <FilterPanel
            open={filter.panelOpen}
            title="Filter Events"
            ariaLabel="Filter events"
            sections={FILTER_SECTIONS}
            isPillActive={filter.isPillActive}
            onTogglePill={filter.togglePill}
            onClearAll={filter.clearAll}
            onClose={filter.togglePanel}
          />
        </>
      ) : null}
      {showBeautyTab ? (
        <>
          <div className="filter-fab">
            <button type="button" className="filter-toggle-btn" onClick={() => setBeautyFilterOpen((open) => !open)}>
              Filter Perks{' '}
              <span className={`filter-count${activeBeautyFilterCount > 0 ? ' visible' : ''}`}>
                {activeBeautyFilterCount}
              </span>
            </button>
          </div>
          <FilterPanel
            open={beautyFilterOpen}
            title="Filter Community Perks"
            ariaLabel="Filter community perks"
            sections={beautyFilterSections}
            isPillActive={isBeautyPillActive}
            onTogglePill={toggleBeautyPill}
            onClearAll={clearBeautyFilters}
            onClose={() => setBeautyFilterOpen(false)}
          />
        </>
      ) : null}
    </>
  );
}
