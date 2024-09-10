import { FC, ReactNode, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PROFILE_LOCALSTORAGE_KEY } from '../../shared/const/localStorage';
import { RouterPath } from '../router/routerConfig';
import { AuthContext } from './AuthContext';

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
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
