import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
	const [token, setToken] = useLocalStorage("Token", "");

	return (
		<AppContext.Provider value={[token, setToken]}>
			{children}
		</AppContext.Provider>
	);
};

export default AppContext;
