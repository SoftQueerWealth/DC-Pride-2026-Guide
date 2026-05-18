import { ItineraryViewMode } from '../hooks/useItinerary';
import { trackItineraryViewToggle } from '../lib/analytics';

interface SharedItineraryHeaderProps {
  viewMode: ItineraryViewMode;
  onViewModeChange: (mode: ItineraryViewMode) => void;
  onClear: () => void;
}

export function SharedItineraryHeader({
  viewMode,
  onViewModeChange,
  onClear,
}: SharedItineraryHeaderProps) {
  const handleModeChange = (mode: ItineraryViewMode) => {
    if (mode === viewMode) return;
    trackItineraryViewToggle(mode);
    onViewModeChange(mode);
  };

  return (
    <section className="shared-itinerary-header" aria-label="Shared itinerary">
      <div className="shared-itinerary-controls">
        <div className="shared-itinerary-toggle" role="tablist" aria-label="Itinerary view">
          <button
            type="button"
            role="tab"
            className={`shared-itinerary-toggle-btn${viewMode === ItineraryViewMode.Shared ? ' active' : ''}`}
            aria-selected={viewMode === ItineraryViewMode.Shared}
            onClick={() => handleModeChange(ItineraryViewMode.Shared)}
          >
            Shared itinerary
          </button>
          <button
            type="button"
            role="tab"
            className={`shared-itinerary-toggle-btn${viewMode === ItineraryViewMode.Full ? ' active' : ''}`}
            aria-selected={viewMode === ItineraryViewMode.Full}
            onClick={() => handleModeChange(ItineraryViewMode.Full)}
          >
            Full guide
          </button>
        </div>
        <button type="button" className="shared-itinerary-clear" onClick={onClear}>
          Clear
        </button>
      </div>
    </section>
  );
}
