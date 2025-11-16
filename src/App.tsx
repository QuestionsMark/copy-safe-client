import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { Share } from "./views/Share";

export const App = () => {
	return (
		<Routes>
			<Route
				path="/"
				element={<Home />}
			/>
			<Route
				path="/share/:id"
				element={<Share />}
			/>
		</Routes>
	);
};
