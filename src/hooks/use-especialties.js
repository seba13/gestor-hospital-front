import { useEffect, useState } from 'react';
import { fetchData } from '../helpers/fetch-data';

const useEspecialties = () => {
	const [specialties, setSpecialties] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		fetchData()
			.get({ endPoint: `${import.meta.env.VITE_URL_API}/medicos/especialidades` })
			.then(res => {
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
