import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import PageHeader from "../Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../controls/useTable";
import { Controls } from "../controls/controls";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "@material-ui/icons";
import WorkResponsableTable from "./WorkResponsableTable";
import {
	deleteWorkResponsable,
	getWorkResponsables,
} from "../../redux/actions/WorkResponsablesActions";
import { Paper, makeStyles, Toolbar, InputAdornment } from "@material-ui/core";
import WorkResponsableForm from "../../Forms/Responsables/WorkResponsableForm";

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
	// { id: "id", label: "Responsable Id" },
	{ id: "name", label: "Responsable Name" },
	{ id: "email", label: "Responsable Email" },
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
	const [WorkResponsableForEdit, setWorkResponsableForEdit] = useState(null);
	const workResponsables = useSelector(
		(state) => state.workResponsableState.workResponsables
	);
	const [filterFn, setFilterFn] = useState({
		fn: (workResponsables) => {
			return workResponsables;
		},
	});

	const [openPopup, setOpenPopup] = useState(false);

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPadingAndSorting,
	} = useTable(workResponsables, headCells, filterFn);

	const openInPopup = (workResponsable) => {
		setWorkResponsableForEdit(workResponsable);
		setOpenPopup(true);
	};
	useEffect(() => {
		dispatch(getWorkResponsables());
	}, []);

	const onDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		dispatch(deleteWorkResponsable(id))
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
			fn: (workResponsables) => {
				if (target.value == "") return workResponsables;
				else
					return workResponsables.filter((x) =>
						x.name.includes(target.value)
					);
			},
		});
	};
	return (
		<div>
			<PageHeader
				title="Work Responsables Section"
				subTitle="Manage your Work Responsables"
				active={false}
				icon={<FaIcons.FaUserTie />}
			/>
			<Paper className={classes.pageContent}>
				{/* <EmployeeForm /> */}
				<Toolbar>
					<Controls.Input
						label="Search Work Responsables"
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
							setWorkResponsableForEdit(null);
						}}
					/>
				</Toolbar>
				<TblContainer>
					<TblHead />
					<WorkResponsableTable
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
				<WorkResponsableForm
					WorkResponsableForEdit={WorkResponsableForEdit}
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
