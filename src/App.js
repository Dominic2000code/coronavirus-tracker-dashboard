import React, { useState, useEffect } from "react";
import "./App.css";
import {
	MenuItem,
	FormControl,
	Select,
	Card,
	CardContent,
} from "@material-ui/core";
import InfoBox from "./infoBox";
// import LineGraph from "./LineGraph";
import Table from "./Table";
import {
	sortData,
	prettyPrintStat,
	sortDataDeaths,
	sortDataRecovered,
} from "./utils";
import numeral from "numeral";
import Map from "./Map";
import "leaflet/dist/leaflet.css";

const App = () => {
	const [country, setInputCountry] = useState("worldwide");
	const [countryInfo, setCountryInfo] = useState({});
	const [countries, setCountries] = useState([]);
	const [mapCountries, setMapCountries] = useState([]);
	const [tableData, setTableData] = useState([]);
	const [casesType, setCasesType] = useState("cases");
	const [mapCenter, setMapCenter] = useState({
		lat: 7.9465,
		lng: 1.0232,
	});
	const [mapZoom, setMapZoom] = useState(2);
	const [isLoading, setIsLoading] = useState(false);
	const [tableState, setTableState] = useState("Cases");

	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			});
	}, []);

	useEffect(() => {
		const getCountriesData = async () => {
			fetch("https://disease.sh/v3/covid-19/countries")
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}));
					let sortedData;
					if (tableState === "Cases") {
						sortedData = sortData(data);
					} else if (tableState === "Deaths") {
						sortedData = sortDataDeaths(data);
					} else if (tableState === "Recovered") {
						sortedData = sortDataRecovered(data);
					}
					setCountries(countries);
					setMapCountries(data);
					setTableData(sortedData);
				});
		};

		getCountriesData();
	}, [tableState]);

	// console.log(casesType);

	const onCountryChange = async (e) => {
		setIsLoading(true);
		const countryCode = e.target.value;

		setInputCountry(countryCode);

		const url =
			countryCode === "worldwide"
				? "https://disease.sh/v3/covid-19/all"
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`;
		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setInputCountry(countryCode);
				setCountryInfo(data);
				setIsLoading(false);
				countryCode === "worldwide"
					? setMapCenter([7.9465, 1.0232])
					: setMapCenter([
							data.countryInfo.lat,
							data.countryInfo.long,
					  ]);
				setMapZoom(4);
			});
	};

	const onTableDataChange = (event) => {
		// console.log(event.target.innerText);
		if (event.target.innerText === "Cases") {
			setTableState("Cases");
		} else if (event.target.innerText === "Recovered") {
			setTableState("Recovered");
		} else if (event.target.innerText === "Deaths") {
			setTableState("Deaths");
		}
	};

	// return data ? (
	// 	<LineChart data={data} width={width} height={height} />
	// ) : (
	// 	<div>Loading...</div>
	// );

	return (
		<div className="app">
			<div className="app__left">
				<div className="app__header">
					<h1>COVID-19 Tracker Dashboard</h1>
					<FormControl className="app__dropdown">
						<Select
							variant="outlined"
							value={country}
							onChange={onCountryChange}
						>
							<MenuItem value="worldwide">Worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>
									{country.name}
								</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>
				<div className="app__stats">
					<InfoBox
						onClick={(e) => setCasesType("cases")}
						title="Active Cases"
						isRed
						active={casesType === "cases"}
						className="infoBox__cases"
						cases={prettyPrintStat(countryInfo.todayCases)}
						total={numeral(countryInfo.cases).format("0.0a")}
						isLoading={isLoading}
					/>
					<InfoBox
						onClick={(e) => setCasesType("recovered")}
						title="Recovered"
						active={casesType === "recovered"}
						isLoading={isLoading}
						className="infoBox__recovered"
						cases={prettyPrintStat(countryInfo.todayRecovered)}
						total={numeral(countryInfo.recovered).format("0.0a")}
					/>
					<InfoBox
						onClick={(e) => setCasesType("deaths")}
						title="Deaths"
						isRed
						active={casesType === "deaths"}
						className="infoBox__deaths"
						isLoading={isLoading}
						cases={prettyPrintStat(countryInfo.todayDeaths)}
						total={numeral(countryInfo.deaths).format("0.0a")}
					/>
				</div>
				{mapCountries ? (
					<Map
						center={mapCenter}
						zoom={mapZoom}
						countries={mapCountries}
						casesType={casesType}
					/>
				) : (
					<p>Loading...</p>
				)}
			</div>
			<Card className="app__right">
				<CardContent>
					<div className="app__information">
						<h3> {tableState} by Country</h3>
						<div className="change_buttons">
							<button className="btn" onClick={onTableDataChange}>
								Cases
							</button>
							<button className="btn" onClick={onTableDataChange}>
								Recovered
							</button>
							<button className="btn" onClick={onTableDataChange}>
								Deaths
							</button>
						</div>
						{/* <p> Highest to Lowest </p> */}
						<Table countries={tableData} tableState={tableState} />
						<h3>Worldwide new {casesType}</h3>
						{/* <LineGraph casesType={casesType} /> */}
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default App;
