import { Suspense } from 'react';
import AppRouter from './router/AppRouter';
import Layout from '../shared/components/Layout/Layout';

function App() {
	return (
		<div className="app">
			<Suspense fallback="">
				<Layout>
					<AppRouter />
				</Layout>
			</Suspense>
		</div>
	);
}

export default App;
