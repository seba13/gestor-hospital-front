import { useEffect, useState } from 'react';
import { fetchData } from '../helpers/fetch-data';

const useForm = ({ initialData, initialErrors, validateForm }) => {
	const [form, setForm] = useState(initialData);
	const [errors, setErrors] = useState(initialErrors);
	const [loading, setLoading] = useState(false);
	const [responseFetch, setResponseFetch] = useState(undefined);
	const [buttonSubmitClick, setButtonSubmitClick] = useState(false);
	const handleChange = e => {
		const { name, value } = e.target || e;

		const error = validateForm[name](value);

		if (error) {
			setErrors(prevErrors => {
				return { ...prevErrors, ...error };
			});
		} else {
			setErrors(prevErrors => {
				return { ...prevErrors, [name]: null };
			});
		}
	};

	useEffect(() => {
		let error = null;
		for (const name in errors) {
			if (errors[name]) {
				error = true;
				break;
			}
		}

		if (buttonSubmitClick && !error) {
			const data = {
				rut: form.rut,
				dv: form.dv,
				idMedico: form.idSelectedDoctor,
				hora: form.selectedSchedule,
				fecha: form.selectedDate,
				email: form.inputEmailPatient,
				duracionCita: form.duracionCita,
				nombre: form.inputNamePatient,
				paterno: form.inputFatherLastNamePatient,
				materno: form.inputMotherLastName,
				telefono: form.inputTelephonePatient,
				diaSemana: form.dayOfWeek,
			};

			setLoading(true);
			fetchData()
				.post({
					endPoint: `${import.meta.env.VITE_URL_API}/citas/agendar`,
					data,
				})
				.then(response => {
					setLoading(false);

					console.log('aca respuesta');
					console.log(response);

					setResponseFetch(response.data);
					setButtonSubmitClick(false);
				});
		} else {
			setButtonSubmitClick(false);
		}
	}, [buttonSubmitClick, errors]);

	const handleBlur = e => {
		const { name, value } = e.target || e;

		const error = validateForm[name](value);

		setErrors(prevErrors => {
			return { ...prevErrors, ...error };
		});
	};

	const handleFocus = e => {
		const { name } = e.target || e;
		setErrors(prevErrors => {
			return { ...prevErrors, [name]: null };
		});
	};

	const handleSubmit = e => {
		for (const input of e.target.closest('form')) {
			if (input.type !== 'button' && input.type !== 'submit') {
				handleChange(input);
			}
		}

		setButtonSubmitClick(true);
	};

	useEffect(() => {
		console.log(errors);
	}, [errors]);

	// actualiza el contenido de los inputs del formulario
	const updateData = input => {
		setForm(prevForm => ({
			...prevForm,
			...input,
		}));
	};

	return {
		errors,
		handleChange,
		handleBlur,
		handleSubmit,
		updateData,
		handleFocus,
		form,
		loading,
		responseFetch,
	};
};

export default useForm;
