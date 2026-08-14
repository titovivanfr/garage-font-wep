export const initCsrf = async (): Promise<void> => {
  await $fetch("/api/auth/csrf", { credentials: "include" });
};
