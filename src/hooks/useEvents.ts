import { useEffect, useState } from 'react';
import { events as bundledEvents } from '../data';
import { fetchSheetEvents, isGoogleSheetsConfigured } from '../data/googleSheets';
import type { PrideEvent } from '../types/event';

interface EventsState {
  events: PrideEvent[];
  error: string | null;
  isLoading: boolean;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to load events.';
}

const useGoogleSheets = isGoogleSheetsConfigured();

export function useEvents(): EventsState {
  const [state, setState] = useState<EventsState>({
    events: bundledEvents,
    error: null,
    isLoading: useGoogleSheets,
  });

  useEffect(() => {
    if (!useGoogleSheets) return;

    const controller = new AbortController();
    let cancelled = false;

    fetchSheetEvents(controller.signal)
      .then((events) => {
        if (cancelled) return;
        setState({ events, error: null, isLoading: false });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        if (cancelled) return;
        setState({
          events: bundledEvents,
          error: errorMessage(error),
          isLoading: false,
        });
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return state;
}
