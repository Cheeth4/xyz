<template>
  <div
    :style="legendCssVars"
    class="legend"
  >
    <div class="legend__indicator" />
    <div class="legend__label">
      <slot>{{ label }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = defineProps<{
  label?: string,
  color: string
}>();

const legendCssVars = computed(() => {
  return { '--indicator-color': props.color };
});
</script>

<style lang="scss" scoped>
.legend {
  font-size: 12px;
  display: flex;
  align-items: center;
  padding: 6px 8px;
  user-select: none;
  transition: background-color .2s;
  color: var(--text-color-secondary);
  border-radius: 4px;
  background-color: var(--input-bg-color);
  gap: 8px;

  &:hover {
    background-color: var(--input-bg-color-hover);
  }

  &__indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--indicator-color);
  }
}
</style>