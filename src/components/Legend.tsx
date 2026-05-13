const LEGEND = [
  { color: '#e48ab8', label: 'After Dark' },
  { color: '#e0748a', label: 'Day Party' },
  { color: '#e0a060', label: 'Brunch' },
  { color: 'var(--gold-light)', label: 'Happy Hour' },
  { color: '#7ec87e', label: 'Outdoors' },
  { color: '#b07adc', label: 'Workshop' },
  { color: '#e48ab8', label: 'Ball' },
] as const;

export function Legend() {
  return (
    <div className="legend">
      {LEGEND.map(({ color, label }) => (
        <div key={label} className="legend-item">
          <div className="legend-dot" style={{ background: color }} />
          {label}
        </div>
      ))}
    </div>
  );
}
