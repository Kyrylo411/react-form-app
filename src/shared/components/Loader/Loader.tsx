import clsx from 'clsx';
import './Loader.scss'

interface LoaderProps {
	className?: string;
}

export function Loader({ className }: LoaderProps) {
	return (
		<div className={clsx('lds-default', {}, [className])}>
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
			<div />
		</div>
	)
}
