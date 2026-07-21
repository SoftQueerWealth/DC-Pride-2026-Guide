import { useState, type FormEvent } from 'react';
import type { RoomId } from '../../data/rooms';
import {
  EXPLORE_PILLS,
  FOOTER_BAND,
  FOOTER_COPY,
  HERO_FRAMES,
  HOME_SPOTLIGHTS,
  TRENDING_WEEKENDS,
} from '../../data/home';

type HomePageProps = {
  onGo: (room: RoomId) => void;
};

export function HomePage({ onGo }: HomePageProps) {
  const [email, setEmail] = useState('');
  const [newsletter, setNewsletter] = useState(true);
  const [collective, setCollective] = useState(false);
  const [productUpdates, setProductUpdates] = useState(false);
  const [joined, setJoined] = useState(false);

  const handleJoin = (event: FormEvent) => {
    event.preventDefault();
    if (!email.trim()) return;
    setJoined(true);
  };

  return (
    <section className="screen active" id="screen-home" aria-label="Home">
      <div className="wrap">
        <div className="hero-home">
          <div className="hero-reel" aria-hidden="true">
            {HERO_FRAMES.map((frame) => (
              <div
                key={frame.label}
                className={`placeholder ${frame.tone} frame`}
                data-label={frame.label}
              />
            ))}
          </div>
          <span className="reel-tag">▶ Lifestyle reel — looping</span>
          <div className="overlay">
            <div className="content">
              <h1 className="mahogany-hero">
                Soft <span className="mahogany-emph">Queer</span> Wealth
              </h1>
              <p className="lead">A home for Black queer creatives, culture, &amp; community. ♡</p>
              <div className="hero-ctas">
                <button type="button" className="btn" onClick={() => onGo('reading')}>
                  Read the latest issue
                </button>
                <button type="button" className="btn ghost" onClick={() => onGo('neighborhood')}>
                  See what&apos;s on
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="home-layout">
          <div className="main-stack">
            {HOME_SPOTLIGHTS.map((spot) => (
              <button
                key={spot.title}
                type="button"
                className="card clickable"
                onClick={() => onGo(spot.room)}
              >
                <div
                  className={`placeholder ${spot.tone}`}
                  data-label={spot.label}
                  style={{
                    height: spot.enterExhibition ? 210 : spot.room === 'reading' ? 190 : 170,
                  }}
                />
                <div className="body">
                  <p className="eyebrow" style={{ marginBottom: 2 }}>
                    {spot.enterExhibition
                      ? 'New from the Soft Letter'
                      : spot.room === 'reading'
                        ? 'Softies of the Month · In The Soft Letter'
                        : 'Business Spotlight'}
                  </p>
                  <h4>{spot.title}</h4>
                  <p>{spot.body}</p>
                </div>
              </button>
            ))}
          </div>

          <div>
            <div className="sidebar-box">
              <h3>✈️ Upcoming Big Queer Weekends</h3>
              <p className="sidebar-lede">
                The ones Black queer folks travel for — wherever you&apos;re based.
              </p>
              {TRENDING_WEEKENDS.map((event) => (
                <button
                  key={event.title}
                  type="button"
                  className="sidebar-event"
                  onClick={() => onGo('neighborhood')}
                >
                  <div className={`placeholder ${event.tone} thumb`} data-label="" />
                  <div>
                    <div className="d">{event.when}</div>
                    <h5>{event.title}</h5>
                    <p>{event.meta}</p>
                  </div>
                </button>
              ))}
            </div>

            <div className="sidebar-box">
              <h3>💳 Explore Community Perks</h3>
              <p className="sidebar-copy">
                Discounts and hookups from Black &amp; queer-owned businesses that center our
                community.
              </p>
              <button
                type="button"
                className="btn small"
                style={{ width: '100%', justifyContent: 'center' }}
                onClick={() => onGo('neighborhood')}
              >
                Browse Perks →
              </button>
            </div>

            <div className="sidebar-box">
              <h3>Explore the Guides</h3>
              <p className="sidebar-copy" style={{ marginBottom: 4 }}>
                Find what fits your weekend.
              </p>
              <div className="explore-pills">
                {EXPLORE_PILLS.map((pill) => (
                  <button
                    key={pill.label}
                    type="button"
                    className="explore-pill"
                    onClick={() => onGo(pill.room)}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="sidebar-box join-box">
              <h3>Join Us</h3>
              <p className="sidebar-copy">
                Get the newsletter, and be first in line for the SQW Collective meetup group.
              </p>
              {joined ? (
                <div className="join-success" role="status">
                  You&apos;re in ♡ Check your inbox to confirm.
                </div>
              ) : (
                <form onSubmit={handleJoin}>
                  <input
                    type="email"
                    placeholder="you@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    aria-label="Email address"
                  />
                  <label>
                    <input
                      type="checkbox"
                      checked={newsletter}
                      onChange={(e) => setNewsletter(e.target.checked)}
                    />{' '}
                    Newsletter
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={collective}
                      onChange={(e) => setCollective(e.target.checked)}
                    />{' '}
                    SQW Collective — meetup group launch
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      checked={productUpdates}
                      onChange={(e) => setProductUpdates(e.target.checked)}
                    />{' '}
                    Product updates
                  </label>
                  <button
                    type="submit"
                    className="btn small"
                    style={{ width: '100%', justifyContent: 'center' }}
                  >
                    Sign me up
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        <div className="divider" />
        <div className="home-bottom-cta">
          <h2>Don&apos;t just read about it — go.</h2>
          <div className="cta-row">
            <button type="button" className="btn" onClick={() => onGo('neighborhood')}>
              Explore Events →
            </button>
            <button type="button" className="btn ghost" onClick={() => onGo('reading')}>
              Read Stories →
            </button>
          </div>
        </div>
      </div>

      <div className="home-spacer" />
      <div className="footer-band">{FOOTER_BAND}</div>
      <div className="site-footer">{FOOTER_COPY}</div>
    </section>
  );
}
