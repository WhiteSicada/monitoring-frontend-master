import React, { useState, useDebugValue, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
	List,
	Paper,
	makeStyles,
	Toolbar,
	InputAdornment,
	Button,
	Grid,
	ListItem,
	ListItemAvatar,
	Avatar,
	ListItemSecondaryAction,
	ListItemText,
	Typography,
} from "@material-ui/core";
import { Controls } from "../../controls/controls";
import { RiRemoteControlLine } from "react-icons/ri";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";
import AddIcon from "@material-ui/icons/Add";
import { Search } from "@material-ui/icons";
import { IoEyeOutline } from "react-icons/io5";
import ContextForm from "../../../Forms/Api/context/ContextForm";
import {
	addContextsToApi,
	removeContextsFromApi,
	updateContextsForApi,
} from "../../../redux/actions/ApiActions";
import ViewContextDetails from "./ViewContextDetails";

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
	contextStyle: {
		border: "1px solid #ef630b",
	},
	root: { marginTop: "1%", padding: 20, height: 400 },
	avatar: {
		border: "2px solid #ef630b",
		backgroundColor: "transparent",
		color: "#2c0b06",
	},
}));

function ContextList({ setNotify, currentApi }) {
	const [contextList, setContextList] = useState([]);
	const [currentContext, setCurrentContext] = useState(null);
	const [contextListAdded, setContextListAdded] = useState([]);
	const [contextListUpdated, setContextListUpdated] = useState([]);
	const [contextListDeleted, setContextListDeleted] = useState([]);
	const [openPopup, setOpenPopup] = useState(false);
	const [openViewPopUp, setOpenViewPopUp] = useState(false);
	useEffect(() => {
		setContextList(currentApi && currentApi.contexts);
	}, [currentApi]);
	const methodColor = (type) => {
		switch (type) {
			case "POST":
				return "orange";
			case "GET":
				return "green";
			case "PUT":
				return "blue";
			case "DELETE":
				return "red";
			default:
				break;
		}
	};
	const classes = useStyles();
	const dispatch = useDispatch();
	const submit = () => {
		if (contextListAdded.length > 0) {
			dispatch(
				addContextsToApi(currentApi.id, {
					contexts: contextListAdded,
				})
			).then((response) => {
				setNotify({
					isOpen: true,
					message: "Operations executed successfully",
					type: "success",
				});
			});
			setContextListAdded([]);
		}
		if (contextListDeleted.length > 0) {
			dispatch(
				removeContextsFromApi(currentApi.id, {
					contexts: contextListDeleted,
				})
			).then((response) => {
				setNotify({
					isOpen: true,
					message: "Operations executed successfully",
					type: "success",
				});
			});
			setContextListDeleted([]);
		}
		if (contextListUpdated.length > 0) {
			dispatch(
				updateContextsForApi(currentApi.id, {
					contexts: contextListUpdated,
				})
			).then((response) => {
				setNotify({
					isOpen: true,
					message: "Operations executed successfully",
					type: "success",
				});
			});
			setContextListUpdated([]);
		}
	};

	const deleteContext = (context) => {
		if (contextListAdded.filter((item) => item === context.name).length > 0) {
			setContextListAdded(
				contextListAdded.filter((item) => item !== context.name)
			);
		} else {
			setContextListDeleted((contextList) => [...contextList, context.id]);
		}
		setContextList(contextList.filter((item) => item.id !== context.id));
	};

	return (
		<div>
			<center>
				<h3>List of Contexts</h3>
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
					// onChange={handleSearch}
				/>
				<Grid container spacing={2} align="center">
					<Grid item xs={12}>
						<Controls.MuiButton
							text="Add New"
							variant="outlined"
							startIcon={<AddIcon />}
							onClick={() => {
								setOpenPopup(true);
								setCurrentContext(null);
							}}
							// className={classes.newButton}
						/>
					</Grid>
				</Grid>
			</Toolbar>
			<List className={classes.root}>
				<Grid container spacing={2}>
					{contextList &&
						contextList.map((context, index) => (
							<Grid item xs={12} md={6} lg={4} key={index}>
								<ListItem className={classes.contextStyle}>
									<ListItemAvatar>
										<Avatar className={classes.avatar}>
											<RiRemoteControlLine />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={context.name}
										secondary={
											<Typography
												type="body2"
												style={{ color: methodColor(context.method) }}
											>
												{context.method}
											</Typography>
										}
									/>
									<ListItemSecondaryAction>
										<Controls.ActionButton
											text={"View"}
											color="secondary"
											onClick={() => {
												setCurrentContext(context);
												setOpenViewPopUp(true);
											}}
										>
											<IoEyeOutline fontSize="large" />
										</Controls.ActionButton>
										<Controls.ActionButton
											text={"Edit"}
											color="secondary"
											onClick={() => {
												setCurrentContext(context);
												setOpenPopup(true);
											}}
										>
											<AiOutlineEdit fontSize="large" />
										</Controls.ActionButton>
										<Controls.ActionButton
											text={"Delete"}
											color="secondary"
											onClick={() => {
												deleteContext(context);
											}}
										>
											<AiOutlineDelete fontSize="large" />
										</Controls.ActionButton>
									</ListItemSecondaryAction>
								</ListItem>
							</Grid>
						))}
				</Grid>
			</List>
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
					{contextListAdded.length} Added , {contextListUpdated.length} Updated
					, {contextListDeleted.length} Deleted.
				</Grid>
			</Grid>
			<Controls.Popup
				title="Context Form"
				openPopup={openPopup}
				setOpenPopup={setOpenPopup}
			>
				<ContextForm
					setOpenPopup={setOpenPopup}
					setNotify={setNotify}
					contextList={contextList}
					setContextList={setContextList}
					setContextListAdded={setContextListAdded}
					setContextListUpdated={setContextListUpdated}
					currentApi={currentApi}
					currentContext={currentContext}
					setCurrentContext={setCurrentContext}
				/>
			</Controls.Popup>
			<Controls.Popup
				title="Context Details"
				openPopup={openViewPopUp}
				setOpenPopup={setOpenViewPopUp}
			>
				<ViewContextDetails currentApi={currentApi} currentContext={currentContext} />
			</Controls.Popup>
		</div>
	);
}

export default ContextList;
