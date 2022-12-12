<template>
  <Card class="panel-currencies">
    <template #header>
      <Tabs
        v-model:active-tab="activeTab"
        :items="items"
        class="panel-currencies__header"
      />
    </template>
    <div class="panel-currencies__content">
      <CurrencyList
        v-if="activeTab === 'summary'"
        class="panel-currencies__list"
      />
    </div>
  </Card>
</template>

<script lang="ts" setup>
import Card from '~/components/Card.vue';
import Tabs from '@/components/tab/Tabs.vue';

import { Currency } from '@/types';
import { ref } from 'vue';
import CurrencyList from './item/helpers/CurrencyList.vue';

defineProps<{
  currencies: Currency[]
}>();

const items = [
  {
    name: 'summary',
    label: 'Summary'
  },
  {
    name: 'table',
    label: 'Table'
  },
  {
    name: 'charts',
    label: 'Charts'
  },
  {
    name: 'reporting',
    label: 'Reporting'
  },
  {
    name: 'analysis',
    label: 'Analysis'
  }
];

const activeTab = ref(items[0].name);
</script>

<style lang="scss" scoped>
.panel-currencies {
  gap: 0;

  :deep(.card__header) {
    padding-right: 0;

  }

  &__header {
    overflow-x: scroll;
  }

  :deep(.card__content) {
    padding-bottom: 32px;
  }

  &__list {
    margin-top: 32px;
  }
}
</style>