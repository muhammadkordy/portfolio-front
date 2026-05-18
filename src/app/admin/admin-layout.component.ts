import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { AuthService } from '../core/auth.service';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  styleUrl: './admin.css',
  template: `
    <div class="admin-shell">
      <aside class="admin-side">
        <div class="admin-side-head">
          <div class="mark">MK</div>
          <h2>Muhammad Kordy</h2>
          <p>Admin Console</p>
        </div>
        <nav class="admin-nav">
          <div class="admin-nav-section">Overview</div>
          <a routerLink="/admin/dashboard" routerLinkActive="active">Dashboard</a>
          <a routerLink="/admin/messages" routerLinkActive="active">Messages Inbox</a>

          <div class="admin-nav-section">Content</div>
          <a routerLink="/admin/stats" routerLinkActive="active">Impact Numbers</a>
          <a routerLink="/admin/services" routerLinkActive="active">Services</a>
          <a routerLink="/admin/projects" routerLinkActive="active">Selected Work</a>
          <a routerLink="/admin/clients" routerLinkActive="active">Clients</a>
        </nav>
        <div class="admin-side-foot">
          <div class="user-name">{{ auth.user()?.name || 'Administrator' }}</div>
          <div class="user-mail">{{ auth.user()?.email }}</div>
          <button class="logout-btn" (click)="logout()">Sign out</button>
        </div>
      </aside>
      <main class="admin-main">
        <router-outlet />
      </main>
    </div>
  `,
})
export class AdminLayoutComponent {
  auth = inject(AuthService);
  private router = inject(Router);

  logout(): void {
    this.auth.logout().subscribe({
      next: () => this.router.navigate(['/admin/login']),
      error: () => this.router.navigate(['/admin/login']),
    });
  }
}
