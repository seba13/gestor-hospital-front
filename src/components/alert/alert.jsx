import CloseSVG from '../svg/close-svg';
import styles from './alert.module.css';
import SuccessSVG from '../svg/succes-svg';
import ErrorSVG from '../svg/error-svg';
const Alert = ({ children, title = 'modal', response, responseFetch, cerrarAlert }) => {
	return (
		<div className={`${styles.alert}`}>
			<span className={styles['span-svg']} onClick={cerrarAlert}>
				<CloseSVG fill={'#000'}></CloseSVG>
			</span>

			<h2 className={`${styles.title}`}>{title}</h2>

			{responseFetch.response ? (
				<span className={`${styles['span-succes']} `}>
					<SuccessSVG></SuccessSVG>
				</span>
			) : (
				<span className={`${styles['span-error']} `}>
					<ErrorSVG></ErrorSVG>
				</span>
			)}
			<p className={`${styles.message}`}>{responseFetch.message}</p>
		</div>
	);
};

export default Alert;
