export type View = 'Dashboard' | 'Clients' | 'Projects' | 'Tasks' | 'Invoices' | 'Documents' | 'Employees';

export type UserRole = 'Admin' | 'HR' | 'Sales' | 'Employee' | 'Client';

export interface User {
  id: string;
  username: string;
  password?: string; // Should not be passed to client in real app
  name: string;
  role: UserRole;
  entityId: string; // Corresponds to a Client ID or Employee ID
}

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  jobTitle: string;
}

export interface Project {
  id:string;
  name: string;
  clientId: string;
  status: 'Active' | 'Completed' | 'On Hold';
  deadline: string;
  memberIds: string[]; // Employee IDs
}

export interface Task {
  id: string;
  title: string;
  projectId: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'To Do' | 'In Progress' | 'Done';
  dueDate: string;
  assigneeId: string; // Employee ID
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  projectId: string;
  amount: number;
  status: 'Draft' | 'Sent' | 'Paid' | 'Overdue';
  issueDate: string;
  dueDate: string;
}

export interface Doc {
  id: string;
  name: string;
  content: string;
  folderId: string;
}

export interface Folder {
  id: string;
  name: string;
}

// Types for creation forms (without ID)
export type ClientData = Omit<Client, 'id'>;
export type ProjectData = Omit<Project, 'id'>;
export type TaskData = Omit<Task, 'id'>;
export type InvoiceData = Omit<Invoice, 'id'>;
export type DocData = Omit<Doc, 'id'>;
export type FolderData = Omit<Folder, 'id'>;
export type EmployeeData = Omit<Employee, 'id'>;
