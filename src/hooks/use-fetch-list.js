import { useState, useEffect } from 'react';

import fetchData from '../helpers/fetch-data';

const useFetchList = endPointDefault => {
	const [data, setData] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [endPoint, setEndPoint] = useState(endPointDefault);

	// const fetchData = () => {
	// 	console.log('entra en fetch!!!');
	// 	console.log({ endPoint });
	// };

	useEffect(() => {
		if (endPoint && endPoint !== '')
			fetchData(endPoint).then(res => {
				console.log(res);

				setData(res.data);
				setIsLoading(res.isLoading);
			});
	}, [endPoint]);

	const changeEndPoint = endPointParam => {
		setEndPoint(endPointParam);
	};

	return {
		data,
		changeEndPoint,
		isLoading,
	};
};

export default useFetchList;
