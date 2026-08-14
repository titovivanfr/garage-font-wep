<script setup lang="ts">
import { ArrowRight, Lock, Mail } from "@lucide/vue";
import type { LoginCredentials } from "~/types/auth";

const { login } = useAuth();

const form = reactive<LoginCredentials>({
  email: "",
  password: "",
  remember: false,
});

const submitted = ref<boolean>(false);
const submitting = ref<boolean>(false);
const formError = ref<string | null>(null);

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const emailError = computed(() => {
  if (!submitted.value) return "";
  if (!form.email) return "L'e-mail est requis.";
  if (!EMAIL_PATTERN.test(form.email))
    return "Entrez une adresse e-mail valide.";
  return "";
});

const passwordError = computed(() => {
  if (!submitted.value) return "";
  if (!form.password) return "Le mot de passe est requis.";
  if (form.password.length < 8)
    return "Le mot de passe doit contenir au moins 8 caractères.";
  return "";
});

async function onSubmit() {
  submitted.value = true;
  formError.value = null;

  if (emailError.value || passwordError.value) return;

  submitting.value = true;
  try {
    await login(form);
  } catch (error) {
    formError.value =
      error instanceof Error
        ? error.message
        : "Une erreur est survenue. Veuillez réessayer.";
  } finally {
    submitting.value = false;
  }
}
</script>

<template>
  <form novalidate class="space-y-6" @submit.prevent="onSubmit">
    <div class="space-y-1.5">
      <h1
        class="text-2xl font-bold tracking-tight text-zinc-900 dark:text-white"
      >
        Bienvenue
      </h1>
      <p class="text-sm text-zinc-500 dark:text-zinc-400">
        Connectez-vous pour gérer votre garage.
      </p>
    </div>

    <p
      v-if="formError"
      role="alert"
      class="rounded-lg border border-red-200 bg-red-50 px-3 py-2.5 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/50 dark:text-red-400"
    >
      {{ formError }}
    </p>

    <div class="space-y-4">
      <AppTextField
        id="email"
        v-model="form.email"
        label="Adresse e-mail"
        type="email"
        :icon="Mail"
        autocomplete="email"
        placeholder="votre-email@example.com"
        autofocus
        :error="emailError"
        :disabled="submitting"
      />

      <AppTextField
        id="password"
        v-model="form.password"
        label="Mot de passe"
        type="password"
        :icon="Lock"
        autocomplete="current-password"
        placeholder="••••••••"
        :error="passwordError"
        :disabled="submitting"
      />
    </div>

    <div class="flex items-center justify-between gap-4">
      <label
        class="flex cursor-pointer select-none items-center gap-2 text-sm text-zinc-600 dark:text-zinc-300"
      >
        <input
          v-model="form.remember"
          type="checkbox"
          class="h-4 w-4 rounded border-zinc-300 text-brand-500 accent-brand-500 focus:ring-brand-500 dark:border-zinc-700"
        />
        Se souvenir de moi
      </label>

      <a
        href="#"
        class="shrink-0 text-sm font-medium text-brand-600 transition-colors hover:text-brand-500 dark:text-brand-400"
        @click.prevent
      >
        Mot de passe oublié ?
      </a>
    </div>

    <button
      type="submit"
      :disabled="submitting"
      class="group flex w-full items-center justify-center gap-2 rounded-xl bg-brand-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-brand-500/30 transition-all hover:bg-brand-600 focus:outline-none focus:ring-2 focus:ring-brand-500/40 focus:ring-offset-2 focus:ring-offset-white disabled:cursor-not-allowed disabled:opacity-70 dark:focus:ring-offset-zinc-950"
    >
      <span
        v-if="submitting"
        class="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white"
        aria-hidden="true"
      />
      <template v-else>
        <span>Se connecter</span>
        <ArrowRight
          aria-hidden="true"
          class="h-4 w-4 transition-transform group-hover:translate-x-0.5"
        />
      </template>
    </button>
  </form>
</template>
