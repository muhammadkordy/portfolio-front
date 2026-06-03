import { Component, OnInit, AfterViewInit, inject, signal, computed, HostListener } from '@angular/core';
import { NgFor, NgIf, NgClass } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { ApiService } from '../core/api.service';
import { Project, Service, Stat } from '../core/models';
import { CountUpDirective } from '../core/countup.directive';
import { RevealDirective } from '../core/reveal.directive';
import { IconComponent } from '../core/icon.component';
import { HeroChartComponent } from '../core/hero-chart.component';
import { GalleryPlaceholderComponent } from '../core/gallery-placeholder.component';

interface ContactForm {
  name: string;
  organization: string;
  email: string;
  service: string;
  message: string;
}

export interface GalleryItem {
  id: number;
  title: string;
  type: 'dashboard' | 'report' | 'presentation' | 'budget' | 'strategy';
  image: string;
  description: string;
  tags: string[];
  year: string;
  confidentiality: string;
}

interface CaseStudy {
  category: string;
  title: string;
  context: string;
  role: string;
  methods: string;
  output: string;
  visual: string;
}

interface TimelineEntry {
  company: string;
  role: string;
  period: string;
  description: string;
  current: boolean;
}

interface Certification {
  title: string;
  issuer: string;
}

@Component({
  selector: 'app-home',
  imports: [NgFor, NgIf, NgClass, FormsModule, CountUpDirective, RevealDirective, IconComponent, GalleryPlaceholderComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit, AfterViewInit {
  private api = inject(ApiService);

  stats    = signal<Stat[]>([]);
  services = signal<Service[]>([]);
  projects = signal<Project[]>([]);

  loadingStats    = signal(true);
  loadingServices = signal(true);
  loadingProjects = signal(true);

  form: ContactForm = { name: '', organization: '', email: '', service: '', message: '' };
  submitting  = signal(false);
  submitted   = signal(false);
  serverError = signal<string | null>(null);
  fieldErrors = signal<Record<string, string[]>>({});

  serviceOptions = [
    'Business Intelligence Dashboard',
    'Market Research',
    'Feasibility Study',
    'Competitive Intelligence',
    'Strategy / Go-to-Market',
    'Executive Report',
    'Other',
  ];

  // Hero mouse-parallax
  px = signal(0);
  py = signal(0);
  private rafPending = false;

  // Work card stacking
  pastWorkSet = signal<Set<number>>(new Set());
  isWorkPast(i: number): boolean { return this.pastWorkSet().has(i); }

  ngAfterViewInit(): void { /* reserved */ }

  activeFilter        = signal<string>('all');
  selectedGalleryItem = signal<GalleryItem | null>(null);
  hoveredGalleryItem  = signal<GalleryItem | null>(null);
  galleryPreviewX     = signal(0);
  galleryPreviewY     = signal(0);
  filteredGalleryItems = computed(() => {
    const f = this.activeFilter();
    if (f === 'all') return this.galleryItems;
    return this.galleryItems.filter(item => item.type === f);
  });

  staticStats: Stat[] = [
    { id: 1, label: 'Power BI dashboards and intelligence views delivered', value: '27', suffix: null, order: 1, active: true },
    { id: 2, label: 'Dashboards maintained monthly for leadership follow-up', value: '5', suffix: null, order: 2, active: true },
    { id: 3, label: 'Executive reports delivered monthly', value: '3', suffix: null, order: 3, active: true },
    { id: 4, label: 'Exhibitions planned in the Year 3 commercial calendar', value: '27', suffix: null, order: 4, active: true },
    { id: 5, label: 'Average annual exhibitions ROI tracked internally', value: '412', suffix: '%', order: 5, active: true },
    { id: 6, label: 'Research studies managed monthly in high-throughput environment', value: '7', suffix: '+', order: 6, active: true },
  ];

  staticCapabilities: (Service & { tags?: string[] })[] = [
    { id: 1, icon: 'chart', title: 'Business Intelligence & Dashboards', description: 'KPI systems, Power BI dashboards, monthly performance reporting, and leadership follow-up.', order: 1, active: true, tags: ['POWER BI', 'KPI TRACKING', 'DASHBOARDS', 'DAX'] },
    { id: 2, icon: 'search', title: 'Market Research & Feasibility Studies', description: 'Market sizing, demand assessment, consumer insights, feasibility logic, and decision-ready recommendations.', order: 2, active: true, tags: ['MARKET SIZING', 'CONSUMER INSIGHTS', 'FEASIBILITY'] },
    { id: 3, icon: 'compass', title: 'Competitive & Desk Research', description: 'Competitor mapping, pricing intelligence, benchmark analysis, market structure, and strategic implications.', order: 3, active: true, tags: ['COMPETITOR MAPPING', 'PRICING INTEL', 'BENCHMARKING'] },
    { id: 4, icon: 'map', title: 'Strategy & Go-to-Market', description: 'Market entry logic, geographic prioritization, channel thinking, brand positioning, and commercial planning.', order: 4, active: true, tags: ['MARKET ENTRY', 'POSITIONING', 'CHANNEL STRATEGY'] },
    { id: 5, icon: 'calendar', title: 'Exhibition Strategy & ROI Evaluation', description: 'Annual exhibition calendars, event KPIs, lead tracking, ROI analysis, post-event reporting, and improvement plans.', order: 5, active: true, tags: ['ROI ANALYSIS', 'EVENT KPIs', 'POST-EVENT'] },
    { id: 6, icon: 'document', title: 'Executive Reporting & Storytelling', description: 'Board-ready narratives, executive briefs, presentation decks, insight summaries, and action plans.', order: 6, active: true, tags: ['BOARD DECKS', 'EXEC BRIEFS', 'STORYTELLING'] },
  ];

  displayStats = computed<Stat[]>(() => {
    const api = this.stats();
    if (api.length > 0) return api;
    return this.loadingStats() ? [] : this.staticStats;
  });

  displayCapabilities = computed<Service[]>(() => {
    const api = this.services();
    if (api.length > 0) return api;
    return this.loadingServices() ? [] : this.staticCapabilities;
  });

  caseStudies: CaseStudy[] = [
    {
      category: 'Business Intelligence / Exhibitions',
      title: 'Exhibition ROI Intelligence System',
      context: 'Built a structured framework to evaluate exhibition performance across cost, leads, meetings, revenue, and ROI for a government-affiliated entity.',
      role: 'Strategy, KPI framework, dashboard logic, evaluation, executive reporting.',
      methods: 'ROI modelling · KPI framework design · Power BI · Excel',
      output: 'ROI tracking model, post-event review structure, annual improvement logic.',
      visual: 'case-dashboard',
    },
    {
      category: 'Strategy / Market Intelligence',
      title: 'B2B Market & Go-To-Market Strategy',
      context: 'Developed market logic for B2B product categories, export opportunities, geographic priorities, and market entry for a national textile development ecosystem.',
      role: 'Research, segmentation, strategy structure, reporting.',
      methods: 'Market sizing · Competitive intelligence · Desk research · Stakeholder mapping',
      output: 'Executive strategy report and action framework.',
      visual: 'case-strategy',
    },
    {
      category: 'Feasibility / Retail Intelligence',
      title: 'Retail Location Feasibility Study',
      context: 'Assessed retail location attractiveness using tenant mix, catchment logic, accessibility, mall positioning, and commercial fit for a premium home textile brand.',
      role: 'Desk research, market scan, feasibility logic, recommendation.',
      methods: 'Location analysis · Catchment assessment · Competitive benchmarking',
      output: 'Location assessment and decision brief.',
      visual: 'case-report',
    },
    {
      category: 'Consumer Insights / DTC',
      title: 'Consumer & Brand Intelligence Report',
      context: 'Studied online and offline customer behavior, brand perception, competitive position, and content opportunities for a value retail brand.',
      role: 'Research design, competitor review, insight synthesis.',
      methods: 'Consumer research · Qualitative synthesis · Competitive review',
      output: 'Consumer intelligence report and brand recommendations.',
      visual: 'case-report',
    },
    {
      category: 'BI / Executive Reporting',
      title: 'Power BI Performance Reporting Ecosystem',
      context: 'Built and maintained dashboards to consolidate inputs, track KPIs, and surface performance drivers for executive leadership teams.',
      role: 'Dashboard design, KPI tracking, reporting, insight storytelling.',
      methods: 'Power BI · DAX · Data modelling · Executive storytelling',
      output: 'Leadership dashboards and monthly performance reports.',
      visual: 'case-dashboard',
    },
    {
      category: 'Strategy / Budgeting',
      title: 'Budget & Commercial Planning Models',
      context: 'Structured budget views for marketing, exhibitions, campaigns, and commercial planning across a holding company portfolio.',
      role: 'Budget logic, scenario thinking, reporting structure.',
      methods: 'Financial modelling · Scenario analysis · Excel · Reporting',
      output: 'Budget framework and executive-ready financial views.',
      visual: 'case-budget',
    },
  ];

  galleryItems: GalleryItem[] = [
    { id: 1, title: 'Exhibition ROI Dashboard', type: 'dashboard', image: 'assets/portfolio/dashboards/dashboard-exhibition-roi.webp', description: 'A Power BI dashboard tracking exhibition ROI, lead generation, and performance metrics across annual trade programs.', tags: ['Power BI', 'ROI Tracking', 'Exhibitions', 'KPIs'], year: '2025', confidentiality: 'Client identity withheld. Figures and entity names abstracted.' },
    { id: 2, title: 'Commercial Performance Dashboard', type: 'dashboard', image: 'assets/portfolio/dashboards/dashboard-commercial-performance.webp', description: 'Monthly leadership dashboard consolidating commercial KPIs, trend analysis, and executive summary views.', tags: ['Power BI', 'Leadership Reporting', 'Commercial KPIs'], year: '2024', confidentiality: 'Client identity withheld.' },
    { id: 3, title: 'Marketing KPI Dashboard', type: 'dashboard', image: 'assets/portfolio/dashboards/dashboard-marketing-kpis.webp', description: 'Marketing performance dashboard tracking campaign spend, lead quality, and channel contribution.', tags: ['Power BI', 'Marketing Analytics', 'Campaign KPIs'], year: '2025', confidentiality: 'Client identity withheld.' },
    { id: 4, title: 'Market Research Report', type: 'report', image: 'assets/portfolio/reports/report-market-research.webp', description: 'Comprehensive market research report covering market sizing, demand assessment, and segment insights for a B2B commercial strategy.', tags: ['Market Research', 'B2B', 'Market Sizing'], year: '2024', confidentiality: 'Client details withheld. Sensitive data abstracted.' },
    { id: 5, title: 'Feasibility Study Brief', type: 'report', image: 'assets/portfolio/reports/report-feasibility-study.webp', description: 'Executive feasibility assessment covering location analysis, financial projections, and strategic recommendations.', tags: ['Feasibility', 'Retail', 'Location Analysis'], year: '2023', confidentiality: 'Client details withheld.' },
    { id: 6, title: 'Competitive Intelligence Report', type: 'report', image: 'assets/portfolio/reports/report-competitive-intelligence.webp', description: 'Structured competitor mapping, pricing intelligence, and benchmark analysis for a national textile ecosystem.', tags: ['Competitive Intelligence', 'Benchmarking', 'Pricing'], year: '2024', confidentiality: 'Client identity withheld.' },
    { id: 7, title: 'B2B Strategy Presentation', type: 'presentation', image: 'assets/portfolio/presentations/deck-b2b-strategy.webp', description: 'Executive strategy deck outlining market entry logic, geographic priorities, and commercial action plan for B2B expansion.', tags: ['Strategy', 'B2B', 'Market Entry', 'Go-to-Market'], year: '2024', confidentiality: 'Client identity withheld.' },
    { id: 8, title: 'DTC Consumer Intelligence Deck', type: 'presentation', image: 'assets/portfolio/presentations/deck-dtc-strategy.webp', description: 'Consumer insights deck covering brand perception, behavioral patterns, and strategic recommendations for a DTC brand.', tags: ['Consumer Insights', 'DTC', 'Brand Strategy'], year: '2023', confidentiality: 'Sensitive consumer data abstracted.' },
    { id: 9, title: 'Executive Intelligence Brief', type: 'presentation', image: 'assets/portfolio/presentations/deck-executive-brief.webp', description: 'Board-level intelligence brief consolidating market position, performance insights, and strategic priorities.', tags: ['Executive Reporting', 'Board Brief', 'Intelligence'], year: '2025', confidentiality: 'Client identity withheld. Sensitive data abstracted.' },
    { id: 10, title: 'Exhibitions Budget Sheet', type: 'budget', image: 'assets/portfolio/budgets/budget-exhibitions.webp', description: 'Annual exhibitions budget framework tracking planned vs. actual spend, ROI, and cost-per-lead across trade events.', tags: ['Budget Planning', 'Exhibitions', 'ROI'], year: '2025', confidentiality: 'Financial figures abstracted.' },
    { id: 11, title: 'Marketing Plan Budget', type: 'budget', image: 'assets/portfolio/budgets/budget-marketing-plan.webp', description: 'Structured marketing budget plan covering campaign allocation, channel spend, and scenario modelling.', tags: ['Budget Planning', 'Marketing', 'Scenarios'], year: '2024', confidentiality: 'Financial figures abstracted.' },
    { id: 12, title: 'Go-to-Market Strategy Framework', type: 'strategy', image: 'assets/portfolio/presentations/deck-b2b-strategy.webp', description: 'Market entry framework covering geographic prioritization, channel strategy, and commercial action plan for regional expansion.', tags: ['Strategy', 'Go-to-Market', 'Market Entry'], year: '2024', confidentiality: 'Client identity withheld.' },
  ];

  galleryFilters = [
    { key: 'all', label: 'All' },
    { key: 'dashboard', label: 'Dashboards' },
    { key: 'report', label: 'Reports' },
    { key: 'presentation', label: 'Presentations' },
    { key: 'budget', label: 'Budgets' },
    { key: 'strategy', label: 'Strategies' },
  ];

  industries: string[] = [
    'Textiles & Manufacturing',
    'B2B Commercial Strategy',
    'DTC / Retail Brands',
    'Home Textiles',
    'Medical Textiles',
    'Exhibitions & Trade Events',
    'Feasibility Studies',
    'Market Research',
    'Consumer Insights',
    'Budget & Performance Planning',
  ];

  tools: string[] = ['Power BI', 'Microsoft Excel', 'PowerPoint', 'Microsoft Power Platform'];

  methods: string[] = [
    'Market Sizing', 'Competitive Intelligence', 'Desk Research',
    'Questionnaire Design', 'Discussion Guides', 'Data Cleaning',
    'KPI Tracking', 'Dashboard Storytelling', 'Executive Reporting',
    'Feasibility Assessment', 'ROI Analysis', 'Vendor / Fieldwork Coordination',
  ];

  timeline: TimelineEntry[] = [
    { company: 'Egyptian Cotton Hub', role: 'Manager · BI & Market Insights', period: 'Current', description: 'Leading business intelligence, market insights, exhibitions intelligence, and commercial decision support for a government-affiliated textile development entity.', current: true },
    { company: 'BSS Group', role: 'Senior Market Researcher', period: 'Previous', description: 'Managed quantitative and qualitative research projects, client reports, field coordination, and high-throughput research delivery.', current: false },
    { company: 'Arkaan Economic Consulting', role: 'Junior Market Analyst', period: 'Previous', description: 'Desk research, consulting support, structured summaries, and presentation decks for advisory projects.', current: false },
    { company: 'Al-Hadara Centre for Research and Studies', role: 'Academic Researcher', period: 'Previous', description: 'Academic research, literature review, research writing, and methodology support.', current: false },
  ];

  certifications: Certification[] = [
    { title: 'Microsoft Power BI Engineer', issuer: 'MCIT' },
    { title: 'Advanced Business Intelligence Analysis', issuer: 'Maven Analytics' },
    { title: 'Business Intelligence', issuer: 'DataCamp' },
    { title: 'Market Research and Consumer Behavior', issuer: '' },
    { title: 'Price Policy Analyst', issuer: '' },
    { title: 'Leadership and Decision-Making', issuer: 'AUC' },
  ];

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      // Force scroll to top on refresh
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
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
  }

  @HostListener('document:keydown.escape')
  onEscape(): void { this.closeGalleryItem(); }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const items = document.querySelectorAll<HTMLElement>('.process-item');
    if (items.length < 2) return;
    const past = new Set<number>();
    const stickyTop = 130; // matches CSS top: 120px + small buffer
    for (let i = 0; i < items.length - 1; i++) {
      // When the NEXT card has reached the sticky position, the current card is "behind" it
      const nextTop = items[i + 1].getBoundingClientRect().top;
      if (nextTop <= stickyTop) past.add(i);
    }
    this.pastWorkSet.set(past);
  }

  @HostListener('window:mousemove', ['$event'])
  onMouseMove(e: MouseEvent): void {
    // Only react near the top of the page (hero region) and throttle to rAF.
    if (window.scrollY > window.innerHeight) return;
    if (this.rafPending) return;
    this.rafPending = true;
    requestAnimationFrame(() => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;   // -1..1
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;  // -1..1
      this.px.set(nx);
      this.py.set(ny);
      this.rafPending = false;
    });
  }

  scrollTo(id: string): void {
    const el = document.getElementById(id);
    if (!el) return;
    const y = el.getBoundingClientRect().top + window.scrollY - 20;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  parseValue(v: string): number {
    const n = Number(v);
    return Number.isFinite(n) ? n : 0;
  }

  setFilter(filter: string): void { this.activeFilter.set(filter); }

  openGalleryItem(item: GalleryItem): void {
    this.selectedGalleryItem.set(item);
    document.body.style.overflow = 'hidden';
  }

  closeGalleryItem(): void {
    this.selectedGalleryItem.set(null);
    document.body.style.overflow = '';
  }

  onGalleryMouseEnter(item: GalleryItem): void {
    this.hoveredGalleryItem.set(item);
  }
  onGalleryMouseLeave(): void {
    this.hoveredGalleryItem.set(null);
  }
  onGalleryMouseMove(e: MouseEvent): void {
    this.galleryPreviewX.set(e.clientX);
    this.galleryPreviewY.set(e.clientY);
  }

  stepFraction(i: number, total: number): string {
    return (i + 1).toString().padStart(2, '0') + ' / ' + total.toString().padStart(2, '0');
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
