<template>
  <div
    :class="tabClasses"
    role="tab"
  >
    <slot>{{ label }}</slot>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    label?: string,
    active?: boolean,
    name: string
  }>(),
  {
    active: false,
    label: ''
  }
);

defineExpose<{
  name: string
}>({
  name: props.name
});

const tabClasses = computed(() => {
  return [ 'tab', props.active && 'tab--active' ];
});

</script>

<style lang="scss" scoped>
.tab {
  font-weight: 400;
  line-height: 24px;
  display: inline-block;
  min-width: 0;
  padding-bottom: 15px;
  user-select: none;
  transition: color .2s;
  text-align: left;
  color: var(--text-color-secondary);

  &:hover {
    color: var(--text-color-primary);
  }

  &--active {
    font-weight: 500;
    color: var(--text-color-primary);
  }
}
</style>