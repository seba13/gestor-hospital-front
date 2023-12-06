import styles from './home.module.css';
import FormSchedule from '../../components/form-schedule/form-schedule';
import { useEffect } from 'react';
const Home = ({ id }) => {
	useEffect(() => {
		document.querySelector(`.${styles.title}`).classList.add(styles['fade-in']);
		return () => {
			document.querySelector(`.${styles.title}`).classList.remove(styles['fade-in']);
		};
	}, []);
	return (
		<div id={id} className={styles.home}>
			<h2 className={styles.title}>¡AGENDA TU PRÓXIMA HORA!</h2>

			<FormSchedule />
		</div>
	);
};

export default Home;
