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
import { canViewPage } from './utils/permissions';
import * as api from './services/api';


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
  const [clients, setClients] = useState<Client[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [folders, setFolders] = useState<Folder[]>([]);
  const [docs, setDocs] = useState<Doc[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);

  // Fetch data on mount
  useEffect(() => {
    if (!user) return;
    
    const fetchData = async () => {
      try {
        const [clientsData, employeesData, projectsData, tasksData, invoicesData, foldersData, docsData] = await Promise.all([
          api.getClients(),
          api.getEmployees(),
          api.getProjects(),
          api.getTasks(),
          api.getInvoices(),
          api.getFolders(),
          api.getDocs()
        ]);
        
        setClients(clientsData);
        setEmployees(employeesData);
        setProjects(projectsData);
        setTasks(tasksData);
        setInvoices(invoicesData);
        setFolders(foldersData);
        setDocs(docsData);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
    };
    
    fetchData();
  }, [user]);

  // CRUD Handlers
  const handleAddClient = async (clientData: ClientData) => {
    try {
      const newClient = await api.createClient(clientData);
      setClients(prev => [...prev, newClient]);
    } catch (error) {
      console.error('Failed to add client:', error);
    }
  };
  const handleUpdateClient = async (updatedClient: Client) => {
    try {
      await api.updateClient(updatedClient.id, updatedClient);
      setClients(prev => prev.map(c => c.id === updatedClient.id ? updatedClient : c));
    } catch (error) {
      console.error('Failed to update client:', error);
    }
  };
  
  const handleDeleteClient = async (id: string) => {
    try {
      await api.deleteClient(id);
      setClients(prev => prev.filter(c => c.id !== id));
    } catch (error) {
      console.error('Failed to delete client:', error);
    }
  };

  const handleAddProject = async (projectData: ProjectData) => {
    try {
      const newProject = await api.createProject(projectData);
      setProjects(prev => [...prev, newProject]);
    } catch (error) {
      console.error('Failed to add project:', error);
    }
  };
  
  const handleUpdateProject = async (updatedProject: Project) => {
    try {
      await api.updateProject(updatedProject.id, updatedProject);
      setProjects(prev => prev.map(p => p.id === updatedProject.id ? updatedProject : p));
    } catch (error) {
      console.error('Failed to update project:', error);
    }
  };
  
  const handleDeleteProject = async (id: string) => {
    try {
      await api.deleteProject(id);
      setProjects(prev => prev.filter(p => p.id !== id));
    } catch (error) {
      console.error('Failed to delete project:', error);
    }
  };

  const handleAddTask = async (taskData: TaskData) => {
    try {
      const newTask = await api.createTask(taskData);
      setTasks(prev => [...prev, newTask]);
    } catch (error) {
      console.error('Failed to add task:', error);
    }
  };
  
  const handleUpdateTask = async (updatedTask: Task) => {
    try {
      await api.updateTask(updatedTask.id, updatedTask);
      setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
    } catch (error) {
      console.error('Failed to update task:', error);
    }
  };
  
  const handleDeleteTask = async (id: string) => {
    try {
      await api.deleteTask(id);
      setTasks(prev => prev.filter(t => t.id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleAddInvoice = async (invoiceData: InvoiceData) => {
    try {
      const newInvoice = await api.createInvoice(invoiceData);
      setInvoices(prev => [...prev, newInvoice]);
    } catch (error) {
      console.error('Failed to add invoice:', error);
    }
  };
  
  const handleUpdateInvoice = async (updatedInvoice: Invoice) => {
    try {
      await api.updateInvoice(updatedInvoice.id, updatedInvoice);
      setInvoices(prev => prev.map(i => i.id === updatedInvoice.id ? updatedInvoice : i));
    } catch (error) {
      console.error('Failed to update invoice:', error);
    }
  };
  
  const handleDeleteInvoice = async (id: string) => {
    try {
      await api.deleteInvoice(id);
      setInvoices(prev => prev.filter(i => i.id !== id));
    } catch (error) {
      console.error('Failed to delete invoice:', error);
    }
  };
  
  const handleAddFolder = async (folderData: FolderData) => {
    try {
      const newFolder = await api.createFolder(folderData);
      setFolders(prev => [...prev, newFolder]);
    } catch (error) {
      console.error('Failed to add folder:', error);
    }
  };
  
  const handleDeleteFolder = async (id: string) => {
    try {
      await api.deleteFolder(id);
      setFolders(prev => prev.filter(f => f.id !== id));
      setDocs(prev => prev.filter(d => d.folderId !== id));
    } catch (error) {
      console.error('Failed to delete folder:', error);
    }
  };

  const handleAddDoc = async (docData: DocData) => {
    try {
      const newDoc = await api.createDoc(docData);
      setDocs(prev => [...prev, newDoc]);
    } catch (error) {
      console.error('Failed to add document:', error);
    }
  };
  
  const handleUpdateDoc = async (updatedDoc: Doc) => {
    try {
      await api.updateDoc(updatedDoc.id, updatedDoc);
      setDocs(prev => prev.map(d => d.id === updatedDoc.id ? updatedDoc : d));
    } catch (error) {
      console.error('Failed to update document:', error);
    }
  };
  
  const handleDeleteDoc = async (id: string) => {
    try {
      await api.deleteDoc(id);
      setDocs(prev => prev.filter(d => d.id !== id));
    } catch (error) {
      console.error('Failed to delete document:', error);
    }
  };
  
  const handleAddEmployee = async (employeeData: EmployeeData) => {
    try {
      const newEmployee = await api.createEmployee(employeeData);
      setEmployees(prev => [...prev, newEmployee]);
    } catch (error) {
      console.error('Failed to add employee:', error);
    }
  };
  
  const handleUpdateEmployee = async (updatedEmployee: Employee) => {
    try {
      await api.updateEmployee(updatedEmployee.id, updatedEmployee);
      setEmployees(prev => prev.map(e => e.id === updatedEmployee.id ? updatedEmployee : e));
    } catch (error) {
      console.error('Failed to update employee:', error);
    }
  };
  
  const handleDeleteEmployee = async (id: string) => {
    try {
      await api.deleteEmployee(id);
      setEmployees(prev => prev.filter(e => e.id !== id));
    } catch (error) {
      console.error('Failed to delete employee:', error);
    }
  };


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
