import clsx from 'clsx'
import classes from './SignUpPage.module.scss'
import { SignUpForm } from '../../../features/UserAuth'

interface Props {
	className?: string
}

function SignUpPage(props: Props) {
	const { className } = props
	return (
		<div className={clsx(classes.signUpPage, className)}>
			<h1>SIGN UP</h1>
			<SignUpForm />
		</div>
	)
}

export default SignUpPage