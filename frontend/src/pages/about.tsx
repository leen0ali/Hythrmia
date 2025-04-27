import React, { useEffect, useState } from 'react';

// Import images
import aboutHeader from "../assets/pictures/aboutheader.png";
import aboutFooter from "../assets/pictures/aboutfooter.png";

// About component
const About: React.FC = () => {
  const [isInViewport, setIsInViewport] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById("about-image");
      if (element) {
        const rect = element.getBoundingClientRect();
        if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
          setIsInViewport(true);
        }
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      className="container"
      style={{
        fontFamily: "Orbitron, sans-serif",
        fontSize: "1.6rem",
        lineHeight: "2",
        paddingBottom: "60px",
        padding: "40px",
        color: "#f2f2f2",
        background: "linear-gradient(90deg, #0a0f2c, #1a0033)", // Futuristic dark background
      }}
    >
      {/* Header Image */}
      <div className="header-img-container" style={{ display: "flex", justifyContent: "center", marginBottom: "50px" }}>
        <img
          src={aboutHeader}
          alt="About Hythrmia"
          id="about-image"
          className={`header-img ${isInViewport ? "fade-in" : ""}`}
          style={{
            width: "100%",
            maxWidth: "1200px", // Make the header image rectangular
            height: "400px", // Set fixed height for more rectangular look
            objectFit: "cover", // Crops the top of the image to fit the container
            objectPosition: "top", // Crop from the top of the image
            transition: "opacity 1s ease-in-out",
          }}
        />
      </div>

      {/* Main Content Wrapper */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start", // Align text to the left
          textAlign: "left", // Ensure text is left aligned
        }}
      >
        {/* Section: Why Hythrmia */}
        <section className="mb-5">
          <h2 style={{ fontSize: "2.8rem", fontWeight: "900", color: "#ff0066" }}>
            Why <span className="red-text">Hythrmia</span>?
          </h2>
          <p>
            The name <span className="fire-text">Hythrmia</span> was inspired by the word <i>“Hyperthermia”</i> —
            a dangerously high body temperature. But instead of overheating humans, Hythrmia is about detecting the{" "}
            <b>heat of digital threats</b> in your smart environment.
          </p>
          <p>
            When your devices are “too hot” — wide open ports, weak credentials, or outdated firmware —{" "}
            <b>Hythrmia detects the burn</b> and gives you control before threats spread.
          </p>
        </section>

        {/* Section: What Does Hythrmia Do? */}
        <section className="mb-5">
          <h2 style={{ fontSize: "2.8rem", fontWeight: "900", color: "#00ffcc" }}>What Does Hythrmia Do?</h2>
          <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", color: "#e0e0e0" }}>
            <li>Scans smart devices using WiFi, Bluetooth, Zigbee, and Z-Wave protocols</li>
            <li>Detects vulnerabilities like open ports, weak passwords, and outdated firmware</li>
            <li>Uses GPT or Ollama AI to explain issues and suggest secure actions</li>
            <li>Feeds port data into tools like Hydra for deeper analysis when needed</li>
            <li>Runs entirely offline for total privacy — no cloud, no compromise</li>
          </ul>
        </section>

        {/* Section: Why I Built This */}
        <section className="mb-5">
          <h2 style={{ fontSize: "2.8rem", fontWeight: "900", color: "#ff0066" }}>Why I Built This</h2>
          <p>
            In today’s cloud-dominated world, it’s easy to assume every tool must be online. But I built Hythrmia
            to push back on that assumption. I wanted to prove that security could still be powerful, private, and
            offline-first.
          </p>
          <p>
            Cloud-based scanners often collect data about your devices — your open ports, firmware versions, and
            more. Hythrmia doesn’t. All scanning and analysis happens locally. That means <b>you own your data</b>.
            It stays on your machine, fully in your control.
          </p>
          <p>
            This approach reduces the attack surface, avoids privacy risks, and works even when you're offline. No
            internet? No problem. Whether you’re in a remote area, running a closed system, or protecting sensitive
            environments — Hythrmia keeps working.
          </p>
          <p>
            It’s designed for everyday users and professionals alike: a homeowner scanning their smart cameras, a
            local IT admin checking a small office setup, or a cybersecurity trainer teaching offline-first principles.
          </p>
        </section>
      </div>

      {/* Footer Image */}
      <div
        className="footer-img-container"
        style={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        <img
          src={aboutFooter}
          alt="Hythrmia Dashboard"
          style={{
            width: "100%",
            maxWidth: "1200px", // Make the footer image rectangular
            height: "400px", // Set a fixed height for footer image to make it rectangular
            objectFit: "cover", // Crops the top part of the image to fit the container
            objectPosition: "top", // Crop from the top
            borderRadius: "12px",
          }}
        />
      </div>

      {/* CSS Styles */}
      <style>
        {`
          /* Fire Text Animation */
          .fire-text {
            color: #ff0055;
            animation: burn 2s infinite alternate;
            font-weight: bold;
            display: inline-block;
            text-shadow: 0 0 5px #ff0066, 0 0 10px #ff3300, 0 0 15px #ff6600;
          }

          @keyframes burn {
            0% {
              text-shadow: 0 0 5px #ff0066, 0 0 10px #ff3300, 0 0 15px #ff6600;
            }
            100% {
              text-shadow: 0 0 10px #ff3300, 0 0 20px #ff6600, 0 0 30px #ff9933;
            }
          }

          /* Red Neon Effect for "Hythrmia" */
          .red-text {
            color: #ff0072; /* Red neon color */
            text-shadow: 0 0 5px #ff0033, 0 0 10px #ff0055, 0 0 15px #ff0088;
          }

          /* Header Image Animation */
          .header-img-container {
            display: flex;
            justify-content: center;
            margin-bottom: 50px;
          }

          .header-img {
            width: 100%;
            max-width: 1200px; /* Rectangular header */
            height: 400px; /* Set fixed height for more rectangular look */
            object-fit: cover;
            object-position: top;
            transition: opacity 1s ease-in-out;
          }

          .header-img.fade-in {
            opacity: 1;
          }

          /* Footer Image */
          .footer-img-container {
            display: flex;
            justify-content: center;
            margin-top: 50px;
          }

          .footer-img {
            width: 100%;
            max-width: 1200px; /* Rectangular footer */
            height: 400px; /* Set a fixed height for footer image */
            object-fit: cover;
            object-position: top;
            border-radius: 12px;
          }

          /* Text and Section Styling */
          .section-title {
            font-size: 2.8rem;
            font-weight: 900;
            color: #ff0066;
            margin-bottom: 20px;
          }

          .section {
            margin-bottom: 50px;
            color: #e0e0e0;
          }

          ul {
            padding-left: 1.5rem;
          }

          ul li {
            margin-bottom: 12px;
          }

          p {
            margin-bottom: 20px;
          }
        `}
      </style>
    </div>
  );
};

export default About;
