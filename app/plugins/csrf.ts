export default defineNuxtPlugin(() => {
  if (import.meta.client) {
    $fetch("/api/auth/csrf", { credentials: "include" });
  }
});
