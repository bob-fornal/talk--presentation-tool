var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// functionality_core.js
function handleCookie(request, response, hostname) {
  const cookieDomain = hostname;
  const cookieExpiration = 86400;
  const city = request.cf.city || "not captured";
  const state = request.cf.region || request.cf.regionCode || "not captured";
  const zipcode = request.cf.postalCode || "not captured";
  const cookieValue = JSON.stringify({ city, state, zipcode });
  response = new Response(response.body, response);
  response.headers.set(
    "Set-Cookie",
    `CloudflareDemo=${cookieValue}; Max-Age=${cookieExpiration};Domain=${cookieDomain};`
  );
  return response;
}
__name(handleCookie, "handleCookie");

// worker.js
var worker_default = {
  async fetch(request, env, ctx) {
    const urlObject = new URL(request.url);
    const domain = urlObject.hostname;
    const response = await fetch(request);
    const cookieResponse = handleCookie(request, response, domain);
    return cookieResponse;
  }
};
export {
  worker_default as default
};
//# sourceMappingURL=worker.js.map
