export interface User {
  id: string;
  name: string;
  email: string;
  role: 'candidate' | 'admin';
  candidateId?: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

export interface LoginCredentials {
  email: string;
  password: string;
  role: 'candidate' | 'admin';
}

export interface RegisterData extends LoginCredentials {
  name: string;
  candidateId?: string;
}