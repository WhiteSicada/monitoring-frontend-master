import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import PageHeader from "../Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import { Controls } from "../controls/controls";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "@material-ui/icons";
import { Paper, makeStyles, Toolbar, InputAdornment } from "@material-ui/core";
import ApiForm from "../../Forms/Api/ApiForm";
import { deleteAPI, getAPIs } from "../../redux/actions/ApiActions";
import ViewPopup from "./ViewPopup";
import useTable from "../controls/useTable";
import ApiTable from "./ApiTable";
import ManageEndpoints from "./ManageEndpoints";
import { getProjects } from "../../redux/actions/ProjectActions";
import ApiFormUpdate from "../../Forms/Api/ApiFormUpdate";

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
	apiSection: {
		marginTop: theme.spacing(4),
	},
}));

const headCells = [
	// { id: "id", label: "Team Id" },
	{ id: "name", label: "API Name" },
	{ id: "api_issues", label: "Anomalies Unsolved" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

export function Main() {
	const classes = useStyles();
	const dispatch = useDispatch();
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
	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (apis) => {
				if (target.value === "") return apis;
				else return apis.filter((x) => x.name.includes(target.value));
			},
		});
	};
	const [filterFn, setFilterFn] = useState({
		fn: (apis) => {
			return apis;
		},
	});
	const [openPopup, setOpenPopup] = useState(false);
	const [openUpdatePopup, setOpenUpdatePopup] = useState(false);
	const [openViewPopup, setOpenViewPopup] = useState(false);
	const [apiForEdit, setApiForEdit] = useState(null);
	const [openManageEndpoints, setOpenManageEndpoints] = useState(false);
	const openInPopup = (api) => {
		setApiForEdit(api);
		setOpenPopup(true);
	};
	const openInUpdatePopup = (api) => {
		setApiForEdit(api);
		setOpenUpdatePopup(true);
	};
	const openInViewPopup = (api) => {
		setApiForEdit(api);
		setOpenViewPopup(true);
	};
	const openInManageEndpoints = (api) => {
		setApiForEdit(api);
		setOpenManageEndpoints(true);
	};
	const apis = useSelector((state) => state.apiState.apis);
	const projects = useSelector((state) => state.projectState.projects);
	const { TblContainer, TblHead, TblPagination, recordsAfterPadingAndSorting } =
		useTable(apis, headCells, filterFn);

	useEffect(() => {
		dispatch(getProjects());
		dispatch(getAPIs());
	}, []);

	function checkIfApiIsLinkedToProject(projects, id) {
		var found = false,
			name = "";
		for (let i = 0; i < projects.length; i++) {
			if (projects[i].listAPIs.findIndex((el) => el.id === id) !== -1) {
				found = true;
				name = projects[i].name;
				break;
			}
		}
		return { found, name };
	}

	const onDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		// i need to check if the api belongs to a project or not
		const { found, name } = checkIfApiIsLinkedToProject(projects, id);
		if (found) {
			//if it belongs show notif that you need to delete the link between them both then you can delete the api
			setNotify({
				isOpen: true,
				message: `This API is linked to the Project ${name}, you need to destroy the association between the projectand the api`,
				type: "warning",
			});
		} else {
			dispatch(deleteAPI(id))
				.then((response) => {
					setNotify({
						isOpen: true,
						message: "Deleted Successfully",
						type: "warning",
					});
				})
				.catch((error) => {
					console.log(error);
				});
		}
	};
	

	return (
		<div>
			<PageHeader
				title="API Section"
				subTitle="Manage your APIs"
				icon={<FaIcons.FaCubes />}
			/>
			<Paper className={classes.pageContent}>
				{/* <EmployeeForm /> */}
				<Toolbar>
					<Controls.Input
						label="Search Employees"
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
							onClick={() => {
							setOpenPopup(true);
							setApiForEdit(null);
						}}
							className={classes.newButton}
						/>
				</Toolbar>
				<TblContainer>
					<TblHead />
					<ApiTable
						recordsAfterPadingAndSorting={recordsAfterPadingAndSorting}
						openInPopup={openInPopup}
						openInViewPopup={openInViewPopup}
						openInUpdatePopup={openInUpdatePopup}
						onDelete={onDelete}
						setConfirmDialog={setConfirmDialog}
						openInManageEndpoints={openInManageEndpoints}
					/>
				</TblContainer>
				<TblPagination />
			</Paper>
			<Controls.Popup
				title="Api Form"
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<ApiForm setOpenPopup={setOpenPopup} setNotify={setNotify} />
			</Controls.Popup>
			<Controls.Popup
				title="Api Form Update"
				openPopup={openUpdatePopup}
				setOpenPopup={setOpenUpdatePopup}
			>
				<ApiFormUpdate
					apiForEdit={apiForEdit}
					setOpenPopup={setOpenUpdatePopup}
					setNotify={setNotify}
				/>
			</Controls.Popup>
			<Controls.Popup
				title="View Api"
				openPopup={openViewPopup}
				setOpenPopup={setOpenViewPopup}
			>
				<ViewPopup apiForEdit={apiForEdit} />
			</Controls.Popup>
			<Controls.Popup
				title="Manage Endpoints"
				openPopup={openManageEndpoints}
				setOpenPopup={setOpenManageEndpoints}
				maxWidth="md"
			>
				<ManageEndpoints apiForEdit={apiForEdit} setNotify={setNotify} />
			</Controls.Popup>
			<Controls.Notification notify={notify} setNotify={setNotify} />
			<Controls.ConfirmDialog
				confirmDialog={confirmDialog}
				setConfirmDialog={setConfirmDialog}
			/>
		</div>
	);
}
