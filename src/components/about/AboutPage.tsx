import { useEffect, useState } from 'react';
import type { RoomId } from '../../data/rooms';
import {
  ABOUT_ETHICS,
  ABOUT_FOOTER_BAND,
  ABOUT_HERO_STAT,
  ABOUT_INTRO,
  ABOUT_SOCIAL_LINKS,
  ABOUT_STATS,
  ABOUT_TEAM,
  ABOUT_TEAM_INTRO,
} from '../../data/about';
import { PARTNER_EMAIL_HREF } from '../../constants/partner';
import { trackDonationClick, trackSocialClick } from '../../lib/analytics';
import { JoinUs } from '../JoinUs';
import { CommunityGuidelinesModal } from './CommunityGuidelinesModal';

type AboutPageProps = {
  onGo: (room: RoomId) => void;
};

export function AboutPage({ onGo }: AboutPageProps) {
  const [guidelinesOpen, setGuidelinesOpen] = useState(false);

  useEffect(() => {
    if (!guidelinesOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setGuidelinesOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [guidelinesOpen]);

  useEffect(() => {
    if (!guidelinesOpen) return;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, [guidelinesOpen]);

  return (
    <section className="screen active" id="screen-about" aria-label="About Us">
      <div className="wrap section-pad">
        <h1 style={{ margin: '0 0 14px' }}>About Us</h1>
        <p style={{ color: 'var(--ink-soft)', lineHeight: 1.8, maxWidth: 720 }}>
          {ABOUT_INTRO.paragraph1}
        </p>
        <p
          style={{
            color: 'var(--terracotta-dark)',
            fontWeight: 700,
            marginTop: 14,
            maxWidth: 720,
          }}
        >
          {ABOUT_INTRO.paragraph2}
        </p>

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
              <p className="team-bio">{member.bio ?? 'Bio coming soon'}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="btn ghost small"
          style={{ marginTop: 18 }}
          onClick={() => setGuidelinesOpen(true)}
        >
          Community Guidelines
        </button>

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
        <JoinUs />

        <div className="divider" />
        <div
          className="placeholder dark"
          data-label="The team, together"
          style={{ height: 300, borderRadius: 12 }}
        />

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
            <a className="btn ghost" href={PARTNER_EMAIL_HREF}>
              Become a Partner →
            </a>
          </div>
        </div>
      </div>
      <div className="footer-band">{ABOUT_FOOTER_BAND}</div>

      <CommunityGuidelinesModal
        open={guidelinesOpen}
        onClose={() => setGuidelinesOpen(false)}
      />
    </section>
  );
}
