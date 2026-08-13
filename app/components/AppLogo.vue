<script setup lang="ts">
withDefaults(defineProps<{ variant?: "auto" | "inverse" }>(), {
  variant: "auto",
});
</script>

<template>
  <div class="flex items-center gap-3">
    <div
      class="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-brand-500 text-white shadow-lg shadow-brand-500/30"
    >
      <AppIcon icon="wrench" class="h-5 w-5" />
    </div>

    <div class="leading-tight">
      <p
        class="text-lg font-bold tracking-tight"
        :class="
          variant === 'inverse' ? 'text-white' : 'text-zinc-900 dark:text-white'
        "
      >
        GarageOS<span class="text-brand-500">.</span>
      </p>
      <p class="text-xs text-zinc-500 dark:text-zinc-400">Moins de paperasse</p>
    </div>
  </div>
</template>
