import { useEffect, useState } from 'react';
import { fetchSheetEvents } from '../data/googleSheets';
import type { PrideEvent } from '../types/event';

interface EventsState {
  events: PrideEvent[];
  error: string | null;
  isLoading: boolean;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to load events.';
}

export function useEvents(): EventsState {
  const [state, setState] = useState<EventsState>({
    events: [],
    error: null,
    isLoading: true,
  });

  useEffect(() => {
    const controller = new AbortController();

    fetchSheetEvents(controller.signal)
      .then((events) => {
        setState({ events, error: null, isLoading: false });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        setState({ events: [], error: errorMessage(error), isLoading: false });
      });

    return () => controller.abort();
  }, []);

  return state;
}
