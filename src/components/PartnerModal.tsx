type PartnerModalProps = {
  open: boolean;
  onClose: () => void;
};

export function PartnerModal({ open, onClose }: PartnerModalProps) {
  if (!open) return null;

  return (
    <div
      className="modal-overlay open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="partner-modal-title"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="modal-box">
        <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
          ✕
        </button>
        <p className="eyebrow" style={{ margin: 0 }}>
          Work With Us
        </p>
        <h2 id="partner-modal-title" style={{ margin: '0 0 6px' }}>
          Partner With Us
        </h2>
        <p style={{ color: 'var(--ink-soft)', fontSize: 13, margin: 0 }}>
          Tell us a little about what you&apos;re looking for — we read every note.
        </p>
        <div className="modal-option">
          <h4>Partnership Inquiries</h4>
          <p>Brand partnerships, sponsorships, vendor tables, and business collaborations.</p>
          <a
            className="btn small"
            href="mailto:hello@softqueerwealth.com?subject=Partnership%20Inquiry"
          >
            Email hello@softqueerwealth.com →
          </a>
        </div>
        <div className="modal-option">
          <h4>Community Submissions</h4>
          <p>
            Submit an event, a Softie of the Month nomination, or a story for The Soft Letter.
          </p>
          <a
            className="btn ghost small"
            href="mailto:submissions@softqueerwealth.com?subject=Community%20Submission"
          >
            Email submissions@softqueerwealth.com →
          </a>
        </div>
      </div>
    </div>
  );
}
