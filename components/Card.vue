<template>
  <div class="card">
    <div
      v-if="$slots.header || header"
      class="card__header"
    >
      <slot name="header">
        <h2 class="header-content">
          {{ header }}
        </h2>
        <Menu
          :items="menuItems"
          @option-select="handleItemClick"
        />
      </slot>
    </div>
    <div class="card__content">
      <slot />
    </div>
    <div
      v-if="$slots.footer"
      class="card__footer"
    >
      <slot name="footer" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Menu from '~/components/menu/Menu.vue';

defineProps<{
  header?: string
}>();

const menuItems = [
  {
    label: 'Pro tip',
    name: 'pro-tip-1'
  },
  {
    label: 'Pro tip #2',
    name: 'pro-tip-2'
  }
];

const handleItemClick = (name: string) => {

};
</script>

<style lang="scss" scoped>
.card {
  position: relative;
  display: flex;
  flex-direction: column;
  width: 100%;
  border-radius: 16px;
  background-color: #F7F7F9;
  --card-padding: 24px;
  gap: 40px;


  @include screen-md() {
    --card-padding: 32px
  }

  &__header, &__content {
    transition: padding .2s;
  }

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: var(--card-padding) var(--card-padding) 0 var(--card-padding);

    .header-content {
      font-size: 20px;
      font-weight: 500;
    }

    .header-menu {
      position: absolute;
      top: 24px;
      right: 24px;
    }
  }

  &__content {
    width: 100%;
    height: 100%;
    padding: 0 var(--card-padding);

  }

  &__footer {
    display: flex;
    padding: var(--card-padding);
  }
}
</style>