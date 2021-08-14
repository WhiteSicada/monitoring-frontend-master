import React, { useState, useEffect } from "react";
import { FaTasks } from "react-icons/fa";
import PageHeader from "../Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../controls/useTable";
import { Controls } from "../controls/controls";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "@material-ui/icons";
import { Paper, makeStyles, Toolbar, InputAdornment } from "@material-ui/core";
import TestTable from "./TestTable";
import { deleteTest, getTests } from "../../redux/actions/TestActions";
import { getAPIs } from "../../redux/actions/ApiActions";
import TestForm from "../../Forms/Test/TestForm";
import TestCreationForm from "../../Forms/Test/TestFormCreation";
import ManageApisTransferList from "./ManageApisTransferList";

const useStyles = makeStyles((theme) => ({
	pageContent: {
		padding: theme.spacing(3),
	},
	searchInput: {
		width: "75%",
	},
	newButton: {
		position: "absolute",
		right: "10px",
	},
}));

const headCells = [
	// { id: "id", label: "Team Id" },
	{ id: "name", label: "Test Name" },
	{ id: "interval", label: "Test Interval" },
	{ id: "number_apis", label: "Number of Apis" },
	{ id: "apis_names", label: "Test Apis" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export function Main() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [openPopup, setOpenPopup] = useState(false);
	const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
	const [testForEdit, setTestForEdit] = useState(null);
	const [notify, setNotify] = useState({
		isOpen: false,
		message: "",
		type: "",
	});
	const [confirmDialog, setConfirmDialog] = useState({
		isOpen: false,
		title: "",
		subTitle: "",
	});

	const [filterFn, setFilterFn] = useState({
		fn: (tests) => {
			return tests;
		},
	});
	const openInPopup = (test) => {
		setTestForEdit(test);
		setOpenUpdatePopup(true);
	};
	const [openTransferListPopup, setOpenTransferListPopup] = useState(false);
	// const [openListScan, setOpenListScan] = useState(false);
	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (tests) => {
				if (target.value == "") return tests;
				else return tests.filter((x) => x.name.includes(target.value));
			},
		});
	};
	const openInTransferListPopup = (test) => {
		setTestForEdit(test);
		setOpenTransferListPopup(true);
	};
	// const openInListScan = (test) => {
	// 	setTestForEdit(test);
	// 	setOpenListScan(true);
	// };
	const onDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		dispatch(deleteTest(id))
			.then((response) => {
				setNotify({
					isOpen: true,
					message: "Deleted Successfully",
					type: "warning",
				});
			})
			.catch((error) => {
				console.log("error");
				console.log(error);
			});
	};
	useEffect(() => {
		dispatch(getTests());
		dispatch(getAPIs());
	}, []);
	const tests = useSelector((state) => state.testState.tests);
	const apis = useSelector((state) => state.apiState.apis);
	const { TblContainer, TblHead, TblPagination, recordsAfterPadingAndSorting } =
		useTable(tests, headCells, filterFn);

	return (
		<div>
			<PageHeader
				title="Test Section"
				subTitle="Manage your tests"
				icon={<FaTasks />}
			/>
			<Paper className={classes.pageContent}>
				{/* <EmployeeForm /> */}
				<Toolbar>
					<Controls.Input
						label="Search Test"
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
					<Controls.MuiButton
						text="Add New"
						variant="outlined"
						startIcon={<AddIcon />}
						className={classes.newButton}
						onClick={() => {
							setOpenPopup(true);
							setTestForEdit(null);
						}}
					/>
				</Toolbar>
				<TblContainer>
					<TblHead />
					<TestTable
						recordsAfterPadingAndSorting={recordsAfterPadingAndSorting}
						openInPopup={openInPopup}
						openInTransferListPopup={openInTransferListPopup}
						// openInListScan={openInListScan}
						onDelete={onDelete}
						setConfirmDialog={setConfirmDialog}
					/>
				</TblContainer>
				<TblPagination />
			</Paper>
			<Controls.Popup
				title="Test Form Creation"
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<TestCreationForm
					apis={apis}
					setOpenPopup={setOpenPopup}
					setNotify={setNotify}
				/>
			</Controls.Popup>
			<Controls.Popup
				title="Test Form"
				openPopup={openUpdatePopup}
				setOpenPopup={setOpenUpdatePopup}
			>
				<TestForm
					testForEdit={testForEdit}
					setOpenPopup={setOpenUpdatePopup}
					setNotify={setNotify}
				/>
			</Controls.Popup>
			<Controls.Popup
				title="Test Manage APIs"
				openPopup={openTransferListPopup}
				setOpenPopup={setOpenTransferListPopup}
			>
				<ManageApisTransferList
					apis={apis}
					testForEdit={testForEdit}
					setTestForEdit={setTestForEdit}
					setOpenTransferListPopup={setOpenTransferListPopup}
				/>
			</Controls.Popup>
			<Controls.Notification notify={notify} setNotify={setNotify} />
			<Controls.ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</div>
	);
}
