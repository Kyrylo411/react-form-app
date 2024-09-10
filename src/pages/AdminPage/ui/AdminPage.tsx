import clsx from 'clsx'
import classes from './AdminPage.module.scss'
import { useEffect, useState } from 'react'
import axios from 'axios'
import Button from '../../../shared/components/Button/Button'
import { Input } from '../../../shared/components/Input/Input'
// import { useNavigate } from 'react-router-dom'
// import { RouterPath } from '../../../app/router/routerConfig'
import { PROFILE_LOCALSTORAGE_KEY } from '../../../shared/const/localStorage'
import { useAuth } from '../../../app/AuthContext/AuthContext'

interface User {
	email: string
	password: string
}

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
	const { userId } = useAuth()
	// const navigate = useNavigate();
	// const profile = localStorage.getItem(PROFILE_LOCALSTORAGE_KEY)

	// if (!profile) {
	// 	navigate(RouterPath.sign_in)
	// }

	const getUser = async () => {

		try {
			setLoading(true)
			const response = await axios.get(`http://localhost:8000/profiles/${userId}`)
			setEmail(response.data.email)
			setPassword(response.data.password)
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.log('ERROR: ', e.response?.data?.message)
			}
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		getUser()
	}, [])

	const handleEmailChange = (value: string) => {
		setEmail(value)
	}
	const handlePasswordChange = (value: string) => {
		setPassword(value)
	}

	const handleSave = async () => {
		try {
			await axios.put(`http://localhost:8000/profiles/${userId}`, {
				email,
				password
			})
		} catch (e) {
			if (axios.isAxiosError(e)) {
				console.log('ERROR: ', e.response?.data?.message)
			}
		} finally {
			setLoading(false)
		}
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
				? <div>...Loading</div>
				: <div className={classes.userInfo}>
					<div className={classes.wrapper}>
						<p>Email:</p>
						<Input
							readOnly={!changeEmail}
							onChange={handleEmailChange}
							value={email}
							type="text"
							name='email'
							className={classes.input}
						/>
						<button className={classes.btn} onClick={handleEmailChangeToggle}>{changeEmail ? "save" : "change"}</button>
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
						/>
						<button className={classes.btn} onClick={handlePasswordChangeToggle}>{changePassword ? "save" : "change"}</button>
					</div>

				</div>
			}
			<Button disabled={changePassword || changeEmail} onClick={handleSave}>Save</Button>
		</div>
	)
}

export default AdminPage