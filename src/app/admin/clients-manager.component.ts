import { Component, OnInit, inject, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Client } from '../core/models';

interface Draft {
  name: string;
  affiliation_note: string;
  order: number;
  active: boolean;
  logoFile?: File | null;
}

@Component({
  selector: 'app-clients-manager',
  imports: [NgIf, NgFor, FormsModule],
  styleUrl: './admin.css',
  template: `
    <div class="admin-topbar">
      <div>
        <div class="crumb">Content</div>
        <h1>Clients &amp; Affiliations</h1>
      </div>
      <div class="admin-actions">
        <button class="btn-add" (click)="addNew()">＋ Add Client</button>
      </div>
    </div>

    <div class="admin-form-card" *ngIf="newDraft()">
      <h3>New Client</h3>
      <div class="admin-form-grid">
        <div class="field"><label>Name</label><input [(ngModel)]="newDraft()!.name"></div>
        <div class="field"><label>Order</label><input type="number" [(ngModel)]="newDraft()!.order"></div>
        <div class="field field-wide"><label>Affiliation Note</label><input [(ngModel)]="newDraft()!.affiliation_note"></div>
        <div class="field field-wide">
          <label>Logo (optional, png/jpg/svg, max 2MB)</label>
          <input type="file" accept="image/*" (change)="onFileSelected($event, true)">
        </div>
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
          <th style="width:90px;">Logo</th>
          <th style="width:240px;">Name</th>
          <th>Affiliation Note</th>
          <th style="width:170px;">Replace Logo</th>
          <th style="width:70px;">Active</th>
          <th style="width:120px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let c of items()">
          <td><input type="number" [(ngModel)]="c.order"></td>
          <td>
            <img *ngIf="c.logo_url" [src]="c.logo_url" alt="" style="max-height:40px; max-width:80px; object-fit:contain;">
            <span *ngIf="!c.logo_url" style="color:var(--muted); font-size:0.78rem;">—</span>
          </td>
          <td><input [(ngModel)]="c.name"></td>
          <td><input [(ngModel)]="c.affiliation_note"></td>
          <td><input type="file" accept="image/*" (change)="onRowFile($event, c.id)"></td>
          <td><input type="checkbox" [checked]="c.active" (change)="c.active = $any($event.target).checked"></td>
          <td>
            <div class="row-actions">
              <button class="icon-btn success" (click)="save(c)" title="Save">✓</button>
              <button class="icon-btn danger" (click)="remove(c)" title="Delete">×</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ng-template #emptyTpl><div class="empty-state"><h3>No clients</h3><p>Add the first client or affiliation.</p></div></ng-template>
    <div class="toast" *ngIf="toast()" [class.err]="toastErr()">{{ toast() }}</div>
  `,
})
export class ClientsManagerComponent implements OnInit {
  private api = inject(ApiService);

  items = signal<Client[]>([]);
  newDraft = signal<Draft | null>(null);
  toast = signal<string | null>(null);
  toastErr = signal(false);
  rowFiles = new Map<number, File>();

  ngOnInit(): void { this.reload(); }
  reload(): void { this.api.adminListClients().subscribe((d) => this.items.set(d)); }

  addNew(): void {
    const maxOrder = Math.max(0, ...this.items().map((c) => c.order));
    this.newDraft.set({ name: '', affiliation_note: '', order: maxOrder + 1, active: true, logoFile: null });
  }
  cancelNew(): void { this.newDraft.set(null); }
  onFileSelected(ev: Event, isNew: boolean): void {
    const file = (ev.target as HTMLInputElement).files?.[0] ?? null;
    if (isNew && this.newDraft()) {
      this.newDraft.update((d) => ({ ...d!, logoFile: file }));
    }
  }
  onRowFile(ev: Event, clientId: number): void {
    const file = (ev.target as HTMLInputElement).files?.[0];
    if (file) this.rowFiles.set(clientId, file);
  }

  saveNew(): void {
    const d = this.newDraft();
    if (!d || !d.name.trim()) { this.flash('Name is required.', true); return; }
    const form = new FormData();
    form.append('name', d.name);
    form.append('affiliation_note', d.affiliation_note ?? '');
    form.append('order', String(d.order));
    form.append('active', d.active ? '1' : '0');
    if (d.logoFile) form.append('logo', d.logoFile);

    this.api.adminCreateClient(form).subscribe({
      next: () => { this.cancelNew(); this.reload(); this.flash('Client created.'); },
      error: () => this.flash('Failed to create.', true),
    });
  }

  save(c: Client): void {
    const form = new FormData();
    form.append('name', c.name);
    form.append('affiliation_note', c.affiliation_note ?? '');
    form.append('order', String(c.order));
    form.append('active', c.active ? '1' : '0');
    const file = this.rowFiles.get(c.id);
    if (file) form.append('logo', file);

    this.api.adminUpdateClient(c.id, form).subscribe({
      next: () => { this.rowFiles.delete(c.id); this.reload(); this.flash('Saved.'); },
      error: () => this.flash('Save failed.', true),
    });
  }

  remove(c: Client): void {
    if (!confirm(`Delete "${c.name}"?`)) return;
    this.api.adminDeleteClient(c.id).subscribe({
      next: () => { this.reload(); this.flash('Deleted.'); },
      error: () => this.flash('Delete failed.', true),
    });
  }

  private flash(msg: string, err = false): void {
    this.toastErr.set(err); this.toast.set(msg);
    setTimeout(() => this.toast.set(null), 2400);
  }
}
