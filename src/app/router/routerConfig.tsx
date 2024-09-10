import { PathRouteProps } from 'react-router-dom';
import { SignUpPage } from '../../pages/SignUpPage';
import { SignInPage } from '../../pages/SignInPage';
import { AdminPage } from '../../pages/AdminPage';

export type AppRouterProps = PathRouteProps & {
	authOnly?: boolean
}

export enum AppRoutes {
	SIGN_UP = 'sign_up',
	SIGN_IN = 'sign_in',
	ADMIN = 'admin'
}

export const RouterPath: Record<AppRoutes, string> = {
	[AppRoutes.SIGN_UP]: '/',
	[AppRoutes.SIGN_IN]: '/sign-in',
	[AppRoutes.ADMIN]: '/admin'
}

export const routerConfig: Record<AppRoutes, AppRouterProps> = {
	[AppRoutes.SIGN_UP]: {
		path: RouterPath.sign_up,
		element: <SignUpPage />
	},
	[AppRoutes.SIGN_IN]: {
		path: RouterPath.sign_in,
		element: <SignInPage />,
	},
	[AppRoutes.ADMIN]: {
		path: RouterPath.admin,
		element: <AdminPage />,
		authOnly: true
	},
}
