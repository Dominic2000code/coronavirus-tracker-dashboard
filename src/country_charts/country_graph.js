import React from "react";
import CountryLineData from "./country_data_line";
import DailyChangesBar from "./daily_changes_bar";
import CFRContainer from "./country_cfr";
import ComparisonLineContainer from "./comparison_line";

const CountryGraphContainer = (props) => {
	const createLineLabels = () => {
		const labelData = [];
		const countryData = props.timeSeries[props.country];
		if (countryData !== undefined) {
			countryData.forEach((date) => {
				if (date.deaths !== 0) {
					labelData.push(date.date);
				}
			});
			return labelData;
		}
	};

	const makeTop10Data = () => {
		var countryData = [];
		var names = [];
		var data = props.countries;
		data.map((country) => {
			if (country.us === undefined) {
				countryData.push(country);

				countryData.sort((a, b) => {
					return a.confirmed < b.confirmed ? 1 : -1;
				});
			}
		});
		countryData.forEach((country) => {
			names.push(country.country);
		});
		return names.slice(0, 10);
	};

	return (
		<div>
			<br></br>
			<div id="l-m">
				<CountryLineData
					createLineLabels={createLineLabels()}
					country={props.country}
					data={props.timeSeries}
					total={props.total}
					countries={props.countries}
				/>
			</div>
			{/* <div id="b-m">
				<ComparisonLineContainer
					data={props.timeSeries}
					top10Data={makeTop10Data()}
					lineLabels={createLineLabels()}
					selected={props.country}
				/>
			</div> */}
			<div id="b-m">
				<DailyChangesBar
					data={props.timeSeries}
					country={props.country}
				/>
			</div>
			<div id="b-m">
				<CFRContainer
					data={props.timeSeries}
					country={props.country}
					createLineLabels={createLineLabels()}
				/>
			</div>
		</div>
	);
};

export default CountryGraphContainer;
