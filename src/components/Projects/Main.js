import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteProject, getProjects } from "../../redux/actions/ProjectActions";
import { getItResponsables } from "../../redux/actions/ItResponsablesActions";
import { getWorkResponsables } from "../../redux/actions/WorkResponsablesActions";
import { getAPIs } from "../../redux/actions/ApiActions";
import { getTeams } from "../../redux/actions/TeamActions";
import PageHeader from "../Header/PageHeader";
import * as TiIcons from "react-icons/ti";
import { Controls } from "../controls/controls";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "@material-ui/icons";
import { Paper, makeStyles, Toolbar, InputAdornment } from "@material-ui/core";
import ProjectsTable from "./ProjectsTable";
import useTable from "../controls/useTable";
import ProjectCreationForm from "../../Forms/Project/ProjectCreationForm";
import ProjectUpdateForm from "../../Forms/Project/ProjectUpdateForm";
import ManageApisTransferList from "./ManageApisTransferList";
import { useHistory } from "react-router-dom";

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
	{ id: "projectName", label: "Project Name" },
	{ id: "up", label: "Api Up" },
	{ id: "down", label: "Api Down" },
	{ id: "actions", label: "Actions", disableSorting: true },
];
export function Main() {
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	function addProjectLink() {
		history.push("AddProject");
	}
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
	const [projectForEdit, setProjectForEdit] = useState(null);
	const projects = useSelector((state) => state.projectState.projects);
	const teams = useSelector((state) => state.teamState.teams);
	const apis = useSelector((state) => state.apiState.apis);
	const itResponsables = useSelector(
		(state) => state.itResponsableState.itResponsables
	);
	const workResponsables = useSelector(
		(state) => state.workResponsableState.workResponsables
	);
	const [filterFn, setFilterFn] = useState({
		fn: (projects) => {
			return projects;
		},
	});

	const [openViewPopup, setOpenViewPopup] = useState(false);
	const [openPopup, setOpenPopup] = useState(false);
	const [openTransferListPopup, setOpenTransferListPopup] = useState(false);

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPadingAndSorting,
	} = useTable(projects, headCells, filterFn);

	const openInTransferListPopup = (project) => {
		setProjectForEdit(project);
		setOpenTransferListPopup(true);
	};
	const openInViewPopup = (project) => {
		setProjectForEdit(project);
		setOpenViewPopup(true);
	};
	useEffect(() => {
		dispatch(getProjects());
		dispatch(getItResponsables());
		dispatch(getWorkResponsables());
		dispatch(getTeams());
		dispatch(getAPIs());
	}, []);

	const onDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		dispatch(deleteProject(id))
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

	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (projects) => {
				if (target.value == "") return projects;
				else
					return projects.filter((x) =>
						x.name.includes(target.value)
					);
			},
		});
	};
	return (
		<div>
			<PageHeader
				title="Projects Section"
				subTitle="Manage your projects"
				icon={<TiIcons.TiFolderOpen />}
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
						className={classes.newButton}
						onClick={() => {
							addProjectLink()
							// setOpenPopup(true);
							// setProjectForEdit(null);
						}}
					/>
				</Toolbar>
				<TblContainer>
					<TblHead />
					<ProjectsTable
						recordsAfterPadingAndSorting={recordsAfterPadingAndSorting}
						openInPopup={openInViewPopup}
						openInTransferListPopup={openInTransferListPopup}
						onDelete={onDelete}
						setConfirmDialog={setConfirmDialog}
					/>
				</TblContainer>
				<TblPagination />
			</Paper>
			<Controls.Popup
				title="Project Form"
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<ProjectCreationForm
					apis={apis}
					teams={teams}
					itResponsables={itResponsables}
					workResponsables={workResponsables}
					setNotify={setNotify}
					setOpenPopup={setOpenPopup}
				/>
			</Controls.Popup>
			<Controls.Popup
				title="Project Update Form"
				openPopup={openViewPopup}
				setOpenPopup={setOpenViewPopup}
			>
				<ProjectUpdateForm
					teams={teams}
					itResponsables={itResponsables}
					workResponsables={workResponsables}
					projectForEdit={projectForEdit}
					setNotify={setNotify}
					setOpenPopup={setOpenViewPopup}
				/>
			</Controls.Popup>
			<Controls.Popup
				title="Project Manage APIs"
				openPopup={openTransferListPopup}
				setOpenPopup={setOpenTransferListPopup}
			>
				<ManageApisTransferList
					apis={apis}
					projectForEdit={projectForEdit}
					setProjectForEdit={setProjectForEdit}
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
