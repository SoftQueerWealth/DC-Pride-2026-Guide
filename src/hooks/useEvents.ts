import { useCallback, useEffect, useMemo, useState } from 'react';
import { bundledEventsForFestival } from '../data';
import { ENABLED_FESTIVALS } from '../constants/festivals';
import { fetchFestivalSheetEvents, isGoogleSheetsConfigured } from '../data/googleSheets';
import type { PrideEvent } from '../types/event';

interface EventsState {
  eventsByFestival: Record<string, PrideEvent[]>;
  allEvents: PrideEvent[];
  eventsForFestival: (festivalId: string) => PrideEvent[];
  error: string | null;
  isLoading: boolean;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to load events.';
}

function bundledEventsByFestival(): Record<string, PrideEvent[]> {
  return Object.fromEntries(
    ENABLED_FESTIVALS.map((festival) => [festival.id, bundledEventsForFestival(festival.id)]),
  );
}

const useGoogleSheets = isGoogleSheetsConfigured();

export function useEvents(): EventsState {
  const [eventsByFestival, setEventsByFestival] = useState<Record<string, PrideEvent[]>>(
    () => bundledEventsByFestival(),
  );
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(useGoogleSheets);

  useEffect(() => {
    if (!useGoogleSheets) return;

    const controller = new AbortController();
    let cancelled = false;

    Promise.all(
      ENABLED_FESTIVALS.map(async (festival) => {
        const events = await fetchFestivalSheetEvents(festival.id, controller.signal);
        return [festival.id, events] as const;
      }),
    )
      .then((results) => {
        if (cancelled) return;
        setEventsByFestival(Object.fromEntries(results));
        setError(null);
        setIsLoading(false);
      })
      .catch((fetchError: unknown) => {
        if (fetchError instanceof DOMException && fetchError.name === 'AbortError') return;
        if (cancelled) return;
        setEventsByFestival(bundledEventsByFestival());
        setError(errorMessage(fetchError));
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  const eventsForFestival = useCallback(
    (festivalId: string) => eventsByFestival[festivalId] ?? [],
    [eventsByFestival],
  );

  const allEvents = useMemo(
    () => ENABLED_FESTIVALS.flatMap((festival) => eventsByFestival[festival.id] ?? []),
    [eventsByFestival],
  );

  return {
    eventsByFestival,
    allEvents,
    eventsForFestival,
    error,
    isLoading,
  };
}
