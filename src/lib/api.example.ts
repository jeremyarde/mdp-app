/**
 * Example usage of the mock API client
 *
 * This file demonstrates how to use the localStorage-based API client.
 * When you're ready to switch to a real backend, you can replace the
 * implementation in api.ts with actual fetch calls.
 */

import { get, post, put, del, patch, seedData, clearApiCache } from "./api";

// Example: Working with forms
interface Form {
  id: string;
  title: string;
  content: string;
  createdAt: string;
  updatedAt?: string;
}

// Example 1: Get all forms
async function getAllForms(): Promise<Form[]> {
  return get<Form[]>("/forms");
}

// Example 2: Get a single form by ID
async function getForm(id: string): Promise<Form> {
  return get<Form>(`/forms/${id}`);
}

// Example 3: Create a new form
async function createForm(title: string, content: string): Promise<Form> {
  return post<Form>("/forms", {
    title,
    content,
  });
}

// Example 4: Update an existing form
async function updateForm(id: string, updates: Partial<Form>): Promise<Form> {
  return put<Form>(`/forms/${id}`, {
    id,
    ...updates,
  });
}

// Example 5: Partial update
async function patchForm(id: string, updates: Partial<Form>): Promise<Form> {
  return patch<Form>(`/forms/${id}`, {
    id,
    ...updates,
  });
}

// Example 6: Delete a form
async function deleteForm(id: string): Promise<void> {
  await del("/forms", { id });
}

// Example 7: Seed initial data (useful for development)
function initializeForms(): void {
  seedData<Form>("/forms", [
    {
      id: "1",
      title: "User Registration Form",
      content: "# User Registration Form\n\nText: First name",
      createdAt: new Date().toISOString(),
    },
    {
      id: "2",
      title: "Contact Form",
      content: "# Contact Form\n\nText: Email",
      createdAt: new Date().toISOString(),
    },
  ]);
}

// Example 8: Clear all API data
function resetApiData(): void {
  clearApiCache();
}

// Example usage in a React component:
/*
import { useState, useEffect } from "react";
import { get, post } from "@/lib/api";

function FormsList() {
  const [forms, setForms] = useState<Form[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadForms() {
      try {
        const data = await get<Form[]>("/forms");
        setForms(data);
      } catch (error) {
        console.error("Failed to load forms:", error);
      } finally {
        setLoading(false);
      }
    }
    loadForms();
  }, []);

  const handleCreate = async () => {
    try {
      const newForm = await post<Form>("/forms", {
        title: "New Form",
        content: "# New Form",
      });
      setForms([...forms, newForm]);
    } catch (error) {
      console.error("Failed to create form:", error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <button onClick={handleCreate}>Create Form</button>
      {forms.map((form) => (
        <div key={form.id}>{form.title}</div>
      ))}
    </div>
  );
}
*/

// Example: Switching to real API later
/*
// In api.ts, replace the implementation:
export async function get<T = unknown>(endpoint: string): Promise<T> {
  const response = await fetch(`https://api.example.com${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}
*/
