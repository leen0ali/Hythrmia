import { useState } from 'react';

const ZWaveScanPage = () => {
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Function to handle scanning Z-Wave devices
  const scanZWaveDevices = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/zwave/scan', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const data = await response.json();
        setDevices(data.devices);  // Assuming the backend sends back devices in 'devices' field
      } else {
        throw new Error('Failed to fetch devices');
      }
    } catch (err) {
      setError('Error scanning Z-Wave devices: ' + err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="zwave-scan-container">
      <h1>Z-Wave Device Scanner</h1>
      <p>Click the button below to scan for Z-Wave devices connected to your network.</p>

      <button onClick={scanZWaveDevices} disabled={loading}>
        {loading ? 'Scanning...' : 'Scan for Z-Wave Devices'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <div className="devices-list">
        {devices.length > 0 ? (
          <ul>
            {devices.map((device: any, index: number) => (
              <li key={index}>
                <h3>Device Name: {device.name}</h3>
                <p>Device ID: {device.id}</p>
                <p>Security: {device.security ? 'Secure' : 'Insecure'}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No devices found or scan hasn't run yet.</p>
        )}
      </div>
    </div>
  );
};

export default ZWaveScanPage;