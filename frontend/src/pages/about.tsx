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
          <h2 style={{ fontSize: "2.8rem", fontWeight: "900", color: "#74002e" }}>
            Why Hythrmia?
          </h2>
          <p>
            The name Hythrmia is inspired by the word "Hyperthermia" — a dangerously high body temperature. Instead of overheating humans, Hythrmia focuses on detecting the heat of digital threats in your smart home network.
          </p>
          <p>
            As IoT devices proliferate, vulnerabilities such as open ports, weak credentials, and outdated firmware can put users at risk. Hythrmia identifies these vulnerabilities early and helps users take proactive security actions before threats can spread.
          </p>
        </section>

        {/* Section: What Does Hythrmia Do? */}
        <section className="mb-5">
          <h2 style={{ fontSize: "2.8rem", fontWeight: "900", color: "#74002e" }}>What Does Hythrmia Do?</h2>
          <ul style={{ listStyleType: "disc", paddingLeft: "1.5rem", color: "#e0e0e0" }}>
            <li>Scans IoT devices using Wi-Fi and Bluetooth protocols to detect vulnerabilities.</li>
            <li>Identifies security risks like open ports, weak credentials, and outdated firmware.</li>
            <li>Provides AI-powered security recommendations through integration with OpenAI to explain findings and suggest fixes.</li>
            <li>Performs penetration testing using tools like Hydra for deeper vulnerability analysis.</li>
            <li>Operates entirely offline, ensuring that your data stays under your control, with no cloud dependency.</li>
          </ul>
        </section>

        {/* Section: Why I Built Hythrmia */}
        <section className="mb-5">
          <h2 style={{ fontSize: "2.8rem", fontWeight: "900", color: "#74002e" }}>Why I Built Hythrmia</h2>
          <p>
            As IoT devices continue to become an integral part of smart homes, the growing concern over IoT security prompted me to build Hythrmia. The goal was to create a private, and powerful security scanner for IoT networks. Many cloud-based tools collect sensitive data from connected devices, potentially compromising privacy. I wanted to create a solution where users have complete control over their data.
          </p>
          <p>
            Unlike cloud-based scanners, Hythrmia performs all security checks locally on the user’s machine. This ensures that you own your data and that nothing is shared or transmitted without your explicit permission.
          </p>
          <p>
            The tool supports Wi-Fi and Bluetooth devices and is currently focused on Dahua cameras and Surplife smart light bulbs. Future updates will expand the list of supported devices, integrating other IoT protocols such as Zigbee and Z-Wave once the required hardware is available. In addition to device security, Hythrmia will also incorporate AI-driven anomaly detection to improve real-time monitoring and detection of unusual behavior in the network.
          </p>
          <p>
            Whether you are a homeowner securing your smart devices, an  IT professional managing a local network, or a cybersecurity trainer teaching offline-first principles, Hythrmia is designed to make securing IoT networks both straightforward and effective. By integrating multiple security tools into one platform, it empowers users to manage their network security without requiring advanced technical knowledge.
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
    </div>
  );
};

export default About;
