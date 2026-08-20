import { proxyRequest } from "h3";

export default defineEventHandler(async (event) => {
  const { apiBase } = useRuntimeConfig().public;
  return await proxyRequest(event, `${apiBase}/user`, {
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
});
