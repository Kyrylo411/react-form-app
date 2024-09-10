import { Suspense } from 'react';
import AppRouter from './router/AppRouter';
import Header from '../shared/components/Header/Header';
import './styles/index.scss'

function App() {
	return (
		<div className="app">
			<Suspense fallback="">
				<Header />
				<div className='content-page'>
					<AppRouter />
				</div>
			</Suspense>
		</div>
	);
}

export default App;
