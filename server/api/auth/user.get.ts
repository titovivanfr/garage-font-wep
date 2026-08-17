export default defineEventHandler(async (event) => {
  const cookie = getHeader(event, "cookie");

  console.log("Nuxt incoming cookie:", cookie);

  const { apiBase } = useRuntimeConfig().public;

  return await $fetch(`${apiBase}/user`, {
    headers: {
      Cookie: cookie || "",
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
});
