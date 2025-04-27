import React from 'react';
import '../styles/hacker.css';  // Assuming you have this CSS file
import smartDeviceIcon from '../assets/pictures/smartdevicescanner.png';
import securityIcon from '../assets/pictures/security.png';
import hydraIcon from '../assets/pictures/hydra2.png';
import deviceResultIcon from '../assets/pictures/deviceresult.png';
import rescanIcon from '../assets/pictures/rescan.png';
import aiIcon from '../assets/pictures/AI.png';
import bluetoothIcon from '../assets/pictures/bluetooth2.png';
import zigbeeIcon from '../assets/pictures/zigbee1.png';
import scannerIcon from '../assets/pictures/scanner.png';

const Features: React.FC = () => {
  return (
    <div
      className="container"
      style={{
        padding: '3rem',
        fontFamily: 'Orbitron, sans-serif',
        // No background color added, keeping it clean
      }}
    >
      <h1 style={{
        fontSize: '4rem',
        color: '#00aaff',  // Light blue color for the title
        borderBottom: '3px solid #00ffe7',
        marginBottom: '2.5rem',
        textAlign: 'center',
        textShadow: '0 0 10px #00aaff',  // Neon light blue shadow effect
      }}>
        ⚙️ Hythrmia Core Features
      </h1>

      {/* Core Features Cards */}
      <div className="feature-cards-container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
        {[
          {
            img: smartDeviceIcon,
            title: 'Smart Device Scanner',
            desc: 'Detects all connected smart devices over WiFi, Bluetooth, and Z-Wave. Displays IP, MAC, vendor, and protocol data instantly, helping you manage your network with ease.'
          },
          {
            img: securityIcon,
            title: 'Security Assistant',
            desc: 'AI-powered scanning using GPT or Ollama to detect misconfigurations, unsafe setups, and unusual behavior. Offers real-time suggestions to improve your security.'
          },
          {
            img: rescanIcon,
            title: 'Rescan Feature',
            desc: 'Re-scans the network, detects new devices, refreshes ports, and shows open ports for detected devices. Continuously keeps your device list up-to-date and ensures vulnerabilities are flagged in real-time.'
          },
          {
            img: hydraIcon,
            title: 'Weak Password Detection (Hydra)',
            desc: 'Uses Hydra to test weak or default credentials on open services like RTSP, Telnet, and HTTP for devices like cameras and panels. Helps secure vulnerable services from brute-force attacks.'
          },
          {
            img: deviceResultIcon,
            title: 'Device Dashboard',
            desc: 'Each scanned device is displayed with complete metadata in a glowing cyberpunk grid card format. View and manage devices with ease, ensuring full visibility of your network.'
          },
          {
            img: aiIcon,
            title: 'Configurable AI Engine',
            desc: 'Settings page allows switching between GPT/Ollama, managing local API keys, and enabling security prompt logic. Customize the AI to suit your network’s security needs.'
          },
          {
            img: bluetoothIcon,
            title: 'Bluetooth Scan Tool',
            desc: 'Detects Bluetooth-based smart devices such as wearables, locks, and headphones within physical proximity. Ensures Bluetooth devices are secure and monitored.'
          }
        ].map((item, index) => (
          <div key={index} className="feature-card" style={{
            padding: '2rem',
            boxShadow: '0 10px 30px rgba(0, 255, 231, 0.2)',
            color: '#fff',
            transition: 'transform 0.3s ease, box-shadow 0.3s ease',
            borderRadius: '12px',  // Rounded corners for the cards
            background: '#2c3e50',  // Dark grey bluish background for the cards
          }}>
            <img src={item.img} alt={item.title} style={{ width: '80px', height: 'auto', marginBottom: '1rem' }} />
            <h2 style={{ fontSize: '2rem', color: '#ffffff', marginBottom: '1rem' }}>{item.title}</h2>
            <p style={{ fontSize: '1.4rem', color: '#ffffff', lineHeight: '1.8rem' }}>{item.desc}</p>
          </div>
        ))}
      </div>

      {/* Upcoming Features */}
      <h2 style={{
        marginTop: '4rem',
        fontSize: '2.5rem',
        color: '#ff00ff',
        borderTop: '2px dashed #ff00ff',
        paddingTop: '1.5rem',
        textAlign: 'center',
        textShadow: '0 0 10px #ff00ff',
      }}>
        🛠️ What’s Coming Next
      </h2>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '3rem', gap: '2rem' }}>
        <img src={zigbeeIcon} alt="Zigbee Scanner" style={{ width: '120px', borderRadius: '12px' }} />
        <div>
          <h3 style={{ fontSize: '2rem', color: '#00ffcc', marginBottom: '0.5rem' }}>Zigbee Security Scanner</h3>
          <p style={{ fontSize: '1.5rem', color: '#d3d3d3' }}>
            The upcoming Zigbee Security Scanner will be able to scan Zigbee smart locks, sensors, and bulbs. It will detect default keys, insecure device joins, and vulnerable firmware.
          </p>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', marginTop: '3rem', gap: '2rem' }}>
        <img src={scannerIcon} alt="Advanced Scanner" style={{ width: '120px', borderRadius: '12px' }} />
        <div>
          <h3 style={{ fontSize: '2rem', color: '#00ffcc', marginBottom: '0.5rem' }}>Advanced Threat Analyzer</h3>
          <p style={{ fontSize: '1.5rem', color: '#d3d3d3' }}>
            This advanced feature will provide behavioral analysis, traffic anomaly detection, and threat pattern recognition using local or AI-trained models.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;
