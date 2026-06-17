import { SHOUTOUT_CLOSING, SHOUTOUT_CONTRIBUTORS } from '../constants/shoutout';

export function CommunityShoutOut() {
  return (
    <section className="shoutout-section" aria-label="Community contributors">
      <div className="shoutout-card">
        <p className="shoutout-text">
          Special shout out to{' '}
          {SHOUTOUT_CONTRIBUTORS.map((contributor, index) => (
            <span key={contributor.handle}>
              {index > 0 ? (index === SHOUTOUT_CONTRIBUTORS.length - 1 ? ', and ' : ', ') : null}
              <a
                href={contributor.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shoutout-link"
              >
                {contributor.handle}
              </a>
            </span>
          ))}
          {SHOUTOUT_CLOSING}
        </p>
      </div>
    </section>
  );
}
