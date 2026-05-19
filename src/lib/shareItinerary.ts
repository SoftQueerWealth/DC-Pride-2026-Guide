export type ShareItineraryResult = 'shared' | 'copied' | 'cancelled' | 'failed';

export async function shareItinerary(payload: { text: string }): Promise<ShareItineraryResult> {
  if (typeof navigator !== 'undefined' && typeof navigator.share === 'function') {
    try {
      await navigator.share({ text: payload.text });
      return 'shared';
    } catch (err) {
      if (err instanceof DOMException && err.name === 'AbortError') {
        return 'cancelled';
      }
    }
  }

  if (typeof navigator !== 'undefined' && navigator.clipboard?.writeText) {
    try {
      await navigator.clipboard.writeText(payload.text);
      return 'copied';
    } catch {
      return 'failed';
    }
  }

  return 'failed';
}
