<script setup lang="ts">
import { computed, ref } from "vue";
import type { AppIconName } from "~/utils/icons";

const props = withDefaults(
  defineProps<{
    id: string;
    label: string;
    type?: "email" | "password" | "text";
    autocomplete?: string;
    placeholder?: string;
    icon?: AppIconName;
    error?: string;
    disabled?: boolean;
    autofocus?: boolean;
  }>(),
  { type: "text" },
);

const model = defineModel<string>({ default: "" });

const showPassword = ref(false);

const inputType = computed(() => (props.type === "password" && showPassword.value ? "text" : props.type));

const hasIcon = computed(() => Boolean(props.icon));
const hasToggle = computed(() => props.type === "password");
const hasError = computed(() => Boolean(props.error));
</script>

<template>
  <div class="space-y-1.5">
    <label :for="id" class="block text-sm font-medium text-zinc-700 dark:text-zinc-300">
      {{ label }}
    </label>

    <div class="relative">
      <AppIcon
        v-if="hasIcon"
        :icon="icon!"
        class="pointer-events-none absolute left-3.5 top-1/2 h-5 w-5 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
      />

      <input
        :id="id"
        v-model="model"
        :type="inputType"
        :autocomplete="autocomplete"
        :placeholder="placeholder"
        :disabled="disabled"
        :autofocus="autofocus"
        :aria-invalid="hasError"
        :aria-describedby="hasError ? `${id}-error` : undefined"
        class="w-full rounded-xl border bg-white px-3.5 py-3 text-sm text-zinc-900 shadow-sm outline-none transition-colors placeholder:text-zinc-400 focus:ring-2 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-900 dark:text-zinc-100 dark:placeholder:text-zinc-500"
        :class="[
          hasIcon ? 'pl-11' : '',
          hasToggle ? 'pr-11' : '',
          hasError
            ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20'
            : 'border-zinc-200 focus:border-brand-500 focus:ring-brand-500/20 dark:border-zinc-700',
        ]"
      />

      <button
        v-if="hasToggle"
        type="button"
        :aria-label="showPassword ? 'Hide password' : 'Show password'"
        class="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-zinc-400 transition-colors hover:text-zinc-600 dark:hover:text-zinc-200"
        @click="showPassword = !showPassword"
      >
        <AppIcon :icon="showPassword ? 'eyeOff' : 'eye'" class="h-5 w-5" />
      </button>
    </div>

    <p v-if="hasError" :id="`${id}-error`" class="text-xs text-red-500">{{ error }}</p>
  </div>
</template>
