import { useState, useEffect, useCallback } from 'react';
import { type User } from '../types';
import { INITIAL_USERS } from '../constants';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        try {
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            }
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            localStorage.removeItem('user');
        } finally {
            setLoading(false);
        }
    }, []);

    const login = useCallback((username, password) => {
        const foundUser = INITIAL_USERS.find(u => u.username === username && u.password === password);
        if (foundUser) {
            const userToStore = { ...foundUser };
            delete userToStore.password; // Don't store password
            localStorage.setItem('user', JSON.stringify(userToStore));
            setUser(userToStore);
            return true;
        }
        return false;
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('user');
        setUser(null);
    }, []);

    return { user, login, logout, loading };
};
