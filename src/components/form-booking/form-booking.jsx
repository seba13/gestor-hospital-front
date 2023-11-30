import DropDownSVG from '../../components/svg/drop-down-svg.jsx';
import DateSVG from '../../components/svg/calendar-svg.jsx';
import IdSVG from '../../components/svg/id-svg.jsx';
import styles from './form-booking.module.css';
import ListSpecialty from '../list-specialty/list-specialty.jsx';

const FormBooking = () => {
	return (
		<form className={styles['booking-form']}>
			<label className={styles['form-group']}>
				<span className={styles['span-svg']}>
					<IdSVG width={32} height={32} fill={'#fff'}></IdSVG>
				</span>
				<input
					type='text'
					placeholder='11.111.111-1'
					className={styles['input-text']}
				></input>
			</label>
			<ListSpecialty></ListSpecialty>
			<div className={`${styles['form-group']}  ${styles['form-group__date']}`}>
				<span className={styles['span-svg']}>
					<DateSVG width={22} height={22} stroke={'#fff'} />
				</span>
				<span className={styles['span-text']}>Date</span>
				<span className={styles['span-svg']}>
					<DropDownSVG width={16} height={16} fill={'#fff'} />
				</span>
			</div>
			<div
				className={`${styles['form-group']}  ${styles['form-group__submit']}`}
			>
				<input
					type='submit'
					className={styles['booking-form__submit']}
					value={'CONFIRM'}
				></input>
			</div>
		</form>
	);
};

export default FormBooking;
