<template>
  <button
    ref="button"
    :class="buttonClasses"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { templateRef } from '@vueuse/core';

const props = withDefaults(
  defineProps<{
    color?: 'primary' | 'secondary' | 'plain',
    iconOnly?: boolean
    label?: string,
    size?: 'sm' | 'md' | 'lg'
  }>(),
  {
    color: 'primary',
    iconOnly: false,
    label: '',
    size: 'md'
  }
);

const buttonRef = templateRef('button');

const buttonClasses = computed(() => {
  return [ 'button', props.iconOnly && 'button--icon-only',
    'button--color-' + props.color, 'button--size-' + props.size
  ];
});


</script>

<style lang="scss" scoped>
.button {
  font-size: 14px;
  font-weight: 600;
  position: relative;
  height: var(--button-size);
  padding: 0 16px;
  cursor: pointer;
  transition: background-color .2s;
  border-radius: 4px;

  &--size-sm {
    --button-size: 32px;
  }

  &--size-md {
    --button-size: 40px;
  }

  &--size-lg {
    --button-size: 48px;
  }

  &--icon-only {
    width: var(--button-size);
    height: var(--button-size);
    padding: 0;
  }

  &--color-primary {
    color: #FFFFFF;
    background-color: var(--color-primary);

    &:hover {
      background-color: #673de0;
    }
  }

  &--color-secondary {
    color: var(--color-primary);
    background-color: #FFFFFF;
    box-shadow: 0 0 0 1px inset #EBEBF3;

    &:hover {
      background-color: #f5f2ff;
    }
  }
}
</style>