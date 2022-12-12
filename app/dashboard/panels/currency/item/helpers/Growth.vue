<template>
  <Item
    :class="growthClasses"
    :label="label"
  >
    <span class="growth__value">
      {{ formattedChange }}
    </span>
    <span class="growth__icon">
      <component
        :is="iconComponent"
        class="growth-icon"
      />
    </span>
  </Item>
</template>

<script lang="ts" setup>
import Item from './Item.vue';
import IncreaseIcon from 'assets/icons/increase.svg';
import DecreaseIcon from 'assets/icons/decrease.svg';

import { computed } from 'vue';

const props = defineProps<{
  label?: string,
  value: number
}>();

const hasGrown = computed(() => {
  return props.value > 0;
});

const formattedChange = computed(() => {
  return `${ hasGrown.value ? '+' : '-' } ${ Math.abs(props.value).toFixed(2) }%`;
});

const growthClasses = computed(() => {
  return [ 'growth', hasGrown.value ? 'growth--increase' : 'growth--decrease' ];
});

const iconComponent = computed(() => {
  return hasGrown.value ? IncreaseIcon : DecreaseIcon;
});
</script>

<style lang="scss" scoped>
.growth {

  :deep(.item__label) {
    margin-bottom: 4px;
  }

  :deep(.item__value) {
    display: inline-flex;
    align-items: center;
  }

  &__value {
    margin-right: 5px;
  }

  &--increase &__value {
    color: var(--text-color-success);
  }

  &--decrease &__value {
    color: var(--text-color-danger);
  }

  &__icon > .growth-icon {
    position: relative;
    top: 1px;
    width: 16px;
    height: 16px;
  }
}
</style>