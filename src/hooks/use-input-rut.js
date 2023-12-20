import { useState } from 'react';

const useInputRut = () => {
	const [rut, setRut] = useState('');
	// const [validRut, setValidRut] = useState(false)

	const handleKeyDownInputRut = e => {
		console.log(e.key);
		console.log(e.ctrlKey);

		if (
			e.key === 'Backspace' ||
			e.key === 'Delete' ||
			e.key === 'Control' ||
			e.key === 'Alt' ||
			e.key === 'Meta' ||
			e.key === 'Tab' ||
			e.key === 'ArrowLeft' ||
			e.key === 'ArrowRight' ||
			(e.ctrlKey && e.key === 'c') ||
			(e.ctrlKey && e.key === 'x') ||
			(e.ctrlKey && e.key === 'v') ||
			(e.metaKey && e.key === 'c') ||
			(e.metaKey && e.key === 'x') ||
			(e.metaKey && e.key === 'v')
		)
			return;

		if (
			e.target.value.length >= 8 &&
			!e.target.value.toLowerCase().includes('k') &&
			(e.key.toLowerCase() === 'k' || e.keyCode === 75)
		)
			return;

		if (isNaN(e.key) || e.key === ' ') {
			e.preventDefault();
		}

		e.target.value = e.target.value.replaceAll(' ', '');
	};

	const validateRut = value => {
		if (value.trim().length < 1) {
			console.log('Rut requerido');
			return 'Rut requerido';
		}

		if (value.trim().length < 8) {
			console.log('Rut inválido');
			return 'Rut inválido';
		}

		const arrDigitos = value.replaceAll('.', '').split('-');

		const digitos = arrDigitos[0];
		const dv = arrDigitos[1];

		if (!dv || isNaN(parseInt(digitos))) {
			console.log('Rut inválido');
			return 'Rut inválido';
		}

		const digitosReverse = digitos.split('').reverse();
		let sumDigitos = 0;
		let factor = 2;

		for (let i = 0; i < digitosReverse.length; i++) {
			if (factor > 7) factor = 2;

			sumDigitos += digitosReverse[i] * factor;
			factor++;
		}

		const cociente = parseInt(sumDigitos / 11);
		const diferencia = Math.abs(sumDigitos - cociente * 11);

		let digitoVerificador = 11 - diferencia;

		if (digitoVerificador === 11) digitoVerificador = 0;
		if (digitoVerificador === 10) digitoVerificador = 'k';

		if (String(digitoVerificador) !== dv) {
			console.log('Rut inválido');
			return 'Rut inválido';
		}
	};

	const handleChangeInputRut = e => {
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

		// if (updateData) {
		// 	console.log('aca');
		// 	updateData({ inputRutPatient: value });
		// }
	};

	return {
		rut,
		handleKeyDownInputRut,
		handleChangeInputRut,
		validateRut,
	};
};

export { useInputRut };
