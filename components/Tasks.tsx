import React, { useState, useEffect } from 'react';
import { type Task, type Project, type Employee, type TaskData, type User } from '../types';
import { PlusIcon, EditIcon, TrashIcon } from './Icons';
import Modal from './Modal';
import { canCreate, canUpdate, canDelete } from '../utils/permissions';


interface TasksProps {
    user: User;
    tasks: Task[];
    projects: Project[];
    employees: Employee[];
    onAdd: (task: TaskData) => void;
    onUpdate: (task: Task) => void;
    onDelete: (id: string) => void;
}

const TaskForm: React.FC<{ user: User; onSubmit: (data: TaskData) => void; initialData?: Task | null; projects: Project[]; employees: Employee[]; onClose: () => void }> = ({ user, onSubmit, initialData, projects, employees, onClose }) => {
    const [title, setTitle] = useState('');
    const [projectId, setProjectId] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState<Task['priority']>('Medium');
    const [status, setStatus] = useState<Task['status']>('To Do');
    const [assigneeId, setAssigneeId] = useState('');
    
    const relevantProjects = user.role === 'Admin' ? projects : projects.filter(p => p.memberIds.includes(user.entityId) || p.clientId === user.entityId);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setProjectId(initialData.projectId);
            setDueDate(initialData.dueDate);
            setPriority(initialData.priority);
            setStatus(initialData.status);
            setAssigneeId(initialData.assigneeId);
        } else if (relevantProjects.length > 0) {
            setProjectId(relevantProjects[0].id);
            if(employees.length > 0) setAssigneeId(employees[0].id);
        }
    }, [initialData, relevantProjects, employees]);
    
    const projectMembers = projects.find(p => p.id === projectId)?.memberIds || [];
    const availableAssignees = employees.filter(e => projectMembers.includes(e.id));

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ title, projectId, dueDate, priority, status, assigneeId });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-400">Task Title</label>
                <input type="text" value={title} onChange={e => setTitle(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-400">Project</label>
                <select value={projectId} onChange={e => setProjectId(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required>
                    {relevantProjects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-400">Assign To</label>
                <select value={assigneeId} onChange={e => setAssigneeId(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required>
                    {availableAssignees.map(e => <option key={e.id} value={e.id}>{e.name}</option>)}
                    {availableAssignees.length === 0 && <option disabled>No members on this project</option>}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-400">Due Date</label>
                <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
                 <div>
                    <label className="block text-sm font-medium text-slate-400">Priority</label>
                    <select value={priority} onChange={e => setPriority(e.target.value as Task['priority'])} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required>
                        <option>Low</option>
                        <option>Medium</option>
                        <option>High</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400">Status</label>
                    <select value={status} onChange={e => setStatus(e.target.value as Task['status'])} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required>
                        <option>To Do</option>
                        <option>In Progress</option>
                        <option>Done</option>
                    </select>
                </div>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={onClose} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Save Task</button>
            </div>
        </form>
    );
};

const TaskPriorityBadge: React.FC<{ priority: Task['priority'] }> = ({ priority }) => {
    const baseClasses = "px-3 py-1 text-xs font-bold rounded-full";
    const priorityClasses = {
        'High': 'bg-red-500/20 text-red-400',
        'Medium': 'bg-amber-500/20 text-amber-400',
        'Low': 'bg-sky-500/20 text-sky-400',
    };
    return <span className={`${baseClasses} ${priorityClasses[priority]}`}>{priority}</span>;
};

const TaskStatusBadge: React.FC<{ status: Task['status'] }> = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-bold rounded-full";
    const statusClasses = {
        'To Do': 'bg-slate-500/20 text-slate-400',
        'In Progress': 'bg-blue-500/20 text-blue-400',
        'Done': 'bg-emerald-500/20 text-emerald-400',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
}


const Tasks: React.FC<TasksProps> = ({ user, tasks, projects, employees, onAdd, onUpdate, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState<Task | null>(null);

    const canUserCreate = canCreate(user, 'Task');
    const canUserUpdate = canUpdate(user, 'Task');
    const canUserDelete = canDelete(user, 'Task');

    const getProjectName = (projectId: string) => projects.find(p => p.id === projectId)?.name || 'Unknown Project';
    
    const handleOpenAddModal = () => {
        setEditingTask(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (task: Task) => {
        setEditingTask(task);
        setIsModalOpen(true);
    };
    
    const handleSave = (data: TaskData) => {
        if (editingTask) {
            onUpdate({ ...data, id: editingTask.id });
        } else {
            onAdd(data);
        }
    };

    const clientProjectIds = projects.filter(p => p.clientId === user.entityId).map(p => p.id);
    const filteredTasks = user.role === 'Admin'
    ? tasks
    : user.role === 'Client'
        ? tasks.filter(t => clientProjectIds.includes(t.projectId))
        : tasks.filter(t => t.assigneeId === user.entityId);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Tasks</h1>
                {canUserCreate && (
                    <button onClick={handleOpenAddModal} className="flex items-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add Task
                    </button>
                )}
            </div>

            <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                 <table className="w-full text-left">
                    <thead className="bg-slate-700/50">
                        <tr>
                            <th className="p-4 font-semibold text-white">Task</th>
                            <th className="p-4 font-semibold text-white">Project</th>
                            <th className="p-4 font-semibold text-white">Due Date</th>
                            <th className="p-4 font-semibold text-white">Priority</th>
                            <th className="p-4 font-semibold text-white">Status</th>
                            {(canUserUpdate || canUserDelete) && <th className="p-4 font-semibold text-white">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredTasks.map(task => (
                            <tr key={task.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                                <td className="p-4 font-medium text-white">{task.title}</td>
                                <td className="p-4">{getProjectName(task.projectId)}</td>
                                <td className="p-4">{task.dueDate}</td>
                                <td className="p-4"><TaskPriorityBadge priority={task.priority} /></td>
                                <td className="p-4"><TaskStatusBadge status={task.status} /></td>
                                {(canUserUpdate || canUserDelete) && (
                                    <td className="p-4 space-x-4">
                                        {canUserUpdate && <button onClick={() => handleOpenEditModal(task)} className="text-sky-400 hover:text-sky-300 p-1"><EditIcon className="h-5 w-5" /></button>}
                                        {canUserDelete && <button onClick={() => onDelete(task.id)} className="text-red-400 hover:text-red-300 p-1"><TrashIcon className="h-5 w-5" /></button>}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {isModalOpen &&
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingTask ? "Edit Task" : "Add Task"}>
                    <TaskForm user={user} onSubmit={handleSave} initialData={editingTask} projects={projects} employees={employees} onClose={() => setIsModalOpen(false)} />
                </Modal>
            }
        </div>
    );
};

export default Tasks;
