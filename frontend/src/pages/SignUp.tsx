import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiBase } from '../types';

type Props = {
	setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
};
const SignUpPage: React.FC<Props> = ({ setAlertMessage }: Props) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: '',
		email: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch(`${apiBase}/api/users/signup`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error)
			}
			console.log(data);
			navigate('/login');
		} catch (err) {
			setAlertMessage('Failed to sign up. ' + String(err))
			console.log('Something went wrong. Please try again.');
		}
	};

	return (
		<div
			style={{
				marginBottom: '100px',
				marginTop: '100px',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontFamily: 'monospace',
			}}
		>
			<div
				style={{
					backgroundColor: '#2a2a2a',
					border: '2px solid #8b5cf6',
					borderRadius: '16px',
					padding: '3rem',
					width: '100%',
					maxWidth: '500px',
					boxShadow: '0 0 25px #8b5cf6',
				}}
			>
				<h2
					style={{
						textAlign: 'center',
						marginBottom: '1rem',
						color: '#c084fc',
						textShadow: '0 0 12px #8b5cf6',
						fontWeight: 'bold',
						fontSize: '3rem',
					}}
				>
					Create an Account
				</h2>

				<p
					style={{
						textAlign: 'center',
						color: '#bbbbbb',
						fontSize: '1.5rem',
						marginBottom: '2.5rem',
					}}
				>
					Don't worry, we won't let you use "password123"
				</p>

				<form onSubmit={handleSubmit}>
					<div className="form-group mb-4">
						<label htmlFor="username" style={{ color: '#dcdcff', fontSize: '1.4rem' }}>
							Username
						</label>
						<input
							type="text"
							id="username"
							name="username"
							value={formData.username}
							onChange={handleChange}
							required
							style={{
								width: '100%',
								padding: '1.2rem',
								borderRadius: '10px',
								border: '1px solid #8b5cf6',
								backgroundColor: '#000',
								color: 'white',
								boxShadow: '0 0 5px #8b5cf6 inset',
								fontSize: '1.4rem',
							}}
						/>
					</div>

					<div className="form-group mb-4">
						<label htmlFor="email" style={{ color: '#dcdcff', fontSize: '1.4rem' }}>
							Email Address
						</label>
						<input
							type="email"
							id="email"
							name="email"
							value={formData.email}
							onChange={handleChange}
							required
							style={{
								width: '100%',
								padding: '1.2rem',
								borderRadius: '10px',
								border: '1px solid #8b5cf6',
								backgroundColor: '#000',
								color: 'white',
								boxShadow: '0 0 5px #8b5cf6 inset',
								fontSize: '1.4rem',
							}}
						/>
					</div>

					<div className="form-group mb-4">
						<label htmlFor="password" style={{ color: '#dcdcff', fontSize: '1.4rem' }}>
							Password
						</label>
						<input
							type="password"
							id="password"
							name="password"
							value={formData.password}
							onChange={handleChange}
							required
							style={{
								width: '100%',
								padding: '1.2rem',
								borderRadius: '10px',
								border: '1px solid #8b5cf6',
								backgroundColor: '#000',
								color: 'white',
								boxShadow: '0 0 5px #8b5cf6 inset',
								fontSize: '1.4rem',
							}}
						/>
					</div>

					<button
						type="submit"
						style={{
							width: '100%',
							padding: '1.2rem',
							borderRadius: '10px',
							backgroundColor: '#8b5cf6',
							color: '#000',
							fontWeight: 'bold',
							border: 'none',
							boxShadow: '0 0 20px #8b5cf6',
							cursor: 'pointer',
							fontSize: '1.5rem',
						}}
						onMouseOver={(e) => {
							(e.target as HTMLButtonElement).style.backgroundColor = '#a78bfa';
							(e.target as HTMLButtonElement).style.boxShadow = '0 0 30px #c084fc';
							(e.target as HTMLButtonElement).style.transform = 'scale(1.03)';
						}}
						onMouseOut={(e) => {
							(e.target as HTMLButtonElement).style.backgroundColor = '#8b5cf6';
							(e.target as HTMLButtonElement).style.boxShadow = '0 0 20px #8b5cf6';
							(e.target as HTMLButtonElement).style.transform = 'scale(1)';
						}}
					>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default SignUpPage;
