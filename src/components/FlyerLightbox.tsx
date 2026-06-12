import { useEffect } from 'react';

interface FlyerLightboxProps {
  src: string;
  label: string;
  onClose: () => void;
}

export function FlyerLightbox({ src, label, onClose }: FlyerLightboxProps) {
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose();
    };

    document.addEventListener('keydown', onKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [onClose]);

  return (
    <div
      className="flyer-lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label={`Flyer for ${label}`}
      onClick={onClose}
    >
      <div className="flyer-lightbox-modal" onClick={(event) => event.stopPropagation()}>
        <button type="button" className="flyer-lightbox-close" aria-label="Close flyer" onClick={onClose}>
          ✕
        </button>
        <img
          src={src}
          alt={`Flyer for ${label}`}
          className="flyer-lightbox-image"
          referrerPolicy="no-referrer"
        />
      </div>
    </div>
  );
}
