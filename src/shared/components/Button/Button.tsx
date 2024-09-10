import clsx from 'clsx'
import classes from './Button.module.scss'
import { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	className?: string;
	disabled?: boolean
	children: ReactNode
}

function Button(props: Props) {
	const {
		className,
		children,
		disabled,
		...otherProps
	} = props

	return (
		<button disabled={disabled} className={clsx(classes.button, className, { [classes.disabled]: disabled })} {...otherProps}>
			{children}
		</button>
	)
}

export default Button