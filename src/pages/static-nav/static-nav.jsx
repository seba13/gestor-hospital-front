import { useEffect, useState } from 'react';
import TelephoneSVG from '../../components/svg/telephone-svg';
import styles from './static-nav.module.css';

const StaticNav = ({ navItems }) => {
	const [isMobile, setIsMobile] = useState(window.innerWidth <= 640);
	const [showNav, setShowNav] = useState(false);
	useEffect(() => {
		const checkSize = e => {
			setIsMobile(window.innerWidth <= 640);
		};

		window.addEventListener('resize', checkSize);

		return () => {
			window.removeEventListener('resize', checkSize);
		};
	});

	const handleNavStatic = e => {
		setShowNav(showNavState => !showNavState);
	};

	return (
		<nav className={styles.nav}>
			<span className={styles.nav__logo}>
				<a className={styles.logo} href='/'></a>
			</span>

			{isMobile && (
				<span
					className={`${styles.nav__hamburger}  ${showNav ? styles['nav__hamburger--active'] : ''}`}
					onClick={handleNavStatic}
				>
					<span></span>
					<span></span>
					<span></span>
				</span>
			)}

			<ul className={styles.nav__ul}>
				{navItems.map((navItem, index) => {
					return (
						<li key={index}>
							<a href={navItem.path}>{navItem.text}</a>
						</li>
					);
				})}
			</ul>
			<span className={styles['nav__container-tel']}>
				<span className={styles['nav__tel-svg']}>
					<TelephoneSVG width={32} height={32} stroke={'#fff'}></TelephoneSVG>
				</span>
				<span className={styles.nav__tel}>
					<a href='tel:+569123456'>+569123456</a>
				</span>
			</span>
		</nav>
	);
};

export default StaticNav;
