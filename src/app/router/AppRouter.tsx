import { Suspense, useCallback } from 'react'
import { AppRouterProps, routerConfig, RouterPath } from './routerConfig'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { PageLoader } from '../../widgets/PageLoader/PageLoader'
import { useAuth } from '../AuthContext/useAuth'

const AppRouter = () => {
	const location = useLocation()
	const { isAuthenticated } = useAuth()

	const render = useCallback((route: AppRouterProps) => {
		const element = (
			<Suspense fallback={<PageLoader />}>
				{route.element}
			</Suspense>
		)

		return (
			<Route
				path={route.path}
				key={route.path}
				element={route.authOnly && !isAuthenticated
					? <Navigate to={RouterPath.sign_in} state={{ from: location }} replace />
					: element
				}
			/>
		)
	}, [isAuthenticated])

	return (
		<Routes>
			{Object.values(routerConfig).map(render)}
		</Routes>
	)
}

export default AppRouter