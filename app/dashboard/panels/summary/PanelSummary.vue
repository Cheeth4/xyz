<template>
  <Card
    class="panel-summary"
    header="Summary"
  >
    <client-only>
      <SummaryChart />
    </client-only>
  </Card>
</template>

<script lang="ts" setup>
import Card from '~/components/Card.vue';
import SummaryChart from './chart/SummaryChart.vue';

defineProps<{}>();
</script>

<style lang="scss" scoped>
.panel-summary {
  gap: 24px;

  :deep(.card__content) {
    padding: 0;
  }
}
</style>