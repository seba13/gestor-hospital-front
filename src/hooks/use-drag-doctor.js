import { useEffect, useState } from 'react';
import styles from '../components/doctor-specialty/doctor-specialty.module.css';

const useDragDoctor = () => {
	const [usePointerDrag, setPointerDrag] = useState(false);

	useEffect(() => {
		// eventos body
		const onPointerUpHandler = e => {
			document.querySelector(`.${styles['doctor-container']}`).classList.remove(styles.grabbing);

			setPointerDrag(false);
		};
		const onpointerLeaveHandler = e => {
			document.querySelector(`.${styles['doctor-container']}`).classList.add(styles.grabbing);
			setPointerDrag(false);
		};

		document.body.addEventListener('pointerleave', onpointerLeaveHandler);
		document.body.addEventListener('pointerup', onPointerUpHandler);

		// limpiando useEffect eventos
		return () => {
			document.body.removeEventListener('pointerleave', onpointerLeaveHandler);
			document.body.removeEventListener('pointerup', onPointerUpHandler);
		};
	});

	const onPointerDownHandler = e => {
		e.target.closest(`.${styles['doctor-container']}`).classList.add(styles.grabbing);
		setPointerDrag(true);
	};

	const onPointerMoveHandler = e => {
		e.preventDefault();
		if (usePointerDrag) {
			const doctorContainer = e.target.closest(`.${styles['doctor-container']}`);

			doctorContainer.scrollLeft -= e.movementX;
		}
	};

	const onPointerCancelHandler = e => {
		setPointerDrag(false);
	};

	return {
		onPointerDownHandler,
		onPointerMoveHandler,
		onPointerCancelHandler,
	};
};

export default useDragDoctor;
