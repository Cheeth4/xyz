<template>
  <div class="dashboard">
    <DashboardHeader class="dashboard__header" />
    <PanelBalance class="dashboard__panel-balance" v-bind="balance" />
    <PanelSummary class="dashboard__panel-summary" />
    <PanelCurrencies
      :currencies="[]"
      class="dashboard__panel-currencies"
    />
  </div>
</template>

<script lang="ts" setup>
import PanelBalance from '~/app/dashboard/panels/balance/PanelBalance.vue';
import PanelSummary from '~/app/dashboard/panels/summary/PanelSummary.vue';
import PanelCurrencies from '~/app/dashboard/panels/currency/PanelCurrency.vue';

import DashboardHeader from '~/app/dashboard/DashboardHeader.vue';

const balance = {
  current: 21432.23,
  past: 20000
};

</script>

<style lang="scss" scoped>
.dashboard {
  display: grid;
  align-items: stretch;
  width: 100%;
  padding: 16px 16px 136px 16px;
  transition: padding .2s, gap .2s;
  grid-template-columns: 1fr;
  grid-auto-rows: auto;
  gap: 16px;


  > * {
    grid-column: 0 / 1;
  }


  @media (min-width: 750px) {
    padding: 24px;
  }

  @include screen-md() {
    grid-template-columns: repeat(2, 1fr);

    gap: 32px;
  }

  @include screen-lg {
    padding: 49px 68px;
  }

  &__panel-summary {
    order: 1;

    @include screen-md() {
      order: unset;
    }
  }

  &__header, &__panel-currencies {

    @include screen-md() {
      grid-column: 1 / span 2;
    }
  }
}

</style>