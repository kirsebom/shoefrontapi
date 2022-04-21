import SecondNavigation from "../partials/SecondNavigation";
import Footer from "../partials/Footer";
import Styles from "../../style/pages/Login.module.css";
import LoginForm from "../partials/LoginForm";

const Login = () => {
	return (
		<>
			<div className={Styles.wrapper}>
				<SecondNavigation />
				<LoginForm />
			</div>
			<Footer />
		</>
	);
};

export default Login;
