import React, { useState } from "react";
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
import popData from "../assets/popData.json";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend
);

const ComparisonLineContainer = (props) => {
	const [button, setButton] = useState(false);
	const [million, setMillion] = useState(false);

	const createComparisonData = (index) => {
		if (props.data !== undefined && props.top10Data[index] !== undefined) {
			const top10Data = {
				confirmed: [],
				deaths: [],
			};
			var country = props.top10Data[index];
			props.data[country].forEach((day) => {
				if (day.deaths !== 0) {
					top10Data.confirmed.push(day.confirmed);
					top10Data.deaths.push(day.deaths);
				}
			});
			if (button) {
				return top10Data.deaths;
			} else {
				return top10Data.confirmed;
			}
		}
	};

	const createComparison1mData = (index) => {
		if (props.data !== undefined && props.top10Data[index] !== undefined) {
			const top10Data = {
				confirmed: [],
				deaths: [],
			};
			let pop;
			var country = props.top10Data[index];
			popData.popData.forEach((obj) => {
				if (obj.name === country) {
					pop = obj.pop2020;
					return pop;
				}
			});
			props.data[country].forEach((day) => {
				if (day.deaths !== 0) {
					top10Data.confirmed.push(
						(
							day.confirmed /
							(parseFloat(pop.replace(/,/g, "")) / 1000)
						).toFixed(0)
					);
					top10Data.deaths.push(
						(
							day.deaths /
							(parseFloat(pop.replace(/,/g, "")) / 1000)
						).toFixed(0)
					);
				}
			});
			if (button) {
				return top10Data.deaths;
			} else {
				return top10Data.confirmed;
			}
		}
	};

	const createComparisonLabels = (index) => {
		if (props.top10Data !== undefined) {
			return props.top10Data[index];
		}
	};

	const createDates = () => {
		let array_of_lengths = [];
		let max_len;
		if (
			props.top10Data[0] !== undefined &&
			props.selected !== undefined &&
			props.data !== undefined
		) {
			if (props.selected !== "China") {
				let allCountries = props.top10Data;
				allCountries.forEach((country) => {
					let place = [];

					props.data[country].forEach((day) => {
						if (day.deaths !== 0) {
							place.push(day);
						}
					});
					array_of_lengths.push(place.length);
				});
				max_len = Math.max(...array_of_lengths);
			} else {
				let place = [];
				props.data["China"].forEach((day) => {
					if (day.deaths !== 0) {
						place.push(day);
					}
				});
				array_of_lengths.push(place.length);
				max_len = Math.max(...array_of_lengths);
			}
			return Array.from(Array(max_len).keys());
		}
	};

	const createLineData = () => {
		let country = {
			confirmed: [],
			deaths: [],
		};

		let countryData = [];

		if (props.data[props.selected] !== undefined) {
			countryData.push(props.data[props.selected]);
			countryData[0].forEach((date) => {
				if (date.deaths !== 0) {
					country.confirmed.push(date.confirmed);
					country.deaths.push(date.deaths);
				}
			});

			if (button) {
				return country.deaths;
			} else {
				return country.confirmed;
			}
		}
	};

	const createLine1mData = () => {
		if (props.data[props.selected] !== undefined) {
			let country = {
				confirmed: [],
				deaths: [],
			};

			let countryData = [];

			let pop;
			let selected = props.selected;
			popData.popData.forEach((obj) => {
				if (obj.name === selected) {
					pop = obj.pop2020;
					return pop;
				}
			});

			countryData.push(props.data[props.selected]);
			countryData[0].forEach((date) => {
				if (date.deaths !== 0) {
					country.confirmed.push(
						(
							date.confirmed /
							(parseFloat(pop.replace(/,/g, "")) / 1000)
						).toFixed(0)
					);
					country.deaths.push(
						(
							date.deaths /
							(parseFloat(pop.replace(/,/g, "")) / 1000)
						).toFixed(0)
					);
				}
			});

			if (button) {
				return country.deaths;
			} else {
				return country.confirmed;
			}
		}
	};

	const generateDataSets = () => {
		let top10 = [];
		var country = props.top10Data;
		let casesColours = [
			"#008FB2",
			"#00A3B9",
			"#39AABB",
			"#5FB2BE",
			"#7ABBC1",
			"#95C3C4",
			"#AFCCC7",
			"#C8D6CA",
			"#E2E0CD",
			"#FDE9CD",
		];
		let deathColours = [
			"#CD1F43",
			"#CC3B49",
			"#CD524F",
			"#CE6555",
			"#CF765B",
			"#D08661",
			"#D19768",
			"#D2AA6F",
			"#D3BA75",
			"#D5CB7B",
		];
		if (props.top10Data[props.selected] === undefined) {
			if (country.includes(props.selected)) {
				country.forEach((country, i) => {
					if (country !== props.selected) {
						top10.push({
							label: country,
							data: million
								? createComparison1mData(i)
								: createComparisonData(i),
							fill: false,
							hidden: true,
							backgroundColor: button
								? deathColours[i]
								: casesColours[i],
							borderColor: button
								? deathColours[i]
								: casesColours[i],
							borderWidth: 2,
							pointBackgroundColor: button
								? deathColours[i]
								: casesColours[i],
							pointBorderColor: "#000000",
							pointBorderWidth: 0.5,
							pointStyle: "rectRounded",
							pointRadius: 2.5,
							pointHitRadius: 4,
							pointHoverRadius: 5,
							hoverBackgroundColor: "#FFFFFF",
						});
					}
					if (country === props.selected) {
						top10.unshift({
							label: country,
							data: million
								? createLine1mData()
								: createLineData(),
							fill: false,
							hidden: false,
							backgroundColor: "#fbbd08",
							borderColor: "#fbbd08",
							borderWidth: 2,
							pointBackgroundColor: "#fbbd08",
							pointBorderColor: "#fbbd08",
							pointBorderWidth: 0.5,
							pointStyle: "rectRounded",
							pointRadius: 2.5,
							pointHitRadius: 4,
							pointHoverRadius: 5,
							hoverBackgroundColor: "#FFFFFF",
						});
					}
				});
			} else {
				country.forEach((country, i) => {
					top10.push({
						label: country,
						data: million
							? createComparison1mData(i)
							: createComparisonData(i),
						fill: false,
						hidden: true,
						backgroundColor: button
							? deathColours[i]
							: casesColours[i],
						borderColor: button ? deathColours[i] : casesColours[i],
						borderWidth: 2,
						pointBackgroundColor: button
							? deathColours[i]
							: casesColours[i],
						pointBorderColor: "#000000",
						pointBorderWidth: 0.5,
						pointStyle: "rectRounded",
						pointRadius: 2.5,
						pointHitRadius: 4,
						pointHoverRadius: 5,
						hoverBackgroundColor: "#FFFFFF",
					});
				});
				top10.unshift({
					label: props.selected,
					data: million ? createLine1mData() : createLineData(),
					fill: false,
					hidden: false,
					backgroundColor: "#fbbd08",
					borderColor: "#fbbd08",
					borderWidth: 2,
					pointBackgroundColor: "#fbbd08",
					pointBorderColor: "#fbbd08",
					pointBorderWidth: 0.5,
					pointStyle: "rectRounded",
					pointRadius: 2.5,
					pointHitRadius: 4,
					pointHoverRadius: 5,
					hoverBackgroundColor: "#FFFFFF",
				});
			}
			return top10;
		}
	};

	const handleClick = () => {
		setButton(!button);
	};

	const handleClickMillion = () => {
		setMillion(!million);
	};

	const line = {
		labels: createDates(),
		datasets: generateDataSets(),
	};

	const options = {
		responsive: true,
		plugins: {
			title: {
				display: true,
				text: "Comparison Chart",
			},
			legend: {
				position: "top",
				labels: {
					fontSize: 12,
					fontStyle: "bold",
					usePointStyle: false,
				},
			},
			tooltips: !button
				? {
						callbacks: {
							title: function (tooltipItems, data) {
								if (data !== undefined) {
									return [
										data.datasets[
											tooltipItems[0].datasetIndex
										]["label"],
									];
								}
							},
							label: function (tooltipItems, data) {
								return (
									"Cases: " +
									data.datasets[tooltipItems.datasetIndex]
										.data[tooltipItems.index] +
									"   Day: " +
									data.labels[tooltipItems.index]
								);
							},
						},
				  }
				: {
						callbacks: {
							title: function (tooltipItems, data) {
								if (data !== undefined) {
									return [
										data.datasets[
											tooltipItems[0].datasetIndex
										]["label"],
									];
								}
							},
							label: function (tooltipItems, data) {
								return (
									"Deaths: " +
									data.datasets[tooltipItems.datasetIndex]
										.data[tooltipItems.index] +
									"   Day: " +
									data.labels[tooltipItems.index]
								);
							},
						},
				  },
		},
		lineTension: 3,
		borderWidth: 2,
	};

	return (
		<React.Fragment>
			{!button && (
				<div>
					<h4>{`${props.selected}`} Case Comparison</h4>
					<br></br>
					<div id="description">
						<p>
							This represents{" "}
							{props.selected === "United Kingdom" ||
							props.selected === "United Kingdom"
								? `the ${props.selected}'s`
								: `${props.selected}'s`}{" "}
							cases in comparison to the 10 countries with the
							highest number of cases globally. Adjusting the
							figures to per million of population controls for
							the difference in population sizes between
							countries.
						</p>
					</div>
					<br></br>
					<button onClick={handleClick} className={"m-2 btn"}>
						Show Deaths
					</button>
					{million && (
						<div>
							<button
								onClick={handleClickMillion}
								className={"m-2 btn"}
							>
								Show Raw Stats
							</button>
						</div>
					)}
					{!million && (
						<div>
							<button
								onClick={handleClickMillion}
								className={"m-2 btn"}
							>
								Show Adjusted per 1 Million People
							</button>
						</div>
					)}
				</div>
			)}
			{button && (
				<div>
					<h4>{`${props.selected}`} Death Comparison</h4>
					<br></br>
					<div id="description">
						<p>
							This represents{" "}
							{props.selected === "United Kingdom" ||
							props.selected === "United Kingdom"
								? `the ${props.selected}'s`
								: `${props.selected}'s`}{" "}
							deaths in comparison to the 10 countries with the
							highest number of cases globally. Adjusting the
							figures to per million of population controls for
							the difference in population sizes between
							countries.
						</p>
					</div>
					<br></br>
					<button onClick={handleClick} className={"m-2 btn"}>
						Show Cases
					</button>
					{million && (
						<div>
							<button
								onClick={handleClickMillion}
								className={"m-2 btn"}
							>
								Show Raw Stats
							</button>
						</div>
					)}
					{!million && (
						<div>
							<button
								onClick={handleClickMillion}
								className={"m-2 btn"}
							>
								Show Adjusted per 1 Million People
							</button>
						</div>
					)}
				</div>
			)}
			<div>
				<br></br>
				<Line data={line} options={options} />
			</div>
			<br></br>
			<div id="description">
				NB: Population Figures are taken as of March 2020
			</div>
		</React.Fragment>
	);
};

export default ComparisonLineContainer;
