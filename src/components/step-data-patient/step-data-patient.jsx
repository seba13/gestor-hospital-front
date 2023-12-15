import InputRut from '../input-rut/input-rut';
import styles from './step-data-patient.module.css';

const StepDataPatient = ({inputNamePatient, inputSurnamePatient, inputLastNamePatient, rutPatient, }) => {
	console.log('compoentne step patiend data');

	return (
		<div className={styles['form-step']}>
			<h2 className={styles.step__title}>Datos paciente</h2>

			<div className={styles.container__input}>
				<label className={styles['form-group']}>
					<span className={styles['form-group__label-text']}>Nombre Paciente:</span>
					<input
						type='text'
						className={styles['input-text']}
						placeholder='Jonh '
						autoComplete={'off'}
					></input>
				</label>

				<label className={styles['form-group']}>
					<span className={styles['form-group__label-text']}>Apellido Paterno:</span>
					<input
						type='text'
						className={styles['input-text']}
						placeholder='Doe'
						autoComplete={'off'}
					></input>
				</label>

				<label className={styles['form-group']}>
					<span className={styles['form-group__label-text']}>Apellido Materno:</span>
					<input
						type='text'
						className={styles['input-text']}
						placeholder='Doe'
						autoComplete={'off'}
					></input>
				</label>

				<InputRut labelText={'Rut'}></InputRut>

				<label className={styles['form-group']}>
					<span className={styles['form-group__label-text']}>Correo Electrónico:</span>
					<input
						type='text'
						className={styles['input-text']}
						placeholder='JonhDoe@gmail.com'
						autoComplete={'off'}
					></input>
				</label>

				<label className={styles['form-group']}>
					<span className={styles['form-group__label-text']}>Telefono:</span>
					<input
						type='text'
						className={styles['input-text']}
						placeholder='+56 912345678'
						name='telefono'
						autoComplete={'off'}
					></input>
				</label>
			</div>
		</div>
	);
};

export default StepDataPatient;
