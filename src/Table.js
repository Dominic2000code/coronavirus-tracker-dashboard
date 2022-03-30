import React, { useState } from "react";
import "./Table.css";
import numeral from "numeral";
import CountryGraphContainer from "./country_charts/country_graph";

function Table({
	countries,
	tableState,
	timeSeries,
	countries_,
	totalInt,
	chartLoaded,
}) {
	const [showModal, setShowModal] = useState("hidden");
	const [countryClicked, setCountryClicked] = useState("");

	const onRowClick = (country) => {
		setCountryClicked(country);
		setShowModal("show-modal");
	};

	// console.log(countries);
	return (
		<React.Fragment>
			<div className={`modal ${showModal} `}>
				<button
					onClick={() => setShowModal("hidden")}
					className="close-modal"
				>
					&times;
				</button>
				<div id="graph-container">
					<br></br>
					<CountryGraphContainer
						country={
							countryClicked === "UK"
								? "United Kingdom"
								: countryClicked
						}
						countries={countries_}
						total={totalInt}
						timeSeries={timeSeries}
					/>
				</div>
			</div>
			{/* <div className={`overlay ${showModal}`}></div> */}

			<div className="table">
				<table>
					<tbody>
						{countries.map(
							({ country, cases, deaths, recovered }) => (
								<tr onClick={() => onRowClick(country)}>
									<td> {country} </td>
									<td>
										<strong>
											{tableState === "Cases"
												? numeral(cases).format("0,0")
												: tableState === "Recovered"
												? numeral(recovered).format(
														"0,0"
												  )
												: numeral(deaths).format("0,0")}
										</strong>
									</td>
								</tr>
							)
						)}
					</tbody>
				</table>
			</div>
		</React.Fragment>
	);
}

export default Table;
