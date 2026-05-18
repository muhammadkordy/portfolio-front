import { Component, OnInit, inject, signal } from '@angular/core';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { forkJoin } from 'rxjs';
import { ApiService } from '../core/api.service';
import { ContactMessage } from '../core/models';

@Component({
  selector: 'app-admin-dashboard',
  imports: [NgIf, NgFor, DatePipe, RouterLink],
  styleUrl: './admin.css',
  template: `
    <div class="admin-topbar">
      <div>
        <div class="crumb">Overview</div>
        <h1>Dashboard</h1>
      </div>
    </div>

    <div class="kpi-grid" *ngIf="!loading(); else loadingTpl">
      <div class="kpi">
        <div class="kpi-label">Total Messages</div>
        <div class="kpi-value">{{ totalMessages() }}</div>
        <div class="kpi-sub">{{ unreadMessages() }} unread</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Active Services</div>
        <div class="kpi-value">{{ servicesCount() }}</div>
        <div class="kpi-sub">Live on the public site</div>
      </div>
      <div class="kpi">
        <div class="kpi-label">Selected Work Entries</div>
        <div class="kpi-value">{{ projectsCount() }}</div>
        <div class="kpi-sub">Case studies published</div>
      </div>
    </div>

    <ng-template #loadingTpl>
      <div class="kpi-grid">
        <div class="kpi"><div class="kpi-label">Loading…</div></div>
        <div class="kpi"><div class="kpi-label">Loading…</div></div>
        <div class="kpi"><div class="kpi-label">Loading…</div></div>
      </div>
    </ng-template>

    <div class="admin-form-card">
      <h3>Recent Enquiries</h3>
      <table class="admin-table" *ngIf="recent().length > 0; else emptyTpl">
        <thead>
          <tr>
            <th style="width:160px;">Received</th>
            <th>From</th>
            <th>Service</th>
            <th style="width:100px;">Status</th>
            <th style="width:80px;"></th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let m of recent()">
            <td>{{ m.created_at | date:'d MMM, HH:mm' }}</td>
            <td>
              <strong>{{ m.name }}</strong>
              <div style="color: var(--muted); font-size: 0.84rem;">{{ m.organization || '—' }}</div>
            </td>
            <td>{{ m.service || '—' }}</td>
            <td>
              <span class="badge" [class.read]="m.is_read" [class.unread]="!m.is_read">
                {{ m.is_read ? 'Read' : 'New' }}
              </span>
            </td>
            <td>
              <a routerLink="/admin/messages" class="icon-btn" title="Open inbox">›</a>
            </td>
          </tr>
        </tbody>
      </table>
      <ng-template #emptyTpl>
        <div class="empty-state">
          <h3>No enquiries yet</h3>
          <p>Submissions from the public contact form will appear here.</p>
        </div>
      </ng-template>
    </div>
  `,
})
export class DashboardComponent implements OnInit {
  private api = inject(ApiService);

  loading = signal(true);
  totalMessages = signal(0);
  unreadMessages = signal(0);
  servicesCount = signal(0);
  projectsCount = signal(0);
  recent = signal<ContactMessage[]>([]);

  ngOnInit(): void {
    forkJoin({
      summary: this.api.adminMessagesSummary(),
      services: this.api.adminListServices(),
      projects: this.api.adminListProjects(),
      messages: this.api.adminListMessages(),
    }).subscribe({
      next: ({ summary, services, projects, messages }) => {
        this.totalMessages.set(summary.total);
        this.unreadMessages.set(summary.unread);
        this.servicesCount.set(services.filter((s) => s.active).length);
        this.projectsCount.set(projects.filter((p) => p.active).length);
        this.recent.set(messages.slice(0, 6));
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }
}
