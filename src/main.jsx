import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './app.jsx';
import './styles/index.css';

const rootEl = document.getElementById('root');

const root = createRoot(rootEl);

root.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>
);
