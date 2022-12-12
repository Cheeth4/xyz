<template>
  <div class="search-input">
    <div class="search-input__icon">
      <SearchIcon class="search-icon" />
    </div>
    <div class="search-input__input">
      <input
        placeholder="Search"
        type="search"
      >
    </div>
  </div>
</template>

<script lang="ts" setup>
import SearchIcon from 'assets/icons/search.svg';</script>

<style lang="scss" scoped>
.search-input {
  position: relative;
  display: inline-flex;
  align-items: center;

  &__icon {
    position: absolute;
    left: 18px;

    .search-icon {
      width: 16px;
      height: 16px;
    }
  }

  &__input {
    width: 100%;

    input {
      font-size: 14px;
      width: 100%;
      height: 48px;
      transition: background-color .2s;
      text-indent: 42px;
      border-radius: 8px;
      background-color: var(--input-bg-color);
      appearance: none;

      &:hover {
        background-color: var(--input-bg-color-hover);
      }

      &::placeholder {
        color: var(--text-color-secondary);
      }
    }
  }
}
</style>