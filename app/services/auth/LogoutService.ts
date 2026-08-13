export const logoutService = async () => {
  const response = await fetch(`${import.meta.env.API_BASE_URL}/auth/logout`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error("Failed to log out.");
  }
};
