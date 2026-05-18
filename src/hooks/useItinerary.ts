import { useCallback, useEffect, useMemo, useState } from 'react';
import { parseItineraryParam, stripItineraryParamFromUrl } from '../lib/parseItineraryParam';
import type { PrideEvent } from '../types/event';

const STORAGE_KEY = 'pride-guide-itinerary';

export enum ItineraryViewMode {
  Shared = 'shared',
  Full = 'full',
}

function loadMySelection(): Set<string> {
  if (typeof window === 'undefined') return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return new Set();
    return new Set(parsed.filter((id): id is string => typeof id === 'string' && id.length > 0));
  } catch {
    return new Set();
  }
}

function saveMySelection(ids: Set<string>): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...ids]));
  } catch {
    // ignore quota / private mode
  }
}

export function useItinerary(events: PrideEvent[]) {
  const validEventIds = useMemo(() => new Set(events.map((e) => e.id)), [events]);

  const [sharedIds, setSharedIds] = useState<Set<string>>(() => new Set());
  const [viewMode, setViewMode] = useState<ItineraryViewMode>(ItineraryViewMode.Full);
  const [mySelection, setMySelection] = useState<Set<string>>(() => loadMySelection());
  const [hydratedFromUrl, setHydratedFromUrl] = useState(false);

  useEffect(() => {
    if (validEventIds.size === 0 && events.length === 0) return;
    const fromUrl = parseItineraryParam(window.location.search, validEventIds);
    if (fromUrl.size > 0) {
      setSharedIds(fromUrl);
      setViewMode(ItineraryViewMode.Shared);
    }
    setHydratedFromUrl(true);
  }, [validEventIds, events.length]);

  useEffect(() => {
    if (!hydratedFromUrl) return;
    saveMySelection(mySelection);
  }, [mySelection, hydratedFromUrl]);

  const isGoing = useCallback((id: string) => mySelection.has(id), [mySelection]);

  const toggleGoing = useCallback((id: string) => {
    setMySelection((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const clearMySelection = useCallback(() => {
    setMySelection(new Set());
  }, []);

  const clearSharedView = useCallback(() => {
    setSharedIds(new Set());
    setViewMode(ItineraryViewMode.Full);
    stripItineraryParamFromUrl();
  }, []);

  const isInSharedView = viewMode === ItineraryViewMode.Shared && sharedIds.size > 0;

  const isEventShownInView = useCallback(
    (eventId: string) => {
      if (isInSharedView && !sharedIds.has(eventId)) return false;
      return true;
    },
    [isInSharedView, sharedIds],
  );

  const myCount = mySelection.size;
  const sharedCount = sharedIds.size;

  return {
    sharedIds,
    sharedCount,
    hasSharedContext: sharedCount > 0,
    viewMode,
    setViewMode,
    isInSharedView,
    isEventShownInView,
    mySelection,
    myCount,
    isGoing,
    toggleGoing,
    clearMySelection,
    clearSharedView,
  };
}
