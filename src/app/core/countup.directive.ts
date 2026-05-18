import {
  AfterViewInit,
  Directive,
  ElementRef,
  Input,
  OnDestroy,
  inject,
} from '@angular/core';

/**
 * Animates a numeric value from 0 → target when the host enters the viewport.
 * Supports decimals and negative numbers. Preserves a suffix string.
 *
 *   <span appCountUp [target]="486" suffix="%"></span>
 */
@Directive({
  selector: '[appCountUp]',
})
export class CountUpDirective implements AfterViewInit, OnDestroy {
  @Input({ required: true }) target: number = 0;
  @Input() suffix: string = '';
  @Input() duration: number = 1700;

  private host = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;
  private started = false;

  ngAfterViewInit(): void {
    if (typeof IntersectionObserver === 'undefined') {
      this.run();
      return;
    }
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting && !this.started) {
            this.started = true;
            this.run();
            this.observer?.disconnect();
          }
        }
      },
      { threshold: 0.4 },
    );
    this.observer.observe(this.host.nativeElement);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  private run(): void {
    const el = this.host.nativeElement;
    const target = Number(this.target);
    if (Number.isNaN(target)) {
      el.textContent = `${this.target}${this.suffix ?? ''}`;
      return;
    }
    const decimals = (String(target).split('.')[1] ?? '').length;
    const start = performance.now();
    const dur = this.duration;
    const startVal = 0;
    const delta = target - startVal;

    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const v = startVal + delta * eased;
      el.textContent = `${this.format(v, decimals)}${this.suffix ?? ''}`;
      if (t < 1) requestAnimationFrame(tick);
      else el.textContent = `${this.format(target, decimals)}${this.suffix ?? ''}`;
    };
    requestAnimationFrame(tick);
  }

  private format(n: number, decimals: number): string {
    return decimals > 0
      ? n.toFixed(decimals)
      : Math.round(n).toString();
  }
}
