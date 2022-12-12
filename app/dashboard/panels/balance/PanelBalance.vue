<template>
  <Card
    class="panel-balance"
    header="Current Balance"
  >
    <div class="panel-balance__amount">
      <span class="unit">$</span>{{ formattedBalance }}
    </div>
    <div class="panel-balance__change">
      <div class="change-icon">
        <ArrowRightIcon />
      </div>
      <div class="change-label">
        {{ formattedChange }} vs last month
      </div>
    </div>
    <template #footer>
      <ButtonGroup class="panel-balance__actions">
        <BaseButton label="Quick Invest" />
        <BaseButton
          color="secondary"
          label="Show Report"
        />
      </ButtonGroup>
    </template>
  </Card>
</template>

<script lang="ts" setup>
import Card from '~/components/Card.vue';
import BaseButton from '~/components/BaseButton.vue';
import ButtonGroup from '~/components/ButtonGroup.vue';
import ArrowRightIcon from 'assets/icons/arrow-right.svg';

import { computed } from 'vue';
import { formatNumber } from '~/utils';

const props = defineProps<{
  current: number
  past: number
}>();

const formattedBalance = computed(() => {
  return formatNumber(props.current, { thousandSeparator: ' ' });
});

const formattedChange = computed(() => {
  return ((props.current - props.past) / props.current * 100).toFixed() + '%';
});

</script>

<style lang="scss" scoped>
.panel-balance {

  &__amount {
    font-size: 56px;
    font-weight: 500;
    margin-bottom: 16px;
    color: var(--text-color-primary);

    .unit {
      font-weight: 300;
      color: var(--text-color-secondary);
    }
  }

  &__change {
    display: flex;
    align-items: center;
    color: var(--text-color-success);

    .change-icon {
      position: relative;
      width: 18px;
      height: 18px;
      margin-right: 5px;
      transform: rotate(-45deg);
    }

    .change-label {
      font-size: 18px;
      font-weight: 500;
    }
  }
}
</style>