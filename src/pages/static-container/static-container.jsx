import NavStatic from '../static-nav/static-nav';
import StaticSection from '../static-section/static-section';

import styles from './static-container.module.css';

const StaticContainer = () => {
	// useEffect(() => {
	// 	// document.querySelector(`.${styles['static-container']}`).classList.add(`${styles['fade-in-animation-medical']}`);
	// 	// document.querySelector(`.${styles['static-container__images']}`).classList.add(`${styles['fade-in']}`);
	// }, []);

	const navItems = [
		{
			text: 'INICIO',
			path: '#home',
		},
		{
			text: 'NOSOTROS',
			path: '#about',
		},
		{
			text: 'CONTACTO',
			path: '#contact',
		},
		{
			text: 'INICIAR SESIÓN',
			path: '#sign-in',
		},
	];

	return (
		<main className={`${styles['static-container']} ${styles['fade-in-animation-medical']}`}>
			<div className={`styles['static-container__images'] ${styles['fade-in']}`}>
				<div className={`${styles.virus} ${styles.virus__1}`}></div>
				<div className={`${styles.virus} ${styles['virus__d-1']}`}></div>
				<div className={`${styles.virus} ${styles['virus__d-2']}`}></div>
			</div>

			<NavStatic navItems={navItems}></NavStatic>

			<StaticSection></StaticSection>
		</main>
	);
};

export default StaticContainer;
