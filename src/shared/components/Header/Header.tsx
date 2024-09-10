import clsx from 'clsx'
import classes from './Header.module.scss'
import { Link, useLocation } from 'react-router-dom'
import { RouterPath } from '../../../app/router/routerConfig'
import Button from '../Button/Button'
import { useAuth } from '../../../app/AuthContext/useAuth'

interface Props {
	className?: string
}

function Header(props: Props) {
	const { className } = props
	const { logout, isAuthenticated } = useAuth()
	const location = useLocation()
	const isSignUpPage = location.pathname === '/'
	const isSignInPage = location.pathname === '/sign-in'

	return (
		<header className={clsx(classes.layout, className)}>
			<div className={classes.navigation}>
				{isSignUpPage &&
					<Link className={classes.link} to={RouterPath.sign_in}>
						Go to Sign-In page
					</Link>
				}
				{isSignInPage &&
					<Link className={classes.link} to={RouterPath.sign_up}>
						Go to Sign-Up page
					</Link>
				}
			</div>
			{isAuthenticated && <Button onClick={logout}>Log Out</Button>}
		</header>
	)
}

export default Header