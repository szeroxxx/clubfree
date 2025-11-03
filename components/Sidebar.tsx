import React from 'react';
import { type View, type User } from '../types';
import { DashboardIcon, ClientsIcon, ProjectsIcon, TasksIcon, InvoicesIcon, DocumentsIcon, LogoIcon, UsersIcon } from './Icons';
import { canViewPage } from '../utils/permissions';

interface SidebarProps {
  user: User;
  currentPath: string;
  navigate: (path: string) => void;
}

const navItems: { viewName: View, path: string, icon: React.FC<React.SVGProps<SVGSVGElement>> }[] = [
    { viewName: 'Dashboard', path: '/dashboard', icon: DashboardIcon },
    { viewName: 'Clients', path: '/clients', icon: ClientsIcon },
    { viewName: 'Projects', path: '/projects', icon: ProjectsIcon },
    { viewName: 'Tasks', path: '/tasks', icon: TasksIcon },
    { viewName: 'Invoices', path: '/invoices', icon: InvoicesIcon },
    { viewName: 'Documents', path: '/documents', icon: DocumentsIcon },
    { viewName: 'Employees', path: '/employees', icon: UsersIcon },
];

const NavItem: React.FC<{
  path: string;
  viewName: string;
  currentPath: string;
  navigate: (path: string) => void;
  children: React.ReactNode;
}> = ({ path, viewName, currentPath, navigate, children }) => {
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


const Sidebar: React.FC<SidebarProps> = ({ user, currentPath, navigate }) => {
  const availableNavItems = navItems.filter(item => canViewPage(user, item.path));

  return (
    <aside className="w-64 bg-slate-800 p-4 flex-col h-full shadow-lg hidden md:flex">
        <div className="flex items-center mb-8">
            <LogoIcon className="h-8 w-8 text-sky-400" />
            <h1 className="text-xl font-bold text-white ml-2">FreelanceHQ</h1>
        </div>
      <nav>
        <ul className="space-y-2">
            {availableNavItems.map(item => (
                <NavItem key={item.path} path={item.path} viewName={item.viewName} currentPath={currentPath} navigate={navigate}>
                    <item.icon className="h-6 w-6" />
                </NavItem>
            ))}
        </ul>
      </nav>
      <div className="mt-auto p-4 bg-slate-700/50 rounded-lg text-center">
          <p className="text-sm text-slate-400">Your command center for success.</p>
      </div>
    </aside>
  );
};

export default Sidebar;
