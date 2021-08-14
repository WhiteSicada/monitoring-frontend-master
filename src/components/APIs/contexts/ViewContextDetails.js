import React from "react";
import {
	DialogContentText,
	Grid,
	makeStyles,
	Button,
	Typography,
} from "@material-ui/core";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import * as BiIcons from "react-icons/bi";
import * as GrIcons from "react-icons/gr";
import * as GoIcons from "react-icons/go";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import ListItemText from "@material-ui/core/ListItemText";
import { RiRemoteControlLine } from "react-icons/ri";

const useStyles = makeStyles((theme) => ({
	root: {
		// "& .MuiListItemText-secondary": {
		// 	color: "green",
		// },
	},
	avatar: {
		border: "2px solid #ef630b",
		backgroundColor: "transparent",
		color: "#2c0b06",
	},
	iconStyle: {
		color: "green",
	},
	contextStyle: {
		border: "1px solid #ef630b",
	},
}));

export default function ViewContextDetails({ currentApi, currentContext }) {
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
	return (
		<List>
			<Grid container>
				<Grid item xs={12}>
					<ListItem>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<FaIcons.FaCube />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Api Name" secondary={currentApi.name} />
					</ListItem>
				</Grid>
				<Grid item xs={4}>
					<ListItem>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<AiIcons.AiOutlineHome />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary="Context Name"
							secondary={currentContext.name}
						/>
					</ListItem>
				</Grid>
				<Grid item xs={8}>
					<ListItem>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<BiIcons.BiDoorOpen />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary="Endpoints"
							secondary={currentContext.endpoints.length}
						/>
					</ListItem>
				</Grid>
			</Grid>
			<List>
				<center style={{ marginBottom: "2.5%" }}>
					<Button
						variant="outlined"
						color="primary"
						id="submitAllEndpoints"
						className={classes.button}
						onClick={() => {
							// submit();
						}}
					>
						Manage Endpoints
					</Button>
				</center>
				<Grid container spacing={2}>
					{currentContext.endpoints.map((context, index) => (
						<Grid item xs={3} key={index}>
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
							</ListItem>
						</Grid>
					))}
				</Grid>
			</List>
		</List>
	);
}
