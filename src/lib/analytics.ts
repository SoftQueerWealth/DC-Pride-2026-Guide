declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export enum SocialPlatform {
  Instagram = 'instagram',
  Threads = 'threads',
  Linktree = 'linktree',
  Email = 'email',
}

function shouldTrackAnalytics(): boolean {
  return import.meta.env.PROD && typeof window !== 'undefined' && Boolean(window.gtag);
}

export function trackClick(eventName: string, label: string): void {
  if (!shouldTrackAnalytics()) return;

  window.gtag?.('event', 'button_click', {
    event_category: 'Event Guide',
    event_label: label,
    event_name_custom: eventName,
  });
}

export function trackBeautyClick(partnerName: string, url: string): void {
  if (!shouldTrackAnalytics()) return;

  window.gtag?.('event', 'beauty_partner_click', {
    event_category: 'Community Perks',
    event_label: 'Book Here',
    partner_name: partnerName,
    link_url: url,
  });
}

export function trackSocialClick(platform: SocialPlatform, url: string): void {
  if (!shouldTrackAnalytics()) return;

  window.gtag?.('event', 'social_link_click', {
    social_platform: platform,
    link_url: url,
    link_placement: 'hero',
  });
}

export function trackItineraryShare(eventCount: number): void {
  if (!shouldTrackAnalytics()) return;

  window.gtag?.('event', 'itinerary_share', {
    event_category: 'Event Guide',
    event_label: 'Share itinerary',
    event_count: eventCount,
  });
}

export function trackItineraryViewToggle(mode: string): void {
  if (!shouldTrackAnalytics()) return;

  window.gtag?.('event', 'itinerary_view_toggle', {
    event_category: 'Event Guide',
    event_label: mode,
  });
}

export function trackSharedItineraryOpen(eventCount: number): void {
  if (!shouldTrackAnalytics()) return;

  window.gtag?.('event', 'shared_itinerary_open', {
    event_category: 'Event Guide',
    event_label: 'Shared link landing',
    event_count: eventCount,
  });
}

export function trackDonationClick(linkUrl: string): void {
  if (!shouldTrackAnalytics()) return;

  window.gtag?.('event', 'donation_click', {
    event_category: 'Support',
    event_label: 'Support SoftQueerWealth',
    link_url: linkUrl,
  });
}
