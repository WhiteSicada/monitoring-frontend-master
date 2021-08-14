import React, { useEffect, useState } from "react";
import PageHeader from "../Header/PageHeader";
import { FaTasks } from "react-icons/fa";
import ScansHelper from "./ScansHelper";
import useTable from "../controls/useTable";
import { Controls } from "../controls/controls";
import { Search } from "@material-ui/icons";
import { Paper, Toolbar, InputAdornment } from "@material-ui/core";
import ScansTable from "./ScansTable";
import ViewScan from "./ViewScan";

export function Main({ match }) {
	const classes = ScansHelper.useStyles();

	const [testScans, setTestScans] = useState([]);

	useEffect(() => {
		ScansHelper.getTestScans(match.params.test_id, setTestScans);
	}, [match.params.test_id]);

	const [filterFn, setFilterFn] = useState({
		fn: (testScans) => {
			return testScans;
		},
	});
  const [openViewPopup, setOpenViewPopup] = useState(false);
  const [currentScan, setCurrentScan] = useState(null);
  const openInViewPopup = (scan) => {
		setCurrentScan(scan);
		setOpenViewPopup(true);
	};
	const { TblContainer, TblHead, TblPagination, recordsAfterPadingAndSorting } =
		useTable(testScans, ScansHelper.headCells, filterFn);

	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (testScans) => {
				if (target.value == "") return testScans;
				else return testScans.filter((x) => x.endpoint.includes(target.value));
			},
		});
	};
	return (
		<div>
			<PageHeader
				title="Test Scans Section"
				subTitle="History of Test Scans"
				icon={<FaTasks />}
			/>
			<Paper className={classes.pageContent}>
				{/* <EmployeeForm /> */}
				<Toolbar>
					<Controls.Input
						label="Search Endpoint"
						className={classes.searchInput}
						id="search"
						InputProps={{
							startAdornment: (
								<InputAdornment position="start">
									<Search />
								</InputAdornment>
							),
						}}
						onChange={handleSearch}
					/>
				</Toolbar>
				<TblContainer>
					<TblHead />
					<ScansTable
						recordsAfterPadingAndSorting={recordsAfterPadingAndSorting}
            openInViewPopup={openInViewPopup}
					/>
				</TblContainer>
				<TblPagination />
			</Paper>
      <Controls.Popup
				title="View Scan"
				openPopup={openViewPopup}
				setOpenPopup={setOpenViewPopup}
			>
				<ViewScan currentScan={currentScan} />
			</Controls.Popup>
		</div>
	);
}
