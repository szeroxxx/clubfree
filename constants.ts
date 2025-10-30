
import { type Client, type Project, type Task, type Invoice, type Folder, type Doc } from './types';

export const INITIAL_CLIENTS: Client[] = [
  { id: 'cli-1', name: 'John Doe', email: 'john.doe@example.com', company: 'Innovate Inc.' },
  { id: 'cli-2', name: 'Jane Smith', email: 'jane.smith@example.com', company: 'Solutions Co.' },
];

export const INITIAL_PROJECTS: Project[] = [
  { id: 'proj-1', name: 'Website Redesign', clientId: 'cli-1', status: 'Active', deadline: '2024-08-30' },
  { id: 'proj-2', name: 'Mobile App Dev', clientId: 'cli-2', status: 'Active', deadline: '2024-09-15' },
  { id: 'proj-3', name: 'Marketing Campaign', clientId: 'cli-1', status: 'Completed', deadline: '2024-07-20' },
];

export const INITIAL_TASKS: Task[] = [
  { id: 'task-1', title: 'Design Homepage Mockup', projectId: 'proj-1', priority: 'High', status: 'In Progress', dueDate: '2024-07-30' },
  { id: 'task-2', title: 'Develop Login API', projectId: 'proj-2', priority: 'High', status: 'To Do', dueDate: '2024-08-05' },
  { id: 'task-3', title: 'Setup User Authentication', projectId: 'proj-2', priority: 'Medium', status: 'To Do', dueDate: '2024-08-10' },
  { id: 'task-4', title: 'Finalize Ad Copy', projectId: 'proj-3', priority: 'Low', status: 'Done', dueDate: '2024-07-15' },
];

export const INITIAL_INVOICES: Invoice[] = [
  { id: 'inv-1', invoiceNumber: 'INV-001', projectId: 'proj-3', amount: 5000, status: 'Paid', issueDate: '2024-07-21', dueDate: '2024-08-05' },
  { id: 'inv-2', invoiceNumber: 'INV-002', projectId: 'proj-1', amount: 2500, status: 'Sent', issueDate: '2024-07-25', dueDate: '2024-08-10' },
];

export const INITIAL_FOLDERS: Folder[] = [
    { id: 'folder-1', name: 'Passwords' },
    { id: 'folder-2', name: 'API Keys' },
    { id: 'folder-3', name: 'Meeting Notes' },
];

export const INITIAL_DOCS: Doc[] = [
    { id: 'doc-1', name: 'Social Media Logins', folderId: 'folder-1', content: 'Facebook: user / pass\nTwitter: user / pass' },
    { id: 'doc-2', name: 'Project A - Notes', folderId: 'folder-3', content: 'Initial meeting takeaways...' },
];
