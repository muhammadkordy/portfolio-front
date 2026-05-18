import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { NgIf, NgFor, DatePipe } from '@angular/common';
import { ApiService } from '../core/api.service';
import { ContactMessage } from '../core/models';

@Component({
  selector: 'app-messages-inbox',
  imports: [NgIf, NgFor, DatePipe],
  styleUrl: './admin.css',
  template: `
    <div class="admin-topbar">
      <div>
        <div class="crumb">Overview</div>
        <h1>Messages Inbox</h1>
      </div>
      <div class="admin-actions">
        <span class="badge unread" *ngIf="unreadCount() > 0">{{ unreadCount() }} unread</span>
      </div>
    </div>

    <div class="inbox-layout" *ngIf="items().length > 0; else emptyTpl">
      <div class="inbox-list">
        <button
          *ngFor="let m of items()"
          class="inbox-item"
          [class.active]="selected()?.id === m.id"
          [class.unread]="!m.is_read"
          (click)="select(m)">
          <div class="inbox-item-row">
            <strong>{{ m.name }}</strong>
            <span class="time">{{ m.created_at | date:'d MMM, HH:mm' }}</span>
          </div>
          <div class="inbox-item-org">{{ m.organization || '—' }}</div>
          <div class="inbox-item-snip">{{ m.message }}</div>
        </button>
      </div>
      <div class="inbox-detail">
        <ng-container *ngIf="selected() as m; else pickOne">
          <div class="detail-head">
            <div>
              <h2>{{ m.name }}</h2>
              <div class="muted">{{ m.organization || 'Independent' }}</div>
            </div>
            <div class="detail-actions">
              <button class="icon-btn" (click)="toggleRead(m)" title="Toggle read/unread">
                {{ m.is_read ? '👁' : '✉' }}
              </button>
              <button class="icon-btn danger" (click)="remove(m)" title="Delete">×</button>
            </div>
          </div>
          <dl class="detail-meta">
            <dt>Received</dt><dd>{{ m.created_at | date:'EEEE d MMMM y, HH:mm' }}</dd>
            <dt *ngIf="m.email">Email</dt><dd *ngIf="m.email"><a [href]="'mailto:' + m.email">{{ m.email }}</a></dd>
            <dt *ngIf="m.service">Service</dt><dd *ngIf="m.service">{{ m.service }}</dd>
            <dt>Status</dt>
            <dd>
              <span class="badge" [class.read]="m.is_read" [class.unread]="!m.is_read">
                {{ m.is_read ? 'Read' : 'New' }}
              </span>
            </dd>
          </dl>
          <div class="detail-msg">{{ m.message }}</div>
          <div class="detail-reply" *ngIf="m.email">
            <a [href]="'mailto:' + m.email + '?subject=Re: Your enquiry'" class="btn btn--ghost">
              <span>Reply via email</span>
              <span class="arr"></span>
            </a>
          </div>
        </ng-container>
        <ng-template #pickOne>
          <div class="empty-state" style="border:none; background:transparent;">
            <h3>Select a message</h3>
            <p>Choose an enquiry on the left to view it in full.</p>
          </div>
        </ng-template>
      </div>
    </div>

    <ng-template #emptyTpl>
      <div class="empty-state">
        <h3>Inbox empty</h3>
        <p>Submissions from the public contact form will land here.</p>
      </div>
    </ng-template>

    <div class="toast" *ngIf="toast()" [class.err]="toastErr()">{{ toast() }}</div>
  `,
  styles: [`
    .inbox-layout { display: grid; grid-template-columns: 360px 1fr; gap: 0; border: 1px solid var(--line); background: #fff; min-height: 600px; }
    .inbox-list { border-right: 1px solid var(--line); max-height: 75vh; overflow-y: auto; }
    .inbox-item {
      display: block; width: 100%;
      text-align: left;
      padding: 18px 20px;
      border: none; background: transparent;
      border-bottom: 1px solid var(--line-soft);
      cursor: pointer;
      transition: background .2s;
      border-left: 3px solid transparent;
    }
    .inbox-item:hover { background: var(--beige-soft); }
    .inbox-item.active { background: var(--beige-soft); border-left-color: var(--navy); }
    .inbox-item.unread { background: rgba(201,168,76,0.04); }
    .inbox-item.unread.active { background: var(--beige-soft); }
    .inbox-item.unread strong::before {
      content: ''; display: inline-block;
      width: 7px; height: 7px;
      background: var(--gold);
      border-radius: 50%;
      margin-right: 8px;
      vertical-align: middle;
    }
    .inbox-item-row { display: flex; justify-content: space-between; align-items: center; gap: 12px; }
    .inbox-item-row .time { font-size: 0.74rem; color: var(--muted-2); white-space: nowrap; }
    .inbox-item-org { font-size: 0.82rem; color: var(--muted); margin-top: 2px; }
    .inbox-item-snip { color: var(--ink-soft); font-size: 0.88rem; margin-top: 6px; line-height: 1.4; display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }

    .inbox-detail { padding: 32px 36px; }
    .detail-head { display: flex; justify-content: space-between; align-items: flex-start; padding-bottom: 18px; border-bottom: 1px solid var(--line); margin-bottom: 22px; }
    .detail-head h2 { font-weight: 500; }
    .detail-head .muted { color: var(--muted); font-size: 0.92rem; margin-top: 4px; }
    .detail-actions { display: flex; gap: 8px; }
    .detail-meta { display: grid; grid-template-columns: 110px 1fr; gap: 8px 18px; margin-bottom: 28px; }
    .detail-meta dt { font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase; color: var(--muted); padding-top: 2px; }
    .detail-meta dd { margin: 0; color: var(--ink); font-size: 0.95rem; }
    .detail-msg { white-space: pre-wrap; line-height: 1.7; font-size: 1.02rem; padding: 24px 0; border-top: 1px solid var(--line-soft); border-bottom: 1px solid var(--line-soft); }
    .detail-reply { margin-top: 26px; }

    @media (max-width: 980px) {
      .inbox-layout { grid-template-columns: 1fr; }
      .inbox-list { max-height: 280px; border-right: none; border-bottom: 1px solid var(--line); }
      .inbox-detail { padding: 22px; }
      .detail-meta { grid-template-columns: 1fr; }
    }
  `],
})
export class MessagesInboxComponent implements OnInit {
  private api = inject(ApiService);

