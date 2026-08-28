import { useState } from 'react';
import { Share2 } from 'lucide-react';

interface ItineraryBarProps {
  count: number;
  onShare: () => Promise<'shared' | 'copied' | 'cancelled' | 'failed'>;
  onClear: () => void;
}

export function ItineraryBar({ count, onShare, onClear }: ItineraryBarProps) {
  const [feedback, setFeedback] = useState<string | null>(null);
  const [sharing, setSharing] = useState(false);

  if (count === 0) return null;

  const handleShare = async () => {
    setSharing(true);
    setFeedback(null);
    const result = await onShare();
    setSharing(false);
    if (result === 'copied') setFeedback('Copied!');
    else if (result === 'shared') setFeedback('Shared!');
    else if (result === 'failed') setFeedback('Could not share');
    if (result === 'shared' || result === 'copied') {
      window.setTimeout(() => setFeedback(null), 2500);
    }
  };

  return (
    <div className="itinerary-bar" role="region" aria-label="My itinerary">
      <span className="itinerary-bar-count">
        Your itinerary · {count} event{count === 1 ? '' : 's'}
      </span>
      <div className="itinerary-bar-actions">
        {feedback ? <span className="itinerary-bar-feedback">{feedback}</span> : null}
        <button type="button" className="itinerary-bar-clear" onClick={onClear}>
          Clear
        </button>
        <button
          type="button"
          className="itinerary-bar-share"
          onClick={() => void handleShare()}
          disabled={sharing}
          aria-label="Share itinerary"
        >
          <Share2 size={14} strokeWidth={2} aria-hidden />
          {sharing ? 'Sharing…' : (
            <>
              <span className="itinerary-bar-share-full">Share itinerary</span>
              <span className="itinerary-bar-share-short">Share</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
