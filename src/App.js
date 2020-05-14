import React, { useState, useReducer } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import checked from "./checked";

const loginReducer = (state, action) => {
	switch (action.type) {
		case "login": {
			return {
				...state,
				isLoading: true,
				error: "",
			};
		}
		case "success": {
			return {
				...state,
				isLoggedIn: true,
			};
		}
		case "error": {
			return {
				...state,
				error: "Wrong username or password",
				isLoading: false,
				userName: "",
				password: "",
			};
		}
		case "logout": {
			return {
				...state,
				isLoggedIn: false,
				isLoading: false,
				userName: "",
				password: "",
			};
		}
		case "field": {
			return {
				...state,
				[action.field]: action.value,
			};
		}
		default:
			return state;
	}
};

const initialstate = {
	userName: "",
	password: "",
	isLoading: false,
	error: "",
	isLoggedIn: false,
};

function App() {
	const [state, dispatch] = useReducer(loginReducer, initialstate);
	const { userName, password, isLoading, error, isLoggedIn } = state;

	const onSubmit = async (e) => {
		e.preventDefault();
		dispatch({ type: "login" });
		try {
			await checked({ userName, password });
			dispatch({ type: "success" });
		} catch {
			dispatch({ type: "error" });
		}
	};

	return (
		<div className="App">
			<div className="login-container">
				{isLoggedIn ? (
					<>
						<h1>hello {userName}!</h1>
						<button onClick={() => dispatch({ type: "logout" })}>
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
							onChange={(e) =>
								dispatch({
									type: "field",
									field: "userName",
									value: e.target.value,
								})
							}
						/>
						<input
							type="password"
							placeholder="password"
							value={password}
							onChange={(e) =>
								dispatch({
									type: "field",
									field: "password",
									value: e.target.value,
								})
							}
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
