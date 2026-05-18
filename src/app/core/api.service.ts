import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import {
  Client,
  ContactMessage,
  Project,
  Service,
  Stat,
} from './models';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  /* ---------- Public ---------- */
  getStats():    Observable<Stat[]>    { return this.http.get<Stat[]>(`${this.base}/stats`); }
  getServices(): Observable<Service[]> { return this.http.get<Service[]>(`${this.base}/services`); }
  getProjects(): Observable<Project[]> { return this.http.get<Project[]>(`${this.base}/projects`); }
  getClients():  Observable<Client[]>  { return this.http.get<Client[]>(`${this.base}/clients`); }

  submitContact(payload: {
    name: string;
    organization?: string | null;
    email?: string | null;
    service?: string | null;
    message: string;
  }): Observable<{ ok: boolean; message: string; id: number }> {
    return this.http.post<{ ok: boolean; message: string; id: number }>(
      `${this.base}/contact`,
      payload,
    );
  }

  /* ---------- Admin: Stats ---------- */
  adminListStats():  Observable<Stat[]>  { return this.http.get<Stat[]>(`${this.base}/admin/stats`); }
  adminCreateStat(b: Partial<Stat>):  Observable<Stat> { return this.http.post<Stat>(`${this.base}/admin/stats`, b); }
  adminUpdateStat(id: number, b: Partial<Stat>):  Observable<Stat> { return this.http.put<Stat>(`${this.base}/admin/stats/${id}`, b); }
  adminDeleteStat(id: number):  Observable<unknown> { return this.http.delete(`${this.base}/admin/stats/${id}`); }

  /* ---------- Admin: Services ---------- */
  adminListServices(): Observable<Service[]> { return this.http.get<Service[]>(`${this.base}/admin/services`); }
  adminCreateService(b: Partial<Service>): Observable<Service> { return this.http.post<Service>(`${this.base}/admin/services`, b); }
  adminUpdateService(id: number, b: Partial<Service>): Observable<Service> { return this.http.put<Service>(`${this.base}/admin/services/${id}`, b); }
  adminDeleteService(id: number): Observable<unknown> { return this.http.delete(`${this.base}/admin/services/${id}`); }

  /* ---------- Admin: Projects ---------- */
  adminListProjects(): Observable<Project[]> { return this.http.get<Project[]>(`${this.base}/admin/projects`); }
  adminCreateProject(b: Partial<Project>): Observable<Project> { return this.http.post<Project>(`${this.base}/admin/projects`, b); }
  adminUpdateProject(id: number, b: Partial<Project>): Observable<Project> { return this.http.put<Project>(`${this.base}/admin/projects/${id}`, b); }
  adminDeleteProject(id: number): Observable<unknown> { return this.http.delete(`${this.base}/admin/projects/${id}`); }

  /* ---------- Admin: Clients ---------- */
  adminListClients(): Observable<Client[]> { return this.http.get<Client[]>(`${this.base}/admin/clients`); }
  adminCreateClient(form: FormData): Observable<Client> { return this.http.post<Client>(`${this.base}/admin/clients`, form); }
  adminUpdateClient(id: number, form: FormData): Observable<Client> {
    // Laravel needs a method spoof for multipart PUT
    form.append('_method', 'PUT');
    return this.http.post<Client>(`${this.base}/admin/clients/${id}`, form);
  }
  adminDeleteClient(id: number): Observable<unknown> { return this.http.delete(`${this.base}/admin/clients/${id}`); }

  /* ---------- Admin: Messages ---------- */
  adminListMessages():    Observable<ContactMessage[]> { return this.http.get<ContactMessage[]>(`${this.base}/admin/messages`); }
  adminMessagesSummary(): Observable<{ total: number; unread: number }> { return this.http.get<{ total: number; unread: number }>(`${this.base}/admin/messages/summary`); }
  adminMarkRead(id: number, isRead: boolean): Observable<ContactMessage> {
    return this.http.put<ContactMessage>(`${this.base}/admin/messages/${id}`, { is_read: isRead });
  }
  adminDeleteMessage(id: number): Observable<unknown> { return this.http.delete(`${this.base}/admin/messages/${id}`); }
}
