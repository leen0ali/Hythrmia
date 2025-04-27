import React, { useState, useEffect } from 'react';

const SettingsPage: React.FC = () => {
	const [llmChoice, setLlmChoice] = useState('');
	const [urlPath, setUrlPath] = useState('');
	const [apiToken, setApiToken] = useState('');
	const [ollamaModel, setOllamaModel] = useState('');
	const [gptModel, setGptModel] = useState('');
	const [promptText, setPromptText] = useState('');
	const [enabled, setEnabled] = useState(false);
	const [passwordsEnabled, setPasswordsEnabled] = useState(false);
	const [passwordList, setPasswordList] = useState('');
	const [vulnersEnabled, setVulnersEnabled] = useState(false);
	const [vulnersApiKey, setVulnersApiKey] = useState('');


	useEffect(() => {
		const handleGetSettings = async () => {
			try {
				const response = await fetch("http://localhost:3000/api/users/get-config", {
					method: "GET",
					headers: { "Content-Type": "application/json" },
					credentials: 'include'
				});

				if (response.ok) {
					const data = await response.json();
					if (data.enabled) {
						setEnabled(true);
						setLlmChoice(data.type);
					}

					if (data.prompt) setPromptText(data.prompt);
					if (data.ollama_url) setUrlPath(data.ollama_url);
					if (data.gpt_token) setApiToken(data.gpt_token);
					if (data.ollama_model) setOllamaModel(data.ollama_model);
					if (data.gpt_model) setGptModel(data.gpt_model);
					if (data.passEnabled) setPasswordsEnabled(data.passEnabled);
					if (data.passwords) setPasswordList(data.passwords);
					if (data.vulnersEnabled) setVulnersEnabled(data.vulnersEnabled);
					if (data.vulnersApiKey) setVulnersApiKey(data.vulnersApiKey);

				} else {
					console.warn("No saved configuration found.");
				}
			} catch (error) {
				console.error("Error fetching settings:", error);
			}
		};

		handleGetSettings();
	}, []);

	const handleSave = async () => {
		try {
			const payload = {
				enabled: enabled,
				type: llmChoice,
				prompt: promptText,
				ollama_url: urlPath,
				ollama_model: ollamaModel,
				gpt_model: gptModel,
				gpt_token: apiToken,
				passEnabled: passwordsEnabled,
				passwords: passwordList,
				vulnersEnabled: vulnersEnabled,
				vulnersApiKey: vulnersApiKey,

			};

			const response = await fetch("http://localhost:3000/api/users/save-config", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				credentials: 'include',
				body: JSON.stringify(payload)
			});

			if (response.ok) {
				alert("Settings saved successfully!");
			} else {
				alert("Failed to save settings.");
			}
		} catch (error) {
			console.error("Error saving settings:", error);
			alert("An error occurred while saving.");
		}
	};

	return (
		<div className="container mt-5" style={{ color: '#00bfff', fontSize: '1.3rem' }}>
			<style>{`
        .cyber-card {
          background-color: #0a0f2c;
          box-shadow: 0 0 20px #00bfff;
          border-radius: 12px;
          border: none;
        }

        .cyber-label {
          color: #00bfff;
          font-weight: bold;
        }

        .cyber-input {
          background-color: #001f3f;
          color: #00bfff;
          border: 1px solid #00bfff;
          font-size: 1.2rem;
        }

        .cyber-btn {
          background-color: #0b132b;
          border: 2px solid #2b65ec;
          color: #00d9ff;
          font-family: 'Courier New', monospace;
          font-size: 1.2rem;
          padding: 0.6rem 2rem;
          border-radius: 8px;
          transition: all 0.3s ease;
        }

        .cyber-btn:hover {
          background-color: #2b65ec;
          color: #0a0f2c;
          box-shadow: 0 0 12px #00d9ff;
        }

        .toggle-line {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .toggle-line input[type="checkbox"] {
          width: 50px;
          height: 26px;
          background-color: #001f3f; /* Dark theme color */
          border-color: #00bfff; /* Light blue border */
          border-radius: 20px;
          transition: all 0.3s ease;
        }

        .toggle-line input[type="checkbox"]:checked {
          background-color: #00bfff; /* Bright blue when checked */
          border-color: #00bfff; /* Light blue border when checked */
        }

        .toggle-line label {
          color: #00bfff; /* Matching text color */
          font-weight: bold;
          font-size: 1.5rem;
          line-height: 1.6rem;
          margin-bottom: 0;
        }
      `}</style>

			<div className="card p-4 cyber-card">
				<h2 className="text-center mb-4" style={{ color: '#00bfff', fontSize: '2rem' }}>
					Settings
				</h2>

				{/* AI Enable Toggle */}
				<div className="form-check form-switch toggle-line mb-2">
					<input
						className="form-check-input"
						type="checkbox"
						checked={enabled}
						onChange={(e) => setEnabled(e.target.checked)}
						id="enableAICheck"
					/>
					<label htmlFor="enableAICheck">Enable AI</label>
				</div>

				{/* AI Options (Visible if AI is enabled) */}
				{enabled && (
					<div className="mt-3 ms-1">
						<p className="text-info ms-1 mt-2">Only if this is checked, AI features will be enabled.</p>

						{/* Ollama Option */}
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="llmSelect"
								id="useOllama"
								value="ollama"
								checked={llmChoice === 'ollama'}
								onChange={(e) => setLlmChoice(e.target.value)}
								style={{ backgroundColor: '#001f3f', borderColor: '#00bfff' }}
							/>
							<label className="form-check-label" htmlFor="useOllama" style={{ color: '#00ffff' }}>
								Use Ollama <span className="badge text-bg-secondary">Slower</span>
							</label>
						</div>

						{/* GPT Option */}
						<div className="form-check">
							<input
								className="form-check-input"
								type="radio"
								name="llmSelect"
								id="useGPT"
								value="gpt"
								checked={llmChoice === 'gpt'}
								onChange={(e) => setLlmChoice(e.target.value)}
								style={{ backgroundColor: '#001f3f', borderColor: '#00bfff' }}
							/>
							<label className="form-check-label" htmlFor="useGPT" style={{ color: '#00ffff' }}>
								Use GPT
							</label>
						</div>

						{/* Ollama URL */}
						{llmChoice === 'ollama' && (
							<div className="form-group mt-3">
								<label htmlFor="urlPath" className="cyber-label">URL to Ollama server</label>
								<input
									type="text"
									className="form-control cyber-input"
									id="urlPath"
									value={urlPath}
									onChange={(e) => setUrlPath(e.target.value)}
									placeholder="i.e http://localhost:11434/api/generate"
								/>
							</div>
						)}

						{/* Ollama Model */}
						{llmChoice === 'ollama' && (
							<div className="form-group mt-3">
								<label htmlFor="model" className="cyber-label">Ollama Model</label>
								<input
									type="text"
									className="form-control cyber-input"
									id="model"
									value={ollamaModel}
									onChange={(e) => setOllamaModel(e.target.value)}
									placeholder="i.e deepseek-r1:1.5b"
								/>
							</div>
						)}

						{/* GPT Model */}
						{llmChoice === 'gpt' && (
							<div className="form-group mt-3">
								<label htmlFor="gptModel" className="cyber-label">GPT Model</label>
								<input
									type="text"
									className="form-control cyber-input"
									id="gptModel"
									value={gptModel}
									onChange={(e) => setGptModel(e.target.value)}
									placeholder="i.e gpt-4o-mini"
								/>
							</div>
						)}

						{/* GPT Token */}
						{llmChoice === 'gpt' && (
							<div className="form-group mt-3">
								<label htmlFor="apiToken" className="cyber-label">GPT Token</label>
								<input
									type="password"
									className="form-control cyber-input"
									id="apiToken"
									value={apiToken}
									onChange={(e) => setApiToken(e.target.value)}
									placeholder="Enter your GPT API token"
								/>
							</div>
						)}

						{/* Prompt Text */}
						<div className="form-group mt-4">
							<label htmlFor="promptText" className="cyber-label">
								Prompt Text for AI Behavior
							</label>
							<small className="d-block text-muted mb-2">
								Edit what the AI should do, help with, or customize.
							</small>
							<textarea
								className="form-control cyber-input"
								style={{
									height: '400px'
								}}
								id="promptText"
								rows={4}
								placeholder="Enter custom instructions here..."
								value={promptText}
								onChange={(e) => setPromptText(e.target.value)}
							></textarea>
						</div>
					</div>
				)}

				{/* Hydra Password List Input (Always visible) */}
				<div className="form-check form-switch toggle-line mb-2 mt-4">
					<input
						className="form-check-input"
						type="checkbox"
						checked={passwordsEnabled}
						onChange={(e) => setPasswordsEnabled(e.target.checked)}
						id="enablePasswordsCheck"
					/>
					<label htmlFor="enablePasswordsCheck" style={{ color: '#00ffff' }}>
						Enable Password List for Hydra Attack
					</label>
				</div>

				{/* Password Input Field */}
				{passwordsEnabled && (
					<div className="form-group mt-3">
						<label htmlFor="passwordList" className="cyber-label">
							Enter List of Passwords
						</label>
						<textarea
							className="form-control cyber-input"
							style={{
								height: '200px'
							}}
							id="passwordList"
							rows={4}
							placeholder="Enter list of passwords here..."
							value={passwordList}
							onChange={(e) => setPasswordList(e.target.value)}
						></textarea>
					</div>
				)}

				{/* Vulners API Toggle */}
				<div className="form-check form-switch toggle-line mb-2 mt-4">
					<input
						className="form-check-input"
						type="checkbox"
						checked={vulnersEnabled}
						onChange={(e) => setVulnersEnabled(e.target.checked)}
						id="enableVulnersCheck"
					/>
					<label htmlFor="enableVulnersCheck" style={{ color: '#00ffff' }}>
						Enable Vulners API Access
					</label>
				</div>

				{/* Vulners API Key Input */}
				{vulnersEnabled && (
					<div className="form-group mt-3">
						<label htmlFor="vulnersApiKey" className="cyber-label">
							Vulners API Key
						</label>
						<input
							type="password"
							className="form-control cyber-input"
							id="vulnersApiKey"
							value={vulnersApiKey}
							onChange={(e) => setVulnersApiKey(e.target.value)}
							placeholder="Enter your Vulners API Key"
						/>
					</div>
				)}


				{/* Save Button */}
				<div className="text-center mt-4">
					<button className="cyber-btn" onClick={handleSave}>
						Save Settings
					</button>
				</div>
			</div>
		</div>
	);
};

export default SettingsPage;
