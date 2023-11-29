import Home from '../home/home';
import About from '../about/about';
import Contact from '../contact/contact';
import SignIn from '../sign-in/sign-in';
import styles from './static-section.module.css';
import { useEffect } from 'react';
const StaticSection = () => {
	useEffect(() => {
		const handleScroll = e => {
			const section = document.querySelector(
				`section.${styles['static-section']}`
			);

			const pag = {
				home: 0,
				about: 1,
				contact: 2,
				'sign-in': 3,
			};

			if (e.deltaY > 0) {
				section.scrollTo({
					left: document.documentElement.clientWidth * (pag[e.target.id] + 1),
				});
			} else {
				if (e.deltaY < 0) {
					section.scrollTo({
						left: document.documentElement.clientWidth * (pag[e.target.id] - 1),
					});
				}
			}
		};

		document
			.querySelector(`section.${styles['static-section']}`)
			.addEventListener('wheel', handleScroll);

		return () => {
			document
				.querySelector()
				.querySelector(`section.${styles['static-section']}`)
				.removeEventListener('wheel', handleScroll);
		};
	});

	return (
		<section className={`${styles['static-section']}`}>
			<Home id={'home'}></Home>
			<About id={'about'}></About>
			<Contact id={'contact'}></Contact>
			<SignIn id={'sign-in'}></SignIn>
		</section>
	);
};

export default StaticSection;
