# from openzwave.network import ZWaveNetwork
import time

network = None

def scan_zwave():
    global network
    try:
        # network = ZWaveNetwork('/dev/ttyACM0', log=None)

        # Start scanning
        network.start()
        time.sleep(10)  # Wait for a bit for scanning to complete (adjust time as needed)

        # Retrieve Z-Wave devices (nodes)
        devices = []
        for node in network.nodes:
            devices.append({
                'id': node.id,
                'name': node.name,
                'security': node.is_secure(),  # Checking if the device has security enabled
            })

        # Return scanned devices
        return {'devices': devices}, 200

    except Exception as e:
        return {'error': f'Error scanning Z-Wave devices: {str(e)}'}, 500