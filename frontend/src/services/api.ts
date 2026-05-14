import axios from 'axios';
import type {
  AuthResponse,
  CreateRentalRequest,
  LoginRequest,
  Message,
  RegisterRequest,
  Rental,
  UpdateRentalRequest,
  User,
  Review,
} from '../types/api';
import { AxiosError } from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

axios.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return Promise.reject(error);
  },
);

// Auth API
export const authAPI = {
  register: async (data: RegisterRequest): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/register', data);
    return response.data;
  },

  login: async (data: LoginRequest): Promise<AuthResponse> => {
    const response = await api.post('/api/auth/login', data);
    return response.data;
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await api.get('/api/auth/me');
    return response.data;
  },
};

// Rentals API
export const rentalsAPI = {
  getAll: async (): Promise<{ rentals: Rental[] }> => {
    const response = await api.get('/api/rentals');
    return response.data;
  },

  getById: async (id: number): Promise<Rental> => {
    const response = await api.get(`/api/rentals/${id}`);
    return response.data;
  },

  create: async (data: CreateRentalRequest): Promise<{ message: string }> => {
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('surface', data.surface.toString());
    formData.append('price', data.price.toString());
    formData.append('picture', data.picture[0]);
    formData.append('description', data.description);
    try {
      const response = await api.post('/api/rentals', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
      throw new Error('Une erreur inattendue est survenue');
    }
  },

  getMessages: async (id: number): Promise<{ messages: Review[] }> => {
    try {
      const response = await api.get(`/api/rentals/${id}/messages`);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
      throw new Error('Une erreur inattendue est survenue');
    }
  },

  update: async ({
    id,
    data,
  }: {
    id: number;
    data: UpdateRentalRequest;
  }): Promise<{ message: string }> => {
    const formData = new FormData();
    if (data.name) formData.append('name', data.name);
    if (data.surface) formData.append('surface', data.surface.toString());
    if (data.price) formData.append('price', data.price.toString());
    if (data.picture && data.picture.length > 0)
      formData.append('picture', data.picture[0]);
    if (data.description) formData.append('description', data.description);

    try {
      const response = await api.put(`/api/rentals/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
      throw new Error('Une erreur inattendue est survenue');
    }
  },
};

// Messages API
export const messagesAPI = {
  send: async (data: Message): Promise<{ message: string }> => {
    try {
      const response = await api.post('/api/messages', data);
      return response.data;
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        throw new Error(error.response?.data.message);
      }
      throw new Error('Une erreur inattendue est survenue');
    }
  },
};
