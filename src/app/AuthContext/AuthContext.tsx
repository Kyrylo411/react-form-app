import React, { createContext, useContext, useEffect, useState } from 'react';
import { PROFILE_LOCALSTORAGE_KEY } from '../../shared/const/localStorage';
import { useNavigate } from 'react-router-dom';
import { RouterPath } from '../router/routerConfig';

interface AuthContextType {
	userId: string | null;
	isAuthenticated: boolean;
	login: (id: string, email: string) => void;
	logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error('useAuth must be used within an AuthProvider');
	}
	return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
	const [userId, setUserId] = useState<string | null>(null);
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navigate = useNavigate()

	useEffect(() => {
		const storedProfile = localStorage.getItem(PROFILE_LOCALSTORAGE_KEY);
		if (storedProfile) {
			const { id } = JSON.parse(storedProfile);
			setUserId(id);
			setIsAuthenticated(true);
		}
	}, []);


	const login = (id: string, email: string) => {
		setUserId(id);
		setIsAuthenticated(true);
		localStorage.setItem(PROFILE_LOCALSTORAGE_KEY, JSON.stringify({ id, email }));
	};

	const logout = () => {
		setUserId(null);
		setIsAuthenticated(false);
		localStorage.removeItem(PROFILE_LOCALSTORAGE_KEY);
		navigate(RouterPath.sign_in)
	};

	return (
		<AuthContext.Provider value={{ userId, isAuthenticated, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};
