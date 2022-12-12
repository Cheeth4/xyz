import { Chart } from 'chart.js';
import { formatNumber } from '~/utils';

const roundRect = function (
  ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number
) {
  if (w < 2 * r) r = w / 2;
  if (h < 2 * r) r = h / 2;
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
};

type Entry = {
  x: number,
  y: number,
  value: number,
  label: string
}

export const verticalLinePlugin = {
  id: 'vertical-line',
  pos: {
    x: 230,
  },
  getClosestDatasetEntry(chart: Chart): Entry {
    const { data } = chart.getDatasetMeta(0)!;

    let closestEntry = data[0];
    let closestDistance = Infinity;

    for (const entry of data) {
      const distance = Math.abs(entry.x - this.pos.x);

      if (closestDistance > distance) {
        closestDistance = distance;
        closestEntry = entry;
      }
    }

    const { index } = closestEntry.$context;
    return {
      x: closestEntry.x,
      y: closestEntry.y,
      value: chart.data.datasets[0].data[index] as number,
      label: chart.data.labels![index] as string
    };
  },

  drawTooltip(entry: Entry, ctx: CanvasRenderingContext2D) {
    const tooltipPadding = 12;
    const tooltipHeight = 32;
    const tooltipMargin = 16;

    const text = '$' + formatNumber(entry.value / 1000,
      { maxFractionDigits: 1, thousandSeparator: ',' }) + 'k';
    const width = ~~ctx.measureText(text).width;

    ctx.fillStyle = '#0A041C';

    ctx.beginPath();
    roundRect(ctx,
      entry.x - width / 2 - tooltipPadding,
      entry.y - tooltipHeight - tooltipMargin - 6,
      width + tooltipPadding * 2,
      tooltipHeight,
      6
    );
    ctx.fill();

    ctx.beginPath();
    ctx.font = '700 12px -apple-system';
    ctx.fillStyle = 'white';
    ctx.fillText(text,
      entry.x - width / 2,
      entry.y - tooltipHeight / 2 - tooltipMargin,
    );
  },

  drawPoint(entry: Entry, ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = '#FAFAFA';
    ctx.strokeStyle = '#7445FB';
    ctx.lineWidth = 2;

    ctx.beginPath();
    ctx.arc(
      entry.x,
      entry.y,
      6,
      0,
      Math.PI * 2
    );
    ctx.fill();
    ctx.stroke();
  },

  drawLabel(entry: Entry, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.font = '400 12px -apple-system';
    ctx.fillStyle = '#0A041C';
    ctx.fillText(entry.label,
      entry.x + ctx.measureText(entry.label).width / 2,
      200,
    );
  },

  drawLine(entry: Entry, ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.strokeStyle = 'rgba(0,0,0,0.2)';
    ctx.lineWidth = 1;
    ctx.moveTo(entry.x, entry.y);
    ctx.lineTo(entry.x, 1000);
    ctx.stroke();
  },
  afterDatasetsDraw(chart: Chart) {
    const entry = this.getClosestDatasetEntry(chart);

    if (!this.pos.x) return;

    const { ctx } = chart;

    this.drawLine(entry, ctx);
    this.drawTooltip(entry, ctx);
    this.drawPoint(entry, ctx);
    this.drawLabel(entry, ctx);
  },
  handleMouseMove(pos: { x: number }) {
    Object.assign(this.pos, pos);
  }
};
