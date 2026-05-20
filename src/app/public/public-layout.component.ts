import { Component, signal, HostListener } from '@angular/core';
import { NgClass } from '@angular/common';
import { RouterOutlet, RouterLink } from '@angular/router';

@Component({
  selector: 'app-public-layout',
  imports: [RouterOutlet, RouterLink, NgClass],
  template: `
    <header class="site-header" [ngClass]="{ scrolled: scrolled() }">
      <div class="container header-row">
        <a class="brand" routerLink="/">
          <span class="brand-mark">
          <div class="hero-logo hero-anim">
        <img src="logo.png" alt="Muhammad Kordy Moustafa — BI Manager" />
      </div></span>
          <span class="brand-name">
            <span class="brand-name-line">Muhammad Kordy</span>
            <span class="brand-name-sub">Business Intelligence · Strategy</span>
          </span>
        </a>
        <nav class="nav" [ngClass]="{ open: menuOpen() }">
          <a (click)="navigate('about', $event)" href="#about">About</a>
          <a (click)="navigate('impact', $event)" href="#impact">Impact</a>
          <a (click)="navigate('capabilities', $event)" href="#capabilities">Capabilities</a>
          <a (click)="navigate('work', $event)" href="#work">Selected Work</a>
          <a (click)="navigate('gallery', $event)" href="#gallery">Gallery</a>
          <a (click)="navigate('experience', $event)" href="#experience">Experience</a>
          <a (click)="navigate('contact', $event)" href="#contact" class="nav-cta">Contact</a>
        </nav>
        <button class="burger" [class.active]="menuOpen()" (click)="menuOpen.set(!menuOpen())" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <main><router-outlet /></main>

    @if (menuOpen()) {
      <div class="nav-backdrop" (click)="menuOpen.set(false)"></div>
    }

    @if (showScrollTop()) {
      <button class="scroll-top-btn" (click)="scrollToTop()" aria-label="Back to top">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <line x1="8" y1="13" x2="8" y2="3" stroke="currentColor" stroke-width="1.5"/>
          <polyline points="4,7 8,3 12,7" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/>
        </svg>
      </button>
    }

    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <img src="logo%202.png" alt="Muhammad Kordy Moustafa — BI Manager" class="footer-logo" />
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
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
          </a>
          <a href="https://github.com/muhammadkordy" target="_blank" rel="noopener" aria-label="GitHub">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          </a>
          <span class="thin">Crafted for institutional decision-making.</span>
        </div>
      </div>
    </footer>
  `,
  styles: [`
    .site-header {
      position: fixed; top: 0; left: 0; right: 0;
      z-index: 50;
      background: rgba(250, 250, 247, 0.65);
      backdrop-filter: saturate(140%) blur(14px);
      -webkit-backdrop-filter: saturate(140%) blur(14px);
      border-bottom: 1px solid transparent;
      transition: background .35s ease, border-color .35s ease, box-shadow .35s;
    }
    .site-header.scrolled {
      background: rgba(255,255,255,0.92);
      border-bottom-color: var(--line);
      box-shadow: 0 8px 24px -16px rgba(17,17,17,0.12);
    }
    .header-row {
      display: flex; align-items: center; justify-content: space-between;
      height: 78px;
    }
    .brand { display: flex; align-items: center; gap: 14px; color: var(--ink); }
    .brand-mark {
      width: 40px; height: 40px;
      display: grid; place-items: center;
      background: var(--ink);
      color: #fff;
      font-weight: 600;
      font-size: 14px;
      letter-spacing: 0.04em;
      border-radius: 2px;
    }
    .footer-logo {
      display: block;
      height: 72px;
      width: auto;
      border-radius: 4px;
      opacity: 0.92;
    }
    .brand-name-line { display:block; font-weight: 500; line-height: 1.1; letter-spacing: -0.01em; }
    .brand-name-sub { display:block; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-top: 4px; }

    .nav {
      display: flex; align-items: center; gap: 26px;
    }
    .nav a {
      font-size: 0.86rem;
      color: var(--ink-soft);
      letter-spacing: 0.02em;
      position: relative;
      cursor: pointer;
      transition: color .25s;
    }
    .nav a::after {
      content: '';
      position: absolute; left: 0; bottom: -4px;
      width: 0; height: 1px; background: var(--navy);
      transition: width .3s ease;
    }
    .nav a:hover { color: var(--navy); }
    .nav a:hover::after { width: 100%; }
    .nav .nav-cta {
      border: 1px solid var(--ink);
      padding: 8px 18px;
      font-size: 0.8rem;
      letter-spacing: 0.16em;
      text-transform: uppercase;
    }
    .nav .nav-cta::after { display: none; }
    .nav .nav-cta:hover { background: var(--ink); color: #fff; }

    .burger {
      display: none;
      background: transparent; border: none;
      width: 34px; height: 34px;
      flex-direction: column; gap: 6px; justify-content: center; align-items: center;
    }
    .burger span {
      width: 22px; height: 1.5px;
      background: var(--ink);
      transition: transform .28s cubic-bezier(0.22,1,0.36,1), opacity .2s ease;
      display: block;
    }
    .burger.active span:nth-child(1) { transform: translateY(7.5px) rotate(45deg); }
    .burger.active span:nth-child(2) { opacity: 0; transform: scaleX(0); }
    .burger.active span:nth-child(3) { transform: translateY(-7.5px) rotate(-45deg); }

    .nav-backdrop {
      position: fixed;
      inset: 78px 0 0 0;
      z-index: 48;
      background: rgba(14,27,53,0.18);
      backdrop-filter: blur(2px);
      animation: fade-in .2s ease;
    }
    @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }

    @media (max-width: 920px) {
      .brand-name-sub { display: none; }
      .burger { display: flex; }
      .nav {
        position: fixed;
        top: 78px; left: 0; right: 0;
        background: rgba(255,255,255,0.98);
        backdrop-filter: blur(14px);
        -webkit-backdrop-filter: blur(14px);
        flex-direction: column;
        gap: 0;
        padding: 0 24px 4px;
        border-top: 2px solid var(--gold);
        border-bottom: 1px solid var(--line);
        box-shadow: 0 16px 48px -12px rgba(0,0,0,0.14);
        z-index: 49;
        opacity: 0;
        transform: translateY(-10px);
        pointer-events: none;
        transition: opacity .25s ease, transform .3s cubic-bezier(0.22, 1, 0.36, 1);
      }
      .nav.open {
        opacity: 1;
        transform: translateY(0);
        pointer-events: auto;
      }
      .nav a {
        padding: 17px 0;
        border-bottom: 1px solid var(--line-soft);
        width: 100%;
        display: block;
        font-size: 0.92rem;
      }
      .nav a:last-child { border-bottom: none; padding-bottom: 18px; }
      .nav .nav-cta {
        margin-top: 0;
        border: none;
        padding: 17px 0;
        text-align: left;
        color: var(--gold);
        letter-spacing: 0.18em;
      }
      .nav .nav-cta:hover { background: transparent; color: var(--navy); }
    }

    main { padding-top: 78px; min-height: 60vh; }

    .site-footer {
      background: var(--navy-deep);
      color: #d6d8e1;
      padding: 80px 0 28px;
      margin-top: 80px;
    }
    .site-footer h4 {
      color: #fff;
      font-size: 0.74rem;
      letter-spacing: 0.28em;
      text-transform: uppercase;
      margin-bottom: 16px;
      font-weight: 500;
    }
    .site-footer .lead {
      color: #b9bccb;
      max-width: 320px;
      margin-top: 18px;
      font-family: var(--font-serif);
      font-size: 1.15rem;
      line-height: 1.4;
      font-style: italic;
    }
    .footer-grid {
      display: grid;
      grid-template-columns: 1.4fr 1fr 1fr;
      gap: 48px;
      padding-bottom: 60px;
      border-bottom: 1px solid rgba(255,255,255,0.06);
    }
    .footer-grid a {
      display: block; color: #b9bccb;
      padding: 4px 0;
      transition: color .25s;
    }
    .footer-grid a:hover { color: var(--gold); }
    .footer-grid p { color: #b9bccb; }

    .footer-base {
      display: flex; justify-content: space-between;
      padding-top: 28px;
      font-size: 0.78rem;
      color: #8087a0;
      letter-spacing: 0.05em;
    }
    .footer-base .thin { font-style: italic; }
    .footer-social {
      display: flex;
      align-items: center;
      gap: 16px;
    }
    .footer-social a {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 30px; height: 30px;
      border: 1px solid rgba(255,255,255,0.12);
      border-radius: 2px;
      color: #8087a0;
      transition: color .25s, border-color .25s;
    }
    .footer-social a:hover { color: var(--gold); border-color: var(--gold); }

    /* ---- Scroll-to-top ---- */
    .scroll-top-btn {
      position: fixed;
      bottom: 32px;
      right: 32px;
      z-index: 60;
      width: 44px;
      height: 44px;
      background: var(--navy);
      color: #fff;
      border: 1px solid transparent;
      display: grid;
      place-items: center;
      cursor: pointer;
      border-radius: 2px;
      transition: background .25s, border-color .25s, color .25s, transform .25s, box-shadow .25s;
      animation: stt-in .35s cubic-bezier(0.22, 1, 0.36, 1);
    }
    .scroll-top-btn:hover {
      background: var(--gold);
      border-color: var(--gold);
      color: var(--ink);
      transform: translateY(-3px);
      box-shadow: 0 12px 28px -8px rgba(14,27,53,0.28);
    }
    @keyframes stt-in {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 720px) {
      .footer-grid { grid-template-columns: 1fr; gap: 36px; padding-bottom: 36px; }
      .footer-base { flex-direction: column; gap: 8px; }
    }
  `],
})
export class PublicLayoutComponent {
  scrolled      = signal(false);
  menuOpen      = signal(false);
  showScrollTop = signal(false);
  year = new Date().getFullYear();

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
    this.showScrollTop.set(window.scrollY > 500);
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigate(id: string, ev: Event): void {
    ev.preventDefault();
    this.menuOpen.set(false);
    const el = document.getElementById(id);
    if (el) {
      const offset = 78;
      const y = el.getBoundingClientRect().top + window.scrollY - offset + 1;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  }
}
