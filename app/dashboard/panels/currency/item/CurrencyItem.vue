<template>
  <CurrencyItemTemplate
    class="currency-item"
    role="listitem"
  >
    <CurrencyInfo
      :currency="currency"
      class="currency-item__currency"
    />
    <Item
      :value="formatCurrency(currency.price)"
      class="currency-item__price"
      label="Price"
    />
    <Growth
      :value="currency.change"
      label="Change"
    />
    <ChangeChart
      :has-growth="hasGrowth"
      class="currency-item__chart"
    />
    <ButtonGroup class="currency-item__actions">
      <BaseButton
        color="secondary"
        label="Sell"
      />
      <BaseButton label="Buy" />
    </ButtonGroup>
  </CurrencyItemTemplate>
</template>

<script lang="ts" setup>
import Item from './helpers/Item.vue';
import BaseButton from '~/components/BaseButton.vue';
import Growth from './helpers/Growth.vue';
import ButtonGroup from '~/components/ButtonGroup.vue';
import CurrencyItemTemplate from './CurrencyItemTemplate.vue';
import { Currency } from '~/types';
import { formatCurrency } from '~/utils';
import ChangeChart from '~/app/dashboard/panels/currency/item/chart/ChangeChart.vue';
import { computed } from 'vue';
import CurrencyInfo from '~/app/dashboard/panels/currency/item/helpers/CurrencyInfo.vue';

const props = defineProps<{
  currency: Currency
}>();

const hasGrowth = computed(() => {
  return props.currency.change > 0;
});
</script>

<style lang="scss" scoped>
.currency-item {
  display: flex;
  align-items: center;
  justify-content: space-between;

  &__currency {
    width: 180px;
  }

  &__price {
    width: 80px;
  }

  &__chart {
    width: 148px;
    height: 32px;
  }
}
</style>