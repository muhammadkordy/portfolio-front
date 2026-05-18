import { Component, OnInit, inject, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Service } from '../core/models';

interface Draft {
  id?: number;
  icon: string;
  title: string;
  description: string;
  order: number;
  active: boolean;
}

@Component({
  selector: 'app-services-manager',
  imports: [NgIf, NgFor, FormsModule],
  styleUrl: './admin.css',
  template: `
    <div class="admin-topbar">
      <div>
        <div class="crumb">Content</div>
        <h1>Services</h1>
      </div>
      <div class="admin-actions">
        <button class="btn-add" (click)="addNew()">＋ Add Service</button>
      </div>
    </div>

    <div class="admin-form-card" *ngIf="newDraft()">
      <h3>New Service</h3>
      <div class="admin-form-grid">
        <div class="field"><label>Title</label><input [(ngModel)]="newDraft()!.title"></div>
        <div class="field">
          <label>Icon (chart, compass, search, document, calendar, sparkle)</label>
          <select [(ngModel)]="newDraft()!.icon">
            <option value="chart">chart</option>
            <option value="compass">compass</option>
            <option value="search">search</option>
            <option value="document">document</option>
            <option value="calendar">calendar</option>
            <option value="sparkle">sparkle</option>
          </select>
        </div>
        <div class="field field-wide"><label>Description</label><textarea rows="3" [(ngModel)]="newDraft()!.description"></textarea></div>
        <div class="field"><label>Order</label><input type="number" [(ngModel)]="newDraft()!.order"></div>
        <div class="field-wide" style="display:flex; gap:12px; justify-content:flex-end;">
          <button class="btn-add" style="background:transparent;color:var(--ink);border:1px solid var(--line);" (click)="cancelNew()">Cancel</button>
          <button class="btn-add" (click)="saveNew()">Save</button>
        </div>
      </div>
    </div>

    <table class="admin-table" *ngIf="items().length > 0; else emptyTpl">
      <thead>
        <tr>
          <th style="width:60px;">#</th>
          <th style="width:110px;">Icon</th>
          <th style="width:240px;">Title</th>
          <th>Description</th>
          <th style="width:70px;">Active</th>
          <th style="width:120px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let s of items()">
          <td><input type="number" [(ngModel)]="s.order"></td>
          <td>
            <select [(ngModel)]="s.icon">
              <option value="chart">chart</option>
              <option value="compass">compass</option>
              <option value="search">search</option>
              <option value="document">document</option>
              <option value="calendar">calendar</option>
              <option value="sparkle">sparkle</option>
            </select>
          </td>
          <td><input [(ngModel)]="s.title"></td>
          <td><textarea rows="2" [(ngModel)]="s.description"></textarea></td>
          <td><input type="checkbox" [checked]="s.active" (change)="s.active = $any($event.target).checked"></td>
          <td>
            <div class="row-actions">
              <button class="icon-btn success" (click)="save(s)" title="Save">✓</button>
              <button class="icon-btn danger" (click)="remove(s)" title="Delete">×</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ng-template #emptyTpl><div class="empty-state"><h3>No services</h3><p>Add the first service.</p></div></ng-template>

    <div class="toast" *ngIf="toast()" [class.err]="toastErr()">{{ toast() }}</div>
  `,
})
export class ServicesManagerComponent implements OnInit {
  private api = inject(ApiService);
  items = signal<(Service & { icon: string })[]>([]);
  newDraft = signal<Draft | null>(null);
  toast = signal<string | null>(null);
  toastErr = signal(false);

  ngOnInit(): void { this.reload(); }
  reload(): void {
    this.api.adminListServices().subscribe((d) => this.items.set(d.map((s) => ({ ...s, icon: s.icon ?? 'sparkle' }))));
  }
  addNew(): void {
    const maxOrder = Math.max(0, ...this.items().map((s) => s.order));
    this.newDraft.set({ icon: 'sparkle', title: '', description: '', order: maxOrder + 1, active: true });
  }
  cancelNew(): void { this.newDraft.set(null); }
  saveNew(): void {
    const d = this.newDraft();
    if (!d || !d.title.trim() || !d.description.trim()) { this.flash('Title and description are required.', true); return; }
    this.api.adminCreateService(d).subscribe({
      next: () => { this.cancelNew(); this.reload(); this.flash('Service created.'); },
      error: () => this.flash('Failed to create.', true),
    });
  }
  save(s: Service): void {
    this.api.adminUpdateService(s.id, s).subscribe({
      next: () => this.flash('Saved.'),
      error: () => this.flash('Save failed.', true),
    });
  }
  remove(s: Service): void {
    if (!confirm(`Delete "${s.title}"?`)) return;
    this.api.adminDeleteService(s.id).subscribe({
      next: () => { this.reload(); this.flash('Deleted.'); },
      error: () => this.flash('Delete failed.', true),
    });
  }
  private flash(msg: string, err = false): void {
    this.toastErr.set(err); this.toast.set(msg);
    setTimeout(() => this.toast.set(null), 2400);
  }
}
