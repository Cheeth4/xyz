<template>
  <div class="item">
    <div
      v-if="$slots.label || label"
      class="item__label"
    >
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <div class="item__value">
      <slot>{{ value }}</slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  label?: string,
  value?: any
}>();
</script>

<style lang="scss" scoped>
.item {
  font-size: 14px;

  &__label {
    margin-bottom: 6px;
    color: var(--text-color-secondary);
  }

  &__value {
    font-weight: 600;
    color: var(--text-color-primary);
  }
}
</style>