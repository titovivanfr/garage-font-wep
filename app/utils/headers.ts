export const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": import.meta.env.NUXT_DOMAIN,
  "Content-Security-Policy":
    "default-src 'self'; script-src 'self'; connect-src " +
    import.meta.env.API_BASE_URL +
    "; style-src 'self'; frame-ancestors 'none'; object-src 'none'",
  "Strict-Transport-Security": "max-age=31536000;",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "no-referrer",
  "Permissions-Policy":
    "camera=(self), microphone=(self), geolocation=(self), payment=(self), usb=()",
};
