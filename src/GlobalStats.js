import React, { useState, useEffect } from "react";
import ref_country_codes from "./assets/countries-lat-long.json";
import us_codes from "./assets/USlatlong.json";
import GlobalGraphContainer from "./chart/global_graph";

const GlobalStats = () => {
	const [countriesInteger, setCountriesInteger] = useState([]);
	const [timeSeries, setTimeSeries] = useState([]);
	const [vaccinesData, setVaccinesData] = useState([]);
	const [chartLoaded, setChartLoaded] = useState(false);

	// chart data cleanup functions

	const fixTimeSeriesUS = (res3) => {
		res3["USA"] = res3["US"];
		res3["S. Korea"] = res3["Korea, South"];
		res3["Taiwan"] = res3["Taiwan*"];
		delete res3["Taiwan*"];
		delete res3["Korea, South"];
		delete res3["US"];
		return res3;
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
			fetch("https://disease.sh/v3/covid-19/vaccine/coverage/countries"),
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
				setVaccinesData(res1);
				// console.log(res1);
				setChartLoaded(true);
			});
	}, []);

	return (
		<div className="App">
			{chartLoaded ? (
				<GlobalGraphContainer
					countries={countriesInteger}
					data={timeSeries}
					vaccinesData={vaccinesData}
				/>
			) : (
				<div>
					<p>Loading...</p>
				</div>
			)}
		</div>
	);
};

export default GlobalStats;
