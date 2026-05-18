import { Component, OnInit, inject, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Client, Project, Service, Stat } from '../core/models';
import { CountUpDirective } from '../core/countup.directive';
import { RevealDirective } from '../core/reveal.directive';
import { IconComponent } from '../core/icon.component';

interface ContactForm {
  name: string;
  organization: string;
  email: string;
  service: string;
  message: string;
}

@Component({
  selector: 'app-home',
  imports: [NgFor, NgIf, FormsModule, CountUpDirective, RevealDirective, IconComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  private api = inject(ApiService);

  stats    = signal<Stat[]>([]);
  services = signal<Service[]>([]);
  projects = signal<Project[]>([]);
  clients  = signal<Client[]>([]);

  loadingStats = signal(true);
  loadingServices = signal(true);
  loadingProjects = signal(true);
  loadingClients  = signal(true);

  form: ContactForm = {
    name: '',
    organization: '',
    email: '',
    service: '',
    message: '',
  };
  submitting = signal(false);
  submitted = signal(false);
  serverError = signal<string | null>(null);
  fieldErrors = signal<Record<string, string[]>>({});

  serviceOptions = [
    'Business Intelligence & Power BI Dashboards',
    'Feasibility Studies',
    'Market Research',
    'Executive Reports & Presentations',
    'Corporate Event & Exhibition Planning',
    'Brand Establishment & Strategy',
    'Other / Multiple',
  ];

  ngOnInit(): void {
    this.api.getStats().subscribe({
      next: (d) => { this.stats.set(d); this.loadingStats.set(false); },
      error: () => this.loadingStats.set(false),
    });
    this.api.getServices().subscribe({
      next: (d) => { this.services.set(d); this.loadingServices.set(false); },
      error: () => this.loadingServices.set(false),
    });
    this.api.getProjects().subscribe({
      next: (d) => { this.projects.set(d); this.loadingProjects.set(false); },
      error: () => this.loadingProjects.set(false),
    });
    this.api.getClients().subscribe({
      next: (d) => { this.clients.set(d); this.loadingClients.set(false); },
      error: () => this.loadingClients.set(false),
    });
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 78 + 1;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  /** Parse "27", "6.7", "-1.28", "486" → number for count-up */
  parseValue(v: string): number {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  submit(formRef: NgForm): void {
    if (formRef.invalid || this.submitting()) return;
    this.submitting.set(true);
    this.serverError.set(null);
    this.fieldErrors.set({});

    this.api
      .submitContact({
        name: this.form.name.trim(),
        organization: this.form.organization.trim() || null,
        email: this.form.email.trim() || null,
        service: this.form.service || null,
        message: this.form.message.trim(),
      })
      .subscribe({
        next: () => {
          this.submitting.set(false);
          this.submitted.set(true);
          this.form = { name: '', organization: '', email: '', service: '', message: '' };
          formRef.resetForm();
        },
        error: (err) => {
          this.submitting.set(false);
          if (err?.status === 422 && err?.error?.errors) {
            this.fieldErrors.set(err.error.errors);
          } else {
            this.serverError.set('Something went wrong. Please try again or email muhammadkordy98@gmail.com.');
          }
        },
      });
  }

  fieldErr(name: string): string | null {
    const errs = this.fieldErrors()[name];
    return errs && errs.length ? errs[0] : null;
  }
}
