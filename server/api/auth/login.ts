import { defineEventHandler, parseCookies, proxyRequest } from "h3";

export default defineEventHandler(async (event) => {
  const { apiBase } = useRuntimeConfig().public;
  const xsrfCookie = parseCookies(event)["XSRF-TOKEN"];

  await proxyRequest(event, `${apiBase}/auth/login`, {
    headers: {
      accept: "application/json",
      ...(xsrfCookie
        ? { "x-xsrf-token": decodeURIComponent(xsrfCookie) }
        : {}),
    },
  });
});
