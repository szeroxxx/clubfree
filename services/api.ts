const API_URL = 'http://localhost:5000/api';

const getAuthHeaders = () => {
  const token = localStorage.getItem('token');
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Auth
export const login = async (username: string, password: string) => {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password })
  });
  if (!res.ok) throw new Error('Login failed');
  return res.json();
};

// Clients
export const getClients = async () => {
  const res = await fetch(`${API_URL}/clients`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch clients');
  return res.json();
};

export const createClient = async (data: any) => {
  const res = await fetch(`${API_URL}/clients`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create client');
  return res.json();
};

export const updateClient = async (id: string, data: any) => {
  const res = await fetch(`${API_URL}/clients/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update client');
  return res.json();
};

export const deleteClient = async (id: string) => {
  const res = await fetch(`${API_URL}/clients/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete client');
};

// Employees
export const getEmployees = async () => {
  const res = await fetch(`${API_URL}/employees`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch employees');
  return res.json();
};

export const createEmployee = async (data: any) => {
  const res = await fetch(`${API_URL}/employees`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create employee');
  return res.json();
};

export const updateEmployee = async (id: string, data: any) => {
  const res = await fetch(`${API_URL}/employees/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update employee');
  return res.json();
};

export const deleteEmployee = async (id: string) => {
  const res = await fetch(`${API_URL}/employees/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete employee');
};

// Projects
export const getProjects = async () => {
  const res = await fetch(`${API_URL}/projects`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch projects');
  return res.json();
};

export const createProject = async (data: any) => {
  const res = await fetch(`${API_URL}/projects`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create project');
  return res.json();
};

export const updateProject = async (id: string, data: any) => {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update project');
  return res.json();
};

export const deleteProject = async (id: string) => {
  const res = await fetch(`${API_URL}/projects/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete project');
};

// Tasks
export const getTasks = async () => {
  const res = await fetch(`${API_URL}/tasks`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch tasks');
  return res.json();
};

export const createTask = async (data: any) => {
  const res = await fetch(`${API_URL}/tasks`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create task');
  return res.json();
};

export const updateTask = async (id: string, data: any) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update task');
  return res.json();
};

export const deleteTask = async (id: string) => {
  const res = await fetch(`${API_URL}/tasks/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete task');
};

// Invoices
export const getInvoices = async () => {
  const res = await fetch(`${API_URL}/invoices`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch invoices');
  return res.json();
};

export const createInvoice = async (data: any) => {
  const res = await fetch(`${API_URL}/invoices`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create invoice');
  return res.json();
};

export const updateInvoice = async (id: string, data: any) => {
  const res = await fetch(`${API_URL}/invoices/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update invoice');
  return res.json();
};

export const deleteInvoice = async (id: string) => {
  const res = await fetch(`${API_URL}/invoices/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete invoice');
};

// Documents
export const getFolders = async () => {
  const res = await fetch(`${API_URL}/documents/folders`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch folders');
  return res.json();
};

export const createFolder = async (data: any) => {
  const res = await fetch(`${API_URL}/documents/folders`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create folder');
  return res.json();
};

export const deleteFolder = async (id: string) => {
  const res = await fetch(`${API_URL}/documents/folders/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete folder');
};

export const getDocs = async () => {
  const res = await fetch(`${API_URL}/documents/docs`, { headers: getAuthHeaders() });
  if (!res.ok) throw new Error('Failed to fetch documents');
  return res.json();
};

export const createDoc = async (data: any) => {
  const res = await fetch(`${API_URL}/documents/docs`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to create document');
  return res.json();
};

export const updateDoc = async (id: string, data: any) => {
  const res = await fetch(`${API_URL}/documents/docs/${id}`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify(data)
  });
  if (!res.ok) throw new Error('Failed to update document');
  return res.json();
};

export const deleteDoc = async (id: string) => {
  const res = await fetch(`${API_URL}/documents/docs/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders()
  });
  if (!res.ok) throw new Error('Failed to delete document');
};
