import React from "react";
import { DialogContentText, Grid, makeStyles } from "@material-ui/core";
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
	iconStyle : {
		color: "green",
	}
}));

export default function ViewPopup({ apiForEdit }) {
	const classes = useStyles(apiForEdit);
	return (
		<List >
			<Grid container>
				<Grid item xs={12}>
					<ListItem>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<FaIcons.FaCube />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="API Name" secondary={apiForEdit.name} />
					</ListItem>
				</Grid>
				<Grid item xs={3}>
					<ListItem>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<AiIcons.AiOutlineHome />
							</Avatar>
						</ListItemAvatar>
						<ListItemText primary="Ip Adress" secondary={apiForEdit.ip} />
					</ListItem>
				</Grid>
				<Grid item xs={3}>
					<DialogContentText>
						<ListItem>
							<ListItemAvatar>
								<Avatar className={classes.avatar}>
									<BiIcons.BiDoorOpen />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Port" secondary={apiForEdit.port} />
						</ListItem>
					</DialogContentText>
				</Grid>
				<Grid item xs={3}>
					<DialogContentText>
						<ListItem>
							<ListItemAvatar>
								<Avatar className={classes.avatar}>
									<BiIcons.BiDoorOpen />
								</Avatar>
							</ListItemAvatar>
							<ListItemText primary="Context" secondary={apiForEdit.context} />
						</ListItem>
					</DialogContentText>
				</Grid>
				<Grid item xs={12}>
					<ListItem>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<GrIcons.GrTextAlignFull />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary="Description"
							secondary={apiForEdit.description}
						/>
					</ListItem>
				</Grid>
				<Grid item xs={3} className={classes.root}>
					<ListItem>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<GoIcons.GoPrimitiveDot className={classes.iconStyle} />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary="Status : "
							secondary={apiForEdit.status ? "Up" : "Down"}
						/>
					</ListItem>
				</Grid>
				<Grid item xs={3} className={classes.root}>
					<ListItem>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<GoIcons.GoPrimitiveDot className={classes.iconStyle} />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary="DataBase : "
							secondary={apiForEdit.db ? "Up" : "Down"}
						/>
					</ListItem>
				</Grid>
				<Grid item xs={3} className={classes.root}>
					<ListItem>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<GoIcons.GoPrimitiveDot className={classes.iconStyle} />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary="DiskSpace : "
							secondary={apiForEdit.diskspace ? "Up" : "Down"}
						/>
					</ListItem>
				</Grid>
				<Grid item xs={3} className={classes.root}>
					<ListItem>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<GoIcons.GoPrimitiveDot className={classes.iconStyle} />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary="Ping : "
							secondary={apiForEdit.ping ? "Up" : "Down"}
						/>
					</ListItem>
				</Grid>
			</Grid>
		</List>
	);
}
