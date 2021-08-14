import React, { useState, useEffect } from "react";
import * as HiIcons from "react-icons/hi";
import PageHeader from "../Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../controls/useTable";
import { Controls } from "../controls/controls";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "@material-ui/icons";
import TeamTable from "./TeamTable";
import { deleteTeam, getTeams } from "../../redux/actions/TeamActions";
import { Paper, makeStyles, Toolbar, InputAdornment } from "@material-ui/core";
import TeamForm from "../../Forms/Team/Form";

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
	{ id: "name", label: "Team Name" },
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
	const [teamForEdit, setTeamForEdit] = useState(null);
	const teams = useSelector((state) => state.teamState.teams);
	const [filterFn, setFilterFn] = useState({
		fn: (teams) => {
			return teams;
		},
	});

	const [openPopup, setOpenPopup] = useState(false);

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPadingAndSorting,
	} = useTable(teams, headCells, filterFn);

	const openInPopup = (team) => {
		setTeamForEdit(team);
		setOpenPopup(true);
	};
	useEffect(() => {
		dispatch(getTeams());
	}, []);

	const onDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		dispatch(deleteTeam(id))
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
			fn: (teams) => {
				if (target.value == "") return teams;
				else return teams.filter((x) => x.name.includes(target.value));
			},
		});
	};

	return (
		<div>
			<PageHeader
				title="Team Section"
				subTitle="Manage your teams"
				icon={<HiIcons.HiUserGroup />}
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
							setOpenPopup(true);
							setTeamForEdit(null);
						}}
					/>
				</Toolbar>
				<TblContainer>
					<TblHead />
					<TeamTable
						recordsAfterPadingAndSorting={recordsAfterPadingAndSorting}
						openInPopup={openInPopup}
						onDelete={onDelete}
						setConfirmDialog={setConfirmDialog}
					/>
				</TblContainer>
				<TblPagination />
			</Paper>
			<Controls.Popup
				title="Employee Form"
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<TeamForm
					teamForEdit={teamForEdit}
					setOpenPopup={setOpenPopup}
					setNotify={setNotify}
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
