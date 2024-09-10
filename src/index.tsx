import React from 'react';
import ReactDOM from 'react-dom/client';
import './app/styles/index.scss'
import App from './app/App';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider } from './app/AuthContext/AuthContext';

const root = ReactDOM.createRoot(
	document.getElementById('root') as HTMLElement
);
root.render(
	<React.StrictMode>
		<BrowserRouter>
			<AuthProvider>
				<App />
			</AuthProvider>
		</BrowserRouter>
	</React.StrictMode>
);

