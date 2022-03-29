import React from "react";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const CountryDataLine = (props) => {
	const createLineData = (type) => {
		const graphData = {
			deaths: [],
			confirmed: [],
			recoveries: [],
		};

		const countryData = props.data[props.country];

		if (countryData !== undefined) {
			countryData.forEach((date) => {
				if (date.deaths !== 0) {
					graphData.confirmed.push(date.confirmed);
					graphData.deaths.push(date.deaths);
					graphData.recoveries.push(date.recovered);
				}
			});

			if (type === "confirmed") {
				return graphData.confirmed;
			} else if (type === "deaths") {
				return graphData.deaths;
			} else if (type === "recovered") {
				return graphData.recoveries;
			}
		}
	};

	const line = {
		labels: props.createLineLabels,
		datasets: [
			{
				label: "Cases",
				data: createLineData("confirmed"),
				fill: false,
				backgroundColor: "#18A2B8",
				borderColor: "#18A2B8",
				borderWidth: 2,
				pointBackgroundColor: "#18A2B8",
				pointBorderColor: "#000000",
				pointBorderWidth: 0.5,
				pointStyle: "rectRounded",
				pointRadius: 4,
				pointHitRadius: 5,
				pointHoverRadius: 5,
				hoverBackgroundColor: "#FFFFFF",
			},
			{
				label: "Deaths",
				data: createLineData("deaths"),
				fill: false,
				backgroundColor: "#dc3644",
				borderColor: "#dc3644",
				borderWidth: 2,
				pointBackgroundColor: "#dc3644",
				pointBorderColor: "#000000",
				pointBorderWidth: 0.5,
				pointStyle: "rectRounded",
				pointRadius: 4,
				pointHitRadius: 5,
				pointHoverRadius: 5,
				hoverBackgroundColor: "#FFFFFF",
			},
			{
				label: "Recoveries",
				data: createLineData("recovered"),
				fill: false,
				backgroundColor: "#28a745",
				borderColor: "#28a745",
				borderWidth: 2,
				pointBackgroundColor: "#28a745",
				pointBorderColor: "#000000",
				pointBorderWidth: 0.5,
				pointStyle: "rectRounded",
				pointRadius: 4,
				pointHitRadius: 5,
				pointHoverRadius: 5,
				hoverBackgroundColor: "#FFFFFF",
			},
		],
	};

	const options = {
		responsive: true,
		plugins: {
			legend: {
				position: "top",
				labels: {
					fontSize: 12,
					fontStyle: "bold",
					usePointStyle: false,
				},
			},
			title: {
				display: true,
				text: `${props.country} Coronavirus Trend line`,
			},
		},
		lineTension: 3,
		borderWidth: 2,
	};

	return (
		<React.Fragment>
			<div>
				<h4>
					{`${props.country}`} Confirmed Cases, Deaths and Recoveries
				</h4>
				<br></br>
				<div id="description">
					<p style={{ fontSize: "15px" }}>
						This represents the increase over time for confirmed
						cases, deaths and recoveries in {`${props.country}`}.
					</p>
				</div>
				<br></br>
				<br></br>
				<br></br>
				<Line data={line} options={options} />
			</div>
		</React.Fragment>
	);
};

export default CountryDataLine;
