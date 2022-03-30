import React from "react";
import "./Map.css";
import { MapContainer as LeafletMap, TileLayer, useMap } from "react-leaflet";
// import L from "leaflet";
import { showDataOnMap } from "./utils";

import "leaflet/dist/leaflet.css";

const Map = ({ countries, casesType, center, zoom }) => {
	function ChangeView({ center, zoom }) {
		const map = useMap();
		map.setView(center, zoom);
		return null;
	}
	return (
		<LeafletMap
			className="map"
			center={center}
			zoom={zoom}
			scrollWheelZoom={false}
		>
			<ChangeView center={center} zoom={zoom} />
			<TileLayer
				url="https://api.maptiler.com/maps/streets/256/{z}/{x}/{y}@2x.png?key=DlIebgCmxNwwlxrCYBrK"
				attribution='<a href="https://www.maptiler.com/copyright/" target="_blank">&copy; MapTiler</a> <a href="https://www.openstreetmap.org/copyright" target="_blank">&copy; OpenStreetMap contributors</a>'
			/>
			{showDataOnMap(countries, casesType)}
		</LeafletMap>
	);
};

export default Map;
