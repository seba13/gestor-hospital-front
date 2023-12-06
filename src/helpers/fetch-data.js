const fetchData = endPoint => {
	console.log('fetchData');
	console.log({ endPoint });
	return fetch(endPoint)
		.then(result => result.json())
		.then(json => {
			return {
				data: json,
				isLoading: false,
			};
		})
		.catch(err => {
			console.log(err);
			console.log('cambiar por endpoint real');

			let data = [];

			if (endPoint.includes('/fechas/cita')) {
				data = {
					horas_doctor: [
						{
							hora_inicio: '14:30',
							hora_fin: '16:00',
						},

						{
							hora_inicio: '10:30',
							hora_fin: '13:00',
						},
						{
							hora_inicio: '09:30',
							hora_fin: '10:00',
						},
					],
					duracion_descanso: 5,
					duracion_cita: 40,
					citas: [
						{
							id_cita: 1,
							hora_inicio_cita: '09:30',
							hora_fin_cita: '09:55',
						},
						{
							id_cita: 2,
							hora_inicio_cita: '11:30',
							hora_fin_cita: '12:00',
						},
						{
							id_cita: 3,
							hora_inicio_cita: '12:30',
							hora_fin_cita: '13:00',
						},
					],
				};
			} else if (endPoint.includes('/fechas')) {
				data = [
					{ data: '12/01/23', id: '1' },
					{ data: '13/01/23', id: '2' },
					{ data: '14/01/23', id: '3' },
					{ data: '15/01/23', id: '4' },
					{ data: '16/01/23', id: '5' },
					{ data: '17/01/23', id: '6' },
					{ data: '18/01/23', id: '7' },
				];
			} else if (endPoint.includes('/medicos/especialidad')) {
				data = [
					{
						nombre: 'Alejandro',
						apellido: 'García',
						especialidad: 'Cardiologist',
						id: 1,
						img: 'https://img.freepik.com/free-photo/general-practitioner-with-stethoscope-shoulders-holding-digital-tab-looking-camera_1098-19297.jpg?w=740&t=st=1701811193~exp=1701811793~hmac=6568cf3a5e4a5862aaf1373b062d4f0558956323aba7ae41e96328e1f446a752',
					},
					{
						nombre: 'Javier',
						apellido: 'Rodríguez',
						especialidad: 'Cardiologist',
						id: 2,
						img: 'https://img.freepik.com/premium-photo/medicine-profession-technology-people-concept-happy-male-doctor-with-clipboard-medical-office_380164-94738.jpg?w=740',
					},
					{
						nombre: 'Sergio ',
						apellido: 'Morales',
						especialidad: 'Cardiologist',
						id: 3,
						img: 'https://img.freepik.com/free-photo/doctor-with-his-arms-crossed-white-background_1368-5789.jpg?w=826&t=st=1701811156~exp=1701811756~hmac=7c6648ec580d2eb58736be228b05763c3bc0433a78bb05abfd7c180a3b6d7332',
					},
					{
						nombre: 'Manuel',
						apellido: 'Cruz',
						especialidad: 'Cardiologist',
						id: 4,
						img: 'https://img.freepik.com/free-photo/attractive-young-male-nutriologist-lab-coat-smiling-against-white-background_662251-2960.jpg?w=996&t=st=1701461281~exp=1701461881~hmac=641d39869aaacd0ef4fba9842ab989ef66d7592102fb466ffbc8d2d351512029',
					},
					{
						nombre: 'Claudia ',
						apellido: 'Vargas',
						especialidad: 'Cardiologist',
						id: 5,
						img: 'https://img.freepik.com/free-psd/doctor-preparing-routine-medical-check_23-2150493277.jpg?w=740&t=st=1701811822~exp=1701812422~hmac=9be2200f2c05eba0f52573714f9264209a9f1448dd4390d68b1d1cc06f0472e8',
					},
				];
			}
			return {
				data,
				isLoading: false,
			};
		});
};

export default fetchData;
