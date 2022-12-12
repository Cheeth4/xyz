<template>
  <div class="currency-info">
    <CurrencyImage :image="currency.image" />
    <Item
      :label="currency.symbol"
      :value="currency.name"
    />
  </div>
</template>

<script lang="ts" setup>
import { Currency } from '~/types';
import CurrencyImage from './CurrencyImage.vue';
import Item from './Item.vue';

defineProps<{
  currency: Currency
}>();
</script>

<style lang="scss" scoped>
.currency-info {
  display: flex;
  align-items: center;
}
</style>