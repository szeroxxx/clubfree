import React from 'react';
import { type User } from '../types';
import { LogoutIcon } from './Icons';

interface HeaderProps {
    user: User;
    onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
    return (
        <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 p-4 flex justify-end items-center shadow-md">
            <div className="flex items-center space-x-4">
                <div className="text-right">
                    <p className="font-semibold text-white">{user.name}</p>
                    <p className="text-xs text-sky-400 font-medium">{user.role}</p>
                </div>
                <button onClick={onLogout} className="text-slate-400 hover:text-white transition-colors" aria-label="Logout">
                    <LogoutIcon className="h-6 w-6" />
                </button>
            </div>
        </header>
    );
};

export default Header;
