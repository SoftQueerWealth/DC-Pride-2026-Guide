import { useEffect, useState } from 'react';
import type { RoomId } from '../../data/rooms';
import { FOOTER_BAND, FOOTER_COPY } from '../../data/home';
import {
  SOFT_LETTER_ISSUES,
  SOFT_LETTER_SHARE_CTAS,
  SOFTIE_OF_THE_MONTH,
} from '../../data/softLetters';
import { CONTRIBUTORS, EXHIBITION_STEPS } from '../../data/staticExhibition';
import { ContributorDetail } from './ContributorDetail';
import { StaticExhibition } from './StaticExhibition';

type SoftLettersView = 'landing' | 'exhibition' | 'contributor';

type SoftLettersPageProps = {
  onOpenPartner: () => void;
  onGo: (room: RoomId) => void;
};

export function SoftLettersPage({ onOpenPartner, onGo }: SoftLettersPageProps) {
  const [view, setView] = useState<SoftLettersView>('landing');
  const [contributorName, setContributorName] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [visited, setVisited] = useState<Record<number, boolean>>({ 0: true });

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const enterExhibition = () => {
    setCurrentStep(0);
    setVisited({ 0: true });
    setContributorName(null);
    setView('exhibition');
  };

  const exitToLanding = () => {
    setView('landing');
    setContributorName(null);
  };

  const exitToSofties = () => {
    setView('landing');
    setContributorName(null);
    window.setTimeout(() => {
      document.getElementById('softies-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 50);
  };

  const handleStepChange = (index: number) => {
    setCurrentStep(index);
    setVisited((prev) => ({ ...prev, [index]: true }));
  };

  const openContributor = (name: string) => {
    setContributorName(name);
    setView('contributor');
  };

  const backFromContributor = () => {
    const contributor = contributorName ? CONTRIBUTORS[contributorName] : null;
    if (contributor) {
      const roomIndex = EXHIBITION_STEPS.findIndex((step) => step.key === contributor.room);
      if (roomIndex >= 0) {
        handleStepChange(roomIndex);
      }
    }
    setView('exhibition');
    setContributorName(null);
  };

  return (
    <section className="screen active" id="screen-reading" aria-label="Soft Letters">
      <div className="wrap section-pad">
        {view === 'landing' ? (
          <>
            <div className="soft-letters-intro">
              <p className="eyebrow">Understand Community</p>
              <h1 className="soft-letters-title">Soft Letters</h1>
              <p className="soft-letters-lede">
                Editorial issues, curator&apos;s letters, and full exhibitions from the SQW community —
                each one built to walk through, not just read.
              </p>
            </div>

            <div className="grid g2 soft-letters-issues">
              {SOFT_LETTER_ISSUES.map((issue) =>
                issue.comingSoon ? (
                  <article
                    key={issue.number}
                    className="card soft-letters-issue soft-letters-issue--soon"
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
                ) : (
                  <button
                    key={issue.number}
                    type="button"
                    className="card soft-letters-issue soft-letters-issue--clickable"
                    onClick={enterExhibition}
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
                  </button>
                ),
              )}
            </div>

            <div className="divider" />

            <div id="softies-section">
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
          </>
        ) : null}

        {view === 'exhibition' ? (
          <StaticExhibition
            currentStep={currentStep}
            visited={visited}
            onStepChange={handleStepChange}
            onExit={exitToLanding}
            onExitToSofties={exitToSofties}
            onGo={onGo}
            onOpenContributor={openContributor}
          />
        ) : null}

        {view === 'contributor' && contributorName ? (
          <ContributorDetail name={contributorName} onBack={backFromContributor} />
        ) : null}
      </div>

      <div className="footer-band">{FOOTER_BAND}</div>
      <div className="site-footer">{FOOTER_COPY}</div>
    </section>
  );
}
