import { type User, type UserRole } from '../types';

type Resource = 'Client' | 'Project' | 'Task' | 'Invoice' | 'Document' | 'Employee';

const permissions: { [key in UserRole]: { [key: string]: string[] } } = {
    Admin: {
        view: ['/dashboard', '/clients', '/projects', '/tasks', '/invoices', '/documents', '/employees'],
        create: ['Client', 'Project', 'Task', 'Invoice', 'Document', 'Employee'],
        update: ['Client', 'Project', 'Task', 'Invoice', 'Document', 'Employee'],
        delete: ['Client', 'Project', 'Task', 'Invoice', 'Document', 'Employee'],
    },
    HR: {
        view: ['/dashboard', '/documents', '/employees'],
        create: ['Employee'],
        update: ['Employee'],
        delete: ['Employee'],
    },
    Sales: {
        view: ['/dashboard', '/clients', '/projects'],
        create: ['Client'],
        update: ['Client'],
        delete: [],
    },
    Employee: {
        view: ['/dashboard', '/projects', '/tasks'],
        create: [],
        update: ['Task'], // Can only update status of their own tasks
        delete: [],
    },
    Client: {
        view: ['/dashboard', '/projects', '/tasks', '/invoices'],
        create: [],
        update: [],
        delete: [],
    },
};

export const canViewPage = (user: User | null, path: string): boolean => {
    if (!user) return false;
    return permissions[user.role]?.view.includes(path) || false;
};

export const canCreate = (user: User | null, resource: Resource): boolean => {
    if (!user) return false;
    return permissions[user.role]?.create.includes(resource) || false;
};

export const canUpdate = (user: User | null, resource: Resource): boolean => {
    if (!user) return false;
    return permissions[user.role]?.update.includes(resource) || false;
};

export const canDelete = (user: User | null, resource: Resource): boolean => {
    if (!user) return false;
    return permissions[user.role]?.delete.includes(resource) || false;
};
