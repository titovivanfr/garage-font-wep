import { defineEventHandler, proxyRequest } from "h3";

export default defineEventHandler(async (event) => {
  const { apiBase } = useRuntimeConfig().public;
  await proxyRequest(event, `${apiBase}/auth/logout`);
});
