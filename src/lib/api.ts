/**
 * Mock API client that uses localStorage instead of making real HTTP requests.
 * This allows development to continue while the backend is being built.
 * 
 * To switch to a real API later, replace the implementation of these functions
 * with actual fetch calls.
 */

const STORAGE_PREFIX = "api_cache_";

/**
 * Get the storage key for a given endpoint
 */
function getStorageKey(endpoint: string): string {
  return `${STORAGE_PREFIX}${endpoint}`;
}

/**
 * Simulate network delay (optional, for more realistic behavior)
 */
function delay(ms: number = 100): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * GET request - retrieves data from localStorage
 */
export async function get<T = unknown>(
  endpoint: string,
  options?: { delay?: number }
): Promise<T> {
  await delay(options?.delay);
  
  const key = getStorageKey(endpoint);
  const stored = localStorage.getItem(key);
  
  if (stored === null) {
    // Return empty array for list endpoints, null for single item endpoints
    if (endpoint.endsWith("s") || endpoint.includes("/list")) {
      return [] as unknown as T;
    }
    throw new Error(`Not found: ${endpoint}`);
  }
  
  try {
    return JSON.parse(stored) as T;
  } catch (error) {
    throw new Error(`Failed to parse stored data for ${endpoint}`);
  }
}

/**
 * POST request - creates new data in localStorage
 */
export async function post<T = unknown, D = unknown>(
  endpoint: string,
  data: D,
  options?: { delay?: number }
): Promise<T> {
  await delay(options?.delay);
  
  const key = getStorageKey(endpoint);
  
  // For list endpoints, append to array
  if (endpoint.endsWith("s") || endpoint.includes("/list")) {
    const existing = localStorage.getItem(key);
    const items: D[] = existing ? JSON.parse(existing) : [];
    
    // Generate ID if data doesn't have one
    const newItem = {
      ...data,
      id: (data as { id?: string }).id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    } as D;
    
    items.push(newItem);
    localStorage.setItem(key, JSON.stringify(items));
    return newItem as unknown as T;
  }
  
  // For single item endpoints, store directly
  const item = {
    ...data,
    id: (data as { id?: string }).id || `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    createdAt: new Date().toISOString(),
  };
  
  localStorage.setItem(key, JSON.stringify(item));
  return item as unknown as T;
}

/**
 * PUT request - updates existing data in localStorage
 */
export async function put<T = unknown, D = unknown>(
  endpoint: string,
  data: D,
  options?: { delay?: number }
): Promise<T> {
  await delay(options?.delay);
  
  const key = getStorageKey(endpoint);
  const stored = localStorage.getItem(key);
  
  if (stored === null) {
    throw new Error(`Not found: ${endpoint}`);
  }
  
  // For list endpoints, find and update item by ID
  if (endpoint.endsWith("s") || endpoint.includes("/list")) {
    const items: (D & { id: string })[] = JSON.parse(stored);
    const dataId = (data as { id: string }).id;
    
    if (!dataId) {
      throw new Error("ID is required for PUT requests on list endpoints");
    }
    
    const index = items.findIndex((item) => item.id === dataId);
    if (index === -1) {
      throw new Error(`Item with id ${dataId} not found`);
    }
    
    items[index] = {
      ...items[index],
      ...data,
      updatedAt: new Date().toISOString(),
    } as D & { id: string };
    
    localStorage.setItem(key, JSON.stringify(items));
    return items[index] as unknown as T;
  }
  
  // For single item endpoints, update directly
  const updated = {
    ...JSON.parse(stored),
    ...data,
    updatedAt: new Date().toISOString(),
  };
  
  localStorage.setItem(key, JSON.stringify(updated));
  return updated as unknown as T;
}

/**
 * DELETE request - removes data from localStorage
 */
export async function del<T = unknown>(
  endpoint: string,
  options?: { delay?: number; id?: string }
): Promise<T> {
  await delay(options?.delay);
  
  const key = getStorageKey(endpoint);
  const stored = localStorage.getItem(key);
  
  if (stored === null) {
    throw new Error(`Not found: ${endpoint}`);
  }
  
  // For list endpoints, remove item by ID
  if (endpoint.endsWith("s") || endpoint.includes("/list")) {
    if (!options?.id) {
      throw new Error("ID is required for DELETE requests on list endpoints");
    }
    
    const items: (unknown & { id: string })[] = JSON.parse(stored);
    const filtered = items.filter((item) => item.id !== options.id);
    
    localStorage.setItem(key, JSON.stringify(filtered));
    return { success: true } as unknown as T;
  }
  
  // For single item endpoints, remove entirely
  localStorage.removeItem(key);
  return { success: true } as unknown as T;
}

/**
 * PATCH request - partial update (same as PUT for localStorage)
 */
export async function patch<T = unknown, D = unknown>(
  endpoint: string,
  data: Partial<D>,
  options?: { delay?: number }
): Promise<T> {
  return put<T, D>(endpoint, data as D, options);
}

/**
 * Clear all mock API data from localStorage
 */
export function clearApiCache(): void {
  const keys: string[] = [];
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith(STORAGE_PREFIX)) {
      keys.push(key);
    }
  }
  keys.forEach((key) => localStorage.removeItem(key));
}

/**
 * Initialize default data in localStorage (useful for seeding)
 */
export function seedData<T>(endpoint: string, data: T[]): void {
  const key = getStorageKey(endpoint);
  localStorage.setItem(key, JSON.stringify(data));
}

