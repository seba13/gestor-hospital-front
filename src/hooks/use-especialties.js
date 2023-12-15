import { useEffect, useState } from 'react';
import { fetchData } from '../helpers/fetch-data';

const useEspecialties = () => {
	const [specialties, setSpecialties] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchData(`${import.meta.env.VITE_DOMINIO}:${import.meta.env.VITE_APP_PORT}/medicos/especialidades`).then(res => {
			setSpecialties(res.data);
			setIsLoading(res.isLoading);
		});
	}, []);

	return {
		specialties,
		isLoading,
	};
};

export default useEspecialties;