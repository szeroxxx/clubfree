import React, { useState, useEffect } from 'react';
import { type Project, type Client, type ProjectData } from '../types';
import { PlusIcon, EditIcon, TrashIcon } from './Icons';
import Modal from './Modal';

interface ProjectsProps {
    projects: Project[];
    clients: Client[];
    onAdd: (project: ProjectData) => void;
    onUpdate: (project: Project) => void;
    onDelete: (id: string) => void;
}

const ProjectForm: React.FC<{ onSubmit: (data: ProjectData) => void; initialData?: Project | null; clients: Client[]; onClose: () => void }> = ({ onSubmit, initialData, clients, onClose }) => {
    const [name, setName] = useState('');
    const [clientId, setClientId] = useState('');
    const [deadline, setDeadline] = useState('');
    const [status, setStatus] = useState<Project['status']>('Active');

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setClientId(initialData.clientId);
            setDeadline(initialData.deadline);
            setStatus(initialData.status);
        } else if (clients.length > 0) {
            setClientId(clients[0].id);
        }
    }, [initialData, clients]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, clientId, deadline, status });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-400">Project Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-400">Client</label>
                <select value={clientId} onChange={e => setClientId(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required>
                    {clients.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-400">Deadline</label>
                <input type="date" value={deadline} onChange={e => setDeadline(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-400">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value as Project['status'])} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required>
                    <option>Active</option>
                    <option>Completed</option>
                    <option>On Hold</option>
                </select>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={onClose} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Save Project</button>
            </div>
        </form>
    );
};


const ProjectStatusBadge: React.FC<{ status: Project['status'] }> = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-bold rounded-full";
    const statusClasses = {
        'Active': 'bg-sky-500/20 text-sky-400',
        'Completed': 'bg-emerald-500/20 text-emerald-400',
        'On Hold': 'bg-amber-500/20 text-amber-400',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}

const Projects: React.FC<ProjectsProps> = ({ projects, clients, onAdd, onUpdate, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<Project | null>(null);
    
    const getClientName = (clientId: string) => clients.find(c => c.id === clientId)?.name || 'Unknown Client';

    const handleOpenAddModal = () => {
        setEditingProject(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (project: Project) => {
        setEditingProject(project);
        setIsModalOpen(true);
    };

    const handleSave = (data: ProjectData) => {
        if (editingProject) {
            onUpdate({ ...data, id: editingProject.id });
        } else {
            onAdd(data);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Projects</h1>
                <button onClick={handleOpenAddModal} className="flex items-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Project
                </button>
            </div>

            <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-700/50">
                        <tr>
                            <th className="p-4 font-semibold text-white">Project Name</th>
                            <th className="p-4 font-semibold text-white">Client</th>
                            <th className="p-4 font-semibold text-white">Deadline</th>
                            <th className="p-4 font-semibold text-white">Status</th>
                            <th className="p-4 font-semibold text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {projects.map(project => (
                            <tr key={project.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                                <td className="p-4 font-medium text-white">{project.name}</td>
                                <td className="p-4">{getClientName(project.clientId)}</td>
                                <td className="p-4">{project.deadline}</td>
                                <td className="p-4"><ProjectStatusBadge status={project.status} /></td>
                                <td className="p-4 space-x-4">
                                    <button onClick={() => handleOpenEditModal(project)} className="text-sky-400 hover:text-sky-300 p-1"><EditIcon className="h-5 w-5" /></button>
                                    <button onClick={() => onDelete(project.id)} className="text-red-400 hover:text-red-300 p-1"><TrashIcon className="h-5 w-5" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingProject ? "Edit Project" : "Add Project"}>
                <ProjectForm onSubmit={handleSave} initialData={editingProject} clients={clients} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default Projects;