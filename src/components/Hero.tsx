import { HeroSocial } from './HeroSocial';

export function Hero() {
  return (
    <header className="hero">
      <HeroSocial />
      <img src="/hero-logo.png" alt="" className="hero-logo" width={80} height={80} />
      <div className="tag">Memorial Day Weekend · DC</div>
      <h1>
        DC Black Pride <span>2026</span>
      </h1>
      <div className="hero-sub">May 20 – 25, 2026 · Washington, DC</div>
      <div className="notice">
        <strong style={{ fontSize: '13px', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
          📌 50+ Events Curated for the Culture.
        </strong>
        <br />
        <br />
        This guide grows with the community. See something missing? Slide in our DMs and we&apos;ll get it
        added!
        <br />
        <br />
        <em>Schedule subject to change.</em>
      </div>
      <p className="last-updated">Last updated · May 13, 2026</p>
    </header>
  );
}
