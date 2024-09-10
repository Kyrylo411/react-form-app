import { Loader } from '../../shared/components/Loader/Loader';
import classes from './PageLoader.module.scss'
import clsx from 'clsx';

interface PageLoaderProps {
	className?: string;
}

export function PageLoader({ className }: PageLoaderProps) {
	return (
		<div className={clsx(classes.PageLoader, {}, [className])}>
			<Loader />
		</div>

	)
}
