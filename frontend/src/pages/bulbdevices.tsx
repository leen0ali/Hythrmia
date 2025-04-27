import { useState } from "react";
import { useParams } from "react-router-dom";

const BulbDevices = () => {
	const { ip } = useParams<{ ip: string }>();
	const [isOn, setIsOn] = useState(false);
	const [color, setColor] = useState("#ffffff");

	const toggleLight = async () => {
		try {
			const endpoint = isOn ? "turn-off" : "turn-on";
			const response = await fetch(`http://localhost:3000/api/zengge/${endpoint}/${ip}`, {
				method: "GET",
				headers: { "Content-Type": "application/json" },
				credentials: "include"
			});
			if (!response.ok) throw new Error(`Failed to ${endpoint} device`);
			const data = await response.json();
			console.log(data);
			if (response.status === 200) {
				setIsOn(!isOn);
			}
		} catch (err) {
			console.log(err);
		}
	};

	const handleColorChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const newColor = e.target.value;
		setColor(newColor);

		try {
			const response = await fetch(`http://localhost:3000/api/zengge/color`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json"
				},
				credentials: "include",
				body: JSON.stringify({ ip, color: newColor })
			});
			if (!response.ok) throw new Error("Failed to change color");
			const data = await response.json();
			console.log(data);
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<div className="container-fluid min-vh-100 d-flex justify-content-center align-items-center" style={{ backgroundColor: '#0a0f1c', color: 'white' }}>
			<div className="card p-5 text-center shadow-lg border border-success rounded-4" style={{ maxWidth: '900px', width: '100%', backgroundColor: '#0e1629' }}>
				<h1 className="display-4 text-cyan mb-4">💡 Smart Light Bulb Control</h1>

				<div className="mb-5">
					<div
						className={`rounded-circle border border-4 mx-auto mb-4 ${isOn ? 'border-warning' : 'border-secondary'}`}
						style={{ width: '200px', height: '200px', backgroundColor: isOn ? color : '#1a2339' }}
					></div>
					<button
						onClick={toggleLight}
						className="btn btn-lg btn-success fw-bold px-5 py-3"
					>
						{isOn ? "Turn Off Light" : "Turn On Light"}
					</button>
				</div>

				<div>
					<h4 className="text-info mb-3">Change Light Color</h4>
					<input
						type="color"
						value={color}
						onChange={handleColorChange}
						disabled={!isOn}
						className="form-control form-control-color mx-auto"
						style={{ width: '100px', height: '60px', border: 'none' }}
					/>
				</div>
			</div>
		</div>
	);
};

export default BulbDevices;
