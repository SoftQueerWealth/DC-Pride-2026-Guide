import { useEffect, useState } from 'react';
import { generatedBeautyItems } from '../data/beauty.generated';
import { fetchSheetBeautyItems, isGoogleSheetsConfigured } from '../data/googleSheets';
import type { BeautyItem } from '../types/beauty';

interface BeautyItemsState {
  items: BeautyItem[];
  error: string | null;
  isLoading: boolean;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : 'Unable to load community perks.';
}

const useGoogleSheets = isGoogleSheetsConfigured();

export function useBeautyItems(): BeautyItemsState {
  const [state, setState] = useState<BeautyItemsState>({
    items: generatedBeautyItems,
    error: null,
    isLoading: useGoogleSheets,
  });

  useEffect(() => {
    if (!useGoogleSheets) return;

    const controller = new AbortController();
    let cancelled = false;

    fetchSheetBeautyItems(controller.signal)
      .then((items) => {
        if (cancelled) return;
        setState({ items, error: null, isLoading: false });
      })
      .catch((error: unknown) => {
        if (error instanceof DOMException && error.name === 'AbortError') return;
        if (cancelled) return;
        setState({
          items: generatedBeautyItems,
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
