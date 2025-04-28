# Hythrmia

**Hythrmia** is an advanced IoT security scanning tool designed to identify vulnerabilities across smart devices within local networks. Initially focused on smart home environments, Hythrmia performs deep scans using various communication protocols such as WiFi, Bluetooth, Zigbee, and Z-Wave.

By combining real-time device discovery, open port analysis, default credential detection, firmware checks, and anamoly detction, Hythrmia empowers users to secure their smart environments proactively. The tool also includes an AI-powered feature that generates user-friendly guides to help non-technical users fix identified issues.

Built for privacy, Hythrmia operates entirely offline and is available both as a terminal-based application and a future-friendly GUI for broader accessibility.

### Objective
Our goal is to secure all devices within a local area network using the tools available through our platform. Hythrmia helps identify and address vulnerabilities in IoT devices, providing comprehensive insights and alerts when new devices connect via Bluetooth or WiFi.

Currently, our tools operate in manual mode, requiring users to initiate scans. However, most of the scanning and analysis capabilities are designed to support future automation.

We are presently focusing on **DAHUA** cameras, scanning these devices for vulnerabilities such as open ports and default credentials. Using tools like `hydra`, we conduct controlled penetration tests to demonstrate potential weaknesses. In some cases, this has allowed us to gain unauthorized access to camera streams—highlighting the need for better device security.

>[!NOTE]
We have already identified the DAHUA API, which we used to retrieve detailed information about connected cameras operating within the local area network. This [reference](https://github.com/rroller/dahua/issues/338) provided valuable insight into the API structure and authentication mechanisms, enabling us to enumerate connected devices, extract stream URLs, and analyze device configurations. Leveraging this API also allowed us to uncover potential weaknesses in default settings, which can be exploited for further access and testing. This discovery significantly enhanced our ability to assess DAHUA camera vulnerabilities as part of Hythrmia’s scanning capabilities.

## Features
### Scan Connected Devices - WIFI
Discover and analyze all devices connected to the local WiFi network. Our software is designed with two key aspects: backend and user interface. The backend handles most of the heavy lifting — scanning the network, identifying devices, and retrieving critical information such as IP addresses, MAC addresses, and, when possible, device names. A smooth and intuitive backend UI presents the scan results in a clean, interactive way, ensuring users can easily understand and interact with their network devices.

### Scan Devices - Bluetooth
Detect and monitor nearby Bluetooth-enabled devices. Just like with WiFi scanning, the Bluetooth scanning feature has both a robust backend and a user-friendly interface. The backend logic is responsible for discovering nearby Bluetooth devices and pulling as much identifying information as possible, while the UI ensures a seamless experience for monitoring and managing detected devices.

### DAHUA Cameas API
Specialized tools for discovering and analyzing vulnerabilities in DAHUA brand cameras. During a WiFi scan, if a DAHUA camera is detected (via specific open ports such as RTSP or HTTP ports like 80), the software integrates with Hydra to attempt password cracking. This feature is designed to help users assess the security of their local area network. Once a password is successfully guessed, users can access captured streams from the camera — allowing them to fully evaluate their network security risks.

### Zengge Light Blub
Control and manage Zengge smart light bulbs directly from the app.
We have fully integrated support for scanning Zengge devices and allowing users to control them easily through the web interface.
The backend and UI were carefully designed to make this feature simple and intuitive — users can scan, select, and interact with their light bulbs with just a few clicks.
We primarily utilized the [flux_led](https://github.com/lightinglibs/flux_led) library to enable both scanning and control functionality, providing a smooth and reliable experience.

### Device Vulnerability Lookup (CVE Integration)
Automatically check for known vulnerabilities when new devices connect to the network.
When a device is discovered during a WiFi scan — for example, a DAHUA camera — the system automatically recognizes it by its device name and cross-references it using public vulnerability databases (CVEs).
We have integrated API access to [vulners](https://vulners.com/) and similar sources to fetch known vulnerabilities for the identified devices, allowing users to immediately assess potential security risks without any manual research.
This adds a powerful layer of proactive security scanning right inside the platform.

## Upcoming Features
### Z-Wave
Future support for discovering and assessing Z-Wave smart home devices.
Although planned, this feature has not been implemented yet due to hardware limitations — we currently do not have enough Z-Wave devices available for testing, nor the required scanning hardware to properly support Z-Wave discovery.
### Zigbee
Integration of scanning tools for Zigbee-enabled devices.
Similarly, support for Zigbee device scanning is planned but currently unavailable. As with Z-Wave, the lack of sufficient Zigbee devices and necessary equipment has delayed development.

## Conclusion
This project brings together powerful network discovery, security assessment, and smart device management into a single, streamlined platform.
From scanning WiFi and Bluetooth devices to specialized tools for analyzing DAHUA cameras and controlling Zengge smart light bulbs, the system was built with a clear goal: to provide users with maximum visibility, control, and security — all in one place.
With a strong backend foundation and a smooth, intuitive user interface, users can easily interact with their connected environment without needing deep technical expertise.

At its core, this platform is designed to be an all-in-one hub for network tools, eliminating the need for users to jump between multiple apps or complex systems.
Recognizing that many existing solutions are often difficult to use or scattered across different platforms, we focused on bringing all essential tools together — offering both power and simplicity in environments where ease of use is usually lacking.
Whether users want to assess the security of their network, explore connected devices, or interact with smart home products, everything they need is accessible from one clean, cohesive interface.

Although upcoming features like Z-Wave and Zigbee support are still on the roadmap due to hardware constraints, the platform's architecture is built for scalability and continuous growth.

In short, this project isn't just about device discovery — it's about creating an ecosystem that empowers users to secure, explore, and control their connected world effortlessly.
