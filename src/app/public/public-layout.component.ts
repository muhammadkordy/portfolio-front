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
          <span class="brand-mark">MK</span>
          <span class="brand-name">
            <span class="brand-name-line">Muhammad Kordy</span>
            <span class="brand-name-sub">Business Intelligence · Strategy</span>
          </span>
        </a>
        <nav class="nav" [ngClass]="{ open: menuOpen() }">
          <a (click)="navigate('about', $event)" href="#about">About</a>
          <a (click)="navigate('impact', $event)" href="#impact">Impact</a>
          <a (click)="navigate('services', $event)" href="#services">Services</a>
          <a (click)="navigate('work', $event)" href="#work">Selected Work</a>
          <a (click)="navigate('clients', $event)" href="#clients">Clients</a>
          <a (click)="navigate('contact', $event)" href="#contact" class="nav-cta">Contact</a>
        </nav>
        <button class="burger" (click)="menuOpen.set(!menuOpen())" aria-label="Toggle menu">
          <span></span><span></span><span></span>
        </button>
      </div>
    </header>

    <main><router-outlet /></main>

    <footer class="site-footer">
      <div class="container footer-grid">
        <div>
          <div class="brand-mark light">MK</div>
          <p class="lead">Turning data into decisions — for governments, corporates, and industry leaders.</p>
        </div>
        <div>
          <h4>Engage</h4>
          <a href="mailto:muhammadkordy98&#64;gmail.com">muhammadkordy98&#64;gmail.com</a>
          <a href="https://www.linkedin.com/in/mohammed-kordy-/" target="_blank" rel="noopener">LinkedIn</a>
        </div>
        <div>
          <h4>Affiliation</h4>
          <p>Egyptian Cotton Hub (ECH)<br/>Affiliated with the Egyptian Cabinet</p>
        </div>
      </div>
      <div class="container footer-base">
        <span>© {{ year }} Muhammad Kordy Moustafa. All rights reserved.</span>
        <span class="thin">Crafted for institutional decision-making.</span>
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
    .brand-mark.light {
      background: transparent;
      border: 1px solid var(--gold);
      color: var(--gold);
    }
    .brand-name-line { display:block; font-weight: 500; line-height: 1.1; letter-spacing: -0.01em; }
    .brand-name-sub { display:block; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); margin-top: 4px; }

    .nav {
      display: flex; align-items: center; gap: 36px;
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
    .burger span { width: 22px; height: 1px; background: var(--ink); }

    @media (max-width: 920px) {
      .brand-name-sub { display: none; }
      .burger { display: flex; }
      .nav {
        position: absolute; top: 78px; left: 0; right: 0;
        background: #fff;
        flex-direction: column; gap: 0;
        padding: 8px 24px 24px;
        border-bottom: 1px solid var(--line);
        max-height: 0; overflow: hidden;
        transition: max-height .35s ease;
      }
      .nav.open { max-height: 460px; }
      .nav a {
        padding: 16px 0;
        border-bottom: 1px solid var(--line-soft);
        width: 100%;
      }
      .nav .nav-cta {
        margin-top: 14px;
        align-self: flex-start;
      }
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

    @media (max-width: 720px) {
      .footer-grid { grid-template-columns: 1fr; gap: 36px; padding-bottom: 36px; }
      .footer-base { flex-direction: column; gap: 8px; }
    }
  `],
})
export class PublicLayoutComponent {
  scrolled = signal(false);
  menuOpen = signal(false);
  year = new Date().getFullYear();

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled.set(window.scrollY > 20);
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
