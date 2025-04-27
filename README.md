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
Discover and analyze all devices connected to the local WiFi network.
### Scan Devices - Bluetooth
Detect and monitor nearby Bluetooth-enabled devices.
### DAHUA Cameas API
Specialized features for discovering and analyzing vulnerabilities in DAHUA brand cameras.
## Upcoming Features
### Z-Wave
Support for discovering and assessing Z-Wave smart devices.
### Zigbee
Integration of scanning tools for Zigbee-enabled devices.
