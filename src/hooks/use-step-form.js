import { useState } from 'react';

const UseStepForm = steps => {
	const [currentStepIndex, setCurrentStepIndex] = useState(0);
	


	const next = () => {
		setCurrentStepIndex(i => {
			if (i >= steps.length - 1) return i;

			return i + 1;
		});
	};

	const back = () => {
		setCurrentStepIndex(i => {
			if (i <= 0) return i;
			return i - 1;
		});
	};

	const goTo = index => {
		setCurrentStepIndex(index);
	};

	return {
		isLastStep: currentStepIndex === steps.length - 1,
		isFirstStep: currentStepIndex === 0,
		currentStepIndex,
		step: steps[currentStepIndex],
		next,
		back,
		goTo,
	};
};

export default UseStepForm;
