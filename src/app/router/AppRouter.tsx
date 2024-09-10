import { Suspense, useCallback } from 'react'
import { AppRouterProps, routerConfig, RouterPath } from './routerConfig'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { PROFILE_LOCALSTORAGE_KEY } from '../../shared/const/localStorage'

const AppRouter = () => {
	const location = useLocation()
	const profile = localStorage.getItem(PROFILE_LOCALSTORAGE_KEY)

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
				element={route.authOnly && !profile
					? <Navigate to={RouterPath.sign_in} state={{ from: location }} replace />
					: element
				}
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