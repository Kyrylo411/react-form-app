import clsx from 'clsx'
import classes from './SignUpForm.module.scss'
import { FormEvent, useState } from 'react'
import { Input } from '../../../shared/components/Input/Input'
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../../shared/validation/formValidation';
import axios from 'axios';
import { RouterPath } from '../../../app/router/routerConfig';
import Button from '../../../shared/components/Button/Button';

interface Props {
	className?: string
}

function SignUpForm(props: Props) {
	const { className } = props
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [visible, setVisible] = useState(false)
	const navigate = useNavigate();
	const disabled = !!emailError || !!passwordError || !email || !password

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()

		if (!validateEmail(email)) {
			setEmailError('enter correct email')
			return
		}
		if (!validatePassword(password)) {
			setPasswordError('Password must be 6-20 characters, include one uppercase letter, one lowercase letter, one number, and one special character')
			return
		}

		try {
			await axios.post('http://localhost:5000/register', { email, password });
			navigate(RouterPath.sign_in);
		} catch (error) {
			console.log('Registration failed. Try again.');
		}
	}

	const handleEmailChange = (e: string) => {
		setEmail(e)
		setEmailError('')
	}

	const handlePasswordChange = (e: string) => {
		setPassword(e)
		setPasswordError('')
	}

	const handlePasswordToggle = () => {
		setVisible(!visible)
	}

	return (
		<div className={clsx(classes.formWrapper, className)}>
			<form onSubmit={onSubmit} className={classes.signUpForm}>
				<Input
					placeholder='Enter your email'
					name='email'
					type='email'
					value={email}
					onChange={handleEmailChange}
					required
					error={emailError}
				/>
				<div className={classes.passWrapper}>
					<Input
						placeholder='Enter your password'
						name='password'
						type={`${visible ? 'text' : 'password'}`}
						value={password}
						onChange={handlePasswordChange}
						error={passwordError}
						min={6}
						max={20}
					/>
					{password
						&& <div
							className={clsx(classes.eye, { [classes.open]: visible })}
							onClick={handlePasswordToggle}>
							{visible ? 'hide' : 'show'}
						</div>
					}

				</div>
				<Button disabled={disabled} type='submit'>Sign up</Button>
			</form>
		</div>
	)
}

export default SignUpForm