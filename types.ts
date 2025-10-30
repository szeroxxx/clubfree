export type View = 'Dashboard' | 'Clients' | 'Projects' | 'Tasks' | 'Invoices' | 'Documents';

export interface Client {
  id: string;
  name: string;
  email: string;
  company: string;
}

export interface Project {
  id:string;
  name: string;
  clientId: string;
  status: 'Active' | 'Completed' | 'On Hold';
  deadline: string;
}

export interface Task {
  id: string;
  title: string;
  projectId: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'To Do' | 'In Progress' | 'Done';
  dueDate: string;
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