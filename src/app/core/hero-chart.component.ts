import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';

@Component({
  selector: 'app-hero-chart',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="bc">
      <div class="bc-top-bar"></div>

      <div class="bc-header">
        <span class="bc-eyebrow">EXECUTIVE BRIEF</span>
        <div class="bc-head-row">
          <span class="bc-title">Performance Intelligence System</span>
          <div class="bc-head-right">
            <span class="bc-live-dot"></span>
            <span class="bc-period">Q4 · 2025</span>
          </div>
        </div>
      </div>

      <div class="bc-kpis">
        <div class="bc-kpi bc-kpi--1">
          <span class="bc-kk">DASHBOARDS</span>
          <span class="bc-kv">{{ kpi1 }}</span>
          <span class="bc-ks">Active views</span>
        </div>
        <div class="bc-kpi bc-kpi--gold bc-kpi--2">
          <span class="bc-kk">EXH. ROI</span>
          <span class="bc-kv">{{ kpi2 }}%</span>
          <span class="bc-ks">Avg annual</span>
        </div>
        <div class="bc-kpi bc-kpi--3">
          <span class="bc-kk">REPORTS / MO</span>
          <span class="bc-kv">{{ kpi3 }}</span>
          <span class="bc-ks">Executive</span>
        </div>
      </div>

      <div class="bc-chart-region">
        <div class="bc-chart-label">PERFORMANCE TREND · EXHIBITIONS PROGRAM</div>
        <div #chartEl class="bc-chart-area"></div>
      </div>

      <div class="bc-footer">
        <span class="bc-footer-name">Muhammad Kordy Moustafa · Business Intelligence</span>
        <span class="bc-conf">CONFIDENTIAL</span>
      </div>
    </div>
  `,
  styles: [`
    :host { display: block; }

    @keyframes bc-grow-x {
      from { transform: scaleX(0); }
      to   { transform: scaleX(1); }
    }
    @keyframes bc-slide-down {
      from { opacity: 0; transform: translateY(-10px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes bc-slide-up {
      from { opacity: 0; transform: translateY(16px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes bc-fade {
      from { opacity: 0; }
      to   { opacity: 1; }
    }
    @keyframes bc-pulse {
      0%, 100% { opacity: 1;   transform: scale(1); }
      50%       { opacity: 0.25; transform: scale(0.65); }
    }

    .bc {
      background: #0C1020;
      border: 1px solid rgba(255,255,255,0.10);
      overflow: hidden;
      position: relative;
      font-family: 'IBM Plex Mono', monospace;
    }

    .bc-top-bar {
      height: 3px;
      background: linear-gradient(90deg, #E7CF9E, #D8B978, #B8945A);
      transform-origin: left;
      animation: bc-grow-x 0.65s cubic-bezier(0.22, 1, 0.36, 1) 1.0s both;
    }

    .bc-header {
      background: linear-gradient(180deg, #102043, #0B1730);
      padding: 14px 20px 16px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
      animation: bc-slide-down 0.55s cubic-bezier(0.22, 1, 0.36, 1) 1.08s both;
    }
    .bc-eyebrow {
      display: block;
      font-size: 8px;
      letter-spacing: 2.5px;
      color: #D8B978;
      font-weight: 500;
      text-transform: uppercase;
      margin-bottom: 7px;
    }
    .bc-head-row {
      display: flex;
      justify-content: space-between;
      align-items: center;
      gap: 12px;
    }
    .bc-title {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 13.5px;
      font-weight: 500;
      color: #fff;
      letter-spacing: 0.01em;
    }
    .bc-head-right {
      display: flex;
      align-items: center;
      gap: 7px;
      flex-shrink: 0;
    }
    .bc-live-dot {
      display: block;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #C8A96E;
      animation: bc-pulse 2s ease-in-out 1.8s infinite both;
    }
    .bc-period {
      font-size: 9px;
      color: #8087a0;
      white-space: nowrap;
    }

    .bc-kpis {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 1px;
      background: rgba(255,255,255,0.07);
      border-bottom: 1px solid rgba(255,255,255,0.07);
    }
    .bc-kpi {
      display: flex;
      flex-direction: column;
      padding: 14px 16px 16px;
      background: #0C1020;
      gap: 3px;
    }
    .bc-kpi--1 { animation: bc-slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) 1.20s both; }
    .bc-kpi--2 { animation: bc-slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) 1.34s both; }
    .bc-kpi--3 { animation: bc-slide-up 0.5s cubic-bezier(0.22, 1, 0.36, 1) 1.48s both; }
    .bc-kpi--gold .bc-kv { color: #D8B978; }
    .bc-kk {
      font-size: 7.5px;
      letter-spacing: 1.5px;
      color: #8A8FA3;
      text-transform: uppercase;
    }
    .bc-kv {
      font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
      font-size: 26px;
      font-weight: 700;
      color: #F4F2EC;
      line-height: 1.1;
      letter-spacing: -0.02em;
    }
    .bc-ks {
      font-size: 7px;
      color: #6E7186;
    }

    .bc-chart-region {
      padding: 12px 0 0;
      background: #090C16;
      animation: bc-fade 0.5s ease 1.60s both;
    }
    .bc-chart-label {
      font-size: 7.5px;
      letter-spacing: 1.3px;
      color: #6E7186;
      text-transform: uppercase;
      padding: 0 16px 8px;
    }
    .bc-chart-area {
      height: 165px;
      width: 100%;
    }

    .bc-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 16px;
      border-top: 1px solid rgba(255,255,255,0.07);
      background: #0A0E1A;
      animation: bc-fade 0.4s ease 1.75s both;
    }
    .bc-footer-name {
      font-size: 7.5px;
      color: #6E7186;
    }
    .bc-conf {
      font-size: 7.5px;
      color: #D8B978;
      letter-spacing: 1px;
    }
  `],
})
export class HeroChartComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chartEl') chartEl!: ElementRef<HTMLDivElement>;
  private chart: any;
  private ro?: ResizeObserver;
  private destroyed = false;
  private timers: ReturnType<typeof setTimeout>[] = [];

  kpi1 = 0;
  kpi2 = 0;
  kpi3 = 0;

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    import('echarts').then((echarts) => {
      if (this.destroyed) return;
      const el = this.chartEl.nativeElement;
      this.chart = echarts.init(el, null, { renderer: 'svg' });
      this.chart.setOption(this.buildOptions());
      this.ro = new ResizeObserver(() => this.chart?.resize());
      this.ro.observe(el);

      this.countUp(27,  1100, 1250, (v) => { this.kpi1 = v; this.cdr.markForCheck(); });
      this.countUp(412, 1100, 1380, (v) => { this.kpi2 = v; this.cdr.markForCheck(); });
      this.countUp(3,   700,  1520, (v) => { this.kpi3 = v; this.cdr.markForCheck(); });
    });
  }

  private countUp(target: number, durationMs: number, delayMs: number, cb: (v: number) => void): void {
    const t = setTimeout(() => {
      if (this.destroyed) return;
      const start = performance.now();
      const tick = (now: number) => {
        if (this.destroyed) return;
        const p    = Math.min((now - start) / durationMs, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        cb(Math.round(target * ease));
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }, delayMs);
    this.timers.push(t);
  }

  private buildOptions() {
    const categories = ["Q4'22", "Q4'23", "Q1'24", "Q3'24", "Q4'25"];
    const values     = [35, 55, 72, 88, 100];
    const barColors  = [
      'rgba(120,140,210,0.30)',
      'rgba(130,150,225,0.45)',
      'rgba(140,160,235,0.60)',
      'rgba(150,170,245,0.78)',
      '#D8B978',
    ];

    return {
      backgroundColor: 'transparent',
      animation: true,
      animationDuration: 750,
      animationEasing: 'cubicOut' as const,
      grid: { top: 6, right: 10, bottom: 34, left: 10, containLabel: true },
      xAxis: {
        type: 'category' as const,
        data: categories,
        axisLine: { lineStyle: { color: 'rgba(255,255,255,0.12)' } },
        axisTick: { show: false },
        axisLabel: {
          fontFamily: "'IBM Plex Mono', monospace",
          fontSize: 9,
          color: '#8A8FA3',
          rich: { last: { color: '#D8B978', fontWeight: 'bold' } },
          formatter: (val: string, idx: number) => idx === 4 ? `{last|${val}}` : val,
        },
      },
      yAxis: {
        type: 'value' as const,
        min: 0,
        max: 120,
        splitLine: { show: true, lineStyle: { color: 'rgba(255,255,255,0.07)', type: 'dashed' as const } },
        axisLabel: { show: false },
        axisLine:  { show: false },
        axisTick:  { show: false },
      },
      series: [
        {
          type: 'bar' as const,
          data: values.map((v, i) => ({ value: v, itemStyle: { color: barColors[i] } })),
          barWidth: '52%',
          barMaxWidth: 44,
          animationDelay: (idx: number) => idx * 110 + 200,
        },
        {
          type: 'line' as const,
          data: values,
          smooth: false,
          lineStyle: { color: '#D8B978', width: 1.8 },
          symbol: 'circle',
          symbolSize: 5,
          itemStyle: { color: '#0C1020', borderColor: '#D8B978', borderWidth: 1.5 },
          emphasis: { scale: true },
          animationDelay: (idx: number) => idx * 110 + 700,
        },
      ],
      tooltip: {
        trigger: 'axis' as const,
        backgroundColor: '#0E1B35',
        borderColor: '#C8A96E',
        borderWidth: 1,
        padding: [7, 12],
        textStyle: {
          color: '#fff',
          fontSize: 10,
          fontFamily: "'IBM Plex Mono', monospace",
        },
        axisPointer: { lineStyle: { color: 'rgba(200,169,110,0.35)' } },
      },
    };
  }

  ngOnDestroy(): void {
    this.destroyed = true;
    this.timers.forEach(clearTimeout);
    this.ro?.disconnect();
    this.chart?.dispose();
  }
}
