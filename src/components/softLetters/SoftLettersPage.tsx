import { FOOTER_BAND, FOOTER_COPY } from '../../data/home';
import {
  SOFT_LETTER_ISSUES,
  SOFT_LETTER_SHARE_CTAS,
  SOFTIE_OF_THE_MONTH,
} from '../../data/softLetters';

type SoftLettersPageProps = {
  onOpenPartner: () => void;
};

export function SoftLettersPage({ onOpenPartner }: SoftLettersPageProps) {
  return (
    <section className="screen active" id="screen-reading" aria-label="Soft Letters">
      <div className="wrap section-pad">
        <div className="soft-letters-intro">
          <p className="eyebrow">Understand Community</p>
          <h1 className="soft-letters-title">Soft Letters</h1>
          <p className="soft-letters-lede">
            Editorial issues, curator&apos;s letters, and full exhibitions from the SQW community —
            each one built to walk through, not just read.
          </p>
        </div>

        <div className="grid g2 soft-letters-issues">
          {SOFT_LETTER_ISSUES.map((issue) => (
            <article
              key={issue.number}
              className={`card soft-letters-issue${issue.comingSoon ? ' soft-letters-issue--soon' : ''}`}
            >
              <div
                className={`placeholder${issue.tone ? ` ${issue.tone}` : ''}`}
                data-label={issue.coverLabel}
                style={{ height: 220 }}
              />
              <div className="body">
                <p className="eyebrow" style={{ marginBottom: 2 }}>
                  {issue.eyebrow}
                </p>
                <h4>{issue.title}</h4>
                <p>{issue.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="divider" />

        <p className="eyebrow">Softies of the Month</p>
        <div className="soft-letters-softie">
          <article className="card">
            <div
              className={`placeholder ${SOFTIE_OF_THE_MONTH.tone}`}
              data-label={SOFTIE_OF_THE_MONTH.coverLabel}
              style={{ height: 200 }}
            />
            <div className="body">
              <h4>{SOFTIE_OF_THE_MONTH.title}</h4>
              <p>{SOFTIE_OF_THE_MONTH.body}</p>
            </div>
          </article>
        </div>

        <div className="divider" />

        <p className="eyebrow">We&apos;re building this together</p>
        <h2 className="soft-letters-share-title">Have something to share?</h2>
        <div className="grid g3 soft-letters-share">
          {SOFT_LETTER_SHARE_CTAS.map((cta) => (
            <button
              key={cta.title}
              type="button"
              className="card body soft-letters-share-card"
              onClick={onOpenPartner}
            >
              <h4>{cta.title}</h4>
              <p>{cta.body}</p>
            </button>
          ))}
        </div>
      </div>

      <div className="footer-band">{FOOTER_BAND}</div>
      <div className="site-footer">{FOOTER_COPY}</div>
    </section>
  );
}
