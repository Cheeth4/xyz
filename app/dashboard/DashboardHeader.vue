<template>
  <div class="dashboard-header">
    <SearchInput class="dashboard-header__search-input" />
    <ButtonGroup
      class="dashboard-header__actions"
      gap="sm"
    >
      <MenuButton
        :indicator="true"
        size="lg"
      >
        <AlertIcon />
      </MenuButton>
      <MenuButton size="lg">
        <ManuIcon />
      </MenuButton>
    </ButtonGroup>
  </div>
</template>

<script lang="ts" setup>
import SearchInput from '@/components/SearchInput.vue';
import MenuButton from '@/components/menu/MenuButton.vue';
import ButtonGroup from '~/components/ButtonGroup.vue';
import AlertIcon from '@/assets/icons/alert.svg';
import ManuIcon from '@/assets/icons/menu.svg';

defineProps<{}>();
</script>

<style lang="scss" scoped>
.dashboard-header {
  display: flex;
  justify-content: space-between;
  gap: 16px;

  &__search-input {
    width: 100%;

    @include screen-md() {
      width: 232px;
    }
  }

  &__actions {
    @include screen-md() {
      gap: 16px;
    }
  }

}
</style>