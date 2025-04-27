import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CardItem from '../components/CardItem';
import hydraLogo from '../assets/pictures/hydra.png';
import HydraModal from '../components/HydraModal';

const Device = () => {
  const { id } = useParams<{ id: string }>();
  const [device, setDevice] = useState<any>(null);
  const [ports, setPorts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [aiResult, setAiResult] = useState<string>("AI analysis.");
  const [showModal, setShowModal] = useState(false);
  const [cves, setCves] = useState<any[]>([]);
  const [cveLoading, setCveLoading] = useState(true);

  const scanPorts = async () => {
    setLoading(true);
    try {
      const response = await fetch(`http://localhost:3000/api/devices/scan-ports/${id}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include'
      });
      if (!response.ok) throw new Error('Failed to scan ports');
      const data = await response.json();
      setPorts(data.data);
      setAiResult(data.ai_result)
    } catch (err) {
      console.error(err);
      setAiResult(String(err))
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/devices/get-device/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch device');
        const data = await response.json();
        setDevice(data)
        setCves(data.cve)
      } catch (err) {
        console.error(err);
      } finally {
        setCveLoading(false);
        setLoading(false);
      }
    };

    const fetchPorts = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/devices/get-ports/${id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
        });
        if (!response.ok) throw new Error('Failed to fetch ports');
        const data = await response.json();
        setPorts(data.data);
        setAiResult(data.ai_result)
      } catch (err) {
        console.log(err);
      }
    };

    fetchDevice();
    fetchPorts();
  }, [id]);

  return (
    <div className="container py-5 text-white cyberpunk-theme">
      <style>{`
        .device-header {
          font-size: 2.6rem;
          color: #00ff91;
          margin-bottom: 1rem;
          font-weight: bold;
          text-shadow: 0 0 6px #00ff91;
          font-family: 'Courier New', monospace;
        }

        .device-box {
          background-color: #0a0f2c;
          border: 2px solid #00ff91;
          border-radius: 14px;
          padding: 2rem;
          box-shadow: 0 0 20px #00ff91;
          font-family: 'Courier New', monospace;
          margin-bottom: 2rem;
        }

        .device-title {
          font-size: 1.8rem;
          color: #00ff91;
        }

        .device-text {
          font-size: 1.3rem;
          color: #ffffff;
          margin-bottom: 1rem;
        }

        .port-badge {
          display: inline-block;
          margin: 0.3rem;
          padding: 0.5rem 1.2rem;
          font-size: 1.2rem;
          border-radius: 8px;
          background-color: #111629;
          border: 1px solid #00ff91;
          color: #00ff91;
        }

        .btn-rescan-cyber {
          background-color: transparent;
          border: 2px solid #00ff91;
          color: #00ff91;
          font-size: 1rem;
          padding: 6px 14px;
          border-radius: 8px;
          font-family: 'Courier New', monospace;
          font-weight: bold;
          transition: 0.3s ease;
        }

        .btn-rescan-cyber:hover {
          background-color: #00ff91;
          color: #0a0f2c;
          box-shadow: 0 0 8px #00ff91;
        }

        .ai-review-section {
          background: linear-gradient(to bottom right, #0d112a, #1c1f3d);
          border: 3px solid #00ff91;
          border-radius: 16px;
          padding: 2rem;
          margin: 3rem 0;
          font-family: 'Courier New', monospace;
          color: #00ffea;
        }

        .ai-review-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #00ffd0;
        }

        .ai-content {
          font-size: 1.6rem;
          line-height: 2.4rem;
          white-space: pre-wrap;
        }

        .table-dark {
          background-color: #0a0f2c;
          color: #00ff91;
          border-radius: 10px;
          box-shadow: 0 0 12px rgba(0, 255, 145, 0.6);
          font-family: 'Courier New', monospace;
        }

        .table-dark th, .table-dark td {
          border: 1px solid #00ff91;
          padding: 12px;
          text-align: center;
        }

        .table-dark th {
          background-color: #0a0f2c;
          font-size: 1.6rem;
          color: #00ffd0;
        }

        .table-dark td {
          font-size: 1.4rem;
          background-color: #111629;
        }

        .table-dark tbody tr:hover {
          background-color: #151a3d;
          box-shadow: 0 0 10px #00ff91;
          transform: scale(1.02);
        }

        .table-dark td a {
          color: #00ff91;
          text-decoration: none;
        }

        .table-dark td a:hover {
          text-decoration: underline;
          color: #00ffd0;
        }

        .table-responsive {
          overflow-x: auto;
          max-width: 100%;
          margin-top: 20px;
        }

        .device-header {
          font-size: 2.6rem;
          color: #00ff91;
          margin-bottom: 1rem;
          font-weight: bold;
          text-shadow: 0 0 6px #00ff91;
          font-family: 'Courier New', monospace;
        }

        .ai-review-section {
          background: linear-gradient(to bottom right, #0d112a, #1c1f3d);
          border: 3px solid #00ff91;
          border-radius: 16px;
          padding: 2rem;
          margin: 3rem 0;
          font-family: 'Courier New', monospace;
          color: #00ffea;
        }

        .ai-review-title {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 1rem;
          color: #00ffd0;
        }

        .ai-content {
          font-size: 1.6rem;
          line-height: 2.4rem;
          white-space: pre-wrap;
        }
      `}</style>

      {/* Title above the box */}
      <h2 className="device-header">Device Details</h2>

      {/* Device Info Box */}
      <div className="device-box">
        <div style={{ textAlign: 'right' }}>
          <button className="btn-rescan-cyber" onClick={scanPorts}>🔁 Re-Scan</button>
        </div>

        {loading ? (
          <div className="text-muted">Loading device info...</div>
        ) : device ? (
          <div>
            <h5 className="device-title">{device.name || `Device #${id}`}</h5>
            <p className="device-text">MAC: {device.mac || 'Unknown'}</p>
            <p className="device-text">IP Address: {device.ip || 'N/A'}</p>
            <p className="device-text">
              Ports:
              {ports.length > 0 ? (
                ports.map((p, index) => (
                  <span key={index} className="port-badge">
                    {p.port} - {p.status}
                  </span>
                ))
              ) : (
                <span className="ms-2 text-warning">No ports found</span>
              )}
            </p>
          </div>
        ) : (
          <div className="text-danger">Device not found.</div>
        )}
      </div>

      {/* AI Review Section */}
      <div className="ai-review-section">
        <div className="ai-review-title">Security Review</div>
        <div className="ai-content">{aiResult}</div>
      </div>
      {ports.length > 0 && ports.some(p => [554, 80, 3306].includes(Number(p.port))) && (
        <div className="row justify-content-start mt-4">
          <CardItem
            imageSrc={hydraLogo}
            title="RTSP Port Number Found"
            text="Check for default or weak credentials using Hydra. We will be using port 554 or 80"
            buttonText={showModal ? "Hydra Scan Completed" : "Run Hydra Scan"}
            onClick={() => setShowModal(true)}
          />
        </div>
      )}
      {device?.ip && (
        <HydraModal
          ip={device.ip}
          isOpen={showModal}
          onClose={() => setShowModal(false)}
        />
      )}

      <div className="mt-5">
        <h2 className="device-header">Related CVEs</h2>
        <div className="device-box">
          {cveLoading ? (
            <div className="text-muted">Loading CVEs...</div>
          ) : cves?.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Title</th>
                    <th>Published</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  {cves.map((cve, idx) => (
                    <tr key={idx}>
                      <td>{cve.id}</td>
                      <td>{cve.title}</td>
                      <td>{new Date(cve.published).toLocaleDateString()}</td>
                      <td>{cve.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-warning">No recent CVEs found for this vendor.</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Device;
