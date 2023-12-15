import { useEffect, useRef } from 'react';
import styles from './error-message.module.css';

const ErrorMessage = ({ IconSVG, message, animationEndError, updateRefError }) => {
	const refError = useRef();

	useEffect(() => {
		updateRefError(refError.current);
	}, []);

	return (
		<span className={styles.error} onAnimationEnd={animationEndError} ref={refError}>
			{IconSVG && (
				<span className={styles.span__svg}>
					<IconSVG></IconSVG>
				</span>
			)}
			{message}
		</span>
	);
};

export default ErrorMessage;
