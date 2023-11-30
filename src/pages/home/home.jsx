import styles from './home.module.css';
import FormBooking from '../../components/form-booking/form-booking';
const Home = ({ id }) => {
	return (
		<div id={id} className={styles.home}>
			<h2 className={styles.title}>Schedule your appointment!</h2>

			<FormBooking />
		</div>
	);
};

export default Home;
