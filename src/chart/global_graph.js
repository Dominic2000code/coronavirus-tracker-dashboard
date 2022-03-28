import React, { useState, useEffect } from "react";
// import { defaults } from "react-chartjs-2";
import GlobalDeathsBar from "./global_deaths_bar";
import GlobalDataLine from "./global_line";
import GlobalChangesBar from "./global_changes_bar";
import CFRContainer from "./global_cfr";
import GlobalVaccineLine from "./global_vaccines_line";
import { Link } from "react-router-dom";

const GlobalGraphContainer = (props) => {
	const [data, setData] = useState([]);

	const getData = () => {
		let worldData = [];
		let data = props.data;
		let countryArray = Object.keys(data).map((i) => i);
		countryArray.forEach((country) => {
			let countryData = data[country];
			countryData.forEach((day, index) => {
				if (worldData[index] === undefined) {
					let globalStats = {
						date: day.date,
						confirmed: day.confirmed,
						recovered: day.recovered,
						deaths: day.deaths,
					};
					worldData.push(globalStats);
				} else {
					worldData[index].confirmed += day.confirmed;
					worldData[index].recovered += day.recovered;
					worldData[index].deaths += day.deaths;
				}
			});
		});

		setData(worldData);
	};

	useEffect(() => {
		getData();
	}, []);

	const createLineLabels = () => {
		const labelData = [];
		const countryData = data;
		if (countryData !== undefined) {
			countryData.forEach((date) => {
				if (date.deaths !== 0) {
					labelData.push(date.date);
				}
			});
			return labelData;
		}
	};

	// defaults.global.defaultFontColor = "black";
	return (
		<div id="graph">
			<Link to="/" className="btn-link">
				<button className="btn">Home</button>
			</Link>{" "}
			<h2>Global Data From Day of First Death</h2>
			<br></br>
			<br></br>
			<div id="l">
				<GlobalDataLine
					createLineLabels={createLineLabels()}
					data={data}
				/>
			</div>
			<div id="b">
				<GlobalVaccineLine />
			</div>
			<div id="b">
				<GlobalDeathsBar countries={props.countries} />
			</div>
			<div id="b">
				<GlobalChangesBar data={data} />
			</div>
			<div id="b">
				<CFRContainer
					data={data}
					createLineLabels={createLineLabels()}
				/>
			</div>
		</div>
	);
};

export default GlobalGraphContainer;
