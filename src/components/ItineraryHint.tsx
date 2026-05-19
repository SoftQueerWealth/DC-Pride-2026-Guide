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
        <span className="itinerary-hint-key-label">Add</span> = add to your itinerary
      </p>
      {hasSelections ? (
        <p className="itinerary-hint-body">
          <strong>Your itinerary</strong> — {count} event{count === 1 ? '' : 's'} selected. Tap{' '}
          <strong>Share itinerary</strong> below to send your event list and a link to the guide.
        </p>
      ) : (
        <p className="itinerary-hint-body">
          <strong>Build your itinerary</strong> — Tap <strong>Add</strong> on events you&apos;re going
          to.
          When you&apos;re ready, share your list with friends.
        </p>
      )}
    </aside>
  );
}
