<template>
  <div
    :class="menuClasses"
    :style="menuCssVars"
  >
    <MenuButton
      class="menu__activator"
      @click="toggleOpen"
    >
      <MenuIcon class="activator-icon" />
    </MenuButton>
    <div class="menu__items-wrapper">
      <ul
        ref="items"
        class="menu__items"
      >
        <li
          v-for="item in items"
          :key="item.name"
          class="menu-item"
          @click="handleItemSelect"
        >
          {{ item.label }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import MenuButton from '~/components/menu/MenuButton.vue';
import MenuIcon from 'assets/icons/dots-horizontal.svg';
import { computedWithControl, onClickOutside, templateRef, useToggle } from '@vueuse/core';
import { computed } from 'vue';

type MenuItem = {
  label: string,
  name: string
}

withDefaults(
  defineProps<{
    items: MenuItem[]
  }>(),
  {
    items: () => []
  }
);

const emit = defineEmits<{
  (e: 'option-select', name: string): void
}>();

const itemsRef = templateRef<HTMLDivElement>('items');

const [ isOpen, toggleOpen ] = useToggle();

const menuCssVars = computedWithControl(
  () => isOpen.value,
  () => {
    const itemsEl = itemsRef.value;

    if (itemsEl && isOpen.value) {
      const { width, height } = itemsEl.getBoundingClientRect();

      return {
        '--menu-width': width + 'px',
        '--menu-height': height + 'px'
      };
    }
    return null;
  }
);

onClickOutside(itemsRef, () => {
  toggleOpen(false);
});

const menuClasses = computed(() => {
  return [ 'menu', isOpen.value && 'menu--open' ];
});

const handleItemSelect = (item: MenuItem) => {
  emit('option-select', item.name);
  toggleOpen(false);
};
</script>

<style lang="scss" scoped>
.menu {
  position: relative;
  width: 32px;
  height: 32px;

  &__activator.menu-button {
    z-index: 10;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: opacity .2s, background-color .2s;
    opacity: 1;
    background-color: transparent;

    .activator-icon {
      width: 20px;
    }
  }

  &__activator, &__items-wrapper {
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    height: 32px;

  }

  &--open &__activator {
    pointer-events: none;
    opacity: 0;
  }

  &--open &__items-wrapper {
    width: var(--menu-width);
    height: var(--menu-height);
    background-color: #FFFFFF;
    box-shadow: 0 4px 22px 0 #34354120;

    .menu-item {
      opacity: 1;
    }
  }

  &__items-wrapper {
    z-index: 1;
    overflow: hidden;
    transition-timing-function: ease-in-out;
    transition-duration: .2s;
    transition-property: background-color, width, height, box-shadow;
    border-radius: 8px;
    background-color: transparent;
  }

  &__items {
    position: absolute;
    top: 0;
    right: 0;
    padding: 8px 0;

    .menu-item {
      font-size: 15px;
      padding: 8px 20px;
      user-select: none;
      transition: background-color .2s, opacity .2s;
      white-space: nowrap;
      opacity: 0;

      &:hover {
        background-color: #f8f8f8;
      }
    }
  }
}
</style>