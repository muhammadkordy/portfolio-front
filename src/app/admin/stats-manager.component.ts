import { Component, OnInit, inject, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Stat } from '../core/models';

interface DraftStat {
  id?: number;
  label: string;
  value: string;
  suffix: string;
  order: number;
  active: boolean;
}

@Component({
  selector: 'app-stats-manager',
  imports: [NgIf, NgFor, FormsModule],
  styleUrl: './admin.css',
  template: `
    <div class="admin-topbar">
      <div>
        <div class="crumb">Content</div>
        <h1>Impact Numbers</h1>
      </div>
      <div class="admin-actions">
        <button class="btn-add" (click)="addNew()">＋ Add Stat</button>
      </div>
    </div>

    <div class="admin-form-card" *ngIf="newDraft()">
      <h3>New Stat</h3>
      <div class="admin-form-grid">
        <div class="field"><label>Label</label><input [(ngModel)]="newDraft()!.label" placeholder="e.g. ROI on Exhibitions"></div>
        <div class="field"><label>Value</label><input [(ngModel)]="newDraft()!.value" placeholder="e.g. 486"></div>
        <div class="field"><label>Suffix</label><input [(ngModel)]="newDraft()!.suffix" placeholder="e.g. % or empty"></div>
        <div class="field"><label>Order</label><input type="number" [(ngModel)]="newDraft()!.order"></div>
        <div class="field-wide" style="display:flex; gap:12px; justify-content:flex-end;">
          <button class="btn-add" style="background:transparent;color:var(--ink);border:1px solid var(--line);" (click)="cancelNew()">Cancel</button>
          <button class="btn-add" (click)="saveNew()">Save</button>
        </div>
      </div>
    </div>

    <table class="admin-table" *ngIf="stats().length > 0; else emptyTpl">
      <thead>
        <tr>
          <th style="width:60px;">#</th>
          <th>Label</th>
          <th style="width:120px;">Value</th>
          <th style="width:90px;">Suffix</th>
          <th style="width:80px;">Active</th>
          <th style="width:140px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let s of stats(); let i = index">
          <td><input type="number" [(ngModel)]="s.order"></td>
          <td><input [(ngModel)]="s.label"></td>
          <td><input [(ngModel)]="s.value"></td>
          <td><input [(ngModel)]="s.suffix"></td>
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
    <ng-template #emptyTpl>
      <div class="empty-state"><h3>No stats yet</h3><p>Add your first impact number.</p></div>
    </ng-template>

    <div class="toast" *ngIf="toast()" [class.err]="toastErr()">{{ toast() }}</div>
  `,
})
export class StatsManagerComponent implements OnInit {
  private api = inject(ApiService);

  stats = signal<(Stat & { suffix: string })[]>([]);
  newDraft = signal<DraftStat | null>(null);
  toast = signal<string | null>(null);
  toastErr = signal(false);

  ngOnInit(): void { this.reload(); }

  reload(): void {
    this.api.adminListStats().subscribe((d) => {
      this.stats.set(
        d.map((s) => ({ ...s, suffix: s.suffix ?? '' })),
      );
    });
  }

  addNew(): void {
    const maxOrder = Math.max(0, ...this.stats().map((s) => s.order));
    this.newDraft.set({ label: '', value: '', suffix: '', order: maxOrder + 1, active: true });
  }
  cancelNew(): void { this.newDraft.set(null); }

  saveNew(): void {
    const d = this.newDraft();
    if (!d || !d.label.trim() || !d.value.trim()) {
      this.flash('Label and value are required.', true); return;
    }
    this.api.adminCreateStat(d).subscribe({
      next: () => { this.cancelNew(); this.reload(); this.flash('Stat created.'); },
      error: () => this.flash('Failed to create stat.', true),
    });
  }

  save(s: Stat & { suffix: string }): void {
    this.api.adminUpdateStat(s.id, s).subscribe({
      next: () => this.flash('Saved.'),
      error: () => this.flash('Save failed.', true),
    });
  }

  remove(s: Stat): void {
    if (!confirm(`Delete "${s.label}"?`)) return;
    this.api.adminDeleteStat(s.id).subscribe({
      next: () => { this.reload(); this.flash('Deleted.'); },
      error: () => this.flash('Delete failed.', true),
    });
  }

  private flash(msg: string, err = false): void {
    this.toastErr.set(err);
    this.toast.set(msg);
    setTimeout(() => this.toast.set(null), 2400);
  }
}
