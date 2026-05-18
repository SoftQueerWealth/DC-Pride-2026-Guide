import { Heart } from 'lucide-react';
import {
  DONATION_BODY,
  DONATION_CTA_LABEL,
  DONATION_HEADLINE,
  DONATION_URL,
} from '../constants/donation';
import { trackDonationClick } from '../lib/analytics';

export function DonationSection() {
  return (
    <section className="donation-section" aria-label="Support the guide">
      <div className="donation-card">
        <h2 className="donation-headline">{DONATION_HEADLINE}</h2>
        <p className="donation-body">{DONATION_BODY}</p>
        <a
          href={DONATION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="donation-cta"
          onClick={() => trackDonationClick(DONATION_URL)}
        >
          <Heart size={14} strokeWidth={2} aria-hidden />
          {DONATION_CTA_LABEL}
        </a>
      </div>
    </section>
  );
}
