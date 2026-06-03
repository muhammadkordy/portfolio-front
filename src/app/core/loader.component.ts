import {
  Component,
  signal,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
} from '@angular/core';

/**
 * Full-screen "MK" monogram loading animation.
 *  1. Monogram strokes draw themselves in (stroke-dashoffset).
 *  2. Gold fill + glow settle, name "Muhammad Kordy" clips up.
 *  3. Progress sweep fills, then the overlay does a curtain reveal and unmounts.
 *
 * Plays once per browser session (sessionStorage). Respects prefers-reduced-motion.
 * Mounted by PublicLayoutComponent only — admin is untouched.
 */
@Component({
  selector: 'app-loader',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    @if (visible()) {
      <div class="loader" [class.loader--out]="leaving()" aria-hidden="true">
        <div class="loader-glow"></div>
        <div class="loader-grid"></div>

        <div class="loader-core">
          <svg class="mk" viewBox="0 0 200 140" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="mkGold" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stop-color="#E7CF9E"/>
                <stop offset="0.5" stop-color="#D8B978"/>
                <stop offset="1" stop-color="#B8945A"/>
              </linearGradient>
            </defs>
            <!-- ring -->
            <circle class="mk-ring" cx="100" cy="70" r="62" stroke="url(#mkGold)" stroke-width="1.4" />
            <!-- M -->
            <path class="mk-stroke mk-m" d="M58 96 V44 L80 78 L102 44 V96"
                  stroke="url(#mkGold)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
            <!-- K -->
            <path class="mk-stroke mk-k1" d="M118 44 V96" stroke="url(#mkGold)" stroke-width="5" stroke-linecap="round"/>
            <path class="mk-stroke mk-k2" d="M146 44 L118 70 L146 96"
                  stroke="url(#mkGold)" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>

          <div class="loader-word">
            <span class="lw-line">Muhammad Kordy</span>
          </div>
          <div class="loader-sub">Business Intelligence · Strategy</div>

          <div class="loader-bar"><span class="loader-bar-fill"></span></div>
        </div>
      </div>
    }
  `,
  styles: [`
    :host { display: contents; }

    .loader {
      position: fixed;
      inset: 0;
      z-index: 999;
      display: grid;
      place-items: center;
      background:
        radial-gradient(900px 600px at 50% 38%, rgba(91,124,255,0.10), transparent 60%),
        radial-gradient(700px 500px at 50% 40%, rgba(216,185,120,0.10), transparent 55%),
        #07090F;
      overflow: hidden;
      transition: clip-path 0.9s cubic-bezier(0.76, 0, 0.24, 1), opacity 0.5s ease 0.4s;
      clip-path: inset(0 0 0 0);
    }
    .loader--out {
      clip-path: inset(0 0 100% 0);
      opacity: 0;
      pointer-events: none;
    }

    .loader-glow {
      position: absolute;
      width: 520px; height: 520px;
      border-radius: 50%;
      background: radial-gradient(circle, rgba(216,185,120,0.16), transparent 65%);
      filter: blur(20px);
      animation: lg-pulse 2.6s ease-in-out infinite;
    }
    @keyframes lg-pulse { 0%,100%{ transform: scale(1); opacity:.8;} 50%{ transform: scale(1.12); opacity:.45;} }

    .loader-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
      background-size: 64px 64px;
      mask-image: radial-gradient(ellipse at center, #000 18%, transparent 70%);
      -webkit-mask-image: radial-gradient(ellipse at center, #000 18%, transparent 70%);
    }

    .loader-core {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }

    .mk { width: clamp(160px, 28vw, 230px); height: auto; overflow: visible; }

    .mk-ring {
      transform-box: fill-box;
      transform-origin: center;
      stroke-dasharray: 390;
      stroke-dashoffset: 390;
      opacity: .55;
      animation: mk-draw 1.5s cubic-bezier(0.65,0,0.35,1) 0.1s forwards, mk-spin 26s linear 1.7s infinite;
    }
    .mk-stroke {
      stroke-dasharray: 240;
      stroke-dashoffset: 240;
      filter: drop-shadow(0 0 0px rgba(216,185,120,0));
      animation: mk-draw 0.9s cubic-bezier(0.65,0,0.35,1) forwards, mk-glow 2s ease-in-out 1.4s infinite;
    }
    .mk-m  { animation-delay: 0.25s, 1.4s; }
    .mk-k1 { animation-delay: 0.7s, 1.5s; }
    .mk-k2 { animation-delay: 0.9s, 1.6s; }

    @keyframes mk-draw { to { stroke-dashoffset: 0; } }
    @keyframes mk-spin { to { transform: rotate(360deg); } }
    @keyframes mk-glow {
      0%,100% { filter: drop-shadow(0 0 1px rgba(216,185,120,0.2)); }
      50%     { filter: drop-shadow(0 0 7px rgba(216,185,120,0.6)); }
    }

    .loader-word {
      overflow: hidden;
      margin-top: 22px;
    }
    .lw-line {
      display: block;
      font-family: 'Space Grotesk', sans-serif;
      font-size: clamp(1.4rem, 3.5vw, 2rem);
      font-weight: 600;
      letter-spacing: -0.02em;
      color: #F4F2EC;
      transform: translateY(110%);
      animation: lw-up 0.9s cubic-bezier(0.22,1,0.36,1) 1.15s forwards;
    }
    @keyframes lw-up { to { transform: translateY(0); } }

    .loader-sub {
      margin-top: 8px;
      font-family: 'IBM Plex Mono', monospace;
      font-size: 0.66rem;
      letter-spacing: 0.34em;
      text-transform: uppercase;
      color: #9A9DAE;
      opacity: 0;
      animation: ls-in 0.8s ease 1.5s forwards;
    }
    @keyframes ls-in { to { opacity: 1; } }

    .loader-bar {
      margin-top: 28px;
      width: clamp(180px, 30vw, 260px);
      height: 2px;
      background: rgba(255,255,255,0.10);
      border-radius: 99px;
      overflow: hidden;
    }
    .loader-bar-fill {
      display: block;
      height: 100%;
      width: 100%;
      transform: scaleX(0);
      transform-origin: left;
      background: linear-gradient(90deg, #E7CF9E, #D8B978, #B8945A);
      box-shadow: 0 0 12px rgba(216,185,120,0.6);
      animation: lb-fill 1.9s cubic-bezier(0.4,0,0.2,1) 0.4s forwards;
    }
    @keyframes lb-fill { to { transform: scaleX(1); } }

    @media (prefers-reduced-motion: reduce) {
      .mk-ring, .mk-stroke { stroke-dashoffset: 0; animation: none; opacity: 1; }
      .lw-line { transform: none; animation: none; }
      .loader-sub { opacity: 1; animation: none; }
      .loader-bar-fill { transform: scaleX(1); animation: none; }
      .loader-glow { animation: none; }
    }
  `],
})
export class LoaderComponent implements OnInit, OnDestroy {
  visible = signal(true);
  leaving = signal(false);
  private timers: ReturnType<typeof setTimeout>[] = [];
  private readonly KEY = 'mk_loader_shown';

  ngOnInit(): void {
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let alreadyShown = false;
    try { alreadyShown = sessionStorage.getItem(this.KEY) === '1'; } catch { /* ignore */ }

    if (alreadyShown) {
      this.visible.set(false);
      document.body.classList.add('loaded');
      return;
    }

    try { sessionStorage.setItem(this.KEY, '1'); } catch { /* ignore */ }
    document.body.style.overflow = 'hidden';

    const hold = reduce ? 600 : 2650;
    this.timers.push(
      setTimeout(() => {
        this.leaving.set(true);
        // reveal the hero entrance as the curtain lifts
        document.body.classList.add('loaded');
      }, hold),
      setTimeout(() => {
        this.visible.set(false);
        document.body.style.overflow = '';
      }, hold + 950),
    );
  }

  ngOnDestroy(): void {
    this.timers.forEach(clearTimeout);
    document.body.style.overflow = '';
  }
}
