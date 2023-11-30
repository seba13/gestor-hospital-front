import NavStatic from '../static-nav/static-nav';
import StaticSection from '../static-section/static-section';

import styles from './static-container.module.css';

const StaticContainer = () => {
	const navItems = [
		{
			text: 'HOME',
			path: '#home',
		},
		{
			text: 'ABOUT',
			path: '#about',
		},
		{
			text: 'CONTACT',
			path: '#contact',
		},
		{
			text: 'SIGN IN',
			path: '#sign-in',
		},
	];

	return (
		<main className={`${styles['static-container']}`}>
			<div className={styles['static-container__images']}>
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
