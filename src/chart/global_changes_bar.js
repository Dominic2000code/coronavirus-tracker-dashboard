import React, { useState } from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	Title,
	Tooltip,
	Legend
);

const GlobalChangesBar = (props) => {
	const [cases, setCases] = useState(false);

	const barData = () => {
		const daily = [];
		const dailyChange = [];

		const countryData = props.data;
		if (countryData !== undefined) {
			countryData.forEach((country) => {
				if (country.deaths !== 0) {
					daily.push(country.confirmed);
				}
			});

			for (let i = 0; i < daily.length; i++) {
				dailyChange.push(
					parseFloat(daily[i + 1]) - parseFloat(daily[i])
				);
			}

			dailyChange.pop();
			return dailyChange;
		}
	};

	const barDataDeaths = () => {
		const daily = [];
		const dailyChange = [];

		const countryData = props.data;
		if (countryData !== undefined) {
			countryData.forEach((country) => {
				if (country.deaths !== 0) {
					daily.push(country.deaths);
				}
			});

			for (let i = 0; i < daily.length; i++) {
				dailyChange.push(
					parseFloat(daily[i + 1]) - parseFloat(daily[i])
				);
			}

			dailyChange.pop();
			return dailyChange;
		}
	};

	const barLabel = () => {
		const daily = [];

		const countryData = props.data;
		if (countryData !== undefined) {
			countryData.forEach((country) => {
				if (country.deaths !== 0) {
					daily.push(country.date);
				}
			});

			daily.reverse();
			daily.pop();
			daily.reverse();
			return daily;
		}
	};

	const handleClick = () => {
		setCases(!cases);
	};

	const bar = {
		labels: barLabel(),
		datasets: [
			{
				label: "Daily Case Increase",
				data: barData(),
				backgroundColor: "rgba(24,162,184, 0.2)",
				borderColor: "#18a2b8",
				borderWidth: 1,
				hoverBackgroundColor: "#18a2b8",
				hoverBorderColor: "rgba(255,99,132,0.2)",
				pointColor: "#18a2b8",
			},
		],
	};

	const barDeaths = {
		labels: barLabel(),
		datasets: [
			{
				label: "Daily Death Increase",
				data: barDataDeaths(),
				backgroundColor: "rgba(255,99,132,0.2)",
				borderColor: "#dc3644",
				borderWidth: 1,
				hoverBackgroundColor: "#dc3644",
				hoverBorderColor: "rgba(255,99,132,0.2)",
				pointColor: "#dc3644",
			},
		],
	};

	const bDeathOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Deaths",
			},
		},
	};

	const bOptions = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
			},
			title: {
				display: true,
				text: "Cases",
			},
		},
	};
	return (
		<React.Fragment>
			{cases && (
				<div>
					<h4>Daily Death Change</h4>
					<br></br>
					<div id="description">
						<p>
							This represents the daily increase in the number of
							confirmed deaths globally.
						</p>
					</div>
					<br></br>
					<button onClick={handleClick} variant={"info"}>
						Show Cases
					</button>
					<br></br>
					<br></br>
					<Bar data={barDeaths} options={bDeathOptions} />
				</div>
			)}
			{!cases && (
				<div>
					<h4>Daily Case Change</h4>
					<br></br>
					<div id="description">
						<p>
							This represents the daily increase in the number of
							confirmed cases globally.
						</p>
					</div>
					<br></br>
					<button onClick={handleClick} className="btn">
						Show Deaths
					</button>
					<br></br>
					<br></br>
					<Bar data={bar} options={bOptions} />
				</div>
			)}
		</React.Fragment>
	);
};

export default GlobalChangesBar;
