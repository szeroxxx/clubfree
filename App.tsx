import React, { useState, useEffect } from 'react';
import { useAuth } from './hooks/useAuth';

import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import Invoices from './components/Invoices';
import Documents from './components/Documents';
import Employees from './components/Employees';

import { type Client, type Project, type Task, type Invoice, type Folder, type Doc, type Employee, type ClientData, type ProjectData, type TaskData, type InvoiceData, type FolderData, type DocData, type EmployeeData } from './types';
import { INITIAL_CLIENTS, INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_INVOICES, INITIAL_FOLDERS, INITIAL_DOCS, INITIAL_EMPLOYEES } from './constants';
import { canViewPage } from './utils/permissions';


const App: React.FC = () => {
  const { user, login, logout } = useAuth();
  const [location, setLocation] = useState(window.location.pathname);
  
  useEffect(() => {
    const handlePopState = () => {
      setLocation(window.location.pathname);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);
  
  const navigate = (path: string) => {
      if (window.location.pathname !== path) {
        window.history.pushState({}, '', path);
        setLocation(path);
      }
  };

  // Centralized State
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [folders, setFolders] = useState<Folder[]>(INITIAL_FOLDERS);
  const [docs, setDocs] = useState<Doc[]>(INITIAL_DOCS);
  const [employees, setEmployees] = useState<Employee[]>(INITIAL_EMPLOYEES);

  // CRUD Handlers
  const handleAddClient = (clientData: ClientData) => setClients(prev => [...prev, { ...clientData, id: `cli-${Date.now()}` }]);
  const handleUpdateClient = (updatedClient: Client) => setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
  const handleDeleteClient = (id: string) => setClients(prev => prev.filter(c => c.id !== id));

  const handleAddProject = (projectData: ProjectData) => setProjects(prev => [...prev, { ...projectData, id: `proj-${Date.now()}` }]);
  const handleUpdateProject = (updatedProject: Project) => setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
  const handleDeleteProject = (id: string) => setProjects(prev => prev.filter(p => p.id !== id));

  const handleAddTask = (taskData: TaskData) => setTasks(prev => [...prev, { ...taskData, id: `task-${Date.now()}` }]);
  const handleUpdateTask = (updatedTask: Task) => setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  const handleDeleteTask = (id: string) => setTasks(prev => prev.filter(t => t.id !== id));

  const handleAddInvoice = (invoiceData: InvoiceData) => setInvoices(prev => [...prev, { ...invoiceData, id: `inv-${Date.now()}` }]);
  const handleUpdateInvoice = (updatedInvoice: Invoice) => setInvoices(prev => prev.map(i => i.id === updatedInvoice.id ? updatedInvoice : i));
  const handleDeleteInvoice = (id: string) => setInvoices(prev => prev.filter(i => i.id !== id));
  
  const handleAddFolder = (folderData: FolderData) => setFolders(prev => [...prev, { ...folderData, id: `folder-${Date.now()}` }]);
  const handleDeleteFolder = (id: string) => {
    setFolders(prev => prev.filter(f => f.id !== id));
    setDocs(prev => prev.filter(d => d.folderId !== id));
  };

  const handleAddDoc = (docData: DocData) => setDocs(prev => [...prev, { ...docData, id: `doc-${Date.now()}` }]);
  const handleUpdateDoc = (updatedDoc: Doc) => setDocs(prev => prev.map(d => d.id === updatedDoc.id ? updatedDoc : d));
  const handleDeleteDoc = (id: string) => setDocs(prev => prev.filter(d => d.id !== id));
  
  const handleAddEmployee = (employeeData: EmployeeData) => setEmployees(prev => [...prev, { ...employeeData, id: `emp-${Date.now()}` }]);
  const handleUpdateEmployee = (updatedEmployee: Employee) => setEmployees(prev => prev.map(e => e.id === updatedEmployee.id ? updatedEmployee : e));
  const handleDeleteEmployee = (id: string) => setEmployees(prev => prev.filter(e => e.id !== id));


  const renderView = () => {
    if (!user) return null;
    let currentPath = location === '/' ? '/dashboard' : location;

    if (!canViewPage(user, currentPath)) {
        currentPath = '/dashboard'; 
        if(window.location.pathname !== currentPath) navigate(currentPath);
    }
    
    switch (currentPath) {
      case '/dashboard':
        return <Dashboard user={user} clients={clients} projects={projects} tasks={tasks} invoices={invoices} />;
      case '/clients':
        return <Clients user={user} clients={clients} onAdd={handleAddClient} onUpdate={handleUpdateClient} onDelete={handleDeleteClient} />;
      case '/projects':
        return <Projects user={user} projects={projects} clients={clients} employees={employees} onAdd={handleAddProject} onUpdate={handleUpdateProject} onDelete={handleDeleteProject} />;
      case '/tasks':
        return <Tasks user={user} tasks={tasks} projects={projects} employees={employees} onAdd={handleAddTask} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />;
      case '/invoices':
        return <Invoices user={user} invoices={invoices} projects={projects} clients={clients} onAdd={handleAddInvoice} onUpdate={handleUpdateInvoice} onDelete={handleDeleteInvoice} />;
      case '/documents':
        return <Documents 
                    user={user}
                    folders={folders} 
                    docs={docs}
                    onAddFolder={handleAddFolder}
                    onDeleteFolder={handleDeleteFolder}
                    onAddDoc={handleAddDoc}
                    onUpdateDoc={handleUpdateDoc}
                    onDeleteDoc={handleDeleteDoc}
                />;
      case '/employees':
        return <Employees user={user} employees={employees} onAdd={handleAddEmployee} onUpdate={handleUpdateEmployee} onDelete={handleDeleteEmployee} />;
      default:
        return <Dashboard user={user} clients={clients} projects={projects} tasks={tasks} invoices={invoices} />;
    }
  };
  
  if (!user) {
    return <Login onLogin={login} />;
  }

  return (
    <div className="flex h-screen bg-slate-900 text-slate-300 font-sans">
      <Sidebar user={user} currentPath={location} navigate={navigate} />
      <div className="flex flex-col flex-1 overflow-hidden">
        <Header user={user} onLogout={logout} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
          {renderView()}
        </main>
      </div>
    </div>
  );
};

export default App;
