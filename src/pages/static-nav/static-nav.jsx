import styles from './static-nav.module.css'

const StaticNav = ({ navItems }) => {
	return (
		<nav className={styles.nav}>

            <span>LOGO</span>
			<ul className={styles.nav__ul}>
				{navItems.map((navItem, index) => {
					return (
						<li key={index}>
							<a href={navItem.path}>{navItem.text}</a>
						</li>
					);
				})}
			</ul>
		</nav>
	);
};

export default StaticNav;
