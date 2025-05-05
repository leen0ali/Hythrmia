import React, { useState } from 'react';
import '../styles/hacker.css'; // 👾 Cyberpunk style

import { apiBase } from '../types';

const BluetoothDevice: React.FC = () => {
	const [scanning, setScanning] = useState(false);
	const [results, setResults] = useState<any[]>([]);

	const handleScanClick = async () => {
		try {
			setScanning(true);
			const response = await fetch(`${apiBase}/api/devices/scan-bluetooth-devices`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include'
			});
			if (!response.ok) {
				throw new Error("Couldn't scan bluetooth devices");
			}
			const fetchedDevices = await response.json();
			setResults(fetchedDevices.devices)
		} catch (error) {
			console.log(error)
		} finally {
			setScanning(false);
		}

	};

	return (
		<div className="container mt-5 text-center cyberpunk-theme">
			<style>{`
        .scan-box {
          background: rgba(0, 0, 0, 0.8);
          border: 4px solid #00ff88; 
          border-radius: 16px;
          color: #00ff88; 
          padding: 2.5rem;
          max-width: 1000px;
          margin: 0 auto;
          font-family: 'Courier New', monospace;
        }

        .scan-button {
          background-color: #ffffff;
          border: none;
          color: #000;
          font-weight: bold;
          font-size: 1.6rem;
          padding: 1rem 2rem;
          border-radius: 6px;
          cursor: pointer;
          transition: 0.3s;
          margin-top: 1rem;
        }

        .scan-button:hover {
          background-color: #00ff88;
          color: #000;
        }

        .scan-results-box {
          margin-top: 2rem;
          background: rgba(0, 0, 30, 0.6);
          border: 2px dashed #00ff88; 
          padding: 2rem;
          border-radius: 8px;
          text-align: left;
          font-size: 1.5rem;
          min-height: 200px;
          color: #00ff88; 
        }

        .intro-text {
          font-size: 1.3rem;
          color: #8fffbd; 
          margin-bottom: 1.5rem;
        }
      `}</style>

			<div className="scan-box">
				<h2 className="mb-4" style={{ fontSize: '2.2rem' }}>Bluetooth Device Scanner</h2>
				<p className="intro-text">
					Bluetooth is a short-range wireless communication technology used in countless modern devices such as speakers, smartwatches, and IoT tools. This scanner detects active Bluetooth signals in your vicinity to help monitor and manage your smart environment.
				</p>

				<button onClick={handleScanClick} className="scan-button">
					{scanning ? 'Scanning...' : 'Start Scan'}
				</button>

				<div className="scan-results-box">
					{results.length > 0 ? (
						<ul>
							{results.map((device, index) => (
								<li key={index}>{device.address} - {device.name}</li>
							))}
						</ul>
					) : (
						<p style={{ fontSize: '1.4rem' }}>
							{scanning ? 'Scanning for devices...' : 'Results will be shown here.'}
						</p>
					)}
				</div>
			</div>
		</div>
	);
};

export default BluetoothDevice;
