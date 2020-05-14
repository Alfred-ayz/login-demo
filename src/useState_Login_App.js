import React, { useState } from "react";
import "./App.css";
import checked from "./checked";

function App() {
	const [userName, setUserName] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setisLoading] = useState(false);
	const [error, setError] = useState(false);
	const [isLoggedIn, setisLoggedIn] = useState(false);

	const onSubmit = async (e) => {
		e.preventDefault();
		setisLoading(true);
		setError("");
		try {
			await checked({ userName, password });
			setisLoggedIn(true);
			setUserName("");
			setPassword("");
			setError("");
		} catch {
			setError("Wrong username or password");
		}
		setisLoading(false);
	};

	return (
		<div className="App">
			<div className="login-container">
				{isLoggedIn ? (
					<>
						<h1>hello {userName}!</h1>
						<button onClick={() => setisLoggedIn(false)}>
							Log out
						</button>
					</>
				) : (
					<form className="form" onSubmit={onSubmit}>
						{error && <p className="error">{error}</p>}
						<p>Please Login</p>
						<input
							type="text"
							placeholder="username"
							value={userName}
							onChange={(e) => setUserName(e.target.value)}
						/>
						<input
							type="password"
							placeholder="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
						<button
							className="submit"
							type="submit"
							disabled={isLoading}
						>
							{isLoading ? "Logging in..." : "Login in"}
						</button>
					</form>
				)}
			</div>
		</div>
	);
}

export default App;
