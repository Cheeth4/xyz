<template>
  <LineChart
    :class="chartClasses"
    v-bind="lineChartProps"
  />
</template>

<script lang="ts" setup>
import { ChartData, ChartOptions } from 'chart.js';
import { LineChart, useLineChart } from 'vue-chart-3';
import { computed, ref } from 'vue';
import { randomNumber } from '~/utils';

const props = defineProps<{
  hasGrowth: boolean
}>();

const chartClasses = computed(() => {
  return [ 'change-chart', props.hasGrowth && 'change-chart--has-growth' ];
});

const currValues = ref<number[]>([]);
const labels = ref<number[]>([]);

for (let i = 1; i <= 10; i++) {
  currValues.value.push(randomNumber(1, 5));
  labels.value.push(i);
}

const ctx = document.createElement('canvas').getContext('2d')!;

const gradientFill = computed(() => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 32);

  if (props.hasGrowth) {
    gradient.addColorStop(0, `rgba(24, 203, 128, 0.08)`);
    gradient.addColorStop(.8, 'rgba(24, 203, 128, 0)');
  } else {
    gradient.addColorStop(0, `rgba(234, 77, 77, 0.12)`);
    gradient.addColorStop(.8, 'rgba(234, 77, 77, 0)');
  }
  return gradient;
});

const data = computed<ChartData<'line'>>(() => ({
  labels: labels.value,
  datasets: [
    {
      data: currValues.value,
      borderColor: props.hasGrowth ? '#2DC78F' : '#EA4D4D',
      fill: true,
      backgroundColor: gradientFill.value,
      tension: 0.25,
      pointRadius: 0,
      borderWidth: 2.5
    },
  ],
}));

const options = computed<ChartOptions<'line'>>(() => ({
  layout: {
    padding: {
      top: 4,
    }
  },
  responsive: true,
  maintainAspectRatio: true,
  scales: {
    yAxis: {
      ticks: {
        display: false
      },
      grid: {
        display: false,
        drawBorder: false,
      },
    },
    xAxis: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        display: false
      }
    },
  },
  plugins: {
    legend: {
      display: false
    }
  },
}));

const { lineChartProps } = useLineChart({
  chartData: data,
  options,
});

</script>

<style lang="scss" scoped>

.change-chart canvas {
  height: 32px;
}

</style>