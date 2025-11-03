import React, { useState, useEffect } from 'react';
import { type Invoice, type Project, type Client, type InvoiceData, type User } from '../types';
import { PlusIcon, EditIcon, TrashIcon } from './Icons';
import Modal from './Modal';
import { canCreate, canUpdate, canDelete } from '../utils/permissions';

interface InvoicesProps {
    user: User;
    invoices: Invoice[];
    projects: Project[];
    clients: Client[];
    onAdd: (invoice: InvoiceData) => void;
    onUpdate: (invoice: Invoice) => void;
    onDelete: (id: string) => void;
}

const InvoiceForm: React.FC<{ onSubmit: (data: InvoiceData) => void; initialData?: Invoice | null; projects: Project[]; onClose: () => void }> = ({ onSubmit, initialData, projects, onClose }) => {
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [projectId, setProjectId] = useState('');
    const [amount, setAmount] = useState<number>(0);
    const [status, setStatus] = useState<Invoice['status']>('Draft');
    const [issueDate, setIssueDate] = useState('');
    const [dueDate, setDueDate] = useState('');

    useEffect(() => {
        if (initialData) {
            setInvoiceNumber(initialData.invoiceNumber);
            setProjectId(initialData.projectId);
            setAmount(initialData.amount);
            setStatus(initialData.status);
            setIssueDate(initialData.issueDate);
            setDueDate(initialData.dueDate);
        } else if (projects.length > 0) {
            setProjectId(projects[0].id);
        }
    }, [initialData, projects]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ invoiceNumber, projectId, amount, status, issueDate, dueDate });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400">Invoice #</label>
                    <input type="text" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400">Amount</label>
                    <input type="number" value={amount} onChange={e => setAmount(parseFloat(e.target.value))} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required />
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-400">Project</label>
                <select value={projectId} onChange={e => setProjectId(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required>
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
            </div>
             <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-400">Issue Date</label>
                    <input type="date" value={issueDate} onChange={e => setIssueDate(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-400">Due Date</label>
                    <input type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required />
                </div>
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-400">Status</label>
                <select value={status} onChange={e => setStatus(e.target.value as Invoice['status'])} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required>
                    <option>Draft</option>
                    <option>Sent</option>
                    <option>Paid</option>
                    <option>Overdue</option>
                </select>
            </div>
            <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={onClose} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Save Invoice</button>
            </div>
        </form>
    );
};


const InvoiceStatusBadge: React.FC<{ status: Invoice['status'] }> = ({ status }) => {
    const baseClasses = "px-3 py-1 text-xs font-bold rounded-full";
    const statusClasses = {
        'Draft': 'bg-slate-500/20 text-slate-400',
        'Sent': 'bg-blue-500/20 text-blue-400',
        'Paid': 'bg-emerald-500/20 text-emerald-400',
        'Overdue': 'bg-red-500/20 text-red-400',
    };
    return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const Invoices: React.FC<InvoicesProps> = ({ user, invoices, projects, clients, onAdd, onUpdate, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

    const canUserCreate = canCreate(user, 'Invoice');
    const canUserUpdate = canUpdate(user, 'Invoice');
    const canUserDelete = canDelete(user, 'Invoice');

    const getInvoiceDetails = (projectId: string) => {
        const project = projects.find(p => p.id === projectId);
        const client = clients.find(c => c.id === project?.clientId);
        return {
            projectName: project?.name || 'N/A',
            clientName: client?.name || 'N/A',
        };
    };

    const handleOpenAddModal = () => {
        setEditingInvoice(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (invoice: Invoice) => {
        setEditingInvoice(invoice);
        setIsModalOpen(true);
    };

    const handleSave = (data: InvoiceData) => {
        if (editingInvoice) {
            onUpdate({ ...data, id: editingInvoice.id });
        } else {
            onAdd(data);
        }
    };
    
    const clientProjectIds = projects.filter(p => p.clientId === user.entityId).map(p => p.id);
    const filteredInvoices = user.role === 'Admin'
    ? invoices
    : user.role === 'Client'
        ? invoices.filter(i => clientProjectIds.includes(i.projectId))
        : [];


    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Invoices</h1>
                {canUserCreate && (
                    <button onClick={handleOpenAddModal} className="flex items-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Create Invoice
                    </button>
                )}
            </div>

            <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-700/50">
                        <tr>
                            <th className="p-4 font-semibold text-white">Invoice #</th>
                            <th className="p-4 font-semibold text-white">Client / Project</th>
                            <th className="p-4 font-semibold text-white">Amount</th>
                            <th className="p-4 font-semibold text-white">Issue Date</th>
                            <th className="p-4 font-semibold text-white">Due Date</th>
                            <th className="p-4 font-semibold text-white">Status</th>
                            {(canUserUpdate || canUserDelete) && <th className="p-4 font-semibold text-white">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredInvoices.map(invoice => {
                             const { projectName, clientName } = getInvoiceDetails(invoice.projectId);
                             return (
                                <tr key={invoice.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                                    <td className="p-4 font-medium text-white">{invoice.invoiceNumber}</td>
                                    <td className="p-4">
                                        <p className="font-medium text-white">{clientName}</p>
                                        <p className="text-sm text-slate-400">{projectName}</p>
                                    </td>
                                    <td className="p-4 font-medium text-emerald-400">${invoice.amount.toLocaleString()}</td>
                                    <td className="p-4">{invoice.issueDate}</td>
                                    <td className="p-4">{invoice.dueDate}</td>
                                    <td className="p-4"><InvoiceStatusBadge status={invoice.status} /></td>
                                    {(canUserUpdate || canUserDelete) && (
                                        <td className="p-4 space-x-4">
                                            {canUserUpdate && <button onClick={() => handleOpenEditModal(invoice)} className="text-sky-400 hover:text-sky-300 p-1"><EditIcon className="h-5 w-5" /></button>}
                                            {canUserDelete && <button onClick={() => onDelete(invoice.id)} className="text-red-400 hover:text-red-300 p-1"><TrashIcon className="h-5 w-5" /></button>}
                                        </td>
                                    )}
                                </tr>
                             );
                        })}
                    </tbody>
                </table>
            </div>
            {isModalOpen &&
                <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingInvoice ? "Edit Invoice" : "Create Invoice"}>
                    <InvoiceForm onSubmit={handleSave} initialData={editingInvoice} projects={projects} onClose={() => setIsModalOpen(false)} />
                </Modal>
            }
        </div>
    );
};

export default Invoices;
