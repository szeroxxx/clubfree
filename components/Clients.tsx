import React, { useState, useEffect } from 'react';
import { type Client, type ClientData } from '../types';
import { PlusIcon, EditIcon, TrashIcon } from './Icons';
import Modal from './Modal';

interface ClientsProps {
    clients: Client[];
    onAdd: (client: ClientData) => void;
    onUpdate: (client: Client) => void;
    onDelete: (id: string) => void;
}

const ClientForm: React.FC<{ onSubmit: (data: ClientData) => void; initialData?: Client | null; onClose: () => void }> = ({ onSubmit, initialData, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [company, setCompany] = useState('');
    
    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setEmail(initialData.email);
            setCompany(initialData.company);
        }
    }, [initialData]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, email, company });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-400">Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-400">Email</label>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-400">Company</label>
                <input type="text" value={company} onChange={e => setCompany(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={onClose} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Save Client</button>
            </div>
        </form>
    );
};

const Clients: React.FC<ClientsProps> = ({ clients, onAdd, onUpdate, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Client | null>(null);

    const handleOpenAddModal = () => {
        setEditingClient(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (client: Client) => {
        setEditingClient(client);
        setIsModalOpen(true);
    };
    
    const handleSave = (data: ClientData) => {
        if (editingClient) {
            onUpdate({ ...data, id: editingClient.id });
        } else {
            onAdd(data);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Clients</h1>
                <button onClick={handleOpenAddModal} className="flex items-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                    <PlusIcon className="h-5 w-5 mr-2" />
                    Add Client
                </button>
            </div>

            <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-700/50">
                        <tr>
                            <th className="p-4 font-semibold text-white">Name</th>
                            <th className="p-4 font-semibold text-white">Company</th>
                            <th className="p-4 font-semibold text-white">Email</th>
                            <th className="p-4 font-semibold text-white">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                                <td className="p-4 font-medium text-white">{client.name}</td>
                                <td className="p-4">{client.company}</td>
                                <td className="p-4">{client.email}</td>
                                <td className="p-4 space-x-4">
                                    <button onClick={() => handleOpenEditModal(client)} className="text-sky-400 hover:text-sky-300 p-1"><EditIcon className="h-5 w-5" /></button>
                                    <button onClick={() => onDelete(client.id)} className="text-red-400 hover:text-red-300 p-1"><TrashIcon className="h-5 w-5" /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingClient ? "Edit Client" : "Add Client"}>
                <ClientForm onSubmit={handleSave} initialData={editingClient} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default Clients;