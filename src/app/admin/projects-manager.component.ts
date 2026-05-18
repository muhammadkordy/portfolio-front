import { Component, OnInit, inject, signal } from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Project } from '../core/models';

interface Draft {
  id?: number;
  title: string;
  scope: string;
  key_result: string;
  order: number;
  active: boolean;
}

@Component({
  selector: 'app-projects-manager',
  imports: [NgIf, NgFor, FormsModule],
  styleUrl: './admin.css',
  template: `
    <div class="admin-topbar">
      <div>
        <div class="crumb">Content</div>
        <h1>Selected Work</h1>
      </div>
      <div class="admin-actions">
        <button class="btn-add" (click)="addNew()">＋ Add Project</button>
      </div>
    </div>

    <div class="admin-form-card" *ngIf="newDraft()">
      <h3>New Project</h3>
      <div class="admin-form-grid">
        <div class="field"><label>Title</label><input [(ngModel)]="newDraft()!.title"></div>
        <div class="field"><label>Order</label><input type="number" [(ngModel)]="newDraft()!.order"></div>
        <div class="field field-wide"><label>Scope</label><textarea rows="3" [(ngModel)]="newDraft()!.scope"></textarea></div>
        <div class="field field-wide"><label>Key Result</label><input [(ngModel)]="newDraft()!.key_result"></div>
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
          <th style="width:240px;">Title</th>
          <th>Scope</th>
          <th style="width:220px;">Key Result</th>
          <th style="width:70px;">Active</th>
          <th style="width:120px;">Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let p of items()">
          <td><input type="number" [(ngModel)]="p.order"></td>
          <td><input [(ngModel)]="p.title"></td>
          <td><textarea rows="3" [(ngModel)]="p.scope"></textarea></td>
          <td><textarea rows="3" [(ngModel)]="p.key_result"></textarea></td>
          <td><input type="checkbox" [checked]="p.active" (change)="p.active = $any($event.target).checked"></td>
          <td>
            <div class="row-actions">
              <button class="icon-btn success" (click)="save(p)" title="Save">✓</button>
              <button class="icon-btn danger" (click)="remove(p)" title="Delete">×</button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <ng-template #emptyTpl><div class="empty-state"><h3>No projects</h3><p>Add a portfolio highlight.</p></div></ng-template>
    <div class="toast" *ngIf="toast()" [class.err]="toastErr()">{{ toast() }}</div>
  `,
})
export class ProjectsManagerComponent implements OnInit {
  private api = inject(ApiService);
  items = signal<Project[]>([]);
  newDraft = signal<Draft | null>(null);
  toast = signal<string | null>(null);
  toastErr = signal(false);

  ngOnInit(): void { this.reload(); }
  reload(): void { this.api.adminListProjects().subscribe((d) => this.items.set(d)); }
  addNew(): void {
    const maxOrder = Math.max(0, ...this.items().map((p) => p.order));
    this.newDraft.set({ title: '', scope: '', key_result: '', order: maxOrder + 1, active: true });
  }
  cancelNew(): void { this.newDraft.set(null); }
  saveNew(): void {
    const d = this.newDraft();
    if (!d || !d.title.trim() || !d.scope.trim() || !d.key_result.trim()) { this.flash('All fields are required.', true); return; }
    this.api.adminCreateProject(d).subscribe({
      next: () => { this.cancelNew(); this.reload(); this.flash('Project created.'); },
      error: () => this.flash('Failed to create.', true),
    });
  }
  save(p: Project): void {
    this.api.adminUpdateProject(p.id, p).subscribe({
      next: () => this.flash('Saved.'),
      error: () => this.flash('Save failed.', true),
    });
  }
  remove(p: Project): void {
    if (!confirm(`Delete "${p.title}"?`)) return;
    this.api.adminDeleteProject(p.id).subscribe({
      next: () => { this.reload(); this.flash('Deleted.'); },
      error: () => this.flash('Delete failed.', true),
    });
  }
  private flash(msg: string, err = false): void {
    this.toastErr.set(err); this.toast.set(msg);
    setTimeout(() => this.toast.set(null), 2400);
  }
}
