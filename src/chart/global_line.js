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

const GlobalDataLine = (props) => {
	const createLineData = (countryData, type) => {
		const graphData = {
			deaths: [],
			confirmed: [],
			recoveries: [],
		};

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
	// console.log(createLineData(props.data, "confirmed"));
	const line = {
		labels: props.createLineLabels,
		datasets: [
			{
				label: "Cases",
				data: createLineData(props.data, "confirmed"),
				fill: false,
				backgroundColor: "rgba(24,162,184, 0.2)",
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
				data: createLineData(props.data, "deaths"),
				fill: false,
				backgroundColor: "rgba(255,99,132,0.2)",
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
				data: createLineData(props.data, "recovered"),
				fill: false,
				backgroundColor: "rgba(40, 167, 69, 0.2)",
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

	// const options = {
	// 	scales: {
	// 		xAxes: [
	// 			{
	// 				ticks: {
	// 					display: true,
	// 					major: {
	// 						fontStyle: "bold",
	// 						fontColor: "#FFFFFF",
	// 					},
	// 				},
	// 				gridLines: {
	// 					display: false,
	// 					drawBorder: true,
	// 				},
	// 				scaleLabel: {
	// 					display: true,
	// 					labelString: "Date (YYYY/MM/DD)",
	// 					fontStyle: "bold",
	// 					fontColor: "#FFFFFF",
	// 				},
	// 			},
	// 		],
	// 		yAxes: [
	// 			{
	// 				ticks: {
	// 					display: true,
	// 					major: {
	// 						fontStyle: "bold",
	// 						fontColor: "#FFFFFF",
	// 					},
	// 				},
	// 				gridLines: {
	// 					display: true,
	// 					drawBorder: true,
	// 				},
	// 				scaleLabel: {
	// 					display: true,
	// 					labelString: "No of People",
	// 					fontStyle: "bold",
	// 					fontColor: "#FFFFFF",
	// 				},
	// 			},
	// 		],
	// 	},
	// 	legend: {
	// 		display: true,
	// 		position: "top",
	// 		align: "center",
	// 		labels: {
	// 			fontSize: 12,
	// 			fontStyle: "bold",
	// 			fontColor: "#FFFFFF",
	// 			usePointStyle: false,
	// 		},
	// 	},
	// 	lineTension: 3,
	// 	borderWidth: 2,
	// };

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
				text: "Global Coronavirus Trend line",
			},
		},
		lineTension: 3,
		borderWidth: 2,
	};

	return (
		<div>
			<h4>Confirmed Cases, Deaths and Recoveries</h4>
			<br></br>
			<div id="description">
				<p>
					This represents the increase over time for confirmed cases,
					deaths and recoveries globally.
				</p>
			</div>
			<br></br>
			<Line data={line} options={options} />
		</div>
	);
};

export default GlobalDataLine;