  items = signal<ContactMessage[]>([]);
  selected = signal<ContactMessage | null>(null);
  toast = signal<string | null>(null);
  toastErr = signal(false);

  unreadCount = computed(() => this.items().filter((m) => !m.is_read).length);

  ngOnInit(): void { this.reload(); }

  reload(): void {
    this.api.adminListMessages().subscribe((d) => {
      this.items.set(d);
      // keep current selection if possible
      const cur = this.selected();
      if (cur) {
        const updated = d.find((m) => m.id === cur.id);
        this.selected.set(updated ?? null);
      }
    });
  }

  select(m: ContactMessage): void {
    this.selected.set(m);
    if (!m.is_read) {
      this.api.adminMarkRead(m.id, true).subscribe(() => {
        this.items.update((arr) => arr.map((x) => (x.id === m.id ? { ...x, is_read: true } : x)));
        this.selected.update((s) => (s ? { ...s, is_read: true } : s));
      });
    }
  }

  toggleRead(m: ContactMessage): void {
    this.api.adminMarkRead(m.id, !m.is_read).subscribe(() => {
      this.items.update((arr) => arr.map((x) => (x.id === m.id ? { ...x, is_read: !m.is_read } : x)));
      this.selected.update((s) => (s ? { ...s, is_read: !m.is_read } : s));
      this.flash(!m.is_read ? 'Marked as read.' : 'Marked as unread.');
    });
  }

  remove(m: ContactMessage): void {
    if (!confirm(`Delete this enquiry from "${m.name}"?`)) return;
    this.api.adminDeleteMessage(m.id).subscribe(() => {
      this.selected.set(null);
      this.reload();
      this.flash('Deleted.');
    });
  }

  private flash(msg: string, err = false): void {
    this.toastErr.set(err); this.toast.set(msg);
    setTimeout(() => this.toast.set(null), 2400);
  }
}
