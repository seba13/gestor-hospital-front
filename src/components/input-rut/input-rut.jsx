import { useState } from 'react';
import styles from './input-rut.module.css';
// import IdSVG from '../svg/id-svg';

const InputRut = ({ labelText }) => {
	const [useRut, setRut] = useState('');

	const handleKeyDown = e => {
		if (e.key === 'Backspace' || e.key === 'Delete' || e.key === 'Control' || e.key === 'Alt' || e.key === 'Meta' || e.key === 'Tab')
			return;

		if (
			e.target.value.length >= 8 &&
			!e.target.value.toLowerCase().includes('k') &&
			(e.key.toLowerCase() === 'k' || e.keyCode === 75)
		)
			return;

		if (isNaN(e.key)) {
			e.preventDefault();
		}

		e.target.value = e.target.value.replaceAll(' ', '');
	};

	const handleChangeInput = e => {
		let value = e.target.value.replaceAll('.', '').replaceAll('-', '');

		// dispositivos moviles Verifica si existen caracteres distintos de un numero o 'k'
		// solo permite un caracter 'k'

		const caracteres = value
			.split('')
			.reduce((acc, curr, currIndex) => {
				if (curr.toLowerCase() === 'k' && currIndex >= 7) {
					if (acc.every(caracter => caracter.toLowerCase() !== 'k')) {
						acc.push(curr.toLowerCase());
					}
					return acc;
				}

				if (isNaN(curr)) {
					return acc;
				}

				acc.push(curr.toLowerCase());
				return acc;
			}, [])
			.join([]);

		value = caracteres;

		if (value.length > 10) return;

		if (value.length === 2) {
			value = value.slice(0, 1) + '-' + value.slice(1, 2);
		} else if (value.length === 3) {
			value = value.slice(0, 2) + '-' + value.slice(2, 3);
		} else if (value.length === 4) {
			value = value.slice(0, 3) + '-' + value.slice(3, 4);
		} else if (value.length === 5) {
			value = value.slice(0, 1) + '.' + value.slice(1, 4) + '-' + value.slice(4, 5);
		} else if (value.length === 6) {
			value = value.slice(0, 2) + '.' + value.slice(2, 5) + '-' + value.slice(5, 6);
		} else if (value.length === 7) {
			value = value.slice(0, 3) + '.' + value.slice(3, 6) + '-' + value.slice(6, 7);
		} else if (value.length === 8) {
			value = value.slice(0, 1) + '.' + value.slice(1, 4) + '.' + value.slice(4, 7) + '-' + value.slice(7, 8);
		} else if (value.length === 9) {
			value = value.slice(0, 2) + '.' + value.slice(2, 5) + '.' + value.slice(5, 8) + '-' + value.slice(8, 9);
		} else if (value.length === 10) {
			value = value.slice(0, 3) + '.' + value.slice(3, 6) + '.' + value.slice(6, 9) + '-' + value.slice(9, 10);
		}

		if (value.toLowerCase().includes('k') && value[value.length - 1].toLowerCase() !== 'k') {
			value = value.replace('k', '');
		}

		setRut(value);
	};

	return (
		<label className={styles['form-group']}>
			{labelText ? <span className={styles['form-group__label-text']}>{labelText}:</span> : ''}
			{/* <span className={`${styles['span-svg']} ${styles['span-svg__id-card']} `}>
				<IdSVG fill={'#fff'}></IdSVG>
			</span> */}
			<input
				type='text'
				maxLength={13}
				placeholder='11.111.111-1'
				className={styles['input-text']}
				value={useRut}
				onKeyDown={handleKeyDown}
				onChange={handleChangeInput}
			></input>
		</label>
	);
};

export default InputRut;
