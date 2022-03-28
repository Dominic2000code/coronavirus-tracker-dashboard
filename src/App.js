import React from "react";
import "./App.css";

// import LineGraph from "./LineGraph";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import GlobalStats from "./GlobalStats";

const App = () => {
	// return data ? (
	// 	<LineChart data={data} width={width} height={height} />
	// ) : (
	// 	<div>Loading...</div>
	// );

	return (
		<BrowserRouter>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/global" element={<GlobalStats />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
