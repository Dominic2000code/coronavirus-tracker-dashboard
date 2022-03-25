import React from "react";
import "./Table.css";
import numeral from "numeral";

function Table({ countries, tableState }) {
	// console.log(countries);
	return (
		<div className="table">
			<table>
				<tbody>
					{countries.map(({ country, cases, deaths, recovered }) => (
						<tr>
							<td> {country} </td>
							<td>
								<strong>
									{tableState === "Cases"
										? numeral(cases).format("0,0")
										: tableState === "Recovered"
										? numeral(recovered).format("0,0")
										: numeral(deaths).format("0,0")}
								</strong>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Table;
