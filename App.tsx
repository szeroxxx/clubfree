import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Clients from './components/Clients';
import Projects from './components/Projects';
import Tasks from './components/Tasks';
import Invoices from './components/Invoices';
import Documents from './components/Documents';
import { type View, type Client, type Project, type Task, type Invoice, type Folder, type Doc, type ClientData, type ProjectData, type TaskData, type InvoiceData, type FolderData, type DocData } from './types';
import { INITIAL_CLIENTS, INITIAL_PROJECTS, INITIAL_TASKS, INITIAL_INVOICES, INITIAL_FOLDERS, INITIAL_DOCS } from './constants';


const App: React.FC = () => {
  const [activeView, setActiveView] = useState<View>('Dashboard');

  // Centralized State
  const [clients, setClients] = useState<Client[]>(INITIAL_CLIENTS);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [invoices, setInvoices] = useState<Invoice[]>(INITIAL_INVOICES);
  const [folders, setFolders] = useState<Folder[]>(INITIAL_FOLDERS);
  const [docs, setDocs] = useState<Doc[]>(INITIAL_DOCS);

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
    setDocs(prev => prev.filter(d => d.folderId !== id)); // Also delete docs in folder
  };

  const handleAddDoc = (docData: DocData) => setDocs(prev => [...prev, { ...docData, id: `doc-${Date.now()}` }]);
  const handleUpdateDoc = (updatedDoc: Doc) => setDocs(prev => prev.map(d => d.id === updatedDoc.id ? updatedDoc : d));
  const handleDeleteDoc = (id: string) => setDocs(prev => prev.filter(d => d.id !== id));

  const renderView = () => {
    switch (activeView) {
      case 'Dashboard':
        return <Dashboard clients={clients} projects={projects} tasks={tasks} invoices={invoices} />;
      case 'Clients':
        return <Clients clients={clients} onAdd={handleAddClient} onUpdate={handleUpdateClient} onDelete={handleDeleteClient} />;
      case 'Projects':
        return <Projects projects={projects} clients={clients} onAdd={handleAddProject} onUpdate={handleUpdateProject} onDelete={handleDeleteProject} />;
      case 'Tasks':
        return <Tasks tasks={tasks} projects={projects} onAdd={handleAddTask} onUpdate={handleUpdateTask} onDelete={handleDeleteTask} />;
      case 'Invoices':
        return <Invoices invoices={invoices} projects={projects} clients={clients} onAdd={handleAddInvoice} onUpdate={handleUpdateInvoice} onDelete={handleDeleteInvoice} />;
      case 'Documents':
        return <Documents 
                    folders={folders} 
                    docs={docs}
                    onAddFolder={handleAddFolder}
                    onDeleteFolder={handleDeleteFolder}
                    onAddDoc={handleAddDoc}
                    onUpdateDoc={handleUpdateDoc}
                    onDeleteDoc={handleDeleteDoc}
                />;
      default:
        return <Dashboard clients={clients} projects={projects} tasks={tasks} invoices={invoices} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-900 text-slate-300 font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      <main className="flex-1 overflow-y-auto p-4 sm:p-6 md:p-8">
        {renderView()}
      </main>
    </div>
  );
};

export default App;