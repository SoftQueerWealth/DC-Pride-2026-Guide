import { formatRoundedEventCount } from '../lib/eventCta';
import { HeroSocial } from './HeroSocial';

interface HeroProps {
  eventCount: number;
}

export function Hero({ eventCount }: HeroProps) {
  const eventCountLabel = formatRoundedEventCount(eventCount);
  return (
    <header className="hero">
      <HeroSocial />
      <img src="/hero-logo.png" alt="" className="hero-logo" width={80} height={80} />
      <div className="tag">Charm City Homecoming</div>
      <h1>
        Baltimore Pride <span>2026</span>
      </h1>
      <div className="hero-sub">June 8 – 14, 2026 · Baltimore, MD</div>
      <div className="notice">
        <strong style={{ fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          📌 {eventCountLabel} Events Curated for the Culture.
        </strong>
        <br />
        <br />
        This guide grows with the community. See something missing? Slide in our DMs and we&apos;ll get it
        added!
        <br />
        <br />
        <em>Schedule subject to change.</em>
      </div>
      <p className="last-updated">Last updated · June 8, 2026</p>
    </header>
  );
}
