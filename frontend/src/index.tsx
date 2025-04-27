import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css'; // This imports the global styles for the entire application

const rootElement = document.getElementById('root');
if (rootElement) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(<App />);
}
