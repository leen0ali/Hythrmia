// src/pages/Home.tsx
import React from "react";
import cyberfox from "../assets/pictures/cyberfox.png"; // Make sure to update path accordingly

const Home: React.FC = () => {
  const glitchEffect = `
    @keyframes glitch {
      0% { transform: translate(0); }
      10% { transform: translate(-2px, -2px); }
      20% { transform: translate(-4px, 0); }
      30% { transform: translate(4px, 2px); }
      40% { transform: translate(2px, -1px); }
      50% { transform: translate(-3px, 0); }
      60% { transform: translate(3px, 1px); }
      70% { transform: translate(-1px, 1px); }
      80% { transform: translate(2px, 1px); }
      90% { transform: translate(-1px, 0); }
      100% { transform: translate(0); }
    }

    @keyframes pulse {
      0% { transform: scale(1); opacity: 1; }
      50% { transform: scale(1.05); opacity: 0.9; }
      100% { transform: scale(1); opacity: 1; }
    }

    .glitch-text {
      font-family: 'Courier New', monospace;
      color: #39FF14;
      text-transform: uppercase;
      position: relative;
      font-size: 2em;
      animation: glitch 1s infinite linear;
    }

    .title-text {
      font-family: 'Courier New', monospace;
      color: #6a4c9c;
      font-size: 2em;
    }

    .neon-button {
      background-color: #6a4c9c;
      color: #fff;
      border-color: #6a4c9c;
    }

    .cyber-image-animated {
      width: 200px;
      transition: transform 0.3s ease-in-out;
      animation: pulse 3s infinite;
    }
  `;

  return (
    <div className="container mt-5">
      <style>{glitchEffect}</style>

      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div
            className="shadow-lg p-5 rounded-4 border-0"
            style={{
              backgroundColor: "transparent",
              color: "white",
              border: "3px solid #39FF14",
              padding: "60px",
              borderRadius: "10px",
            }}
          >
            <h1 className="display-4 text-center glitch-text fw-bold mb-4">
              Welcome to <span style={{ color: "red" }}>Hythrmia</span>
            </h1>

            <p className="lead text-center title-text mb-5">
              Advanced Offline IoT Security Scanning for Smart Homes & Networks
            </p>

            <div className="row">
              <div className="col-md-6">
                <h4 className="text-success">🔍 Real-Time Device Discovery</h4>
                <p className="title-text">
                  Hythrmia scans your local network to identify smart devices using protocols like WiFi, Bluetooth, Zigbee, and Z-Wave.
                </p>

                <h4 className="text-success">🛡️ Vulnerability Detection</h4>
                <p className="title-text">
                  Analyze open ports, check for default credentials, inspect firmware, and detect anomalies — all locally, with no cloud dependency.
                </p>

                <h4 className="text-success">🤖 AI-Powered Fixes</h4>
                <p className="title-text">
                  Let our built-in AI generate easy-to-follow guides to fix detected vulnerabilities, even for non-technical users.
                </p>
              </div>

              <div className="col-md-6 d-flex flex-column align-items-center">
                <h4 className="text-success">🔐 Privacy-First</h4>
                <p className="title-text">
                  Hythrmia runs fully offline — your data stays on your device, always.
                </p>

                <h4 className="text-success">🖥️ GUI + Terminal</h4>
                <p className="title-text">
                  Use Hythrmia in the terminal for power, or enjoy a modern, friendly GUI interface (coming soon!) — your choice, same power.
                </p>

                <img
                  src={cyberfox}
                  alt="Cyberpunk Fox Hacker"
                  className="cyber-image-animated mt-4"
                />

                <div className="mt-4">
                  <a
                    href="/signup"
                    className="btn btn-outline-danger btn-lg w-100 mb-3 neon-button"
                    style={{ borderColor: "#39FF14", color: "#39FF14" }}
                  >
                    Get Started
                  </a>
                  <p className="text-muted text-center" style={{ color: "#39FF14" }}>
                    Already have an account? <a href="/login" style={{ color: "#39FF14" }}>Log In</a>
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
