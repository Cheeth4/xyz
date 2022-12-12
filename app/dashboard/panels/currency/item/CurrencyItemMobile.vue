<template>
  <CurrencyItemTemplate
    class="currency-item"
    role="listitem"
  >
    <div class="currency-item__header">
      <CurrencyInfo
        :currency="currency"
        class="currency-item__currency"
      />
      <div class="currency-item__value">
        <div class="currency-item__price">
          {{ formatCurrency(currency.price) }}
        </div>
        <Growth :value="currency.change" />
      </div>
    </div>
    <ChangeChart
      :has-growth="hasGrowth"
      class="currency-item__chart"
    />
    <ButtonGroup
      class="currency-item__actions"
      gap="md"
    >
      <BaseButton
        color="secondary"
        label="Sell"
      />
      <BaseButton label="Buy" />
    </ButtonGroup>
  </CurrencyItemTemplate>
</template>

<script lang="ts" setup>
import BaseButton from '~/components/BaseButton.vue';
import Growth from './helpers/Growth.vue';
import ButtonGroup from '~/components/ButtonGroup.vue';
import CurrencyItemTemplate from './CurrencyItemTemplate.vue';
import { Currency } from '~/types';
import { formatCurrency } from '~/utils';
import { computed } from 'vue';
import ChangeChart from '~/app/dashboard/panels/currency/item/chart/ChangeChart.vue';
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

  &__currency, &__header {
    display: flex;
    align-items: center;
  }

  &__header {
    justify-content: space-between;
  }

  &__value {
    text-align: right;
  }

  &__price {
    font-size: 18px;
    margin-bottom: 2px;
  }

  &__chart {
    height: 172px;
    padding: 32px 0;
  }

  &__actions {
    width: 100%;

    > * {
      width: 100%;
    }
  }
}

</style>