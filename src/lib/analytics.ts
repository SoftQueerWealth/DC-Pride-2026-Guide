declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function trackClick(eventName: string, label: string): void {
  window.gtag?.('event', 'button_click', {
    event_category: 'Event Guide',
    event_label: label,
    event_name_custom: eventName,
  });
}

export function trackSocialClick(platform: string, url: string): void {
  window.gtag?.('event', 'social_link_click', {
    social_platform: platform,
    link_url: url,
    link_placement: 'hero',
  });
}
