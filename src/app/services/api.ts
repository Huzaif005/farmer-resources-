// API Service Layer
// This file contains API calls that connect to the Supabase backend
import { projectId, publicAnonKey } from "/utils/supabase/info";

const API_URL = `https://${projectId}.supabase.co/functions/v1/make-server-57ac035d`;

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${publicAnonKey}`,
};

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

// Crops API
export const cropsApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/crops`, { headers });
    return await response.json();
  },

  create: async (cropData: any) => {
    const response = await fetch(`${API_URL}/crops`, {
      method: "POST",
      headers,
      body: JSON.stringify(cropData),
    });
    return await response.json();
  },

  update: async (id: string, cropData: any) => {
    const response = await fetch(`${API_URL}/crops/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(cropData),
    });
    return await response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/crops/${id}`, {
      method: "DELETE",
      headers,
    });
    return await response.json();
  },
};

// Resources API
export const resourcesApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/resources`, { headers });
    return await response.json();
  },

  create: async (resourceData: any) => {
    const response = await fetch(`${API_URL}/resources`, {
      method: "POST",
      headers,
      body: JSON.stringify(resourceData),
    });
    return await response.json();
  },

  update: async (id: string, resourceData: any) => {
    const response = await fetch(`${API_URL}/resources/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(resourceData),
    });
    return await response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/resources/${id}`, {
      method: "DELETE",
      headers,
    });
    return await response.json();
  },
};

// Labor API
export const laborApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/workers`, { headers });
    return await response.json();
  },

  create: async (workerData: any) => {
    const response = await fetch(`${API_URL}/workers`, {
      method: "POST",
      headers,
      body: JSON.stringify(workerData),
    });
    return await response.json();
  },

  update: async (id: string, workerData: any) => {
    const response = await fetch(`${API_URL}/workers/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(workerData),
    });
    return await response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/workers/${id}`, {
      method: "DELETE",
      headers,
    });
    return await response.json();
  },
};

// Expenses API
export const expensesApi = {
  getAll: async () => {
    const response = await fetch(`${API_URL}/expenses`, { headers });
    return await response.json();
  },

  create: async (expenseData: any) => {
    const response = await fetch(`${API_URL}/expenses`, {
      method: "POST",
      headers,
      body: JSON.stringify(expenseData),
    });
    return await response.json();
  },

  update: async (id: string, expenseData: any) => {
    const response = await fetch(`${API_URL}/expenses/${id}`, {
      method: "PUT",
      headers,
      body: JSON.stringify(expenseData),
    });
    return await response.json();
  },

  delete: async (id: string) => {
    const response = await fetch(`${API_URL}/expenses/${id}`, {
      method: "DELETE",
      headers,
    });
    return await response.json();
  },
};