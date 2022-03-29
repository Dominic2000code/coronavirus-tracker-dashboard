import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
	MenuItem,
	FormControl,
	Select,
	Card,
	CardContent,
} from "@material-ui/core";
import InfoBox from "./infoBox";
import Table from "./Table";
import {
	sortData,
	prettyPrintStat,
	sortDataDeaths,
	sortDataRecovered,
} from "./utils";
import numeral from "numeral";
import Map from "./Map";
import ref_country_codes from "./assets/countries-lat-long.json";
import us_codes from "./assets/USlatlong.json";
import "leaflet/dist/leaflet.css";

const Home = () => {
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
	const [countriesInteger, setCountriesInteger] = useState([]);
	const [timeSeries, setTimeSeries] = useState([]);
	const [totalInt, setTotalInt] = useState([]);
	const [chartLoaded, setChartLoaded] = useState(false);

	useEffect(() => {
		fetch("https://disease.sh/v3/covid-19/all")
			.then((response) => response.json())
			.then((data) => {
				setCountryInfo(data);
			})
			.catch((err) => console.log(err));
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
				})
				.catch((err) => console.log(err));
		};

		getCountriesData();
	}, [tableState]);

	const fixTimeSeriesUS = (res3) => {
		res3["USA"] = res3["US"];
		res3["S. Korea"] = res3["Korea, South"];
		res3["Taiwan"] = res3["Taiwan*"];
		delete res3["Taiwan*"];
		delete res3["Korea, South"];
		delete res3["US"];
		return res3;
	};

	const toInteger = (totalArray) => {
		var newTotalCases = parseInt(
			totalArray["total_cases"].replace(/,/g, "")
		);
		var newTotalDeaths = parseInt(
			totalArray["total_deaths"].replace(/,/g, "")
		);
		var newTotalRecoveries = parseInt(
			totalArray["total_recovered"].replace(/,/g, "")
		);
		return [newTotalCases, newTotalDeaths, newTotalRecoveries];
	};

	const makeCountriesInteger = (countries, states) => {
		const countriesInteger = [];
		ref_country_codes.ref_country_codes.forEach((one) => {
			countries.forEach((two) => {
				if (one.country === two.country_name) {
					let intTotalConfirmed = parseInt(
						two.cases.replace(/,/g, "")
					);
					let intTotalDeaths = parseInt(two.deaths.replace(/,/g, ""));
					let cfr = (intTotalDeaths / intTotalConfirmed) * 100;

					countriesInteger.push({
						country: two.country_name,
						recovered: parseInt(
							two.total_recovered.replace(/,/g, "")
						),
						deaths: parseInt(two.deaths.replace(/,/g, "")),
						confirmed: parseInt(two.cases.replace(/,/g, "")),
						center: { lat: one.latitude, lng: one.longitude },
						newCases: parseInt(two.new_cases.replace(/,/g, "")),
						newDeaths: parseInt(two.new_deaths.replace(/,/g, "")),
						activeCases: parseInt(
							two.active_cases.replace(/,/g, "")
						),
						criticalCases: parseInt(
							two.serious_critical.replace(/,/g, "")
						),
						perOneMillion: parseInt(
							two.total_cases_per_1m_population.replace(/,/g, "")
						),
						cfr: parseFloat(cfr.toFixed(2)),
					});
				}
			});
		});

		us_codes.us_codes.forEach((state) => {
			states.forEach((obj) => {
				if (obj.state === "Georgia") {
					obj.state = "Georgia, US";
				}
				if (obj.state === state.state) {
					countriesInteger.push({
						us: true,
						country: state.state,
						recovered: obj.recovered,
						deaths: obj.deaths,
						confirmed: obj.confirmed,
						center: { lat: state.latitude, lng: state.longitude },
						cfr: parseFloat(
							((obj.deaths / obj.confirmed) * 100).toFixed(2)
						),
					});
				}
			});
		});
		return countriesInteger;
	};

	useEffect(() => {
		Promise.all([
			fetch(
				"https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
				{
					method: "GET",
					headers: {
						"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
						"x-rapidapi-key":
							"2bb49386fdmsh5daac6ca9add22ep1484a8jsn9816903163ef",
					},
				}
			),
			fetch(
				"https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
				{
					method: "GET",
					headers: {
						"x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
						"x-rapidapi-key":
							// "2bb49386fdmsh5daac6ca9add22ep1484a8jsn9816903163ef"
							"a04279196bmsh77bb3ff9e6f2e74p1f4d03jsn5bc0fbe15879",
					},
				}
			),
			fetch("https://covid19-data.p.rapidapi.com/us", {
				method: "GET",
				headers: {
					"x-rapidapi-host": "covid19-data.p.rapidapi.com",
					"x-rapidapi-key":
						"2bb49386fdmsh5daac6ca9add22ep1484a8jsn9816903163ef",
				},
			}),
			fetch("https://pomber.github.io/covid19/timeseries.json"),
		])
			.then(([res1, res2, res3, res4]) => {
				return Promise.all([
					res1.json(),
					res2.json(),
					res3.json(),
					res4.json(),
				]);
			})
			.then(([res1, res2, res3, res4]) => {
				setCountriesInteger(
					makeCountriesInteger(res2.countries_stat, res3.list)
				);
				setTimeSeries(fixTimeSeriesUS(res4));
				setTotalInt(toInteger(res1));

				// console.log(res1);
				setChartLoaded(true);
			})
			.catch((err) => console.log(err));
	}, []);

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
			})
			.catch((err) => console.log(err));
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

	// console.log(casesType);
	return (
		<React.Fragment>
			<div className="app">
				<div className="app__left">
					<div className="app__header">
						<h1>COVID-19 Tracker Dashboard</h1>

						<Link to="/global">
							<button className="btn">Global Stats</button>
						</Link>

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
							total={numeral(countryInfo.recovered).format(
								"0.0a"
							)}
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
								<button
									className="btn"
									onClick={onTableDataChange}
								>
									Cases
								</button>
								<button
									className="btn"
									onClick={onTableDataChange}
								>
									Recovered
								</button>
								<button
									className="btn"
									onClick={onTableDataChange}
								>
									Deaths
								</button>
							</div>
							<p> Highest to Lowest </p>
							<Table
								countries={tableData}
								tableState={tableState}
								countries_={countriesInteger}
								totalInt={totalInt}
								timeSeries={timeSeries}
							/>
						</div>
					</CardContent>
				</Card>
			</div>
			<footer>
				<a href="https://github.com/davidpaps/covid_19_mapper">
					Github repo charts
				</a>
				&nbsp;&nbsp;Data Sources:{" "}
				<a href="https://github.com/CSSEGISandData/COVID-19">
					John Hopkins
				</a>
				,{" "}
				<a href="https://www.worldometers.info/coronavirus/">
					Worldometer
				</a>
				, <a href="https://github.com/pomber/covid19">Pomber</a>,
				<a href="https://disease.sh/">Disease.sh</a>
			</footer>
		</React.Fragment>
	);
};

export default Home;
