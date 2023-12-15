const useValidation = inputs => {
	console.log(inputs);

	const emptyValue = inputs.findIndex((input, index) => {
		return input.value === undefined;
	});

	return emptyValue;
};

export default useValidation;
