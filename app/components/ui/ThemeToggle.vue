<script setup lang="ts">
import { Moon, Sun } from "@lucide/vue";

const { theme, toggle } = useTheme();
</script>

<template>
  <button
    type="button"
    :aria-label="theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'"
    class="inline-flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 shadow-sm transition-colors hover:text-brand-600 dark:border-zinc-800 dark:bg-zinc-900 dark:text-zinc-400 dark:hover:text-brand-400"
    @click="toggle"
  >
    <component
      :is="theme === 'dark' ? Sun : Moon"
      aria-hidden="true"
      class="h-5 w-5"
    />
  </button>
</template>
