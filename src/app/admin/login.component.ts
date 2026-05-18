import { Component, inject, signal } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-admin-login',
  imports: [FormsModule, NgIf],
  template: `
    <div class="login-shell">
      <div class="login-card">
        <div class="login-mark">MK</div>
        <h1>Admin Console</h1>
        <p class="lead">Sign in to manage portfolio content and review enquiries.</p>

        <form #f="ngForm" (ngSubmit)="submit(f)" novalidate>
          <div class="field">
            <label for="email">Email</label>
            <input id="email" name="email" type="email" [(ngModel)]="email" required autocomplete="username" autofocus>
          </div>
          <div class="field">
            <label for="password">Password</label>
            <input id="password" name="password" type="password" [(ngModel)]="password" required autocomplete="current-password">
          </div>

          <div class="err" *ngIf="error()">{{ error() }}</div>

          <button type="submit" class="btn btn--primary" [disabled]="submitting()">
            <span>{{ submitting() ? 'Signing in…' : 'Sign in' }}</span>
            <span class="arr"></span>
          </button>
        </form>

        <a class="back" href="/">Back to public site</a>
      </div>
      <div class="login-side" aria-hidden="true">
        <div class="login-side-inner">
          <div class="eyebrow">Muhammad Kordy</div>
          <h2 class="serif">Business intelligence, in your hands.</h2>
          <p>Operate the public-facing portfolio with executive-grade control. Edit numbers, services, projects, and clients in real time.</p>
        </div>
      </div>
    </div>
  `,
  styles: [`
    :host { display:block; }
    .login-shell {
      min-height: 100vh;
      display: grid;
      grid-template-columns: 1fr 1fr;
      background: var(--bg);
    }
    .login-card {
      padding: clamp(40px, 6vw, 80px);
      display: flex; flex-direction: column;
      justify-content: center;
      max-width: 520px;
    }
    .login-mark {
      width: 48px; height: 48px;
      background: var(--ink); color: #fff;
      display: grid; place-items: center;
      font-weight: 600; letter-spacing: 0.06em;
      margin-bottom: 36px;
    }
    .login-card h1 { font-size: 2rem; letter-spacing: -0.01em; font-weight: 400; }
    .login-card .lead { margin-top: 12px; color: var(--muted); margin-bottom: 40px; }
    .login-card form { display: grid; gap: 24px; }
    .login-card .err {
      color: #B43030; font-size: 0.88rem;
      padding: 10px 12px;
      background: #fbeaea;
      border-left: 2px solid #B43030;
    }
    .login-card .btn { justify-content: center; }
    .login-card .back {
      margin-top: 28px; font-size: 0.78rem; letter-spacing: 0.22em; text-transform: uppercase;
      color: var(--muted); transition: color .25s;
    }
    .login-card .back:hover { color: var(--navy); }

    .login-side {
      background: var(--navy-deep);
      color: #d6d8e1;
      padding: clamp(40px, 6vw, 80px);
      position: relative;
      overflow: hidden;
      display: flex; align-items: center;
    }
    .login-side::before {
      content: ''; position: absolute; inset: 0;
      background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
      background-size: 60px 60px;
      mask-image: radial-gradient(ellipse at 30% 30%, #000 30%, transparent 80%);
    }
    .login-side-inner { position: relative; z-index: 2; max-width: 460px; }
    .login-side .eyebrow { color: var(--gold); }
    .login-side .eyebrow::before { background: var(--gold); }
    .login-side h2 {
      color: #fff;
      margin-top: 24px;
      font-size: clamp(1.6rem, 3vw, 2.4rem);
      line-height: 1.2;
      font-weight: 400;
    }
    .login-side p { color: #aab0c2; margin-top: 18px; font-size: 1rem; line-height: 1.7; }

    @media (max-width: 880px) {
      .login-shell { grid-template-columns: 1fr; }
      .login-side { display: none; }
    }
  `],
})
export class LoginComponent {
  email = 'muhammadkordy98@gmail.com';
  password = '';
  submitting = signal(false);
  error = signal<string | null>(null);

  private auth = inject(AuthService);
  private router = inject(Router);

  submit(f: NgForm): void {
    if (f.invalid || this.submitting()) return;
    this.submitting.set(true);
    this.error.set(null);
    this.auth.login(this.email.trim(), this.password).subscribe({
      next: () => {
        this.submitting.set(false);
        this.router.navigate(['/admin/dashboard']);
      },
      error: (err) => {
        this.submitting.set(false);
        if (err?.status === 422) {
          this.error.set('Invalid email or password.');
        } else if (err?.status === 401) {
          this.error.set('Unauthorized.');
        } else {
          this.error.set('Login failed. Please try again.');
        }
      },
    });
  }
}
