
import React from 'react';
import { type View } from '../types';
import { DashboardIcon, ClientsIcon, ProjectsIcon, TasksIcon, InvoicesIcon, DocumentsIcon, LogoIcon } from './Icons';

interface SidebarProps {
  activeView: View;
  setActiveView: (view: View) => void;
}

const NavItem: React.FC<{
  viewName: View;
  activeView: View;
  setActiveView: (view: View) => void;
  children: React.ReactNode;
}> = ({ viewName, activeView, setActiveView, children }) => {
  const isActive = activeView === viewName;
  return (
    <li>
      <button
        onClick={() => setActiveView(viewName)}
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


const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  return (
    <aside className="w-64 bg-slate-800 p-4 flex flex-col h-full shadow-lg">
        <div className="flex items-center mb-8">
            <LogoIcon className="h-8 w-8 text-sky-400" />
            <h1 className="text-xl font-bold text-white ml-2">FreelanceHQ</h1>
        </div>
      <nav>
        <ul className="space-y-2">
          <NavItem viewName="Dashboard" activeView={activeView} setActiveView={setActiveView}>
            <DashboardIcon className="h-6 w-6" />
          </NavItem>
          <NavItem viewName="Clients" activeView={activeView} setActiveView={setActiveView}>
            <ClientsIcon className="h-6 w-6" />
          </NavItem>
          <NavItem viewName="Projects" activeView={activeView} setActiveView={setActiveView}>
            <ProjectsIcon className="h-6 w-6" />
          </NavItem>
          <NavItem viewName="Tasks" activeView={activeView} setActiveView={setActiveView}>
            <TasksIcon className="h-6 w-6" />
          </NavItem>
          <NavItem viewName="Invoices" activeView={activeView} setActiveView={setActiveView}>
            <InvoicesIcon className="h-6 w-6" />
          </NavItem>
          <NavItem viewName="Documents" activeView={activeView} setActiveView={setActiveView}>
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
