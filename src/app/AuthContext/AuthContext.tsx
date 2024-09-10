import { createContext } from 'react';

export interface AuthContextProps {
	userId: string | null;
	isAuthenticated: boolean;
	login: (id: string, email: string) => void;
	logout: () => void;
}

export const AuthContext = createContext<AuthContextProps | null>(null);
