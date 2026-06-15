const GA_MEASUREMENT_ID = 'G-XWNSXDGLBC';

export function isAnalyticsEnabled(): boolean {
  return import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
}

export function initAnalytics(): void {
  if (!isAnalyticsEnabled() || typeof document === 'undefined') return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID);
}
