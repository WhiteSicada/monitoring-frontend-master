import React from "react";
import { TableBody, TableRow, TableCell, Chip } from "@material-ui/core";
import { FaCheckCircle } from "react-icons/fa";
import { green,red } from "@material-ui/core/colors";
import { AiFillCloseCircle } from "react-icons/ai";

function AnomalyTable({ recordsAfterPadingAndSorting }) {
	function getError(anomaly) {
		var array = anomaly.error.split('"');
		return array[7];
	}
	return (
		<TableBody>
			{recordsAfterPadingAndSorting().map((anomalie, index) => (
				<TableRow key={anomalie.id}>
					<TableCell>{anomalie.error.substring(0, 3)}</TableCell>
					<TableCell>{getError(anomalie)}</TableCell>
					<TableCell>{anomalie.endpoint}</TableCell>
					<TableCell>
						<Chip
							label="Sent to Agents"
							avatar={<FaCheckCircle style={{ color: "white" }} />}
							style={{
								backgroundColor: green[600],
								color: "white",
							}}
						/>
					</TableCell>
					<TableCell>{anomalie.date}</TableCell>
					<TableCell>
						{anomalie.fixed ? (
							<Chip
								label="Problem Solved !"
								avatar={<FaCheckCircle style={{ color: "white" }} />}
								style={{
									backgroundColor: green[600],
									color: "white",
								}}
							/>
						) : (
							<Chip
								label="Agents working on Issue !"
								avatar={<AiFillCloseCircle style={{ color: "white" }} />}
								style={{
									backgroundColor: red[600],
									color: "white",
								}}
							/>
						)}
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

export default AnomalyTable;
