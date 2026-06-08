import { trackClick } from '../lib/analytics';

const RESOURCES: { name: string; href: string; gaName: string }[] = [];

export function LinksSection() {
  if (RESOURCES.length === 0) return null;

  return (
    <div className="links-section">
      <div className="links-title">🔗 Key Resources</div>
      {RESOURCES.map((r) => (
        <a
          key={r.href}
          href={r.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-row"
          onClick={() => trackClick(r.gaName, 'Resource Link')}
        >
          <span className="link-row-name">{r.name}</span>
          <span className="link-arrow">↗</span>
        </a>
      ))}
    </div>
  );
}
