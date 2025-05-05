import { useState, useEffect } from 'react';
import { apiBase } from '../types';

const HydraModal = ({ ip, isOpen, onClose }: { ip: string; isOpen: boolean; onClose: () => void }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [protocol, setProtocol] = useState('rtsp');
  const [channel, setChannel] = useState('');
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState('');
  const [hasFetched, setHasFetched] = useState(false);
  const [systemInfo, setSystemInfo] = useState<any>(null); // To store system info

  const handleSnapshot = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBase}/api/dahua/snapshot`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: username,
          password: password,
          channel: channel,
          ip: ip,
        }),
      });

      const result = await response.json();
      console.log(result);
      if (!response.ok) throw new Error(result.error || "Unknown error");
      const imageUrl = `${apiBase}/api/dahua/get-image`;
      setImgUrl(`${imageUrl}?ts=${Date.now()}`);
    } catch (err: any) {
      console.log(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBase}/api/devices/hydra-scan`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: username,
          protocol: protocol,
          ip: ip,
        }),
      });

      const result = await response.json();
      console.log(result);
      if (!response.ok) throw new Error(result.error || "Unknown error");
      setOutput(result.data || "Scan complete");
    } catch (err: any) {
      setOutput(`Error: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleSystemInfo = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${apiBase}/api/dahua/get-system-info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          username: username,
          password: password,
          ip: ip,
        }),
      });

      const result = await response.json();
      if (!response.ok) throw new Error(result.error || "Unknown error");
      setSystemInfo(result);
    } catch (err: any) {
      setSystemInfo({ error: `Error: ${err.message}` });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (hasFetched) return;
    if (!password || !username || !ip) return;

    const fetchImage = async () => {
      try {
        const imageUrl = `${apiBase}/api/dahua/get-image`;
        setImgUrl(`${imageUrl}?ts=${Date.now()}`);
        setHasFetched(true);
      } catch (err: any) {
        console.error("Fetch image error:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [password, username, ip, hasFetched]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <style>
        {`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(10, 10, 25, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 2000;
          }

          .modal-box {
            background: #092045;
            border: 2px solid #00ffff;
            border-radius: 8px;
            padding: 2rem;
            color: white;
            width: 80%;
            max-width: 1000px;
            font-family: 'Courier New', monospace;
            position: relative;
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;
          }

          .modal-title {
            font-size: 1.8rem;
            margin-bottom: 1rem;
            color: #00ffff;
            width: 100%;
          }

          .modal-left, .modal-right {
            width: 48%;
          }

          .modal-label {
            display: block;
            margin-top: 1rem;
          }

          .modal-input {
            width: 100%;
            padding: 0.5rem;
            background: #0b2b4f;
            color: white;
            border: 1px solid #00ffff;
            border-radius: 4px;
            margin-top: 0.3rem;
          }

          .modal-ip-row {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-top: 1rem;
          }

          .modal-button {
            padding: 6px 12px;
            background: #00ffff;
            color: #0a0f2c;
            border: none;
            border-radius: 4px;
            font-weight: bold;
            width: 100%;
            margin-top: 1rem;
          }

          .modal-output-box {
            margin-top: 1.5rem;
            padding: 1rem;
            background: #003344;
            border: 1px dashed #00ffff;
            color: #00ffee;
            min-height: 80px;
            font-size: 1rem;
          }

          .modal-close {
            position: absolute;
            top: 0.5rem;
            right: 0.7rem;
            background: transparent;
            color: #00ffff;
            font-size: 1.2rem;
            border: none;
            cursor: pointer;
          }

          .scrollable-content {
            max-height: 400px;
            overflow-y: auto;
            margin-top: 1rem;
          }

          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 1rem;
          }

          table, th, td {
            border: 1px solid #00ffff;
          }

          th, td {
            padding: 8px;
            text-align: left;
          }

          th {
            background-color: #003344;
            color: #00ffff;
          }

          td {
            background-color: #0b2b4f;
            color: white;
          }
        `}
      </style>
      <div className="modal-box">
        <h2 className="modal-title">Hydra</h2>

        <div className="modal-left">
          <label className="modal-label">Please enter username</label>
          <input
            className="modal-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label className="modal-label">Please choose protocol</label>
          <select
            className="modal-input"
            value={protocol}
            onChange={(e) => setProtocol(e.target.value)}
          >
            <option value="rtsp">rtsp</option>
            <option value="rtsp-get">rtsp-get</option>
            <option value="rtsp-post">rtsp-post</option>
            <option value="ssh">ssh</option>
            <option value="ftp">ftp</option>
          </select>

          <div className="modal-ip-row">
            <span>The ip we are using: {ip}</span>
            {loading ? (
              <div>Please wait ...</div>
            ) : (
              <button className="modal-button" onClick={handleSubmit}>Proceed</button>
            )}
          </div>

          <div className="modal-output-box">
            {output || "Here will show the output"}
          </div>

          <label className="modal-label">Please enter password</label>
          <input
            className="modal-input"
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <div className="modal-ip-row">
            <span>The ip we are using: {ip} and username: {username}, password: {password}</span>
            {loading ? (
              <div>Please wait ...</div>
            ) : (
              <button className="modal-button" onClick={handleSnapshot}>Capture Screenshot</button>
            )}
          </div>
        </div>

        <div className="modal-right">
          <label className="modal-label">Please choose channel</label>
          <select
            className="modal-input"
            value={channel}
            onChange={(e) => setChannel(e.target.value)}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
          </select>

          <button className="modal-button" onClick={handleSystemInfo}>Get System Info</button>

          {systemInfo && (
            <div className="modal-output-box scrollable-content">
              <h4>System Info:</h4>
              <table>
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Data</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(systemInfo).map((key) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{systemInfo[key].status}</td>
                      <td>{JSON.stringify(systemInfo[key].data, null, 2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {imgUrl && (
            <div>
              <hr
                style={{
                  color: 'red',
                  backgroundColor: 'red',
                  height: 5
                }}
              />
              <img src={imgUrl} alt="Snapshot" />
            </div>
          )}
        </div>

        <button className="modal-close" onClick={onClose}>×</button>
      </div>
    </div>
  );
};

export default HydraModal;
