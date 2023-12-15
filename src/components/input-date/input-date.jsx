import styles from './input-date.module.css';
import ArrowLeftSVG from '../svg/arrow-left';
import ArrowRight from '../svg/arrow-right';
import CloseSVG from '../svg/close-svg';
import { useEffect, useRef } from 'react';
import useInputDate from '../../hooks/use-input-date';

const InputDate = ({
	handleClickButtonClose,
	animationEndInputDate,
	closeInputDate,
	idSelectedDate,
	selectedMonth,
	selectedYear,
	updateData,
	diasLaboralesMedico,
	selectDate,
	setButtonClass,
}) => {
	const refInputDate = useRef();

	const { calendario, mesAnterior, mesSiguiente, anio, mes, fechaActual, diasSemana } = useInputDate({
		diasLaboralesMedico,
		selectedYear,
		selectedMonth,
	});

	console.log('render');

	console.log({ calendario, anio, mes });

	useEffect(() => {
		const animationEnd = e => {
			if (e.animationName === `${styles['fade-out']}`) {
				refInputDate.current.removeEventListener('animationend', animationEnd);

				animationEndInputDate(true);
			}
		};

		refInputDate.current.addEventListener('animationend', animationEnd);

		return () => {
			refInputDate.current?.removeEventListener('animationend', animationEnd);
		};
	}, []);

	const ocultarBotonAnterior = () => {
		return mes <= fechaActual.getMonth() && anio <= fechaActual.getFullYear();
	};

	return (
		<div className={`${styles.container} ${(closeInputDate || '') && styles['fade-out']}`} ref={refInputDate}>
			<div className={`${styles.container__header}`}>
				<div className={`${styles.pagination}`}>
					<span
						className={`${styles['span-svg']}  ${(ocultarBotonAnterior() || '') && styles.hidden}     `}
						onClick={mesAnterior}
					>
						<ArrowLeftSVG></ArrowLeftSVG>
					</span>
					<h2 className={styles.title__calendario}>
						<span className={styles.title__span}>{calendario && calendario.mes}</span>{' '}
						<span>{calendario && calendario.anio}</span>
					</h2>
					<span className={`${styles['span-svg']}`} onClick={mesSiguiente}>
						<ArrowRight></ArrowRight>
					</span>

					<span className={`${styles['span-svg']} ${styles['span-svg__close']}`} onClick={handleClickButtonClose}>
						<CloseSVG></CloseSVG>
					</span>
				</div>
			</div>
			<div className={`${styles.container__body}`}>
				<ul className={`${styles.container__weeks}`}>
					{diasSemana &&
						diasSemana.map(dia => {
							return <li key={dia}>{dia}</li>;
						})}
				</ul>

				<ul className={`${styles.container__days}`}>
					{calendario &&
						calendario.dias &&
						calendario.dias.map(data => {
							return (
								<li key={data.id}>
									<input
										type='radio'
										name='day'
										disabled={!data.diaLaboral}
										value={data.dia}
										id={data.id}
										onChange={() => {
											updateData({ selectedYear: calendario.anio });
											updateData({ selectedMonth: calendario.numMes });
											updateData({ selectedDay: data.dia });
											updateData({ selectedDate: data.fecha });
											updateData({ idSelectedDate: data.id });
											updateData({ dayOfWeek: data.diaSemana });

											selectDate({ fechaCitas: data.fecha, idDia: data.diaSemana });

											setButtonClass();
										}}
										checked={idSelectedDate === data.id}
									></input>
									<label htmlFor={data.id} className={`${(!data.diaLaboral || '') && styles.days__inactive}`}>
										{data.dia}
									</label>
								</li>
							);
						})}

					{/* <li>
						<input type='radio' name='day' id={1} />
						<label htmlFor='1'>1</label>
					</li>
					<li>
						<input type='radio' name='day' id={2} disabled />
						<label htmlFor='2' className={`${styles.days__inactive}`}>
							2
						</label>
					</li>
					<li>
						<input type='radio' name='day' id={3} />
						<label htmlFor='3'>3</label>
					</li>
					<li>
						<input type='radio' name='day' id={4} />
						<label htmlFor='4'>4</label>
					</li>
					<li>
						<input type='radio' name='day' id={5} />
						<label htmlFor='5'>5</label>
					</li>
					<li>
						<input type='radio' name='day' id={6} />
						<label htmlFor='6'>6</label>
					</li>
					<li>
						<input type='radio' name='day' id={7} />
						<label htmlFor='7'>7</label>
					</li>
					<li>
						<input type='radio' name='day' id={8} />
						<label htmlFor='8'>8</label>
					</li>
					<li>
						<input type='radio' name='day' id={9} />
						<label htmlFor='9'>9</label>
					</li>
					<li>
						<input type='radio' name='day' id={10} />
						<label htmlFor='10'>10</label>
					</li>
					<li>
						<input type='radio' name='day' id={11} />
						<label htmlFor='11'>11</label>
					</li>
					<li>
						<input type='radio' name='day' id={12} />
						<label htmlFor='12'>12</label>
					</li>
					<li>
						<input type='radio' name='day' id={13} />
						<label htmlFor='13'>13</label>
					</li>
					<li>
						<input type='radio' name='day' id={14} />
						<label htmlFor='14'>14</label>
					</li>
					<li>
						<input type='radio' name='day' id={15} />
						<label htmlFor='15'>15</label>
					</li>
					<li>
						<input type='radio' name='day' id={16} />
						<label htmlFor='16'>16</label>
					</li>
					<li>
						<input type='radio' name='day' id={17} />
						<label htmlFor='17'>17</label>
					</li>
					<li>
						<input type='radio' name='day' id={18} />
						<label htmlFor='18'>18</label>
					</li>
					<li>
						<input type='radio' name='day' id={19} />
						<label htmlFor='19'>19</label>
					</li>
					<li>
						<input type='radio' name='day' id={20} />
						<label htmlFor='20'>20</label>
					</li>
					<li>
						<input type='radio' name='day' id={21} />
						<label htmlFor='21'>21</label>
					</li>
					<li>
						<input type='radio' name='day' id={22} />
						<label htmlFor='22'>22</label>
					</li>
					<li>
						<input type='radio' name='day' id={23} />
						<label htmlFor='23'>23</label>
					</li>
					<li>
						<input type='radio' name='day' id={24} />
						<label htmlFor='24'>24</label>
					</li>
					<li>
						<input type='radio' name='day' id={25} />
						<label htmlFor='25'>25</label>
					</li>
					<li>
						<input type='radio' name='day' id={26} />
						<label htmlFor='26'>26</label>
					</li>
					<li>
						<input type='radio' name='day' id={27} />
						<label htmlFor='27'>27</label>
					</li>
					<li>
						<input type='radio' name='day' id={28} />
						<label htmlFor='28'>28</label>
					</li>
					<li>
						<input type='radio' name='day' id={29} />
						<label htmlFor='29'>29</label>
					</li>
					<li>
						<input type='radio' name='day' id={30} />
						<label htmlFor='30'>30</label>
					</li> */}
				</ul>
			</div>
		</div>
	);
};

export default InputDate;
