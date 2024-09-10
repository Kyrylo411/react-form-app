import clsx from 'clsx'
import classes from './Layout.module.scss'
import { ReactNode } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RouterPath } from '../../../app/router/routerConfig'
import Button from '../Button/Button'

interface Props {
	className?: string
	children: ReactNode
}

function Layout(props: Props) {
	const { className, children } = props
	const location = useLocation()
	const isAdmin = location.pathname === RouterPath.admin

	return (
		<div className={clsx(classes.layout, className)}>
			<div className={classes.navigation}>
				{isAdmin
					? <Button>Log Out</Button>
					: <Link className={classes.link} to={location.pathname === '/' ? RouterPath.sign_in : RouterPath.sign_up}>
						Go to {location.pathname === '/' ? 'Sign-in' : 'Sign-up'} page
					</Link>
				}
			</div>
			{children}
		</div>
	)
}

export default Layout