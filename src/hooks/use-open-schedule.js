import { useState } from 'react';

const useOpenScheduleForm = () => {
	const [openStepForm, setOpenStepForm] = useState(false);
	const [selectOption, setSelectOption] = useState(false);

	const isSelectedOption = ({ id, setEndPoint: setEndPointEspecialidad }) => {
		if (id) {
			setSelectOption(true);

			setEndPointEspecialidad(
				`${import.meta.env.VITE_URL_API}/medicos/especialidad/${id}`
			);
		}
	};

	const onHandleClickschedule = e => {
		if (selectOption) {
			setOpenStepForm(true);
		}
	};

	const hideSchedule = () => {
		if (selectOption) {
			setOpenStepForm(false);
		}
	};

	return {
		isSelectedOption,
		hideSchedule,
		onHandleClickschedule,
		openStepForm,
		selectOption,
	};
};

export default useOpenScheduleForm;
