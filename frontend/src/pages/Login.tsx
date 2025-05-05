import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from '../types.tsx';
import '../styles/hacker.css';
import { apiBase } from '../types';

type AppLoginProps = {
	setUser: React.Dispatch<React.SetStateAction<User | null>>;
	setAlertMessage: React.Dispatch<React.SetStateAction<string>>;
};

const LoginPage = ({ setUser, setAlertMessage }: AppLoginProps) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		try {
			const res = await fetch(`${apiBase}/api/users/login`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify(formData),
			});
			const data = await res.json();
			if (!res.ok) {
				throw new Error(data.error);
			}
			localStorage.setItem('username', data.user.username);
			setUser({ user: data.user.username });
			navigate('/dashboard');
		} catch (err) {
			setAlertMessage('Error: ' + String(err))
			console.log('Invalid credentials. Please try again.', err);
		}
	};

	return (
		<div
			style={{
				marginBottom: '100px',
				marginTop: '100px',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				fontFamily: 'monospace',
			}}
		>
			<div
				style={{
					backgroundColor: '#2a2a2a',
					border: '2px solid #c084fc',
					borderRadius: '16px',
					padding: '3rem',
					width: '100%',
					maxWidth: '500px',
					boxShadow: '0 0 25px #c084fc',
					color: 'white',
				}}
			>
				<h2
					style={{
						textAlign: 'center',
						marginBottom: '1rem',
						color: '#c084fc',
						textShadow: '0 0 12px #c084fc',
						fontWeight: 'bold',
						fontSize: '3rem',
					}}
				>
					🔐 Login
				</h2>

				<p
					style={{
						textAlign: 'center',
						color: '#bbbbbb',
						fontSize: '1.5rem',
						marginBottom: '2rem',
					}}
				>
					👋 Welcome back! Hope your password isn’t{' '}
					<span style={{ color: '#c084fc' }}>123456</span>
				</p>

				<form onSubmit={handleSubmit}>
					<div className="form-group mb-4">
						<label htmlFor="username" style={{ color: '#e0e0e0', fontSize: '1.4rem' }}>
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
								border: '1px solid #c084fc',
								backgroundColor: '#000',
								color: 'white',
								boxShadow: '0 0 5px #c084fc inset',
								fontSize: '1.4rem',
							}}
						/>
					</div>

					<div className="form-group mb-4">
						<label htmlFor="password" style={{ color: '#e0e0e0', fontSize: '1.4rem' }}>
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
								border: '1px solid #c084fc',
								backgroundColor: '#000',
								color: 'white',
								boxShadow: '0 0 5px #c084fc inset',
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
							backgroundColor: '#c084fc',
							color: '#000',
							fontWeight: 'bold',
							border: 'none',
							boxShadow: '0 0 10px #c084fc',
							cursor: 'pointer',
							fontSize: '1.5rem',
						}}
					>
						Log In
					</button>
				</form>
			</div>
		</div>
	);
};

export default LoginPage;
