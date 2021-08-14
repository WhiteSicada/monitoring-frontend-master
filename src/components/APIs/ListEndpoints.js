import React from "react";
import {
	List,
	ListItem,
	ListItemAvatar,
	Grid,
	Avatar,
	ListItemSecondaryAction,
	ListItemText,
	makeStyles,
	Typography,
} from "@material-ui/core";
import { Controls } from "../controls/controls";
import { RiRemoteControlLine } from "react-icons/ri";
import { AiOutlineDelete, AiOutlineEdit } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
	root: { marginTop: "1%", padding: 20, height: 400 },
	avatar: {
		border: "2px solid #ef630b",
		backgroundColor: "transparent",
		color: "#2c0b06",
	},
	endpointStyle: {
		border: "1px solid #ef630b",
	},
}));

function ListEndpoints({
	endpointList,
	setCurrentEndpoint,
	setEndpointList,
	setEndpointListAdded,
	endpointListAdded,
	setEndpointListDeleted,
	setOpenPopup,
}) {
	const classes = useStyles();
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
	const deleteEndpoint = (endpoint) => {
		if (
			endpointListAdded.filter((item) => item.name === endpoint.name).length > 0
		) {
			setEndpointListAdded(
				endpointListAdded.filter((item) => item.name !== endpoint.name)
			);
		} else {
			setEndpointListDeleted((endpointListDeleted) => [
				...endpointListDeleted,
				endpoint.id,
			]);
		}
		setEndpointList(endpointList.filter((item) => item.id !== endpoint.id));
	};

	return (
		<div className={classes.root}>
			<List>
				<Grid container spacing={2}>
					{endpointList &&
						endpointList.map((endpoint, index) => (
							<Grid item xs={12} md={6} lg={4} key={index}>
								<ListItem className={classes.endpointStyle}>
									<ListItemAvatar>
										<Avatar className={classes.avatar}>
											<RiRemoteControlLine />
										</Avatar>
									</ListItemAvatar>
									<ListItemText
										primary={endpoint.name}
										secondary={
											<Typography
												type="body2"
												style={{ color: methodColor(endpoint.method) }}
											>
												{endpoint.method}
											</Typography>
										}
									/>
									<ListItemSecondaryAction>
										<Controls.ActionButton
											text={"Edit"}
											color="secondary"
											onClick={() => {
												setCurrentEndpoint(endpoint);
												setOpenPopup(true);
											}}
										>
											<AiOutlineEdit fontSize="large" />
										</Controls.ActionButton>
										<Controls.ActionButton
											text={"Delete"}
											color="secondary"
											onClick={() => {
												deleteEndpoint(endpoint);
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
			{endpointList.length === 0 && (
				<center>
					<h3>No Endpoints available.</h3>
				</center>
			)}
		</div>
	);
}

export default ListEndpoints;
