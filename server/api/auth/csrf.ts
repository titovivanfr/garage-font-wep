import { defineEventHandler, proxyRequest } from "h3";

export default defineEventHandler(async (event) => {
  const { backendBase } = useRuntimeConfig().public;
  await proxyRequest(event, `${backendBase}/sanctum/csrf-cookie`);
});
