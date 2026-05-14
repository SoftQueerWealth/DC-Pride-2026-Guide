import type { FilterSectionDef } from '../constants/filters';

interface FilterPanelProps<TKind extends string> {
  open: boolean;
  title: string;
  ariaLabel: string;
  sections: FilterSectionDef<TKind>[];
  isPillActive: (kind: TKind, value: string) => boolean;
  onTogglePill: (kind: TKind, value: string) => void;
  onClearAll: () => void;
  onClose: () => void;
}

export function FilterPanel<TKind extends string>({
  open,
  title,
  ariaLabel,
  sections,
  isPillActive,
  onTogglePill,
  onClearAll,
  onClose,
}: FilterPanelProps<TKind>) {
  return (
    <div className={`filter-panel${open ? ' open' : ''}`} id="filterPanel" role="dialog" aria-modal="true" aria-label={ariaLabel}>
      <div className="filter-panel-header">
        <div className="filter-panel-title">{title}</div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button type="button" className="clear-btn" onClick={onClearAll}>
            Clear All
          </button>
          <button type="button" className="close-btn" onClick={onClose}>
            ✕ Close
          </button>
        </div>
      </div>
      {sections.map(({ label, pills }) => (
        <div key={label} className="filter-section">
          <div className="filter-section-label">{label}</div>
          <div className="filter-pills">
            {pills.map((p) => (
              <button
                key={`${p.kind}-${p.value}`}
                type="button"
                className={`filter-pill${p.freePill ? ' free-pill' : ''}${isPillActive(p.kind, p.value) ? ' active' : ''}`}
                data-filter-type={p.kind}
                data-value={p.value}
                onClick={() => onTogglePill(p.kind, p.value)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
