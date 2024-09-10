import clsx from 'clsx'
import classes from './SignInPage.module.scss'
import { SignInForm } from '../../../features/UserAuth'

interface Props {
	className?: string
}

function SignInPage(props: Props) {
	const { className } = props
	return (
		<div className={clsx(classes.signInPage, className)}>
			<h1>SIGN IN</h1>
			<SignInForm />
		</div>
	)
}

export default SignInPage