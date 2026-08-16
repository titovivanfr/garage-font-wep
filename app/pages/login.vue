<script setup lang="ts">
import { Check } from "@lucide/vue";
import PublicNav from "~/components/nav/PublicNav.vue";
import TopNav from "~/components/nav/TopNav.vue";
import LoginForm from "~/components/auth/LoginForm.vue";

const { session, logout } = useAuth();
</script>

<template>
  <main class="flex min-h-dvh flex-col">
    <header
      class="flex items-center justify-between px-4 pt-4 sm:px-6 lg:px-10"
    >
      <PublicNav v-if="!session" />
      <TopNav v-if="session" />
    </header>

    <div
      class="flex flex-1 items-center justify-center px-4 py-10 sm:px-6 lg:px-10"
    >
      <div class="w-full max-w-md">
        <div
          v-if="session"
          class="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center dark:border-emerald-900/50 dark:bg-emerald-950/40"
        >
          <div
            class="mx-auto mb-4 grid h-14 w-14 place-items-center rounded-full bg-emerald-500 text-white"
          >
            <Check aria-hidden="true" class="h-7 w-7" />
          </div>
          <h2 class="text-xl font-bold text-emerald-900 dark:text-emerald-100">
            Signed in as {{ session.user.email }}
          </h2>
          <p class="mt-1 text-sm text-emerald-700 dark:text-emerald-300/80">
            Welcome back, {{ session.user.name }}.
          </p>
          <p class="mt-4 text-xs text-emerald-600/70 dark:text-emerald-400/60">
            Demo mode — no backend connected yet.
          </p>
          <button
            type="button"
            class="mt-4 w-full rounded-xl border border-emerald-300 px-4 py-2 text-sm font-semibold text-emerald-700 transition-colors hover:bg-emerald-100 dark:border-emerald-800 dark:text-emerald-300 dark:hover:bg-emerald-900/40"
            @click="logout"
          >
            Se déconnecter
          </button>
        </div>
        <LoginForm v-else />
      </div>
    </div>
  </main>
</template>
