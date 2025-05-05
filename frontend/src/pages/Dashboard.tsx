import arpscanLogo from "../assets/pictures/arpscan1.png";
import bluetoothLogo from "../assets/pictures/bluetooth1.png";
import lightbulbLogo from "../assets/pictures/lightbulb.png";
import zigbeeLogo from "../assets/pictures/zigbee1.png";
import zwaveLogo from "../assets/pictures/z-wave1.png";
import CardItem from "../components/CardItem";
import { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, ResponsiveContainer } from 'recharts';
import { apiBase } from "../types";

type Props = {
	setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
};
const Dashboard = ({ setAlertMessage }: Props) => {
	const [wifiScans, setWifiScans] = useState(0);
	const [bluetoothScans, setBluetoothScans] = useState(0);
	const [zwaveScans, setZwaveScans] = useState(0);
	const [zigbeeScans, setZigbeeScans] = useState(0);

	const [totalBluetoothDevices, setTotalBluetoothDevices] = useState(0);
	const [totalWifiDevices, setTotalWifiDevices] = useState(0);
	const [totalZwaveDevices, setTotalZwaveDevices] = useState(0);
	const [totalZigbeeDevices, setTotalZigbeeDevices] = useState(0);

	useEffect(() => {
		const fetchStats = async () => {
			try {
				const response = await fetch(`${apiBase}/api/devices/get-stats`, {
					method: 'GET',
					headers: { 'Content-Type': 'application/json' },
					credentials: 'include'
				});
				if (!response.ok) {
					throw new Error("Couldn't fetch data.")
				};
				const result = await response.json();
				const data = result.data;

				setWifiScans(data.wifi_scans);
				setBluetoothScans(data.bluetooth_scans);
				setZwaveScans(data.zwave_scans);
				setZigbeeScans(data.zigbee_scans);

				setTotalBluetoothDevices(data.total_bluetooth_devices);
				setTotalWifiDevices(data.total_wifi_devices);
				setTotalZwaveDevices(data.total_zwave_devices);
				setTotalZigbeeDevices(data.total_zigbee_devices);
			} catch (err) {
				setAlertMessage(String(err))
				console.error("Failed to load scan stats:", err);
			}
		};
		fetchStats();
	}, []);

	const statsData = [
		{ name: 'Wi-Fi', scans: wifiScans, devices: totalWifiDevices },
		{ name: 'Bluetooth', scans: bluetoothScans, devices: totalBluetoothDevices },
		{ name: 'Z-Wave', scans: zwaveScans, devices: totalZwaveDevices },
		{ name: 'Zigbee', scans: zigbeeScans, devices: totalZigbeeDevices }
	];

	return (
		<div className="container mt-5 text-center cyberpunk-theme">
			<div className="row g-4">
				<CardItem
					imageSrc={arpscanLogo}
					buttonLink="/scan_devices"
					buttonText="Start Device Scan"
					title="Device Scanning"
					text="Scan your local network for connected devices, including IP and MAC addresses."
				/>
				<CardItem
					imageSrc={bluetoothLogo}
					buttonLink="/scan_bluetooth"
					buttonText="Scan Bluetooth Devices"
					title="Bluetooth Devices"
					text="Scan for nearby Bluetooth devices in your area."
				/>
				<CardItem
					imageSrc={lightbulbLogo}
					buttonLink="/scan_lightbulbs"
					buttonText="Scan Light Bulbs"
					title="Smart Light Bulbs"
					text="Scan Magic Home, Surp Life, and flux_led light bulbs for vulnerabilities."
				/>
				<CardItem
					imageSrc={zigbeeLogo}
					buttonLink="/scan_zigbee"
					buttonText="Scan Zigbee Devices"
					title="Zigbee Devices"
					text="Detect Zigbee-enabled devices in your network for analysis."
				/>
				<CardItem
					imageSrc={zwaveLogo}
					buttonLink="/scan_zwave"
					buttonText="Scan Z-Wave Devices"
					title="Z-Wave Devices"
					text="Discover Z-Wave devices and analyze their security."
				/>
			</div>

			{/* Stats Chart */}
			<div className="mt-5">
				<h3 className="text-warning mb-4">📊 Scan Statistics</h3>
				<div className="d-flex justify-content-center">
					<div style={{ width: '90%', height: 450, backgroundColor: '#0e1629', padding: '20px', borderRadius: '20px', boxShadow: '0 0 25px #00ffe0' }}>
						<ResponsiveContainer width="100%" height="100%">
							<BarChart
								data={statsData}
								margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
							>
								<CartesianGrid strokeDasharray="3 3" stroke="#1a1a2e" />
								<XAxis dataKey="name" stroke="#00ffe0" />
								<YAxis stroke="#00ffe0" />
								<Tooltip contentStyle={{ backgroundColor: '#1f0033', borderColor: '#00ffe0', color: '#ffffff' }} />
								<Legend wrapperStyle={{ color: '#00ffe0' }} />
								<Bar
									dataKey="scans"
									fill="#00ffe0"
									radius={[10, 10, 0, 0]}
									animationDuration={1500}
									animationEasing="ease-out"
								/>
								<Bar
									dataKey="devices"
									fill="#ff00ff"
									radius={[10, 10, 0, 0]}
									animationDuration={2000}
									animationEasing="ease-out"
								/>
							</BarChart>
						</ResponsiveContainer>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Dashboard;
