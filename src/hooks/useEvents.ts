import { useEffect, useState } from 'react';
import { events as bundledEvents } from '../data';
import type { PrideEvent } from '../types/event';

interface EventsState {
  events: PrideEvent[];
  error: string | null;
  isLoading: boolean;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to load events.';
}

const useLiveSheet = import.meta.env.DEV;

export function useEvents(): EventsState {
  const [state, setState] = useState<EventsState>({
    events: useLiveSheet ? [] : bundledEvents,
    error: null,
    isLoading: useLiveSheet,
  });

  useEffect(() => {
    if (!useLiveSheet) return;

    const controller = new AbortController();
    let cancelled = false;

    import('../data/googleSheets')
      .then(({ fetchSheetEvents }) => fetchSheetEvents(controller.signal))
      .then((events) => {
        if (cancelled) return;
        setState({ events, error: null, isLoading: false });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        if (cancelled) return;
        setState({ events: [], error: errorMessage(error), isLoading: false });
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, []);

  return state;
}
