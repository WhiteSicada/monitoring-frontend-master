import React from "react";
import {
	TableBody,
	TableRow,
	TableCell,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	makeStyles,
	ListItemText,
} from "@material-ui/core";
import { BiCube, BiDoorOpen } from "react-icons/bi";
import { FaCube } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { Controls } from "../controls/controls";
import { AiOutlineEdit, AiOutlineDelete, AiOutlineBug } from "react-icons/ai";

const useStyles = makeStyles((theme) => ({
	avatar: {
		border: "2px solid #ef630b",
		backgroundColor: "transparent",
		color: "#2c0b06",
	},
	td: {
		padding: 2,
	},
}));

function ApiTable({
	recordsAfterPadingAndSorting,
	setConfirmDialog,
	onDelete,
	openInViewPopup,
	openInUpdatePopup,
}) {
	const classes = useStyles();
	const history = useHistory();
	function goToAnomalyList(api) {
		history.push(`/APIs/${api.id}/anomalies`);
	}
	function goToManageContextEndpoints(id) {
		history.push(`/APIs/${id}/ManageEndpoints`);
	}
	function goToManageContexts(id) {
		history.push(`/APIs/${id}/ManageContexts`);
	}
	return (
		<TableBody>
			{recordsAfterPadingAndSorting().map((api, index) => (
				<TableRow key={api.id}>
					<TableCell className={classes.td}>
						<List>
							<ListItem>
								<ListItemAvatar>
									<Avatar className={classes.avatar}>
										<FaCube />
									</Avatar>
								</ListItemAvatar>
								<ListItemText
									primary={api.name}
									secondary={api.ip + ":" + api.port}
								/>
							</ListItem>
						</List>
					</TableCell>
					<TableCell>
						{api.anomalies ? api.anomalies.length : "No Anomalies"}
					</TableCell>
					<TableCell>
						<Controls.ActionButton
							text={"List of Anomalies"}
							color="primary"
							onClick={() => {
								goToAnomalyList(api);
							}}
						>
							<AiOutlineBug fontSize="large" />
						</Controls.ActionButton>
						<Controls.ActionButton
							text={"Manage Contexts"}
							color="primary"
							onClick={() => {
								goToManageContexts(api.id);
							}}
						>
							<BiDoorOpen fontSize="large" />
						</Controls.ActionButton>
						<Controls.ActionButton
							text={"Manage Endpoints"}
							color="primary"
							onClick={() => {
								goToManageContextEndpoints(api.id);
							}}
						>
							<BiCube fontSize="large" />
						</Controls.ActionButton>
						<Controls.ActionButton
							text={"View"}
							color="primary"
							onClick={() => {
								openInViewPopup(api);
							}}
						>
							<IoEyeOutline size={"1.2rem"} />
						</Controls.ActionButton>
						<Controls.ActionButton
							text={"Edit"}
							color="primary"
							onClick={() => {
								openInUpdatePopup(api);
							}}
						>
							<AiOutlineEdit fontSize="large" />
						</Controls.ActionButton>

						<Controls.ActionButton
							text={"Delete"}
							color="primary"
							onClick={() => {
								setConfirmDialog({
									isOpen: true,
									title: "Are you sure to delete this record?",
									subTitle: "You can't undo this operation",
									onConfirm: () => {
										onDelete(api.id);
									},
								});
							}}
						>
							<AiOutlineDelete fontSize="large" />
						</Controls.ActionButton>
					</TableCell>
				</TableRow>
			))}
		</TableBody>
	);
}

export default ApiTable;
