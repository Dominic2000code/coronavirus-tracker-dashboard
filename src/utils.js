import React from "react";
import numeral from "numeral";
import { Marker, Popup } from "react-leaflet";
import L from "leaflet";

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
// 	iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
// 	iconUrl: require("leaflet/dist/images/marker-icon.png"),
// 	shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
// });

export const sortData = (data) => {
	const sortedData = [...data];

	sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1));
	return sortedData;
};

export const sortDataDeaths = (data) => {
	const sortedData = [...data];

	sortedData.sort((a, b) => (a.deaths > b.deaths ? -1 : 1));
	return sortedData;
};

export const sortDataRecovered = (data) => {
	const sortedData = [...data];

	sortedData.sort((a, b) => (a.recovered > b.recovered ? -1 : 1));
	return sortedData;
};

const markerIcon = new L.Icon({
	iconUrl: require("./covid-19.png").default,
	iconSize: [15, 15],
});

// const casesTypeColors = {
// 	cases: {
// 		hex: "#3676BE",
// 		multiplier: 400,
// 	},
// 	recovered: {
// 		hex: "#7dd71d",
// 		multiplier: 600,
// 	},
// 	deaths: {
// 		hex: "#fb4443",
// 		multiplier: 100,
// 	},
// };

export const prettyPrintStat = (stat) =>
	stat ? `${numeral(stat).format("0,0")}` : "0";
/*
export const showDataOnMap = (data, casesType) => {
	return data.map((country) => (
		<Circle
			center={[country.countryInfo.lat, country.countryInfo.long]}
			fillOpacity={0.4}
			pathOptions={{
				color: casesTypeColors[casesType].hex,
				fillColor: casesTypeColors[casesType].hex,
			}}
			radius={
				Math.sqrt(country[casesType] / 10) *
				casesTypeColors[casesType].multiplier
			}
		>
			<Popup>
				<div className="info-container">
					<div
						className="info-flag"
						style={{
							backgroundImage: `url(${country.countryInfo.flag})`,
						}}
					/>
					<div className="info-name">{country.country}</div>
					<div className="info-confirmed">
						Cases: {numeral(country.cases).format("0,0")}
					</div>
					<div className="info-recovered">
						Recovered: {numeral(country.recovered).format("0,0")}
					</div>
					<div className="info-deaths">
						Deaths: {numeral(country.deaths).format("0,0")}
					</div>
				</div>
			</Popup>
		</Circle>
	));
};
*/

export const showDataOnMap = (data, caseType) => {
	return data.map((country) => (
		<Marker
			position={[country.countryInfo.lat, country.countryInfo.long]}
			icon={markerIcon}
		>
			<Popup>
				<div className="info-container">
					<div
						className="info-flag"
						style={{
							backgroundImage: `url(${country.countryInfo.flag})`,
						}}
					/>
					<div className="info-name">{country.country}</div>
					<div className="info-confirmed">
						<strong> Cases </strong>:{" "}
						{numeral(country.cases).format("0,0")}
					</div>
					<div className="info-recovered">
						<strong> Recovered </strong>:{" "}
						{numeral(country.recovered).format("0,0")}
					</div>
					<div className="info-deaths">
						<strong> Deaths </strong>:{" "}
						{numeral(country.deaths).format("0,0")}
					</div>
					<div className="date-updated">
						<strong>Last Update </strong>:{" "}
						{new Date(country.updated).toLocaleString()}
					</div>
				</div>
			</Popup>
		</Marker>
	));
};
