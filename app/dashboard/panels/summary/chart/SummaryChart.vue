<template>
  <div class="summary-chart">
    <LineChart
      class="summary-chart__chart"
      v-bind="lineChartProps"
    />
    <div class="summary-chart__legend">
      <ChartLegend
        color="#7445FB"
        label="This month"
      />
      <ChartLegend
        color="#8585854C"
        label="Last month"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { LineChart, useLineChart } from 'vue-chart-3';
import { computed, onMounted, ref } from 'vue';
import { useEventListener } from '@vueuse/core';
import ChartLegend from './ChartLegend.vue';
import { verticalLinePlugin } from './index';
import { randomNumber } from '~/utils';

const currValues = ref<number[]>([]);
const pastValues = ref<number[]>([]);

const dataLabels = ref<string[]>([]);

for (let i = 1; i < 31; i++) {
  currValues.value.push(randomNumber(15000, 20000));
  pastValues.value.push(randomNumber(10000, 16000));

  dataLabels.value.push('May ' + i);
}

Chart.register(...registerables);
const ctx = document.createElement('canvas').getContext('2d')!;

const gradientFill = computed(() => {
  const gradient = ctx.createLinearGradient(0, 0, 0, 250);
  gradient.addColorStop(0, `#7445FB40`);
  gradient.addColorStop(.8, '#7445FB00');

  return gradient;
});
const data = computed<ChartData<'line'>>(() => ({
  labels: dataLabels.value,
  datasets: [
    {
      data: currValues.value,
      borderColor: '#7445FB',
      fill: true,
      backgroundColor: gradientFill.value,
      tension: 0.25,
      pointRadius: 0,
      borderWidth: 2.5
    },
    {
      data: pastValues.value,
      borderColor: '#8585854C',
      tension: 0.25,
      pointRadius: 0,
      borderDash: [ 10, 5 ],
      borderWidth: 2.5
    },
  ],
}));

const options = computed<ChartOptions<'line'>>(() => ({
  layout: {
    padding: {
      bottom: 28
    }
  },
  responsive: true,

  scales: {
    yAxis: {
      position: 'left',
      beginAtZero: true,
      ticks: {
        maxTicksLimit: 7,
        callback: (value) => {
          return value > 0 ? (value as number) / 1000 + 'k' : 0;
        },
        color: '#0000007A',
        stepSize: 5000,
      },
      suggestedMax: 30000,
      grid: {
        color: 'rgba(133,133,133,0.64)',
        drawBorder: false,
        borderDash: [ 1, 6 ],
      },
    },
    xAxis: {
      grid: {
        color: 'transparent',
        drawTicks: false,
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

const { lineChartRef, lineChartProps } = useLineChart({
  chartData: data,
  options,
  plugins: [ verticalLinePlugin ]
});

onMounted(() => {
  if (!lineChartRef.value) return;

  const { chartInstance, canvasRef } = lineChartRef.value;

  useEventListener<MouseEvent>(canvasRef, 'mousemove', event => {
    const canvasBounds = canvasRef!.getBoundingClientRect();

    verticalLinePlugin.handleMouseMove({
      x: event.x - canvasBounds.x,
    });
    chartInstance?.update();
  });

  useEventListener<MouseEvent>(canvasRef, 'mouseleave', () => {
    verticalLinePlugin.handleMouseMove({
      x: 230
    });
    chartInstance?.update();
  });
});
</script>

<style lang="scss">
.summary-chart {

  &__chart {
    display: flex;
    flex-direction: column;
    height: 210px;
    padding: 0 32px;
    border-bottom: 1px solid #EEEEEE;
  }

  &__legend {
    display: flex;
    align-items: center;
    height: 42px;
    padding: 0 16px;
    gap: 12px;
  }
}

.legend-item {
  font-size: 12px;
  display: flex;
  align-items: center;
  color: var(--text-color-secondary);
  gap: 8px;

  &__indicator {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: #7445FB;
  }
}
</style>