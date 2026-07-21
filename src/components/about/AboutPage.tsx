import type { RoomId } from '../../data/rooms';
import {
  ABOUT_CHART_BARS,
  ABOUT_ETHICS,
  ABOUT_FOOTER_BAND,
  ABOUT_HERO_STAT,
  ABOUT_INTRO,
  ABOUT_RADAR,
  ABOUT_REELS,
  ABOUT_SOCIAL_LINKS,
  ABOUT_STATS,
  ABOUT_TEAM,
  ABOUT_TEAM_INTRO,
} from '../../data/about';
import { trackDonationClick, trackSocialClick } from '../../lib/analytics';

type AboutPageProps = {
  onGo: (room: RoomId) => void;
  onOpenPartner: () => void;
};

export function AboutPage({ onGo, onOpenPartner }: AboutPageProps) {
  return (
    <section className="screen active" id="screen-about" aria-label="About Us">
      <div className="wrap section-pad">
        <img
          className="logo-full"
          src="/hero-logo.png"
          alt="Soft Queer Wealth"
        />

        <div className="two-col">
          <div>
            <p className="eyebrow">About</p>
            <h1 style={{ margin: '0 0 14px' }}>About Us</h1>
            <p style={{ color: 'var(--ink-soft)', lineHeight: 1.8 }}>{ABOUT_INTRO.paragraph1}</p>
            <p
              style={{
                color: 'var(--terracotta-dark)',
                fontWeight: 700,
                marginTop: 14,
              }}
            >
              {ABOUT_INTRO.paragraph2}
            </p>
          </div>
          <div
            className="placeholder dark"
            data-label="The team, together"
            style={{ height: 300, borderRadius: 12 }}
          />
        </div>

        <div className="divider" />
        <p className="eyebrow">By the numbers</p>
        <div className="hero-stat">
          <div className="num">{ABOUT_HERO_STAT.num}</div>
          <div className="lbl">{ABOUT_HERO_STAT.label}</div>
        </div>
        <div className="stat-grid">
          {ABOUT_STATS.map((stat) => (
            <div key={stat.label}>
              <div className="num">{stat.num}</div>
              <div className="lbl">{stat.label}</div>
            </div>
          ))}
        </div>

        <p className="eyebrow" style={{ marginTop: 26 }}>
          Coming Up on Our Radar
        </p>
        <p style={{ color: 'var(--ink-soft)', margin: '0 0 12px' }}>{ABOUT_RADAR}</p>
        <button
          type="button"
          className="btn ghost small"
          onClick={() => onGo('neighborhood')}
        >
          See the full timeline on The Mahogany Pages →
        </button>

        <div className="chart-box">
          <p className="eyebrow" style={{ margin: 0 }}>
            Growing every month
          </p>
          <p style={{ fontSize: 12, color: 'var(--ink-soft)', margin: '4px 0 0' }}>
            Events covered, month over month, since we launched in May 2026 — more cities, more
            coverage, more of us seen.
          </p>
          <div className="chart-bars">
            {ABOUT_CHART_BARS.map((bar) => (
              <div key={bar.label} className="bar-col">
                <div className="bar" style={{ height: `${bar.heightPct}%` }} />
                <div className="bar-label">{bar.label}</div>
              </div>
            ))}
          </div>
          <p className="eyebrow" style={{ margin: '24px 0 0' }}>
            Behind the numbers
          </p>
          <p style={{ fontSize: 12, color: 'var(--ink-soft)', margin: '4px 0 0' }}>
            A short reel from each month we&apos;ve been live — and a quick recap of the vibe.
          </p>
          <div className="reel-row">
            {ABOUT_REELS.map((reel) => (
              <div key={reel.label}>
                <div className="reel-card" aria-hidden="true">
                  <div
                    className={`placeholder ${reel.tone}`}
                    data-label=""
                    style={{ position: 'absolute', inset: 0 }}
                  />
                  <div className="reel-play">▶</div>
                  <div className="reel-label">{reel.label}</div>
                </div>
                <p
                  style={{
                    fontSize: 11,
                    color: 'var(--ink-soft)',
                    maxWidth: 108,
                    margin: '6px 0 0',
                  }}
                >
                  {reel.caption}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="divider" />
        <p className="eyebrow">The team</p>
        <p
          style={{
            color: 'var(--ink-soft)',
            maxWidth: 600,
            lineHeight: 1.8,
            margin: '6px 0 18px',
          }}
        >
          {ABOUT_TEAM_INTRO}
        </p>
        <div className="team-grid">
          {ABOUT_TEAM.map((member) => (
            <div key={member.name} className="team-card">
              <div
                className={`placeholder ${member.tone}`.trim()}
                data-label=""
                style={{ height: 150, borderRadius: 10 }}
              />
              <h4>{member.name}</h4>
              <p>{member.role}</p>
            </div>
          ))}
        </div>

        <p className="eyebrow" style={{ marginTop: 26 }}>
          Find us everywhere
        </p>
        <div className="social-row">
          {ABOUT_SOCIAL_LINKS.map((link) => (
            <a
              key={link.label}
              className="room-tile"
              href={link.href}
              target={link.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={link.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              onClick={() => {
                if (link.platform) {
                  trackSocialClick(link.platform, link.href);
                  return;
                }
                trackDonationClick(link.href);
              }}
            >
              {link.label}
            </a>
          ))}
        </div>

        <div className="divider" />
        <p className="eyebrow">Data ethics &amp; data management</p>
        <div className="ethics-box">
          <p style={{ margin: 0, color: 'var(--ink-soft)', fontSize: 13, lineHeight: 1.8 }}>
            {ABOUT_ETHICS.intro}
          </p>
          <ul>
            {ABOUT_ETHICS.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
          <p
            style={{
              margin: '14px 0 0',
              color: 'var(--ink-soft)',
              fontSize: 13,
              lineHeight: 1.8,
            }}
          >
            {ABOUT_ETHICS.automation}
          </p>
          <p
            style={{
              margin: '14px 0 0',
              fontSize: 11.5,
              color: 'var(--ink-soft)',
              opacity: 0.8,
            }}
          >
            {ABOUT_ETHICS.disclaimer}
          </p>
        </div>

        <div className="divider" />
        <div style={{ textAlign: 'center' }}>
          <p className="eyebrow" style={{ textAlign: 'center' }}>
            What&apos;s next?
          </p>
          <h2 style={{ margin: '0 0 18px' }}>Now go find your people.</h2>
          <div
            style={{
              display: 'flex',
              gap: 12,
              justifyContent: 'center',
              flexWrap: 'wrap',
            }}
          >
            <button type="button" className="btn" onClick={() => onGo('neighborhood')}>
              Explore Events →
            </button>
            <button type="button" className="btn ghost" onClick={() => onGo('reading')}>
              Read Another Story →
            </button>
            <button type="button" className="btn ghost" onClick={onOpenPartner}>
              Become a Partner →
            </button>
          </div>
        </div>
      </div>
      <div className="footer-band">{ABOUT_FOOTER_BAND}</div>
    </section>
  );
}
