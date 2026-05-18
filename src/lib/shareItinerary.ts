export type ShareItineraryResult = 'shared' | 'copied' | 'failed';

export async function shareItinerary(payload: {
  title: string;
  url: string;
}): Promise<ShareItineraryResult> {
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({ title: payload.title, url: payload.url });
      return 'shared';
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return 'failed';
      }
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(payload.url);
      return 'copied';
    } catch {
      return 'failed';
    }
  }

  return 'failed';
}
