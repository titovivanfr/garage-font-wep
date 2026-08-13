<script setup lang="ts">
import { onBeforeMount } from "vue";
import { initCsrf } from "~/services/auth/CsrfTokenService";

onBeforeMount(async () => {
  await initCsrf();
});
</script>

<template>
  <div
    class="min-h-dvh bg-zinc-50 text-zinc-900 transition-colors duration-200 dark:bg-zinc-950 dark:text-zinc-100"
  >
    <NuxtPage />
  </div>
</template>
