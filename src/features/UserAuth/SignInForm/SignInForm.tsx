import clsx from 'clsx'
import classes from './SignInForm.module.scss'
import { FormEvent, useState } from 'react'
import { Input } from '../../../shared/components/Input/Input'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from '../../../shared/components/Button/Button';
import { RouterPath } from '../../../app/router/routerConfig';

interface Props {
	className?: string
}

function SignInForm(props: Props) {
	const { className } = props
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const navigate = useNavigate();

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()

		try {
			await axios.post('http://localhost:5000/login', { email, password });
			// navigate(RouterPath.admin);
		} catch (error) {
			console.log('Registration failed. Try again.');
		}
		navigate(RouterPath.admin);
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
				/>
				<Button type='submit'>Log in</Button>
			</form>
		</div>
	)
}

export default SignInForm