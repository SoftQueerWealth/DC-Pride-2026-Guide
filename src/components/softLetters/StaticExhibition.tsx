import { useEffect, useState } from 'react';
import type { RoomId } from '../../data/rooms';
import {
  ARCHIVE_CARDS,
  CONTINUE_CARDS,
  CONTRIBUTORS,
  EXHIBITION_STEPS,
  GALLERY_TABS,
  GALLERY_TONES,
  ROOM_GROUPS,
  STATIC_ISSUE_META,
  type ExhibitionStepKey,
} from '../../data/staticExhibition';

type StaticExhibitionProps = {
  currentStep: number;
  visited: Record<number, boolean>;
  onStepChange: (index: number) => void;
  onExit: () => void;
  onExitToSofties: () => void;
  onGo: (room: RoomId) => void;
  onOpenContributor: (name: string) => void;
};

function WelcomeStep() {
  return (
    <div className="two-col">
      <div>
        <h2 className="exhibition-h2">Welcome to STATIC</h2>
        <p className="exhibition-copy">
          Issue No. 001 · DC · July 2026. A Queer Trans Fashion Show. Walk through it in order, or
          use the map above to jump straight to a room.
        </p>
        <p className="exhibition-copy" style={{ marginTop: 10 }}>
          Eleven looks. Three designers. One night. Start with the Curator&apos;s Letter for the
          full story, or jump straight to the people who built it.
        </p>
      </div>
      <div className="placeholder dark" data-label="STATIC cover" style={{ height: 280, borderRadius: 10 }} />
    </div>
  );
}

function CuratorStep() {
  return (
    <>
      <p className="eyebrow" style={{ margin: '0 0 6px' }}>
        Curator&apos;s Letter
      </p>
      <h2 className="exhibition-h2" style={{ marginBottom: 18 }}>
        What STATIC Was Trying to Say
      </h2>
      <div
        className="placeholder dark"
        data-label="Runway photography — opening look"
        style={{ height: 340, borderRadius: 12 }}
      />
      <div className="story-section">
        <p>
          Four months before opening night, STATIC was a shared note titled &quot;the thing.&quot; No
          theme, no budget, no venue — just a feeling that Black queer and trans fashion deserved a
          room built entirely around it, instead of a corner of someone else&apos;s.
        </p>
        <p>
          By the time the lights came up, that note had become eleven looks, three designers, a set
          built from scratch, and a floor full of people who came to be seen, not just to watch.
        </p>
        <blockquote className="pull-quote">
          &quot;We didn&apos;t want people to just look at the clothes. We wanted them to feel like
          they walked into someone&apos;s becoming.&quot;
        </blockquote>
        <h3 className="exhibition-h3">The Room</h3>
        <p>
          The floor plan mattered as much as the garments. Every seat was close enough to see the
          stitching. There was no backstage curtain — the audience watched the models prepare,
          because half the point was showing the work, not just the result.
        </p>
        <div className="grid g2" style={{ margin: '18px 0' }}>
          <div
            className="placeholder rose"
            data-label="Audience reactions, front row"
            style={{ height: 200, borderRadius: 10 }}
          />
          <div
            className="placeholder sage"
            data-label="Backstage, final touches"
            style={{ height: 200, borderRadius: 10 }}
          />
        </div>
        <h3 className="exhibition-h3">What It Took</h3>
        <p>
          Three designers built collections from nothing but a shared mood board and too little
          sleep. The set was built and struck in the same 48 hours. Every model walked their own
          choreography — nothing was rehearsed to sameness.
        </p>
        <blockquote className="pull-quote">
          &quot;Static isn&apos;t noise. It&apos;s the sound right before something comes through
          clearly.&quot;
        </blockquote>
        <div
          className="placeholder"
          data-label="Fashion detail — closing look, fabric & construction"
          style={{ height: 220, borderRadius: 10, margin: '18px 0' }}
        />
        <h3 className="exhibition-h3">In Briana&apos;s Words</h3>
        <div className="exhibition-clip">
          <div
            className="placeholder dark"
            data-label="▶ Interview clip"
            style={{ width: 120, height: 80, borderRadius: 8, flexShrink: 0 }}
          />
          <p>
            A short clip from our conversation with Briana on why this issue opens with a fashion
            show, not an essay.{' '}
            <span className="exhibition-clip-cta">Watch (0:47) →</span>
          </p>
        </div>
        <p>
          Thank you to everyone who trusted us with their story, their clothes, their faces. This
          issue is for you, and for whoever needed to see it.
        </p>
        <div
          className="placeholder rose"
          data-label="Recap reel — opening night, full show"
          style={{ height: 260, borderRadius: 12, marginTop: 18 }}
        />
      </div>
    </>
  );
}

