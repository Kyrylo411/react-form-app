import { Suspense, useCallback } from 'react'
import { AppRouterProps, routerConfig, RouterPath } from './routerConfig'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'

const AppRouter = () => {
	const auth = true
	const location = useLocation()

	const render = useCallback((route: AppRouterProps) => {
		const element = (
			<Suspense fallback='loading...'>
				{route.element}
			</Suspense>
		)

		return (
			<Route
				path={route.path}
				key={route.path}
				element={route.authOnly && !auth ? <Navigate to={RouterPath.sign_in} state={{ from: location }} replace /> : element}
			/>
		)
	}, [])

	return (
		<Routes>
			{Object.values(routerConfig).map(render)}
		</Routes>
	)
}

export default AppRouter