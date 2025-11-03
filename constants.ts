import { type User, type Client, type Project, type Task, type Invoice, type Folder, type Doc, type Employee } from './types';

// NOTE: Passwords should be hashed in a real application
export const INITIAL_USERS: User[] = [
  { id: 'user-1', username: 'admin', password: 'password', name: 'Admin User', role: 'Admin', entityId: 'emp-1' },
  { id: 'user-2', username: 'hr', password: 'password', name: 'HR Person', role: 'HR', entityId: 'emp-2' },
  { id: 'user-3', username: 'sales', password: 'password', name: 'Sales Rep', role: 'Sales', entityId: 'emp-3' },
  { id: 'user-4', username: 'dev', password: 'password', name: 'Developer One', role: 'Employee', entityId: 'emp-4' },
  { id: 'user-5', username: 'johndoe', password: 'password', name: 'John Doe', role: 'Client', entityId: 'cli-1' },
  { id: 'user-6', username: 'janesmith', password: 'password', name: 'Jane Smith', role: 'Client', entityId: 'cli-2' },
];

export const INITIAL_EMPLOYEES: Employee[] = [
  { id: 'emp-1', name: 'Admin User', email: 'admin@company.com', jobTitle: 'System Administrator' },
  { id: 'emp-2', name: 'HR Person', email: 'hr@company.com', jobTitle: 'Human Resources Manager' },
  { id: 'emp-3', name: 'Sales Rep', email: 'sales@company.com', jobTitle: 'Sales Representative' },
  { id: 'emp-4', name: 'Developer One', email: 'dev1@company.com', jobTitle: 'Software Engineer' },
  { id: 'emp-5', name: 'Developer Two', email: 'dev2@company.com', jobTitle: 'Frontend Developer' },
];

export const INITIAL_CLIENTS: Client[] = [
  { id: 'cli-1', name: 'John Doe', email: 'john.doe@example.com', company: 'Innovate Inc.' },
  { id: 'cli-2', name: 'Jane Smith', email: 'jane.smith@example.com', company: 'Solutions Co.' },
];

export const INITIAL_PROJECTS: Project[] = [
  { id: 'proj-1', name: 'Website Redesign', clientId: 'cli-1', status: 'Active', deadline: '2024-08-30', memberIds: ['emp-4', 'emp-5'] },
  { id: 'proj-2', name: 'Mobile App Dev', clientId: 'cli-2', status: 'Active', deadline: '2024-09-15', memberIds: ['emp-4'] },
  { id: 'proj-3', name: 'Marketing Campaign', clientId: 'cli-1', status: 'Completed', deadline: '2024-07-20', memberIds: ['emp-3'] },
];

export const INITIAL_TASKS: Task[] = [
  { id: 'task-1', title: 'Design Homepage Mockup', projectId: 'proj-1', priority: 'High', status: 'In Progress', dueDate: '2024-07-30', assigneeId: 'emp-5' },
  { id: 'task-2', title: 'Develop Login API', projectId: 'proj-2', priority: 'High', status: 'To Do', dueDate: '2024-08-05', assigneeId: 'emp-4' },
  { id: 'task-3', title: 'Setup User Authentication', projectId: 'proj-2', priority: 'Medium', status: 'To Do', dueDate: '2024-08-10', assigneeId: 'emp-4' },
  { id: 'task-4', title: 'Finalize Ad Copy', projectId: 'proj-3', priority: 'Low', status: 'Done', dueDate: '2024-07-15', assigneeId: 'emp-3' },
  { id: 'task-5', title: 'Create Style Guide', projectId: 'proj-1', priority: 'Medium', status: 'To Do', dueDate: '2024-08-02', assigneeId: 'emp-5'},
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
