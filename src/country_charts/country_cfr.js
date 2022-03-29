import React from "react";
import { Line } from "react-chartjs-2";
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

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const CFRContainer = (props) => {
	const createCFRData = () => {
		const graphData = [];

		if (props.data[props.country] !== undefined) {
			props.data[props.country].forEach((date) => {
				if (date.deaths !== 0) {
					graphData.push(
						((date.deaths / date.confirmed) * 100).toFixed(2)
					);
				}
			});
			return graphData;
		}
	};

	const createLabels = () => {
		if (props.createLineLabels !== undefined) {
			return props.createLineLabels;
		}
	};

	const line = {
		labels: createLabels(),
		datasets: [
			{
				label: "C.F.R (%)",
				data: createCFRData(),
				fill: false,
				backgroundColor: "#fbbd088",
				borderColor: "#fbbd08",
				borderWidth: 2,
				pointBackgroundColor: "#fbbd08",
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
				text: "Case Fatality Rate",
			},
		},
		lineTension: 3,
		borderWidth: 2,
	};
	const ascii = "C.F.R = (Total Global Deaths/Total Global Cases) x 100";

	return (
		<div>
			<h4> Case Fatality Rate </h4>
			<br></br>
			<div id="equation" style={{ fontSize: "15px"}}>
				{ascii}
			</div>
			<br></br>
			<div id="description">
				<p style={{ fontSize: "15px" }}>
					This represents the percentage of confirmed cases that
					result in deaths in{" "}
					{props.country === "United Kingdom" ||
					props.country === "United Kingdom"
						? `the ${props.country}`
						: `${props.country}`}{" "}
					across time.
				</p>
			</div>
			<br></br>
			<Line data={line} options={options} />
		</div>
	);
};

export default CFRContainer;
