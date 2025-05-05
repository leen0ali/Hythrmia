import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import lightbulbImage from "../assets/pictures/lightbulbc.png";  // Import the image
import { apiBase } from '../types';

interface ScanResult {
	ip: string;
	id: string;
}

const ScanLightBulbs: React.FC = () => {
	const navigate = useNavigate()
	const [results, setResults] = useState<ScanResult[]>([]);
	const [loading, setLoading] = useState(false);
	const [status, setStatus] = useState<string>("No scan results yet.")

	const handleScanClick = async () => {
		setLoading(true);
		try {
			const response = await fetch(`${apiBase}/api/zengge/scan-devices`, {
				method: 'GET',
				credentials: 'include',
				headers: { 'Content-Type': 'application/json' }
			})
			if (!response.ok) throw new Error("Couldn't scan devices");
			const fetchedDevices = await response.json();
			setStatus(fetchedDevices.status)
			setResults(fetchedDevices.data)
		} catch (error) {
			console.log(error)
		} finally {
			setLoading(false)
		}
	};

	return (
		<div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={styles.container}>
			<div className="p-5 shadow-lg border rounded-4 w-100" style={styles.card}>
				<div className="d-flex justify-content-center mb-4">
					{/* Display the lightbulb image as the logo */}
					<img src={lightbulbImage} alt="Logo" className="logo" style={styles.icon} />
				</div>
				<h1 className="text-center mb-5" style={styles.neonText}>💡 Light Bulb SIP Scanner</h1>

				<div className="p-5 mt-3" style={styles.scanArea}>
					{results.length > 0 ? (
						<ul className="list-unstyled">
							{results.map((item, idx) => (
								<li
									key={idx}
									onClick={() => navigate(`/bulbdevice/${item.ip}`)}
									className="cyberpunk-item"
									style={styles.cyberpunkItem}
								>
									{item.ip} - {item.id}
								</li>
							))}
						</ul>
					) : (
						<p className="text-center" style={styles.statusText}>{status}</p>
					)}
				</div>

				<div className="d-flex justify-content-center mt-5">
					<button
						onClick={handleScanClick}
						disabled={loading}
						className="btn"
						style={styles.scanButton}
					>
						{loading ? 'Scanning...' : 'Scan Devices'}
					</button>
				</div>
			</div>
		</div>
	);
};

const styles = {
	container: {
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		minHeight: '100vh',
		background: 'linear-gradient(135deg,rgb(19, 38, 57),rgb(27, 30, 126))',  // Dark blue to purple gradient
		backgroundSize: 'cover',
	},
	card: {
		backgroundColor: '#121212',
		border: '4px solid #00ffcc',
		color: '#00ffcc',
		borderRadius: '12px',
		boxShadow: '0 0 20px rgba(0, 255, 204, 0.6)',
		maxWidth: '1200px',
		transition: 'all 0.3s ease-in-out'
	},
	icon: {
		width: '150px',
		height: '150px',
		animation: 'glow 1.5s ease-in-out infinite alternate',
	},
	neonText: {
		fontFamily: 'Courier New, monospace',
		fontSize: '2.8rem',
		color: '#00ffcc',
		textShadow: '0 0 10px #00ffcc, 0 0 20px #00ffcc, 0 0 30px #00ffcc'
	},
	scanArea: {
		backgroundColor: '#0e1629',  // Dark background for the scan area
		border: '3px dashed #00ffcc',
		borderRadius: '16px',
		minHeight: '300px'
	},
	cyberpunkItem: {
		backgroundColor: '#151a3d', // Slightly darker for the list items
		borderRadius: '14px',
		padding: '1.2rem 1.5rem',
		marginBottom: '1rem',
		cursor: 'pointer',
		fontWeight: 'bold',
		letterSpacing: '0.5px',
		opacity: 0.98,
		transition: '0.3s',
		color: '#00ffcc',
		hover: {
			backgroundColor: '#00ffcc', // Highlight the item when hovered
			color: '#121212',
		}
	},
	statusText: {
		fontSize: '1.5rem',
		color: '#00ffcc'
	},
	scanButton: {
		backgroundColor: '#00ffcc',
		borderRadius: '14px',
		fontSize: '1.6rem',
		padding: '15px 30px',
		fontWeight: 'bold',
		color: '#121212',
		transition: 'all 0.3s',
		cursor: 'pointer',
		hover: {
			backgroundColor: '#a78bfa', // Slightly change button color when hovered
			boxShadow: '0 0 30px #c084fc',
			transform: 'scale(1.03)',
		}
	}
};

export default ScanLightBulbs;
