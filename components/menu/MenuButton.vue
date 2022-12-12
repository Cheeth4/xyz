<template>
  <BaseButton
    :class="menuButtonClasses"
    :size="size"
    color="plain"
    icon-only
  >
    <slot />
  </BaseButton>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    indicator?: boolean,
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    indicator: false,
    size: 'md'
  }
);

const menuButtonClasses = computed(() => {
  return [ 'menu-button', props.indicator && 'menu-button--with-indicator' ];
});
</script>

<style lang="scss" scoped>
.menu-button {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color .2s;
  background-color: var(--input-bg-color);

  &:hover {
    background-color: var(--input-bg-color-hover);

    :slotted(svg) {
      filter: contrast(0)
    }
  }

  :slotted(svg) {
    width: 20px;
    height: 20px;
    transition: filter .2s;
  }

  &--with-indicator::before {
    position: absolute;
    z-index: 1;
    top: -1px;
    right: -2px;
    width: 12px;
    height: 12px;
    content: '';
    border: 2px solid #FFFFFF;
    border-radius: 50%;
    background-color: var(--text-color-danger);
  }
}
</style>