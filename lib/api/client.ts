const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '/api';

export interface ApiResponse<T = any> {
  message: string;
  data?: T;
  error?: string;
  details?: any;
}

export interface PaginatedResponse<T> {
  message: string;
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

class ApiError extends Error {
  constructor(
    public status: number,
    public message: string,
    public details?: any
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

class ApiClient {
  private baseURL: string;
  private token: string | null = null;

  constructor(baseURL: string) {
    this.baseURL = baseURL;

    // Get token from localStorage on client side
    if (typeof window !== 'undefined') {
      this.token = localStorage.getItem('auth_token');
    }
  }

  setToken(token: string | null) {
    this.token = token;
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('auth_token', token);
      } else {
        localStorage.removeItem('auth_token');
      }
    }
  }

  getToken(): string | null {
    return this.token;
  }

  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;

    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options.headers as Record<string, string>),
    };

    if (this.token) {
      headers.Authorization = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const response = await fetch(url, config);

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(
          response.status,
          errorData.message || `HTTP ${response.status}`,
          errorData.details
        );
      }

      const data = await response.json();
      return data;
    } catch (error) {
      if (error instanceof ApiError) {
        throw error;
      }

      throw new ApiError(500, error instanceof Error ? error.message : 'Network error');
    }
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const searchParams = params ? new URLSearchParams(params).toString() : '';
    const url = searchParams ? `${endpoint}?${searchParams}` : endpoint;

    return this.request<T>(url, {
      method: 'GET',
    });
  }

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

// Auth API
export const authApi = {
  register: (userData: any) => apiClient.post('/auth/register', userData),

  login: (credentials: any) => apiClient.post('/auth/login', credentials),

  getProfile: () => apiClient.get('/auth/profile'),

  logout: () => {
    apiClient.setToken(null);
    return Promise.resolve();
  },
};

// Users API
export const usersApi = {
  getUsers: (params?: any) => apiClient.get('/users', params),

  getUserById: (id: string) => apiClient.get(`/users/${id}`),

  updateProfile: (userData: any) => apiClient.put('/users', userData),
};

// Skills API
export const skillsApi = {
  getSkills: (params?: any) => apiClient.get('/skills', params),

  createSkill: (skillData: any) => apiClient.post('/skills', skillData),

  getCategories: () => apiClient.get('/skills/categories'),

  getPopularSkills: (limit?: number) =>
    apiClient.get('/skills/popular', limit ? { limit } : undefined),
};

// User Skills API
export const userSkillsApi = {
  getOfferedSkills: () => apiClient.get('/user-skills/offered'),

  addOfferedSkill: (skillData: any) => apiClient.post('/user-skills/offered', skillData),

  removeOfferedSkill: (skillId: string) => apiClient.delete(`/user-skills/offered/${skillId}`),

  getWantedSkills: () => apiClient.get('/user-skills/wanted'),

  addWantedSkill: (skillData: any) => apiClient.post('/user-skills/wanted', skillData),

  removeWantedSkill: (skillId: string) => apiClient.delete(`/user-skills/wanted/${skillId}`),

  findMatches: () => apiClient.get('/user-skills/matches'),
};

export { ApiError };
