import InputRut from '../input-rut/input-rut';
import styles from './step-data-patient.module.css';

const StepDataPatient = ({
	inputNamePatient,
	inputMotherLastName,
	inputFatherLastNamePatient,
	inputTelephonePatient,
	inputEmailPatient,
	inputRutPatient,
	updateData,
	handleChangeInput,
	handleBlurInput,
	handleFocusInput,
	rut,
	handleChangeInputRut,
	handleKeyDownInputRut,
	validateRut,
	errors,
}) => {
	console.log('componente step patient data');
	// const [validateStepForm, setValidateStepForm] = useState({
	// 	'name-patient': {
	// 		valid: false,
	// 		show: false,
	// 	},
	// 	'father-last-name': {
	// 		valid: false,
	// 		show: false,
	// 	},
	// 	'mother-last-name': {
	// 		valid: false,
	// 		show: false,
	// 	},
	// 	'telephone-patient': {
	// 		valid: false,
	// 		show: false,
	// 	},
	// 	'email-patient': {
	// 		valid: false,
	// 		show: false,
	// 	},
	// 	'rut-patient': {
	// 		valid: false,
	// 		show: false,
	// 	},
	// });

	// const validateField = e => {
	// 	const { value, name } = e.target;

	// 	if (name) {
	// 		const validate = {
	// 			'name-patient': value => {
	// 				return value.trim().length > 0 || false;
	// 			},
	// 			'father-last-name': value => {
	// 				return value.trim().length > 0 || false;
	// 			},
	// 			'mother-last-name': value => {
	// 				return value.trim().length > 0 || false;
	// 			},
	// 			'telephone-patient': value => {
	// 				return value.trim().length === 8 || false;
	// 			},
	// 			'email-patient': value => {
	// 				return value.trim().length > 0 || false; // validar email
	// 			},
	// 			'rut-patient': validateRut(value),
	// 		};

	// 		setValidateStepForm(prevData => ({
	// 			...prevData,
	// 			[e.target.name]: {
	// 				valid: validate[name](value),
	// 				show: !validate[name](value),
	// 			},
	// 		}));
	// 	}
	// };

	return (
		<div className={styles['form-step']}>
			<h2 className={styles.step__title}>Datos paciente</h2>

			<div className={styles.container__input}>
				<label className={`${styles['form-group']} ${styles.invalid}`}>
					<span className={styles['form-group__label-text']}>Nombre Paciente:</span>
					<input
						type='text'
						className={`${styles['input-text']} ${errors['name-patient'] ? styles.invalid : ''}`}
						placeholder='Jonh '
						autoComplete={'off'}
						name={'name-patient'}
						value={inputNamePatient}
						onChange={e => {
							updateData({ inputNamePatient: e.target.value });
							handleChangeInput(e);
						}}
						onFocus={handleFocusInput}
						onBlur={handleBlurInput}
					></input>

					{errors && errors['name-patient'] && (
						<span className={styles['error-message']}>{errors['name-patient']}</span>
					)}
				</label>

				<div className={`${styles['form-group--double']}`}>
					<label className={styles['form-group']}>
						<span className={styles['form-group__label-text']}>Apellido Paterno:</span>
						<input
							type='text'
							className={`${styles['input-text']} ${errors['father-last-name'] ? styles.invalid : ''}`}
							name='father-last-name'
							value={inputFatherLastNamePatient}
							placeholder='Doe'
							autoComplete={'off'}
							onChange={e => {
								updateData({ inputFatherLastNamePatient: e.target.value });
								handleChangeInput(e);
							}}
							onFocus={handleFocusInput}
							onBlur={handleBlurInput}
						></input>
						{errors && errors['father-last-name'] && (
							<span className={styles['error-message']}>{errors['father-last-name']}</span>
						)}
					</label>
					<label className={styles['form-group']}>
						<span className={styles['form-group__label-text']}>Apellido Materno:</span>
						<input
							type='text'
							name='mother-last-name'
							value={inputMotherLastName}
							className={`${styles['input-text']} ${errors['mother-last-name'] ? styles.invalid : ''}`}
							placeholder='Doe'
							autoComplete={'off'}
							onChange={e => {
								updateData({ inputMotherLastName: e.target.value });
								handleChangeInput(e);
							}}
							onFocus={handleFocusInput}
							onBlur={handleBlurInput}
						></input>
						{errors && errors['mother-last-name'] && (
							<span className={styles['error-message']}>{errors['mother-last-name']}</span>
						)}
					</label>
				</div>

				<div className={`${styles['form-group--double']}`}>
					<InputRut
						labelText={'Rut'}
						handleFocusInput={handleFocusInput}
						handleBlurInput={handleBlurInput}
						handleChangeInput={handleChangeInput}
						handleKeyDownInputRut={handleKeyDownInputRut}
						handleChangeInputRut={handleChangeInputRut}
						inputRutPatient={inputRutPatient}
						rut={rut}
						updateData={updateData}
						name='rut-patient'
						error={errors['rut-patient']}
					>
						{/* {errors && errors['rut-patient'] && (
							<span className={styles['error-message']}>{errors['rut-patient']}</span>
						)} */}
					</InputRut>
					<label className={styles['form-group']}>
						<span className={styles['form-group__label-text']}>Teléfono:</span>
						<div className={styles['form-group__telephone']}>
							<span>+56</span>
							<input
								type='tel'
								className={`${styles['input-text']} ${errors['telephone-patient'] ? styles.invalid : ''}`}
								placeholder='123456789'
								name='telephone-patient'
								value={inputTelephonePatient}
								autoComplete={'off'}
								maxLength={'9'}
								onChange={e => {
									e.target.value = e.target.value
										.split('')
										.filter(char => !isNaN(parseInt(char)))
										.join('');

									updateData({ inputTelephonePatient: e.target.value });
									handleChangeInput(e);
								}}
								onFocus={handleFocusInput}
								onBlur={handleBlurInput}
							></input>
						</div>
						{errors && errors['telephone-patient'] && (
							<span className={styles['error-message']}>{errors['telephone-patient']}</span>
						)}
					</label>
				</div>

				<label className={styles['form-group']}>
					<span className={styles['form-group__label-text']}>Correo Electrónico:</span>
					<input
						type='text'
						name='email-patient'
						value={inputEmailPatient}
						className={`${styles['input-text']} ${errors['email-patient'] ? styles.invalid : ''}`}
						placeholder='JonhDoe@gmail.com'
						autoComplete={'off'}
						onChange={e => {
							updateData({ inputEmailPatient: e.target.value });
							handleChangeInput(e);
						}}
						onFocus={handleFocusInput}
						onBlur={handleBlurInput}
					></input>
					{errors && errors['email-patient'] && (
						<span className={styles['error-message']}>{errors['email-patient']}</span>
					)}
				</label>
			</div>
		</div>
	);
};

export default StepDataPatient;
