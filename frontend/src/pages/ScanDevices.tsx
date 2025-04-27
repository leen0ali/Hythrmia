import React, { useState, useEffect } from "react";
import Item from "../components/Item";
import { useNavigate } from 'react-router-dom';
import '../styles/hacker.css';

const ScanDevices: React.FC = () => {
  const [devices, setDevices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isScanned, setIsScanned] = useState<boolean>(false);
  const [aiAnalysis, setAiAnalysis] = useState<string>('');
  const [rangeScan, setRangeScan] = useState(false);
  const [fromIP, setFromIP] = useState('');
  const [toIP, setToIP] = useState('');
  const navigate = useNavigate();

  const handleDelete = async () => {
    setDevices([]);
    setAiAnalysis('');
    try {
      const response = await fetch('http://localhost:3000/api/devices/delete-devices', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (!response.ok) throw new Error("Couldn't delete devices");
      const fetchedDevices = await response.json();
      setDevices(fetchedDevices.devices);
      setIsScanned(true);
    } catch (error) {
      console.error("Error deleting devices:", error);
    }
    setIsScanned(false);
  };

  const handleScan = async () => {
    setLoading(true);
    try {
      const payload = rangeScan
        ? { specific: true, f: fromIP, t: toIP }
        : {};

      const response = await fetch('http://localhost:3000/api/devices/scan-devices', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(payload)
      });
      if (!response.ok) throw new Error("Couldn't scan devices");
      const fetchedDevices = await response.json();
      setDevices(fetchedDevices.devices);
      setAiAnalysis(fetchedDevices.devices[0].ai_result || "No AI analysis available")
      setIsScanned(true);
    } catch (error) {
      console.error("Error scanning or analyzing devices:", error);
      setAiAnalysis("Failed to retrieve AI insights.");
    }
    setLoading(false);
  };

  useEffect(() => {
    const fetchDevices = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:3000/api/devices/get-devices', {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        if (!response.ok) throw new Error("Couldn't get devices");
        const fetchedDevices = await response.json();
        setDevices(fetchedDevices.devices);
        setAiAnalysis(fetchedDevices.devices[0].ai_result || "No AI analysis available")
        setIsScanned(true);
      } catch (error) {
        console.error("Error fetching devices:", error);
      }
      setLoading(false);
    };

    fetchDevices();
  }, []);

  return (
    <div className="container mt-5 cyberpunk-theme">
      <style>{`
        .card {
          background: linear-gradient(to right, #0a0d2a, #151a3d);
          border: 4px solid #00ff91;
          border-radius: 16px;
          color: #00ff91;
          font-family: 'Courier New', monospace;
          max-width: 1300px; /* Wider container */
          margin: 0 auto; /* Center the card */
        }

        .btn-dark, .btn-danger, .btn-light {
          font-family: 'Courier New', monospace;
          font-size: 1.6rem;
          font-weight: bold;
          padding: 1rem;
          border-radius: 10px;
        }

        .btn-danger {
          background-color: transparent;
          border: 2px solid #00ff91;
          color: #00ff91;
        }

        .btn-light {
          background-color: rgb(26, 104, 68);
          border: 2px solid rgb(38, 56, 48);
          color: #0a0d2a;
        }

        .info-text {
          font-size: 1.3rem;
          color: #7fffd4;
          margin-bottom: 20px;
        }

        h2, p, li {
          font-size: 2rem;
        }

        .hover-jump {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          width: 100%;
          max-width: 700px;
        }

        .hover-jump:hover {
          transform: scale(1.04);
          box-shadow: 0 0 12px #00ff91;
        }

        .box-result {
          background-color: rgba(10, 15, 40, 0.95);
          border: 2px dashed #00ff91;
          color: #00ff91;
          font-size: 1.6rem;
          border-radius: 10px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          width: 100%; /* Full width */
        }

        .ai-panel {
          background: linear-gradient(to bottom right, #0a0d2a, #151a3d);
          border: 3px solid #00ff91;
          border-radius: 16px;
          padding: 20px;
          color: #00ff91;
          font-family: 'Courier New', monospace;
          height: 100%;
        }

        .ai-header {
          font-size: 2.2rem;
          color: #00ffd0;
          margin-bottom: 1rem;
        }

        .ai-info-text {
          font-size: 1.4rem;
          margin-bottom: 1.2rem;
          color: #7fffd4;
        }

        .ai-analysis-box {
          background-color: rgba(0, 0, 0, 0.3);
          border: 2px dashed #00ff91;
          padding: 1.5rem;
          border-radius: 12px;
          font-size: 1.6rem;
          line-height: 2.4rem;
          white-space: pre-wrap;
          overflow-y: auto;
          max-height: 500px;
        }

        .form-check-input:checked {
          background-color: #00ff91;
          border-color: #00ff91;
        }

        .form-control {
          background-color: #151a3d;
          color: #00ff91;
          border: 2px solid #00ff91;
          font-family: 'Courier New', monospace;
        }

        /* Custom Styles for Toggle Switch */
        .form-check-input {
          width: 50px; /* Decrease width */
          height: 25px; /* Decrease height */
          transform: scale(1.2); /* Make the toggle smaller */
        }

        .form-check-label {
          font-size: 1.5rem; /* Adjust label font size */
          margin-left: 10px; /* Slight margin for better alignment */
        }

        /* Align toggle and label in one line */
        .form-check {
          display: flex;
          align-items: center;
        }

        /* Adjusted Scan Button */
        .scan-button-container {
          display: flex;
          justify-content: center;  /* Center horizontally */
          margin-bottom: 20px;
          width: 100%;
        }

        .scan-button {
          width: 90%;  /* Set to match the width of Delete Device button */
        }
      `}</style>

      <div className="row justify-content-center">
        <div className="col-lg-12"> {/* Make the column full width */}
          <div className="card shadow-lg p-5 text-center">
            <div className="mb-4">
              <div className="form-check form-switch d-flex align-items-center gap-3 mb-2 justify-content-center">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="rangeScanSwitch"
                  checked={rangeScan}
                  onChange={(e) => setRangeScan(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="rangeScanSwitch">
                  Enable IP Range Scan
                </label>
              </div>

              {rangeScan && (
                <div className="d-flex justify-content-center gap-3">
                  <input
                    type="text"
                    placeholder="From IP (e.g. 192.168.1.1)"
                    className="form-control w-50"
                    value={fromIP}
                    onChange={(e) => setFromIP(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="To IP (e.g. 192.168.1.254)"
                    className="form-control w-50"
                    value={toIP}
                    onChange={(e) => setToIP(e.target.value)}
                  />
                </div>
              )}
            </div>

            <h2 className="mb-3">Local Network Device Scanner</h2>
            <p className="info-text">
              This tool scans your local network and identifies connected devices. Click scan to view results and AI-powered insights.
            </p>

            {/* Scan Button Positioned to be Same Width as Delete Device List Button */}
            <div className="scan-button-container">
              <button
                className="btn btn-light scan-button"
                onClick={handleScan}
                disabled={loading}
              >
                {loading ? "Scanning..." : "Scan Devices"}
              </button>
            </div>

            <div className="row">
              {/* Left: AI Analysis Panel */}
              <div className="col-md-4 mb-4">
                <div className="ai-panel">
                  <h3 className="ai-header"> Security Review </h3>
                  <p className="ai-info-text">
                    Review findings based on scanned data.1
                  </p>
                  <div className="ai-analysis-box">
                    {aiAnalysis ? aiAnalysis : "Scan devices to see AI insights."}
                  </div>
                </div>
              </div>

              {/* Right: Scanned Devices */}
              <div className="col-md-8">
                <div className="box-result p-4 mb-3">
                  {loading ? (
                    <div>Scanning in progress...</div>
                  ) : (
                    <div>
                      {isScanned ? (
                        devices.length ? (
                          devices.map((device, index) => (
                            <div className="hover-jump mb-3" key={index}>
                              <Item
                                header={device.name}
                                title={device.mac}
                                text={device.ip}
                                id={device.id}
                                buttonAction={() => navigate(`/device/${device.id}`)}
                              />
                            </div>
                          ))
                        ) : (
                          <p>No devices found</p>
                        )
                      ) : (
                        <p>No scan results yet.</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Delete Button Under Device List */}
                {isScanned && (
                  <button
                    className="btn btn-danger w-100"
                    onClick={handleDelete}
                    disabled={loading}
                  >
                    Delete Device List
                  </button>
                )}
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ScanDevices;
