import { Component, signal, HostListener } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { LoaderComponent } from '../core/loader.component';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, RouterLink, LoaderComponent],
  template: `
    <app-loader />

    <!-- Scroll progress -->
    <div class="scroll-progress" [style.transform]="'scaleX(' + progress() + ')'"></div>

    <!-- ====== TOP NAVBAR ====== -->
    <nav class="top-nav" [class.nav-scrolled]="scrolled()">
      <div class="nav-inner">
        <!-- Brand -->
        <a class="nav-brand" routerLink="/" aria-label="Muhammad Kordy — home">
          <svg viewBox="0 0 80 64" fill="none" xmlns="http://www.w3.org/2000/svg" class="logo-svg">
            <defs>
              <linearGradient id="logo-gld" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#F0D9AA"/>
                <stop offset="0.5" stop-color="#D8B978"/>
                <stop offset="1" stop-color="#B8945A"/>
              </linearGradient>
            </defs>
            <g class="logo-scale">
              <path class="logo-path" d="M 12 48 V 24 L 20 16 L 28 24 L 36 16 L 44 24 V 48 L 36 40 V 28 L 28 36 L 20 28 V 40 Z" fill="url(#logo-gld)"/>
              <path class="logo-path" d="M 50 48 V 16 H 58 V 28 L 68 18 H 76 L 64 30 L 76 48 H 68 L 58 34 V 48 Z" fill="#E7CF9E"/>
            </g>
          </svg>
        </a>

        <!-- Right side: CTA + Burger -->
        <div class="nav-right">
          <button type="button" class="nav-cta" (click)="navigate('contact', $event)" data-cta="nav-contact">
            <span>Contact &nbsp;→</span>
          </button>
          <button type="button"
            class="nav-burger"
            [class.is-open]="menuOpen()"
            (click)="toggleMenu()"
            [attr.aria-expanded]="menuOpen()"
            aria-label="Toggle menu"
            aria-controls="menuOverlay">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
          </button>
        </div>
      </div>
    </nav>

    <!-- ====== FULL-SCREEN MENU OVERLAY ====== -->
    <div class="menu-overlay"
      id="menuOverlay"
      [class.is-open]="menuOpen()"
      role="dialog"
      [attr.aria-hidden]="!menuOpen()">
      <div class="menu-overlay-bg"></div>
      <div class="menu-links">
        <a class="menu-link" (click)="navigateAndClose('about', $event)" href="#about">
          <span class="ml-text">About</span>
        </a>
        <a class="menu-link" (click)="navigateAndClose('services', $event)" href="#services">
          <span class="ml-text">Services</span>
        </a>
        <a class="menu-link" (click)="navigateAndClose('work', $event)" href="#work">
          <span class="ml-text">Work</span>
        </a>
        <a class="menu-link" (click)="navigateAndClose('gallery', $event)" href="#gallery">
          <span class="ml-text">Gallery</span>
        </a>
        <a class="menu-link" (click)="navigateAndClose('experience', $event)" href="#experience">
          <span class="ml-text">Experience</span>
        </a>
        <a class="menu-link" (click)="navigateAndClose('contact', $event)" href="#contact">
          <span class="ml-text">Contact</span>
        </a>
      </div>
      <div class="menu-footer">
        <span class="mf-lang">EN</span>
      </div>
    </div>

    <main><router-outlet /></main>

    <!-- Scroll-to-top -->
    @if (showScrollTop()) {
      <button class="scroll-top-btn" (click)="scrollToTop()" aria-label="Back to top">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
          <line x1="7" y1="12" x2="7" y2="2" stroke="currentColor" stroke-width="1.5"/>
          <polyline points="3,6 7,2 11,6" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
      </button>
    }

    <footer class="site-footer">
      <div class="footer-glow" aria-hidden="true"></div>
      <div class="container footer-grid">
        <div>
          <svg class="footer-logo-svg" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.75" y="0.75" width="42.5" height="42.5" rx="10" fill="rgba(7,9,15,0.95)" stroke="url(#mkl)" stroke-width="1.2" opacity="0.6"/>
            <path d="M7 31 L7 12 L15.5 22 L24 12 L24 31" stroke="#D8B978" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M28 12 L28 31 M28 21.5 L38 12 M28 21.5 L38 31" stroke="#F0EDE8" stroke-width="2.2" stroke-linecap="round"/>
            <path d="M7 38 L13 36 L20 37 L28 34.5 L35 36 L37 34" stroke="#D8B978" stroke-width="0.9" stroke-linecap="round" opacity="0.45"/>
          </svg>
          <p class="lead">Turning data into decisions — for institutions, brands, and growth teams.</p>
        </div>
        <div>
          <h4>Engage</h4>
          <a href="mailto:muhammadkordy98&#64;gmail.com">muhammadkordy98&#64;gmail.com</a>
          <a href="tel:+201000969003">+20 100 096 9003</a>
          <a href="https://www.linkedin.com/in/mohammed-kordy-/" target="_blank" rel="noopener">LinkedIn</a>
          <a href="https://github.com/muhammadkordy" target="_blank" rel="noopener">GitHub</a>
        </div>
        <div>
          <h4>Focus</h4>
          <p>Business Intelligence<br/>Market Research &amp; Strategy<br/>Egyptian Cotton Hub</p>
        </div>
      </div>
      <div class="container footer-base">
        <span>© {{ year }} Muhammad Kordy Moustafa. All rights reserved.</span>
        <div class="footer-social">
          <a href="https://www.linkedin.com/in/mohammed-kordy-/" target="_blank" rel="noopener" aria-label="LinkedIn">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://github.com/muhammadkordy" target="_blank" rel="noopener" aria-label="GitHub">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          </a>
          <span class="thin">Crafted for institutional decision-making.</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .scroll-progress {
      position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 70;
      background: linear-gradient(90deg, #E7CF9E, #D8B978, #5B7CFF);
      transform-origin: left; transform: scaleX(0);
      box-shadow: 0 0 10px rgba(216,185,120,0.5);
    }

    /* ====== TOP NAVBAR ====== */
    .top-nav {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      z-index: 60;
      padding: 16px var(--gutter, 24px);
      transition: background .35s, backdrop-filter .35s;
    }
    .top-nav.nav-scrolled {
      background: rgba(7, 9, 15, 0.85);
      backdrop-filter: blur(20px) saturate(160%);
      -webkit-backdrop-filter: blur(20px) saturate(160%);
    }
    .nav-inner {
      display: flex;
      align-items: center;
      justify-content: space-between;
      max-width: var(--container, 1240px);
      margin: 0 auto;
    }

    /* Brand */
    .nav-brand {
      display: block;
      width: 50px;
      height: 40px;
      opacity: 0.95;
      transition: opacity .25s, transform .35s var(--ease, cubic-bezier(0.22,1,0.36,1));
      z-index: 62;
      position: relative;
      overflow: hidden;
    }
    .nav-brand:hover { opacity: 1; transform: scale(1.05); }
    .nav-brand svg { width: 50px; height: 40px; overflow: visible; }
    
    .logo-scale {
      transform-origin: center;
      animation: logo-entrance 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards,
                 logo-gold-pulse 3.5s ease-in-out 1.6s infinite;
    }
    @keyframes logo-gold-pulse {
      0%, 100% { filter: drop-shadow(0 0 2px rgba(216,185,120,0.35)); }
      50%       { filter: drop-shadow(0 0 10px rgba(216,185,120,0.85)); }
    }

    /* Logo Hover Shimmer */
    .nav-brand::after {
      content: '';
      position: absolute;
      top: 0; left: -100%; width: 50%; height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent);
      transform: skewX(-20deg);
      opacity: 0;
      pointer-events: none;
    }
    .nav-brand:hover::after {
      animation: logo-shimmer 0.6s ease forwards;
      opacity: 1;
    }
    @keyframes logo-shimmer {
      100% { left: 200%; }
    }

    /* Initial entrance animation */
    .logo-path {
      opacity: 0;
      animation: logo-fade-in 1.2s ease forwards 0.2s;
    }
    
    @keyframes logo-entrance {
      0% { transform: scale(0.8) translateY(10px); }
      100% { transform: scale(1) translateY(0); }
    }
    @keyframes logo-fade-in {
      to { opacity: 1; }
    }

    /* Right group */
    .nav-right {
      display: flex;
      align-items: center;
      gap: 12px;
      z-index: 62;
      position: relative;
    }

    /* CTA button */
    .nav-cta {
      display: inline-flex;
      align-items: center;
      padding: 10px 22px;
      border: 1px solid rgba(216,185,120,0.4);
      border-radius: 8px;
      background: rgba(216,185,120,0.08);
      color: #D8B978;
      font-family: var(--font-head, 'Space Grotesk', sans-serif);
      font-size: 0.78rem;
      font-weight: 600;
      letter-spacing: 0.04em;
      cursor: pointer;
      transition: background .25s, border-color .25s, color .25s, transform .3s var(--ease);
    }
    .nav-cta:hover {
      background: #D8B978;
      border-color: #D8B978;
      color: #0A0A0B;
      transform: translateY(-1px);
    }

    /* Hamburger button */
    .nav-burger {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      gap: 6px;
      width: 42px;
      height: 42px;
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.1);
      border-radius: 8px;
      cursor: pointer;
      transition: background .25s, border-color .25s;
      padding: 0;
    }
    .nav-burger:hover {
      background: rgba(255, 255, 255, 0.08);
      border-color: rgba(255, 255, 255, 0.2);
    }
    .nav-burger span {
      display: block;
      width: 18px;
      height: 1.5px;
      background: var(--ink, #F4F2EC);
      border-radius: 2px;
      transition: transform .35s var(--ease), opacity .25s;
    }
    /* X state */
    .nav-burger.is-open span:first-child {
      transform: translateY(3.75px) rotate(45deg);
    }
    .nav-burger.is-open span:last-child {
      transform: translateY(-3.75px) rotate(-45deg);
    }

    /* ====== FULL-SCREEN OVERLAY ====== */
    .menu-overlay {
      position: fixed;
      inset: 0;
      z-index: 58;
      display: flex;
      flex-direction: column;
      justify-content: center;
      padding: 100px var(--gutter, 24px) 60px;
      pointer-events: none;
      visibility: hidden;
    }
    .menu-overlay.is-open {
      pointer-events: auto;
      visibility: visible;
    }

    .menu-overlay-bg {
      position: absolute;
      inset: 0;
      background: #0A0A0B;
      transform: translateY(-100%);
      transition: transform .55s var(--ease);
    }
    .menu-overlay.is-open .menu-overlay-bg {
      transform: translateY(0);
    }

    .menu-links {
      position: relative;
      z-index: 1;
      display: flex;
      flex-direction: column;
      gap: 0;
    }

    .menu-link {
      display: block;
      text-decoration: none;
      color: var(--ink, #F4F2EC);
      cursor: pointer;
      opacity: 0;
      transform: translateY(30px);
      transition: opacity .4s var(--ease), transform .4s var(--ease), color .25s;
    }
    .menu-overlay.is-open .menu-link {
      opacity: 1;
      transform: translateY(0);
    }
    /* Stagger */
    .menu-overlay.is-open .menu-link:nth-child(1) { transition-delay: .15s; }
    .menu-overlay.is-open .menu-link:nth-child(2) { transition-delay: .20s; }
    .menu-overlay.is-open .menu-link:nth-child(3) { transition-delay: .25s; }
    .menu-overlay.is-open .menu-link:nth-child(4) { transition-delay: .30s; }
    .menu-overlay.is-open .menu-link:nth-child(5) { transition-delay: .35s; }
    .menu-overlay.is-open .menu-link:nth-child(6) { transition-delay: .40s; }

    .menu-link:hover { color: #D8B978; }

    .ml-text {
      font-family: var(--font-head, 'Space Grotesk', sans-serif);
      font-size: clamp(2.8rem, 7vw, 5.5rem);
      font-weight: 700;
      line-height: 1.15;
      letter-spacing: -0.03em;
    }

    .menu-footer {
      position: relative;
      z-index: 1;
      margin-top: auto;
      opacity: 0;
      transform: translateY(10px);
      transition: opacity .4s var(--ease) .45s, transform .4s var(--ease) .45s;
    }
    .menu-overlay.is-open .menu-footer {
      opacity: 1;
      transform: translateY(0);
    }
    .mf-lang {
      font-family: var(--font-mono, monospace);
      font-size: 0.72rem;
      letter-spacing: 0.16em;
      color: #D8B978;
      padding: 6px 14px;
      border: 1px solid rgba(216,185,120,0.3);
      border-radius: 6px;
    }

    /* ====== Scroll-to-top ====== */
    .scroll-top-btn {
      position: fixed;
      bottom: 32px;
      right: 24px;
      z-index: 55;
      width: 40px; height: 40px;
      display: grid; place-items: center;
      background: rgba(8,10,20,0.88);
      backdrop-filter: blur(16px);
      border: 1px solid rgba(200,216,62,0.25);
      border-radius: 10px;
      color: #D8B978;
      cursor: pointer;
      transition: background .25s, border-color .25s, transform .3s var(--ease), box-shadow .3s;
      animation: stt-in .3s var(--ease);
    }
    .scroll-top-btn:hover {
      background: #D8B978;
      border-color: #D8B978;
      color: #0A0A0B;
      transform: translateY(-3px);
      box-shadow: 0 10px 24px -6px rgba(200,216,62,0.4);
    }
    @keyframes stt-in {
      from { opacity: 0; transform: translateY(10px); }
      to   { opacity: 1; transform: none; }
    }

    main { min-height: 60vh; }

    /* ---- Footer ---- */
    .site-footer {
      position: relative;
      background: linear-gradient(180deg, transparent, rgba(6,10,22,0.5) 20%, #04060D);
      color: var(--ink-soft); padding: 96px 0 90px;
      margin-top: 80px;
      border-top: 1px solid var(--line-soft);
      overflow: hidden;
    }
    .footer-glow {
      position: absolute; top: -100px; left: 50%; transform: translateX(-50%);
      width: 700px; height: 320px;
      background: radial-gradient(ellipse at center, rgba(91,124,255,0.12), transparent 60%);
      pointer-events: none;
    }
    .footer-logo-svg { width: 52px; height: 52px; }
    .site-footer h4 {
      color: var(--ink); font-size: 0.66rem; letter-spacing: 0.32em;
      text-transform: uppercase; margin-bottom: 18px;
      font-weight: 600; font-family: var(--font-mono);
    }
    .site-footer .lead {
      color: var(--muted); max-width: 300px; margin-top: 16px;
      font-family: var(--font-serif); font-size: 1.2rem; line-height: 1.45; font-style: italic;
    }
    .footer-grid {
      display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 48px;
      padding-bottom: 60px; border-bottom: 1px solid var(--line-soft);
    }
    .footer-grid a {
      display: block; color: var(--muted); padding: 5px 0;
      transition: color .25s, transform .25s;
    }
    .footer-grid a:hover { color: #D8B978; transform: translateX(3px); }
    .footer-grid p { color: var(--muted); }
    .footer-base {
      display: flex; justify-content: space-between; padding-top: 26px;
      font-size: 0.76rem; color: var(--muted-2); letter-spacing: 0.05em;
    }
    .footer-base .thin { font-style: italic; }
    .footer-social { display: flex; align-items: center; gap: 14px; }
    .footer-social a {
      display: flex; align-items: center; justify-content: center;
      width: 32px; height: 32px;
      border: 1px solid var(--line); border-radius: 8px; color: var(--muted-2);
      transition: color .25s, border-color .25s, background .25s;
    }
    .footer-social a:hover { color: #D8B978; border-color: #D8B978; background: var(--surface); }
    @media (max-width: 720px) {
      .footer-grid { grid-template-columns: 1fr; gap: 36px; padding-bottom: 36px; }
      .footer-base { flex-direction: column; gap: 8px; }
      .nav-cta { display: none; }
    }
  `],
})
export class PublicLayoutComponent {
  scrolled      = signal(false);
  showScrollTop = signal(false);
  progress      = signal(0);
  menuOpen      = signal(false);
  year = new Date().getFullYear();

  @HostListener('window:scroll')
  onScroll(): void {
    const y = window.scrollY;
    this.scrolled.set(y > 20);
    this.showScrollTop.set(y > 600);
    const docH = document.documentElement.scrollHeight - window.innerHeight;
    this.progress.set(docH > 0 ? Math.min(y / docH, 1) : 0);
  }

  @HostListener('document:keydown.escape')
  onEscape(): void {
    if (this.menuOpen()) this.toggleMenu();
  }

  scrollToTop(): void { window.scrollTo({ top: 0, behavior: 'smooth' }); }

  toggleMenu(): void {
    const next = !this.menuOpen();
    this.menuOpen.set(next);
    document.body.style.overflow = next ? 'hidden' : '';
  }

  navigate(id: string, ev: Event): void {
    ev.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      const y = el.getBoundingClientRect().top + window.scrollY - 20;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }

  navigateAndClose(id: string, ev: Event): void {
    this.menuOpen.set(false);
    document.body.style.overflow = '';
    // Small delay so the overlay closes smoothly before scrolling
    setTimeout(() => this.navigate(id, ev), 350);
  }
}
