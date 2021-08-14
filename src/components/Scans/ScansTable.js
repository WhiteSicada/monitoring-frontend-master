import React from "react";
import {
	TableBody,
	TableRow,
	TableCell,
	Chip,
	Button,
} from "@material-ui/core";
import { FaCheckCircle } from "react-icons/fa";
import { AiFillCloseCircle, AiOutlineInfoCircle } from "react-icons/ai";

import { green,red } from "@material-ui/core/colors";

function ScansTable({ recordsAfterPadingAndSorting, openInViewPopup }) {
	return (
		<TableBody>
			{recordsAfterPadingAndSorting().map((scan, index) => (
				<TableRow key={scan.id}>
					<TableCell>{scan.creates_at}</TableCell>
					<TableCell>{scan.status}</TableCell>
					<TableCell>{scan.spark}</TableCell>
					<TableCell>
						{scan.successful == "Successful" ? (
							<Chip
								label={scan.successful}
								avatar={<FaCheckCircle style={{ color: "white" }} />}
								style={{
									backgroundColor: green[600],
									color: "white",
								}}
							/>
						) : (
							<Chip
								label={scan.successful}
								avatar={<AiFillCloseCircle style={{ color: "white" }} />}
								style={{
									backgroundColor: red[600],
									color: "white",
								}}
							/>
						)}
					</TableCell>
					<TableCell>{scan.execution_time} ms</TableCell>
					<TableCell>{scan.method}</TableCell>
					<TableCell>{scan.api}</TableCell>
					<TableCell>{scan.url}</TableCell>
					<TableCell>
						<Button
							variant="outlined"
							color="secondary"
							onClick={() => {
								openInViewPopup(scan);
							}}
							startIcon={<AiOutlineInfoCircle />}
						>
							View More
						</Button>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

export default ScansTable;