function RoomStep({
  roomKey,
  onOpenContributor,
}: {
  roomKey: 'room1' | 'room2' | 'room3';
  onOpenContributor: (name: string) => void;
}) {
  const room = ROOM_GROUPS[roomKey];
  return (
    <>
      <h2 className="exhibition-h2" style={{ marginBottom: 4 }}>
        {room.title}
      </h2>
      <p className="exhibition-copy" style={{ marginBottom: 14 }}>
        {room.subtitle}
      </p>
      <p className="exhibition-copy" style={{ maxWidth: 620, marginBottom: 16 }}>
        {room.intro}
      </p>
      <blockquote className="pull-quote" style={{ margin: '0 0 26px' }}>
        {room.quote}
      </blockquote>
      <div className="contrib-grid">
        {room.contributors.map((name) => {
          const contributor = CONTRIBUTORS[name];
          return (
            <button
              key={name}
              type="button"
              className="contrib-card"
              onClick={() => onOpenContributor(name)}
            >
              <div className="placeholder dark ph" data-label="" />
              <h4>{name}</h4>
              <p className="contrib-role">{contributor.role}</p>
              <p className="contrib-teaser">{contributor.teaser}</p>
              <p className="contrib-link">View full profile →</p>
            </button>
          );
        })}
      </div>
    </>
  );
}

