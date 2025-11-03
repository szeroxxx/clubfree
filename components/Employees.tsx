import React, { useState, useEffect } from 'react';
import { type Employee, type EmployeeData, type User } from '../types';
import { PlusIcon, EditIcon, TrashIcon } from './Icons';
import Modal from './Modal';
import { canCreate, canUpdate, canDelete } from '../utils/permissions';

interface EmployeesProps {
    user: User;
    employees: Employee[];
    onAdd: (employee: EmployeeData) => void;
    onUpdate: (employee: Employee) => void;
    onDelete: (id: string) => void;
}

const EmployeeForm: React.FC<{ onSubmit: (data: EmployeeData) => void; initialData?: Employee | null; onClose: () => void }> = ({ onSubmit, initialData, onClose }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [jobTitle, setJobTitle] = useState('');
    
    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setEmail(initialData.email);
            setJobTitle(initialData.jobTitle);
        }
    }, [initialData]);
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ name, email, jobTitle });
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
                <label className="block text-sm font-medium text-slate-400">Job Title</label>
                <input type="text" value={jobTitle} onChange={e => setJobTitle(e.target.value)} className="mt-1 block w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm py-2 px-3 text-white focus:outline-none focus:ring-sky-500 focus:border-sky-500" required />
            </div>
            <div className="flex justify-end space-x-2 pt-2">
                <button type="button" onClick={onClose} className="bg-slate-600 hover:bg-slate-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">Cancel</button>
                <button type="submit" className="bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">Save Employee</button>
            </div>
        </form>
    );
};

const Employees: React.FC<EmployeesProps> = ({ user, employees, onAdd, onUpdate, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState<Employee | null>(null);

    const canUserCreate = canCreate(user, 'Employee');
    const canUserUpdate = canUpdate(user, 'Employee');
    const canUserDelete = canDelete(user, 'Employee');

    const handleOpenAddModal = () => {
        setEditingEmployee(null);
        setIsModalOpen(true);
    };

    const handleOpenEditModal = (employee: Employee) => {
        setEditingEmployee(employee);
        setIsModalOpen(true);
    };
    
    const handleSave = (data: EmployeeData) => {
        if (editingEmployee) {
            onUpdate({ ...data, id: editingEmployee.id });
        } else {
            onAdd(data);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-3xl font-bold text-white">Employees</h1>
                {canUserCreate && (
                    <button onClick={handleOpenAddModal} className="flex items-center bg-sky-500 hover:bg-sky-600 text-white font-bold py-2 px-4 rounded-lg transition-colors">
                        <PlusIcon className="h-5 w-5 mr-2" />
                        Add Employee
                    </button>
                )}
            </div>

            <div className="bg-slate-800 rounded-xl shadow-lg overflow-hidden">
                <table className="w-full text-left">
                    <thead className="bg-slate-700/50">
                        <tr>
                            <th className="p-4 font-semibold text-white">Name</th>
                            <th className="p-4 font-semibold text-white">Job Title</th>
                            <th className="p-4 font-semibold text-white">Email</th>
                            {(canUserUpdate || canUserDelete) && <th className="p-4 font-semibold text-white">Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map(employee => (
                            <tr key={employee.id} className="border-b border-slate-700 hover:bg-slate-700/30 transition-colors">
                                <td className="p-4 font-medium text-white">{employee.name}</td>
                                <td className="p-4">{employee.jobTitle}</td>
                                <td className="p-4">{employee.email}</td>
                                {(canUserUpdate || canUserDelete) && (
                                    <td className="p-4 space-x-4">
                                        {canUserUpdate && <button onClick={() => handleOpenEditModal(employee)} className="text-sky-400 hover:text-sky-300 p-1"><EditIcon className="h-5 w-5" /></button>}
                                        {canUserDelete && <button onClick={() => onDelete(employee.id)} className="text-red-400 hover:text-red-300 p-1"><TrashIcon className="h-5 w-5" /></button>}
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={editingEmployee ? "Edit Employee" : "Add Employee"}>
                <EmployeeForm onSubmit={handleSave} initialData={editingEmployee} onClose={() => setIsModalOpen(false)} />
            </Modal>
        </div>
    );
};

export default Employees;
