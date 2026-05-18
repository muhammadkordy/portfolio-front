export interface Stat {
  id: number;
  label: string;
  value: string;
  suffix: string | null;
  order: number;
  active: boolean;
}

export interface Service {
  id: number;
  icon: string | null;
  title: string;
  description: string;
  order: number;
  active: boolean;
}

export interface Project {
  id: number;
  title: string;
  scope: string;
  key_result: string;
  order: number;
  active: boolean;
}

export interface Client {
  id: number;
  name: string;
  logo_path: string | null;
  logo_url: string | null;
  affiliation_note: string | null;
  order: number;
  active: boolean;
}

export interface ContactMessage {
  id: number;
  name: string;
  organization: string | null;
  email: string | null;
  service: string | null;
  message: string;
  is_read: boolean;
  created_at: string;
}

export interface AuthUser {
  id: number;
  name: string;
  email: string;
}

export interface LoginResponse {
  token: string;
  user: AuthUser;
}
