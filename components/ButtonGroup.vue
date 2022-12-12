<template>
  <span :class="buttonGroupClasses">
    <slot />
  </span>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    gap?: 'sm' | 'md'
  }>(),
  {
    gap: 'sm'
  }
);

const buttonGroupClasses = computed(() => {
  return [ 'button-group', 'button-group--gap-' + props.gap ];
});
</script>

<style lang="scss" scoped>
.button-group {
  display: inline-flex;

  &--gap-sm {
    gap: 8px;
  }

  &--gap-md {
    gap: 16px;
  }
}
</style>