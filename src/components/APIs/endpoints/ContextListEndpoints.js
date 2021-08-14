import React, { useState, useDebugValue, useEffect } from "react";
import ListEndpoints from "../ListEndpoints";
import { useDispatch } from "react-redux";
import {
	Paper,
	makeStyles,
	Toolbar,
	InputAdornment,
	Button,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import { Controls } from "../../controls/controls";
import EndpointForm from "../../../Forms/Api/EndpointForm";
import { Grid } from "@material-ui/core";
import {
	addEndpointsToContext,
	removeEndpointsFromContext,
	updateEndpointsForContext,
} from "../../../redux/actions/ApiActions";

function useStateWithLabel(initialValue, name) {
	const [value, setValue] = useState(initialValue);
	useDebugValue(`${name}: ${value}`);
	return [value, setValue];
}
const useStyles = makeStyles((theme) => ({
	pageContent: {
		padding: theme.spacing(3),
	},
	searchInput: {
		width: "100%",
	},
	newButton: {
		position: "absolute",
		right: "8.5%",
	},
	apiSection: {
		marginTop: theme.spacing(4),
	},
}));

function ContextListEndpoints({ api, currentContext, setNotify }) {
	const dispatch = useDispatch();
	const [endpointList, setEndpointList] = useState([]);
	const [currentEndpoint, setCurrentEndpoint] = useState(null);
	const [endpointListAdded, setEndpointListAdded] = useStateWithLabel(
		[],
		"endpointListAdded"
	);
	const [endpointListUpdated, setEndpointListUpdated] = useStateWithLabel(
		[],
		"endpointListUpdated"
	);
	const [endpointListDeleted, setEndpointListDeleted] = useStateWithLabel(
		[],
		"endpointListDeleted"
	);
	const [value, setValue] = useState(0);
	const [openPopup, setOpenPopup] = useState(false);
	const [filterFn, setFilterFn] = useState({
		fn: (endpointList) => {
			return endpointList;
		},
	});
	const handleSearch = (e) => {
		let target = e.target;
		setFilterFn({
			fn: (endpointList) => {
				if (target.value == "") return endpointList;
				else return endpointList.filter((x) => x.name.includes(target.value));
			},
		});
	};
	useEffect(() => {
		setEndpointList(currentContext && currentContext.endpoints);
	}, [currentContext]);
	const submit = () => {
		if (endpointListDeleted.length > 0) {
			dispatch(
				removeEndpointsFromContext(api.id, currentContext.id, {
					endpoints: endpointListDeleted,
				})
			).then((response) => {
				setNotify({
					isOpen: true,
					message: "Operations executed successfully",
					type: "success",
				});
			});
			setEndpointListDeleted([]);
		}
		if (endpointListAdded.length > 0) {
			dispatch(
				addEndpointsToContext(api.id, currentContext.id, {
					endpoints: endpointListAdded,
				})
			).then((response) => {
				setNotify({
					isOpen: true,
					message: "Operations executed successfully",
					type: "success",
				});
			});
			setEndpointListAdded([]);
		}
		if (endpointListUpdated.length > 0) {
			dispatch(
				updateEndpointsForContext(api.id, currentContext.id, {
					endpoints: endpointListUpdated,
				})
			).then((response) => {
				setNotify({
					isOpen: true,
					message: "Operations executed successfully",
					type: "success",
				});
			});
			setEndpointListUpdated([]);
		}
	};
	const classes = useStyles();
	return (
		<div>
			<center>
				<h3>List of Endpoints</h3>
			</center>
			<Toolbar style={{ marginTop: "2%" }}>
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
				<Grid container spacing={2} align="center">
					<Grid item xs={12}>
						<Controls.MuiButton
							text="Add New"
							variant="outlined"
							startIcon={<AddIcon />}
							onClick={() => {
								setOpenPopup(true);
								setCurrentEndpoint(null);
							}}
							// className={classes.newButton}
						/>
					</Grid>
				</Grid>
			</Toolbar>
			<ListEndpoints
				endpointList={endpointList}
				setCurrentEndpoint={setCurrentEndpoint}
				setEndpointList={setEndpointList}
				setEndpointListAdded={setEndpointListAdded}
				endpointListAdded={endpointListAdded}
				setEndpointListDeleted={setEndpointListDeleted}
				setOpenPopup={setOpenPopup}
			/>
			<Grid
				container
				spacing={5}
				align="center"
				style={{ paddingBottom: "2%" }}
			>
				<Grid item xs={6}>
					<Button
						variant="contained"
						color="primary"
						id="submitAllEndpoints"
						className={classes.button}
						onClick={() => {
							submit();
						}}
					>
						Submit
					</Button>
				</Grid>
				<Grid item xs={6}>
					{endpointListAdded.length} Added , {endpointListUpdated.length}{" "}
					Updated , {endpointListDeleted.length} Deleted.
				</Grid>
			</Grid>

			<Controls.Popup
				title="Create New Endpoint"
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
				maxWidth="md"
			>
				<EndpointForm
					endpointList={endpointList}
					currentApi={api}
					currentEndpoint={currentEndpoint}
					setEndpointList={setEndpointList}
					setCurrentEndpoint={setCurrentEndpoint}
					setEndpointListAdded={setEndpointListAdded}
					setEndpointListUpdated={setEndpointListUpdated}
					endpointListAdded={endpointListAdded}
					endpointListUpdated={endpointListUpdated}
					endpointListDeleted={endpointListDeleted}
					currentContext={currentContext}
					setOpenPopup={setOpenPopup}
				/>
			</Controls.Popup>
		</div>
	);
}

export default ContextListEndpoints;
