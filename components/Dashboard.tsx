import React from 'react';
import { type Client, type Project, type Task, type Invoice } from '../types';
import { InvoicesIcon, TasksIcon, ProjectsIcon, ClientsIcon } from './Icons';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface DashboardProps {
    clients: Client[];
    projects: Project[];
    tasks: Task[];
    invoices: Invoice[];
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
  <div className="bg-slate-800 p-6 rounded-xl shadow-lg flex items-center space-x-4">
    <div className="bg-slate-700 p-3 rounded-full">{icon}</div>
    <div>
      <p className="text-slate-400 text-sm font-medium">{title}</p>
      <p className="text-2xl font-bold text-white">{value}</p>
    </div>
  </div>
);

const Dashboard: React.FC<DashboardProps> = ({ clients, projects, tasks, invoices }) => {
    const activeProjects = projects.filter(p => p.status === 'Active').length;
    const pendingTasks = tasks.filter(t => t.status !== 'Done').length;
    const dueInvoices = invoices.filter(i => i.status === 'Sent' || i.status === 'Overdue').length;
    const totalClients = clients.length;

    const invoiceData = invoices.map(inv => ({
        name: inv.invoiceNumber,
        Amount: inv.amount,
        Status: inv.status === 'Paid' ? 1 : 0,
    }));

    const recentTasks = tasks.slice(-5).reverse();

    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Active Projects" value={activeProjects} icon={<ProjectsIcon className="h-6 w-6 text-sky-400" />} />
                <StatCard title="Pending Tasks" value={pendingTasks} icon={<TasksIcon className="h-6 w-6 text-amber-400" />} />
                <StatCard title="Awaiting Payment" value={dueInvoices} icon={<InvoicesIcon className="h-6 w-6 text-emerald-400" />} />
                <StatCard title="Total Clients" value={totalClients} icon={<ClientsIcon className="h-6 w-6 text-fuchsia-400" />} />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-white mb-4">Invoice Overview</h2>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={invoiceData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                            <XAxis dataKey="name" stroke="#94a3b8" />
                            <YAxis stroke="#94a3b8" />
                            <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155' }} />
                            <Legend />
                            <Bar dataKey="Amount" fill="#22d3ee" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-slate-800 p-6 rounded-xl shadow-lg">
                    <h2 className="text-xl font-semibold text-white mb-4">Recent Tasks</h2>
                    <ul className="space-y-3">
                        {recentTasks.map(task => (
                            <li key={task.id} className="flex justify-between items-center p-3 bg-slate-700/50 rounded-md">
                                <div>
                                    <p className="font-medium text-white">{task.title}</p>
                                    <p className="text-xs text-slate-400">{projects.find(p => p.id === task.projectId)?.name}</p>
                                </div>
                                <span className={`px-2 py-1 text-xs font-bold rounded-full ${
                                    task.priority === 'High' ? 'bg-red-500/20 text-red-400' :
                                    task.priority === 'Medium' ? 'bg-amber-500/20 text-amber-400' :
                                    'bg-sky-500/20 text-sky-400'
                                }`}>
                                    {task.priority}
                                </span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;