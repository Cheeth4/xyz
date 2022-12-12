<template>
  <div class="currency-list">
    <client-only>
      <component
        :is="itemComponent"
        v-for="currency in currencies"
        :key="currency.id"
        :currency="currency"
      />
    </client-only>
  </div>
</template>

<script lang="ts" setup>
import CurrencyItem from '../CurrencyItem.vue';
import CurrencyItemMobile from '../CurrencyItemMobile.vue';

import { Currency } from '~/types';
import { useMediaQuery } from '@vueuse/core';
import { computed } from 'vue';
import { useAsyncData } from 'nuxt/app';
import { fetchPrices } from '~/api';

defineProps<{
  items?: Currency[]
}>();

const useMobile = useMediaQuery('(max-width: 800px)');

const itemComponent = computed(() => {
  return useMobile.value ? CurrencyItemMobile : CurrencyItem;
});

const { data: currencies } = await useAsyncData(fetchPrices, { server: true });
</script>

<style lang="scss" scoped>
.currency-list {
  display: grid;
  gap: 8px
}
</style>