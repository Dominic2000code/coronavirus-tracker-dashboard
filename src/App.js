import React from "react";
import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import GlobalStats from "./GlobalStats";
import Footer from "./Footer";
import Header from "./Header";

const App = () => {
	return (
		<BrowserRouter>
		<Header/>
			<Routes>
				<Route exact path="/" element={<Home />} />
				<Route exact path="/global" element={<GlobalStats />} />
			</Routes>
		</BrowserRouter>
	);
};

export default App;
