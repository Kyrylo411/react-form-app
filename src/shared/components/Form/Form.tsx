import clsx from 'clsx'
import classes from './Form.module.scss'
import { Input } from '../Input/Input'
import Button from '../Button/Button'
import InfoMessage from '../InfoMessage/InfoMessage'
import { FormEvent, useState } from 'react'

interface Props {
	className?: string
	onSubmit: (e: FormEvent) => Promise<void>
	emailError?: string
	passwordError?: string
	btnDisabled: boolean
	errorMessage: string
	email: string
	password: string
	handleEmailChange: (value: string) => void
	handlePasswordChange: (value: string) => void
}

function Form(props: Props) {
	const {
		className,
		onSubmit,
		emailError,
		btnDisabled,
		errorMessage,
		email,
		password,
		passwordError,
		handlePasswordChange,
		handleEmailChange
	} = props
	const [visible, setVisible] = useState(false)

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
				<Input
					placeholder='Enter your password'
					name='password'
					type={`${visible ? 'text' : 'password'}`}
					value={password}
					onChange={handlePasswordChange}
					error={passwordError}
					min={6}
					max={20}
					autoComplete='on'
					handleEyeClick={handlePasswordToggle}
					eyeVisible={visible}
					withEye
				/>
				<Button disabled={btnDisabled} type='submit'>Sign up</Button>
				<InfoMessage text={errorMessage} />
			</form>
		</div>
	)
}

export default Form