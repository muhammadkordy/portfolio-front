import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthUser, LoginResponse } from './models';

const TOKEN_KEY = 'kordy_admin_token';
const USER_KEY = 'kordy_admin_user';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = environment.apiUrl;

  readonly user = signal<AuthUser | null>(this.readUser());
  readonly token = signal<string | null>(this.readToken());

  login(email: string, password: string): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(`${this.base}/admin/login`, { email, password })
      .pipe(
        tap((res) => {
          this.persist(res.token, res.user);
          this.token.set(res.token);
          this.user.set(res.user);
        }),
      );
  }

  logout(): Observable<unknown> {
    const req = this.http.post(`${this.base}/admin/logout`, {});
    return req.pipe(
      tap({
        next: () => this.clear(),
        error: () => this.clear(),
      }),
    );
  }

  isAuthenticated(): boolean {
    return !!this.readToken();
  }

  clear(): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(USER_KEY);
    this.token.set(null);
    this.user.set(null);
  }

  private persist(token: string, user: AuthUser): void {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private readToken(): string | null {
    try { return localStorage.getItem(TOKEN_KEY); } catch { return null; }
  }

  private readUser(): AuthUser | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      return raw ? (JSON.parse(raw) as AuthUser) : null;
    } catch { return null; }
  }

  getToken(): string | null { return this.readToken(); }
}
