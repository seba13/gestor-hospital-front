import { useState } from 'react';

const useAlert = () => {
	const [abierto, setAbierto] = useState(false);

	const cerrarAlert = () => {
		setAbierto(false);
	};
	const abrirAlert = () => {
		setAbierto(true);
	};

	return {
		abierto,
		cerrarAlert,
		abrirAlert,
	};
};

export default useAlert;
