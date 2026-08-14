import { onMounted, ref, watch } from "vue";

export type Theme = "light" | "dark";

const STORAGE_KEY = "garage-theme";

export function useTheme() {
  const theme = ref<Theme>("dark");

  if (import.meta.client) {
    const root = document.documentElement;

    onMounted(() => {
      theme.value = root.classList.contains("dark") ? "dark" : "light";
    });

    watch(theme, (value) => {
      root.classList.toggle("dark", value === "dark");
      root.style.colorScheme = value;
      localStorage.setItem(STORAGE_KEY, value);
    });
  }

  const toggle = () => {
    theme.value = theme.value === "dark" ? "light" : "dark";
  };

  return { theme, toggle };
}
