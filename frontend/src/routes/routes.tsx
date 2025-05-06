import { Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import SignUp from "../pages/SignUp";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import ScanDevices from "../pages/ScanDevices";
import { User } from "../types";
import Device from "../pages/Device";
import BluetoothDevice from "../pages/BluetoothDevice";
import BulbDevices from "../pages/bulbdevices";
import ScanLightBulbs from "../pages/ScanLightBulbs";
import SettingsPage from "../pages/settings";
import About from "../pages/about";
import Features from "../pages/features";
import ZWaveScanPage from '../pages/ZWaveScanPage'; // Correct relative path


type AppRoutesProps = {
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
};

const AppRoutes = ({ setUser, setAlertMessage }: AppRoutesProps) => {
	return (
		<Routes>
			<Route path="/" element={<Home />} />
			<Route path="/signup" element={<SignUp setAlertMessage={setAlertMessage} />} />
			<Route path="/login" element={<Login setUser={setUser} setAlertMessage={setAlertMessage} />} />
			<Route path="/dashboard" element={<Dashboard setAlertMessage={setAlertMessage} />} />
			<Route path="/scan_devices" element={<ScanDevices />} />
			<Route path="/device/:id" element={<Device />} />
			<Route path="/scan_bluetooth" element={<BluetoothDevice />} />
			<Route path="/Bulbdevice/:ip" element={<BulbDevices />} />
			<Route path="/scan_lightbulbs" element={<ScanLightBulbs />} />
			<Route path="/settings" element={<SettingsPage />} />
			<Route path="/about" element={<About />} />
			<Route path="/features" element={<Features />} />
			<Route path="/zwavepage" element={<ZWaveScanPage />} /> {/* Updated Route */}
		</Routes>
	);
};

export default AppRoutes;