function GalleryStep() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <>
      <h2 className="exhibition-h2" style={{ marginBottom: 4 }}>
        Gallery
      </h2>
      <p className="exhibition-copy" style={{ marginBottom: 18 }}>
        Visual storytelling from the exhibition floor.
      </p>
      <div className="tabs" role="tablist" aria-label="Gallery filters">
        {GALLERY_TABS.map((tab, index) => (
          <button
            key={tab}
            type="button"
            role="tab"
            className={activeTab === index ? 'active' : undefined}
            aria-selected={activeTab === index}
            onClick={() => setActiveTab(index)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="gallery-thumbs">
        {GALLERY_TONES.map((tone, index) => (
          <div
            key={`${tone}-${index}`}
            className={`placeholder ${tone}`}
            style={{ height: 120, borderRadius: 8 }}
          />
        ))}
      </div>
    </>
  );
}

function ArchiveStep() {
  return (
    <>
      <h2 className="exhibition-h2" style={{ marginBottom: 4 }}>
        Archive
      </h2>
      <p className="exhibition-copy" style={{ marginBottom: 18 }}>
        Documenting the moment.
      </p>
      <div className="grid g3">
        {ARCHIVE_CARDS.map((card) => (
          <div key={card.eyebrow} className="card body" style={{ padding: 16 }}>
            <p className="eyebrow" style={{ marginBottom: 2 }}>
              {card.eyebrow}
            </p>
            <h4 style={{ margin: '0 0 4px' }}>{card.title}</h4>
            <p>View →</p>
          </div>
        ))}
      </div>
    </>
  );
}

function ContinueStep({
  onExitToSofties,
  onGo,
}: {
  onExitToSofties: () => void;
  onGo: (room: RoomId) => void;
}) {
  return (
    <>
      <h2 className="exhibition-h2" style={{ marginBottom: 4 }}>
        Continue Exploring
      </h2>
      <p className="exhibition-copy" style={{ marginBottom: 18 }}>
        You explored the exhibition. Now discover more creatives, stories, events, and cultural
        history.
      </p>
      <div className="grid g4">
        {CONTINUE_CARDS.map((card) => (
          <button
            key={card.title}
            type="button"
            className="explore-card"
            onClick={() => {
              if (card.action === 'softies') onExitToSofties();
              else if (card.room) onGo(card.room);
            }}
          >
            <div className="ic">{card.icon}</div>
            <h4>{card.title}</h4>
            <p>{card.body}</p>
          </button>
        ))}
      </div>
    </>
  );
}

function StepContent({
  stepKey,
  onOpenContributor,
  onExitToSofties,
  onGo,
}: {
  stepKey: ExhibitionStepKey;
  onOpenContributor: (name: string) => void;
  onExitToSofties: () => void;
  onGo: (room: RoomId) => void;
}) {
  switch (stepKey) {
    case 'welcome':
      return <WelcomeStep />;
    case 'curator':
      return <CuratorStep />;
    case 'room1':
    case 'room2':
    case 'room3':
      return <RoomStep roomKey={stepKey} onOpenContributor={onOpenContributor} />;
    case 'gallery':
      return <GalleryStep />;
    case 'archive':
      return <ArchiveStep />;
    case 'continue':
      return <ContinueStep onExitToSofties={onExitToSofties} onGo={onGo} />;
    default:
      return null;
  }
}

export function StaticExhibition({
  currentStep,
  visited,
  onStepChange,
  onExit,
  onExitToSofties,
  onGo,
  onOpenContributor,
}: StaticExhibitionProps) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentStep]);

  const jumpTo = (index: number) => {
    onStepChange(index);
  };

  const stepBy = (delta: number) => {
    const next = currentStep + delta;
    if (next < 0) {
      onExit();
      return;
    }
    if (next > EXHIBITION_STEPS.length - 1) return;
    jumpTo(next);
  };

  const step = EXHIBITION_STEPS[currentStep];
  const isLast = currentStep === EXHIBITION_STEPS.length - 1;

  return (
    <div className="exhibition" id="exhibition">
      <div className="exhibition-topbar">
        <button type="button" className="crumb" onClick={onExit}>
          ← Back to Soft Letters
        </button>
        <div className="exhibition-topbar-meta">
          <p className="eyebrow" style={{ margin: 0 }}>
            {STATIC_ISSUE_META.eyebrow}
          </p>
          <h2 className="exhibition-issue-title">{STATIC_ISSUE_META.title}</h2>
        </div>
      </div>

      <div className="map-strip" role="navigation" aria-label="Exhibition map">
        {EXHIBITION_STEPS.map((s, index) => {
          const isActive = index === currentStep;
          const isDone = Boolean(visited[index] && !isActive);
          return (
            <button
              key={s.key}
              type="button"
              className={`map-node${isActive ? ' active' : ''}${isDone ? ' done' : ''}`}
              onClick={() => jumpTo(index)}
            >
              <span className="line" aria-hidden />
              <span className="dot" aria-hidden />
              <span className="lbl">{s.label}</span>
              <span className="sub">{s.sub}</span>
            </button>
          );
        })}
      </div>

      <div className="exhibition-content">
        <StepContent
          stepKey={step.key}
          onOpenContributor={onOpenContributor}
          onExitToSofties={onExitToSofties}
          onGo={onGo}
        />
      </div>

      <div className="step-nav">
        <button type="button" className="btn ghost small" onClick={() => stepBy(-1)}>
          {currentStep === 0 ? '← Back to Soft Letters' : '← Back'}
        </button>
        {!isLast ? (
          <button type="button" className="btn small" onClick={() => stepBy(1)}>
            Next →
          </button>
        ) : null}
      </div>
    </div>
  );
}
