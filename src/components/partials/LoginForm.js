import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState, useContext } from "react";
import AppContext from "../context/AppContext";
import styles from "../../style/partials/LoginForm.module.css";
import { useNavigate } from "react-router-dom";
import { LOGIN_URL } from "../../constants/api";
import Spinner from "react-bootstrap/Spinner";
import axios from "axios";

const schema = yup.object().shape({
	username: yup.string().required("Please enter a username"),
	password: yup.string().required("Please enter a password"),
});

const LoginForm = () => {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		resolver: yupResolver(schema),
	});

	const [token, setToken] = useContext(AppContext);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);

	const navigate = useNavigate();

	async function onSubmit(data) {
		setLoading(true);
		try {
			const response = await axios.post(LOGIN_URL, data);
			setToken(response.data);
			navigate("/admin");
		} catch (error) {
			setError(error.toString());
			setLoading(false);
		} finally {
			setLoading(false);
		}
	}

	if (loading) {
		return (
			<>
				<div className={styles.loader_container}>
					<Spinner animation="border" role="status">
						<span className="visually-hidden">Loading...</span>
					</Spinner>
				</div>
			</>
		);
	}
	if (error) {
		return (
			<>
				<div className={styles.login_error_container}>{error}</div>
				<div className={styles.form_container}>
					<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
						<input
							{...register("username")}
							placeholder="Username"
							className={styles.input}
						/>
						{errors.username && (
							<span className={styles.login_error}>
								{errors.username.message}
							</span>
						)}
						<input
							{...register("password")}
							placeholder="Password"
							type="password"
							className={styles.input}
						/>
						{errors.password && (
							<span className={styles.login_error}>
								{errors.password.message}
							</span>
						)}
						<button className={styles.button}>Login</button>
					</form>
				</div>
			</>
		);
	}
	return (
		<div className={styles.form_container}>
			<form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
				<input
					{...register("username")}
					placeholder="Username"
					className={styles.input}
				/>
				{errors.username && (
					<span className={styles.login_error}>{errors.username.message}</span>
				)}
				<input
					{...register("password")}
					placeholder="Password"
					className={styles.input}
				/>
				{errors.password && (
					<span className={styles.login_error}>{errors.password.message}</span>
				)}
				<button className={styles.button}>Login</button>
			</form>
		</div>
	);
};

export default LoginForm;
