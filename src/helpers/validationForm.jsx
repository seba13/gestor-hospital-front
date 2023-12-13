const useValidation = inputs => {
	console.log(inputs);

	return inputs.every(input => {
		return input.value !== undefined;
	});
};

export default useValidation;
