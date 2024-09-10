import clsx from 'clsx'
import classes from './SignInForm.module.scss'
import { FormEvent, useState } from 'react'
import { Input } from '../../../shared/components/Input/Input'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../../shared/components/Button/Button';
import { RouterPath } from '../../../app/router/routerConfig';
import { useAuth } from '../../../app/AuthContext/AuthContext';

interface Props {
	className?: string
}

function SignInForm(props: Props) {
	const { className } = props
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate();
	const { login } = useAuth()


	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()
		try {
			const res = await axios.post('http://localhost:8000/login', { email, password });
			if (res.statusText === 'OK') {
				const { id, email } = res.data.profile
				login(id, email)
				navigate(RouterPath.admin);
			}
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.log('ERROR: ', e.response?.data?.message)
			}
		}
	}

	return (
		<div className={clsx(classes.formWrapper, className)}>
			<form onSubmit={onSubmit} className={classes.signInForm}>
				<Input
					placeholder='Enter your email'
					name='email'
					type='email'
					value={email}
					onChange={setEmail}
					required
				/>
				<Input
					placeholder='Enter your password'
					name='password'
					type='password'
					value={password}
					onChange={setPassword}
					min={6}
					max={20}
					autoComplete='on'
				/>
				<Button type='submit'>Log in</Button>
			</form>
		</div>
	)
}

export default SignInForm