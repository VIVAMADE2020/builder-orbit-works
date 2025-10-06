export default {
  async fetch(request: Request, env: { ASSETS: Fetcher }, _ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);

    // Try to serve the static asset first
    const assetResponse = await env.ASSETS.fetch(request);

    // If not found and it's likely a client-side route, fallback to index.html
    if (assetResponse.status === 404 && request.method === "GET") {
      const hasExtension = /\.[a-zA-Z0-9]+$/.test(url.pathname);
      const isApi = url.pathname.startsWith("/api");
      if (!hasExtension && !isApi) {
        const indexReq = new Request(new URL("/index.html", url).toString(), request);
        return env.ASSETS.fetch(indexReq);
      }
    }

    return assetResponse;
  },
};
