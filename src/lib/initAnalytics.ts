const GA_MEASUREMENT_ID = 'G-XWNSXDGLBC';

export { GA_MEASUREMENT_ID };

export function isAnalyticsEnabled(): boolean {
  return import.meta.env.VITE_ENABLE_ANALYTICS === 'true';
}

export function initAnalytics(): void {
  const enabled = isAnalyticsEnabled();
  const hasDocument = typeof document !== 'undefined';
  const gtagAlreadyInHtml = typeof window !== 'undefined' && typeof window.gtag === 'function';

  if (!enabled || !hasDocument) return;

  if (gtagAlreadyInHtml) return;

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag(...args: unknown[]) {
    window.dataLayer?.push(args);
  };
  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, { send_page_view: true });
}
