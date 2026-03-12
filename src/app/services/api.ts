// API Service Layer
// Replaced remote backend with reliable local state mocks for client-side demo

export interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const getStorage = <T>(key: string): T[] => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : [];
};

const setStorage = <T>(key: string, data: T[]) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const generateId = () => Math.random().toString(36).substring(2, 9);

// Mock implementation helper
const createMockApi = <T extends { id: string }>(storageKey: string) => ({
  getAll: async (): Promise<ApiResponse<T[]>> => {
    await delay(300);
    return { data: getStorage<T>(storageKey), success: true };
  },

  create: async (data: Omit<T, "id">): Promise<ApiResponse<T>> => {
    await delay(300);
    const newItem = { ...data, id: generateId() } as unknown as T;
    const items = getStorage<T>(storageKey);
    setStorage(storageKey, [...items, newItem]);
    return { data: newItem, success: true };
  },

  update: async (id: string, data: Partial<T>): Promise<ApiResponse<T>> => {
    await delay(300);
    const items = getStorage<T>(storageKey);
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) throw new Error("Item not found");
    
    const updatedItem = { ...items[index], ...data };
    items[index] = updatedItem;
    setStorage(storageKey, items);
    return { data: updatedItem, success: true };
  },

  delete: async (id: string): Promise<ApiResponse<boolean>> => {
    await delay(300);
    const items = getStorage<T>(storageKey);
    setStorage(storageKey, items.filter((item) => item.id !== id));
    return { data: true, success: true };
  },
});

export const cropsApi = createMockApi("crops_data");
export const resourcesApi = createMockApi("resources_data");
export const laborApi = createMockApi("labor_data");
export const expensesApi = createMockApi("expenses_data");