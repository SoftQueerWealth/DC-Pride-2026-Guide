import { useState } from 'react';
import {
  CONTRIBUTOR_TABS,
  CONTRIBUTORS,
  GALLERY_TONES,
} from '../../data/staticExhibition';

type ContributorDetailProps = {
  name: string;
  onBack: () => void;
};

export function ContributorDetail({ name, onBack }: ContributorDetailProps) {
  const contributor = CONTRIBUTORS[name];
  const [activeTab, setActiveTab] = useState(0);

  if (!contributor) return null;

  return (
    <div className="contributor-detail">
      <button type="button" className="crumb" onClick={onBack}>
        ← Back to {contributor.roomLabel}
      </button>
      <h1 className="contributor-name">{contributor.name}</h1>
      <p className="contributor-role">{contributor.role}</p>
      <div
        className="placeholder dark"
        data-label="Interview video"
        style={{ height: 320, borderRadius: 10 }}
      />
      <div className="tabs" role="tablist" aria-label="Contributor sections">
        {CONTRIBUTOR_TABS.map((tab, index) => (
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
      <div className="two-col">
        <p className="exhibition-copy" style={{ lineHeight: 1.7 }}>
          {contributor.bio}
        </p>
        <div
          className="placeholder rose"
          data-label="Portrait"
          style={{ height: 200, borderRadius: 10 }}
        />
      </div>
      <button type="button" className="btn ghost small" style={{ marginTop: 20 }}>
        View Gallery
      </button>
      <div className="gallery-thumbs" style={{ marginTop: 14 }}>
        {GALLERY_TONES.slice(0, 4).map((tone, index) => (
          <div
            key={`${tone}-${index}`}
            className={`placeholder ${tone}`}
            style={{ height: 90, borderRadius: 8 }}
          />
        ))}
      </div>
    </div>
  );
}
