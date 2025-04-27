import { BrowserRouter as Router } from "react-router-dom";

import NavBar from "./components/Navbar.tsx"
import AppRoutes from "./routes/routes.tsx"
import './styles/hacker.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { User } from "./types.tsx";
import { useState, useEffect } from "react";
import Footer from "./components/Footer.tsx";
import PopupAlert from './components/Alerts';

const App = () => {
	const [user, setUser] = useState<User | null>(null);
	const [alertMessage, setAlertMessage] = useState<string>('');
	useEffect(() => {
		const storedUser = localStorage.getItem("username");
		if (storedUser) {
			setUser({ user: storedUser });
		}
	}, []);
	return (
		<Router>
			<NavBar user={user} setUser={setUser} />
			<div className="d-flex flex-column min-vh-100">
				{alertMessage && (
					<PopupAlert message={alertMessage} onClose={() => setAlertMessage('')} />
				)}
				<AppRoutes setUser={setUser} setAlertMessage={setAlertMessage} />
				<Footer />
			</div>
		</Router>
	);
};

export default App;
