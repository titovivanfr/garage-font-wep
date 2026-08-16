export default defineNuxtPlugin(async () => {
  if (import.meta.server) {
    const { fetchUser } = useAuth();
    await fetchUser().catch(() => {});
  }
});
