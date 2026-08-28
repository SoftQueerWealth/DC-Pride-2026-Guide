type CommunityGuidelinesModalProps = {
  open: boolean;
  onClose: () => void;
};

export function CommunityGuidelinesModal({ open, onClose }: CommunityGuidelinesModalProps) {
  if (!open) return null;

  return (
    <div
      className="modal-overlay open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="guidelines-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-box">
        <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
          ✕
        </button>
        <p className="eyebrow" style={{ margin: 0 }}>
          Soft Queer Wealth
        </p>
        <h2 id="guidelines-modal-title" style={{ margin: '0 0 6px' }}>
          Community Guidelines
        </h2>
        <p style={{ color: 'var(--ink-soft)', fontSize: 13, lineHeight: 1.8, margin: 0 }}>
          Full community guidelines coming soon.
        </p>
      </div>
    </div>
  );
}
