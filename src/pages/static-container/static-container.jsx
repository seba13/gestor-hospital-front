import NavStatic from '../static-nav/static-nav';
import StaticSection from '../static-section/static-section';

import styles from './static-container.module.css';

const StaticContainer = () => {
	const navItems = [
		{
			text: 'Home',
			path: '#home',
		},
		{
			text: 'About',
			path: '#about',
		},
		{
			text: 'Contact',
			path: '#contact',
		},
		{
			text: 'Sign In',
			path: '#sign-in',
		},
	];

	return (
		<main className={`${styles['static-container']}`}>
			<NavStatic navItems={navItems}></NavStatic>

			<StaticSection></StaticSection>
		</main>
	);
};

export default StaticContainer;
