import styles from './loader.module.css';

import HeartBeat from '../svg/heart-beat-svg';

const Loader = () => {
	return (
		<div className={`${styles.spinner}`}>
			<span className={styles['span-svg']}>
				<HeartBeat></HeartBeat>
			</span>
		</div>
	);
};

export default Loader;
