<script setup lang="ts">
import { appIcons, type AppIconName } from "~/utils/icons";

defineProps<{ icon: AppIconName }>();
</script>

<template>
  <component :is="appIcons[icon]" aria-hidden="true" />
</template>
