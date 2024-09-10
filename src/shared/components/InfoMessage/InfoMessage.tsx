import clsx from 'clsx'
import classes from './InfoMessage.module.scss'

export enum MessageType {
	SUCCESS = 'success',
	ERROR = 'error'
}

interface Props {
	className?: string
	text: string
	type?: MessageType
}

function InfoMessage(props: Props) {
	const { className, text, type = MessageType.ERROR } = props
	return (
		<div className={clsx(classes.infoMessage, className)}>
			<p className={clsx(classes.text, { [classes.success]: type === MessageType.SUCCESS })}>{text}</p>
		</div>
	)
}

export default InfoMessage