import clsx from 'clsx'
import classes from './SignUpForm.module.scss'
import { FormEvent, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { validateEmail, validatePassword } from '../../../shared/validation/formValidation';
import axios from 'axios';
import { RouterPath } from '../../../app/router/routerConfig';
import Form from '../../../shared/components/Form/Form';

interface Props {
	className?: string
}

function SignUpForm(props: Props) {
	const { className } = props
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [emailError, setEmailError] = useState('')
	const [errorMessage, setErrorMessage] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const navigate = useNavigate();
	const disabled = !!emailError || !!passwordError || !email || !password

	const onSubmit = async (e: FormEvent) => {
		e.preventDefault()

		if (!validateEmail(email)) {
			setEmailError('Enter correct email')
			return
		}
		if (!validatePassword(password)) {
			setPasswordError('Password must be 6-20 characters, include one uppercase letter, one lowercase letter, one number, and one special character')
			return
		}

		try {
			await axios.post('http://localhost:8000/register', { email, password });
			setErrorMessage('')
			navigate(RouterPath.sign_in);
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.log('ERROR: ', e.response?.data?.message)
				setErrorMessage(e.response?.data?.message)
			}
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
	return (
		<div className={clsx(classes.formWrapper, className)}>
			<Form
				btnDisabled={disabled}
				email={email}
				password={password}
				errorMessage={errorMessage}
				passwordError={passwordError}
				emailError={emailError}
				onSubmit={onSubmit}
				handleEmailChange={handleEmailChange}
				handlePasswordChange={handlePasswordChange}
			/>
		</div>
	)
}

export default SignUpForm