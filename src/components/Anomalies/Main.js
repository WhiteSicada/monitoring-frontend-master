import React, { useState, useEffect } from "react";
import { FaCubes } from "react-icons/fa";
import PageHeader from "../Header/PageHeader";
import { Paper, makeStyles, Toolbar, InputAdornment } from "@material-ui/core";
import { Controls } from "../controls/controls";
import { Search } from "@material-ui/icons";
import AnomalyHelper from "./AnomalyHelper";
import useTable from "../controls/useTable";
import AnomalyTable from "./AnomalyTable";

const useStyles = makeStyles((theme) => ({
	pageContent: {
		padding: theme.spacing(3),
	},
	searchInput: {
		width: "50%",
		marginLeft: "15%",
	},
	newButton: {
		position: "absolute",
		right: "10px",
	},
}));

export function Main({ match }) {
	const classes = useStyles();
	const [filterFn, setFilterFn] = useState({
		fn: (anomalies) => {
			return anomalies;
		},
	});
	const [apiAnomalies, setApiAnomalies] = useState([]);

	useEffect(() => {
		AnomalyHelper.getApiAnomalies(match.params.api_id, setApiAnomalies);
	}, [match.params.api_id]);

	const { TblContainer, TblHead, TblPagination, recordsAfterPadingAndSorting } =
		useTable(apiAnomalies, AnomalyHelper.headCells, filterFn);
	return (
		<div>
			<PageHeader
				title="Anomaly Section"
				subTitle="Manage your Anomalies"
				icon={<FaCubes />}
			/>

			{apiAnomalies.length == 0 && (
				<h2 style={{ marginLeft: "30%", marginTop: "5%" }}>
					No Anomalies detected. 😄 👍
				</h2>
			)}
			{apiAnomalies.length > 0 && (
			<Paper className={classes.pageContent}>
				<TblContainer>
					<TblHead />
					<AnomalyTable
						recordsAfterPadingAndSorting={recordsAfterPadingAndSorting}
					/>
				</TblContainer>
				<TblPagination />
			</Paper>
			)}
		</div>
	);
}
