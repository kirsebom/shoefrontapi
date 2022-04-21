import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
	const [results, setResults] = useLocalStorage("Results", "");

	return (
		<SearchContext.Provider value={[results, setResults]}>
			{children}
		</SearchContext.Provider>
	);
};

export default SearchContext;
