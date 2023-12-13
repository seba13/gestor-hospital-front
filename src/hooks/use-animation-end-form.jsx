import { useEffect, useState } from 'react';
import styles from '../components/step-form/step-form.module.css';

const useAnimationEndAppointments = hideSchedule => {
	const [animationEndContainer, setAnimationEndContainer] = useState(false);
	const [animationEndWrapper, setAnimationEndWrapper] = useState(false);

	const animationEndCb = e => {
		if (e.animationName === `${styles['fade-out-bg']}`) setAnimationEndWrapper(true);

		if (e.animationName === `${styles['fade-out-bg']}`) setAnimationEndContainer(true);
	};
	const handleSaveschedule = e => {
		e.preventDefault();
		closeSchedule(e);
	};

	useEffect(() => {
		const wrapper = document.querySelector(`.${styles['wrapper-date-schedule']}`);

		wrapper.classList.add(`${styles['fade-in-bg']}`);

		const container = document.querySelector(`.${styles['date-schedule-container']}`);

		container.classList.add(`${styles['fade-in']}`);

		wrapper.addEventListener('animationend', animationEndCb);

		// container.addEventListener('animationend', animationEndCb);

		// document.querySelector(`.${styles['wrapper-date-schedule']}`).classList.add(`${styles['fade-in-bg']}`);
		// document.querySelector(`.${styles['date-schedule-container']}`).classList.add(`${styles['fade-in']}`);

		return () => {
			// e.target.removeEventListener('animationend', animationEndCb);

			wrapper.classList.remove(`${styles['fade-in-bg']}`);
			container.classList.remove(`${styles['fade-in']}`);

			wrapper.classList.remove(`${styles['fade-out-bg']}`);
			container.classList.remove(`${styles['fade-out']}`);

			wrapper.removeEventListener('animationend', animationEndCb);
		};
	}, []);

	useEffect(() => {
		if (animationEndWrapper && animationEndContainer) hideSchedule();
	}, [animationEndContainer, animationEndWrapper]);

	const handleCancelSchedule = e => {
		closeSchedule(e);
	};

	const closeSchedule = e => {
		const wrapperContainer = e.target.closest(`.${styles['wrapper-date-schedule']}`);
		const container = e.target.closest(`.${styles['date-schedule-container']}`);

		wrapperContainer.classList.add(styles['fade-out-bg']);
		container.classList.add(`${styles['fade-out']}`);
	};

	return {
		handleSaveschedule,
		handleCancelSchedule,
		animationEndWrapper,
		animationEndContainer,
	};
};

export default useAnimationEndAppointments;
