const CANONICAL_HOST = 'softqueerwealth.com';

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    const isProductionDomain = url.hostname === CANONICAL_HOST;
    const isWWW = url.hostname === 'www.softqueerwealth.com';

    // Only redirect www → apex
    if (isWWW) {
      url.hostname = CANONICAL_HOST;
      url.protocol = 'https:';
      return Response.redirect(url.toString(), 301);
    }

    // For everything else (including staging), DO NOT redirect
    return env.ASSETS.fetch(request);
  },
};