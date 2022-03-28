import React, { useState, useEffect } from "react";
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
// import numeral from "numeral";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

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
			text: "Global Coronavirus Vaccines",
		},
	},
	lineTension: 3,
	borderWidth: 2,
};

function GlobalVaccineLine({ casesType, ...props }) {
	const [data, setData] = useState({});

	const buildVaccineChart = (data) => {
		let chartData = [];
		let prevData;
		for (let date in data) {
			if (prevData) {
				let newData = {
					x: date,
					y: data[date] - prevData,
				};
				chartData.push(newData);
			}
			prevData = data[date];
		}
		return chartData;
	};

	useEffect(() => {
		const fetchData = async () => {
			await fetch("https://disease.sh/v3/covid-19/vaccine/coverage")
				.then((response) => response.json())
				.then((data) => {
					let chartData = buildVaccineChart(data);
					setData(chartData);
				});
		};
		fetchData();
	}, []);

	const line = {
		datasets: [
			{
				label: "Vaccines rolled-out",
				data: data,
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

	return (
		<div>
			<h4> Vaccines Distributed Globally </h4>
			<br></br>
			<Line data={line} options={options} />
		</div>
	);
}

export default GlobalVaccineLine;
