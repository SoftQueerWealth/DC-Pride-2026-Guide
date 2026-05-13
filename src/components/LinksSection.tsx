import { trackClick } from '../lib/analytics';

const RESOURCES: { name: string; href: string; gaName: string }[] = [
  {
    name: 'Official DCBP Schedule',
    href: 'https://dcblackpride.org/schedule.htm',
    gaName: 'Official DCBP Schedule',
  },
  {
    name: 'Unleashed DC — Women\'s Events',
    href: 'https://unleasheddc.com/events-and-tickets',
    gaName: 'Unleashed DC Women Events',
  },
  {
    name: 'Center for Black Equity',
    href: 'https://centerforblackequity.org/events/dcblackpride26',
    gaName: 'Center for Black Equity',
  },
  {
    name: 'Data Integrity Report',
    href: 'https://drive.google.com/file/d/1p5Fux8hrcZG4h7frCY871klMcojTHxva/view?usp=drivesdk',
    gaName: 'Data Integrity Report',
  },
];

export function LinksSection() {
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
