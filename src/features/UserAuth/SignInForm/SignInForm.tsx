import clsx from 'clsx'
import classes from './SignInForm.module.scss'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { RouterPath } from '../../../app/router/routerConfig';
import { useAuth } from '../../../app/AuthContext/useAuth';
import Form from '../../../shared/components/Form/Form';

interface Props {
	className?: string
}

function SignInForm(props: Props) {
	const { className } = props
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const navigate = useNavigate();
	const { login } = useAuth()

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			const res = await axios.post('http://localhost:8000/login', { email, password });
			if (res.data.profile) {
				const { id, email } = res.data.profile
				navigate(RouterPath.admin);
				login(id, email)
			}
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.log('ERROR: ', e.response?.data?.message)
				setErrorMessage(e.response?.data?.message)
			}
		}
	}

	return (
		<div className={clsx(classes.formWrapper, className)}>
			<Form
				btnDisabled={!email || !password}
				onSubmit={onSubmit}
				email={email}
				password={password}
				errorMessage={errorMessage}
				handleEmailChange={setEmail}
				handlePasswordChange={setPassword}
			/>
		</div>
	)
}

export default SignInForm