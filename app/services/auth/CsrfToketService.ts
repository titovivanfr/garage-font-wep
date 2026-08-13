export const initCsrf = async (): Promise<void> => {
  const config = useRuntimeConfig();

  await fetch(`${config.public.apiBase}/sanctum/csrf-cookie`, {
    method: "GET",
    credentials: "include",
  });
};
