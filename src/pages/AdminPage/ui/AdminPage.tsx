import clsx from 'clsx'
import classes from './AdminPage.module.scss'
import { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../../../shared/components/Button/Button'
import { Input } from '../../../shared/components/Input/Input'
import { useAuth } from '../../../app/AuthContext/useAuth'
import InfoMessage, { MessageType } from '../../../shared/components/InfoMessage/InfoMessage'
import { Loader } from '../../../shared/components/Loader/Loader'
import { validateEmail, validatePassword } from '../../../shared/validation/formValidation'

interface Props {
	className?: string
}

function AdminPage(props: Props) {
	const { className } = props
	const [loading, setLoading] = useState(false)
	const [email, setEmail] = useState('')
	const [password, setPassword] = useState('')
	const [changeEmail, setChangeEmail] = useState(false)
	const [changePassword, setChangePassword] = useState(false)
	const [errorMessage, setErrorMessage] = useState('')
	const [emailError, setEmailError] = useState('')
	const [passwordError, setPasswordError] = useState('')
	const [successMessage, setSuccessMessage] = useState('')
	const { userId } = useAuth()
	const disabled = changePassword || changeEmail || !email || !password

	const getProfile = async () => {
		try {
			setLoading(true)
			const response = await axios.get(`http://localhost:8000/profiles/${userId}`)
			setEmail(response.data.email)
			setPassword(response.data.password)
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.log('ERROR: ', e.response?.data?.message)
				setErrorMessage(e.response?.data?.message)
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getProfile()
	}, [])

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
			await axios.put(`http://localhost:8000/profiles/${userId}`, {
				email,
				password
			})
			setSuccessMessage('Profile successfully updated')
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.log('ERROR: ', e.response?.data?.message)
				setErrorMessage(e.response?.data?.message)
			}
		} finally {
			setLoading(false)
		}
	}

	const handleEmailChange = (value: string) => {
		setEmail(value)
		setEmailError('')
	}

	const handlePasswordChange = (value: string) => {
		setPassword(value)
		setPasswordError('')
	}

	const handleEmailChangeToggle = () => {
		setChangeEmail(!changeEmail)
	}

	const handlePasswordChangeToggle = () => {
		setChangePassword(!changePassword)
	}

	return (
		<div className={clsx(classes.adminPage, className)}>
			<h1>ADMIN PAGE</h1>
			{loading
				? <Loader />
				: <form onSubmit={onSubmit} className={classes.userInfo}>
					<div className={classes.wrapper}>
						<p>Email:</p>
						<Input
							readOnly={!changeEmail}
							onChange={handleEmailChange}
							value={email}
							type="text"
							name='email'
							className={classes.input}
							error={emailError}
						/>
						<div className={classes.btn} onClick={handleEmailChangeToggle}>{changeEmail ? "save" : "change"}</div>
					</div>
					<div className={classes.divider} />
					<div className={classes.wrapper}>
						<p>Password:</p>
						<Input
							onChange={handlePasswordChange}
							value={password}
							type={`${changePassword ? 'text' : 'password'}`}
							name='password'
							readOnly={!changePassword}
							className={classes.input}
							error={passwordError}
							min={6}
							max={20}
						/>
						<div className={classes.btn} onClick={handlePasswordChangeToggle}>{changePassword ? "save" : "change"}</div>
					</div>
					<InfoMessage text={errorMessage} />
					<InfoMessage text={successMessage} type={MessageType.SUCCESS} />
					<Button type='submit' disabled={disabled}>Save</Button>
				</form>
			}
		</div>
	)
}

export default AdminPage