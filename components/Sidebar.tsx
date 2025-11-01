import React from 'react';
import { type View } from '../types';
import { DashboardIcon, ClientsIcon, ProjectsIcon, TasksIcon, InvoicesIcon, DocumentsIcon, LogoIcon } from './Icons';

interface SidebarProps {
  currentPath: string;
  navigate: (path: string) => void;
}

const viewToPath: Record<View, string> = {
  Dashboard: '/dashboard',
  Clients: '/clients',
  Projects: '/projects',
  Tasks: '/tasks',
  Invoices: '/invoices',
  Documents: '/documents',
};

const NavItem: React.FC<{
  viewName: View;
  currentPath: string;
  navigate: (path: string) => void;
  children: React.ReactNode;
}> = ({ viewName, currentPath, navigate, children }) => {
  const path = viewToPath[viewName];
  const isActive = currentPath === path || (currentPath === '/' && path === '/dashboard');
  
  return (
    <li>
      <button
        onClick={() => navigate(path)}
        className={`w-full flex items-center p-2 rounded-lg transition-colors duration-200 ${
          isActive
            ? 'bg-sky-500 text-white'
            : 'text-slate-400 hover:bg-slate-700 hover:text-white'
        }`}
      >
        {children}
        <span className="ml-3 font-medium">{viewName}</span>
      </button>
    </li>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ currentPath, navigate }) => {
  return (
    <aside className="w-64 bg-slate-800 p-4 flex flex-col h-full shadow-lg">
        <div className="flex items-center mb-8">
            <LogoIcon className="h-8 w-8 text-sky-400" />
            <h1 className="text-xl font-bold text-white ml-2">FreelanceHQ</h1>
        </div>
      <nav>
        <ul className="space-y-2">
          <NavItem viewName="Dashboard" currentPath={currentPath} navigate={navigate}>
            <DashboardIcon className="h-6 w-6" />
          </NavItem>
          <NavItem viewName="Clients" currentPath={currentPath} navigate={navigate}>
            <ClientsIcon className="h-6 w-6" />
          </NavItem>
          <NavItem viewName="Projects" currentPath={currentPath} navigate={navigate}>
            <ProjectsIcon className="h-6 w-6" />
          </NavItem>
          <NavItem viewName="Tasks" currentPath={currentPath} navigate={navigate}>
            <TasksIcon className="h-6 w-6" />
          </NavItem>
          <NavItem viewName="Invoices" currentPath={currentPath} navigate={navigate}>
            <InvoicesIcon className="h-6 w-6" />
          </NavItem>
          <NavItem viewName="Documents" currentPath={currentPath} navigate={navigate}>
            <DocumentsIcon className="h-6 w-6" />
          </NavItem>
        </ul>
      </nav>
      <div className="mt-auto p-4 bg-slate-700/50 rounded-lg text-center">
          <p className="text-sm text-slate-400">Your command center for success.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
