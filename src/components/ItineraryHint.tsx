interface ItineraryHintProps {
  count: number;
  hidden?: boolean;
}

export function ItineraryHint({ count, hidden = false }: ItineraryHintProps) {
  if (hidden) return null;

  const hasSelections = count > 0;

  return (
    <aside className="itinerary-hint" aria-label="Build your itinerary">
      <p className="itinerary-hint-key">
        <span className="itinerary-hint-check" aria-hidden>
          ✓
        </span>{' '}
        = Add to your itinerary
      </p>
      {hasSelections ? (
        <p className="itinerary-hint-body">
          <strong>Your itinerary</strong> — {count} event{count === 1 ? '' : 's'} selected. Tap{' '}
          <strong>Share itinerary</strong> below to send names and ticket links to friends.
        </p>
      ) : (
        <p className="itinerary-hint-body">
          <strong>Build your itinerary</strong> — Tap the checkmark on events you&apos;re going to.
          When you&apos;re ready, share your list with friends.
        </p>
      )}
    </aside>
  );
}
