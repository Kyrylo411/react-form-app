import React, {
	InputHTMLAttributes, memo,
} from 'react'
import classes from './Input.module.scss'
import clsx from 'clsx'
import { ShowIcon } from '../../assets/icons/ShowIcon'
import { HideIcon } from '../../assets/icons/HideIcon'

type HTMLInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, 'value' | 'onChange' | 'readOnly'>

interface InputProps extends HTMLInputProps {
	className?: string
	value?: string | number
	onChange?: (value: string) => void
	type?: string
	placeholder?: string
	autofocus?: boolean
	readOnly?: boolean
	name?: string
	error?: string
	handleEyeClick?: () => void
	eyeVisible?: boolean
	withEye?: boolean
}

export const Input = memo((props: InputProps) => {
	const {
		className,
		onChange,
		value,
		type = 'text',
		placeholder,
		autofocus,
		readOnly,
		name,
		error,
		handleEyeClick,
		eyeVisible,
		withEye,
		...otherProps
	} = props

	const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		onChange?.(e.target.value)
	}

	const mods = {
		[classes.error]: !!error,
		[classes.readOnly]: readOnly,
		[classes.password]: type === 'password'
	}


	return (
		<div className={clsx(classes.inputWrapper, className)}>
			{placeholder && (
				<label htmlFor={name} className={classes.placeholder}>
					{placeholder}
				</label>
			)}
			<div className={classes.iconWrapper}>
				<input
					id={name}
					name={name}
					className={clsx(classes.input, mods)}
					type={type}
					value={value}
					onChange={onInputChange}
					readOnly={readOnly}
					{...otherProps}
				/>
				{withEye && <div className={classes.eye} onClick={handleEyeClick}>{eyeVisible ? <HideIcon /> : <ShowIcon />}</div>}
			</div>
			{error && <p className={classes.errorText}>{error}</p>}
		</div>
	)
})
