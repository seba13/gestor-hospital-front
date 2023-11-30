import StaticContainer from './pages/static-container/static-container';
import { Routes, Route } from 'react-router-dom';


const App = () => {
	
	return (
		<>
			<Routes>
				<Route path='/' element={<StaticContainer></StaticContainer>}></Route>;
			</Routes>
		</>
	);
};

export default App;
