import React, { useState, useEffect } from "react";
import * as FaIcons from "react-icons/fa";
import PageHeader from "../Header/PageHeader";
import { useDispatch, useSelector } from "react-redux";
import useTable from "../controls/useTable";
import { Controls } from "../controls/controls";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "@material-ui/icons";
import ItResponsableTable from "./ItResponsableTable";
import {
	deleteItResponsable,
	getItResponsables,
} from "../../redux/actions/ItResponsablesActions";
import { Paper, makeStyles, Toolbar, InputAdornment } from "@material-ui/core";
import ItResponsableForm from "../../Forms/Responsables/ItResponsableForm";

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
	const [ItResponsableForEdit, setItResponsableForEdit] = useState(null);
	const itResponsables = useSelector(
		(state) => state.itResponsableState.itResponsables
	);
	const [filterFn, setFilterFn] = useState({
		fn: (itResponsables) => {
			return itResponsables;
		},
	});

	const [openPopup, setOpenPopup] = useState(false);

	const {
		TblContainer,
		TblHead,
		TblPagination,
		recordsAfterPadingAndSorting,
	} = useTable(itResponsables, headCells, filterFn);

	const openInPopup = (itResponsable) => {
		setItResponsableForEdit(itResponsable);
		setOpenPopup(true);
	};
	useEffect(() => {
		dispatch(getItResponsables());
	}, []);

	const onDelete = (id) => {
		setConfirmDialog({
			...confirmDialog,
			isOpen: false,
		});
		dispatch(deleteItResponsable(id))
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
			fn: (itResponsables) => {
				if (target.value == "") return itResponsables;
				else
					return itResponsables.filter((x) =>
						x.name.includes(target.value)
					);
			},
		});
	};
	return (
		<div>
			<PageHeader
				title="It Responsables Section"
				subTitle="Manage your It Responsables"
				icon={<FaIcons.FaUserTie />}
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
							setItResponsableForEdit(null);
						}}
					/>
				</Toolbar>
				<TblContainer>
					<TblHead />
					<ItResponsableTable
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
				<ItResponsableForm
					ItResponsableForEdit={ItResponsableForEdit}
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
