import { Grid } from "@material-ui/core";
import React from "react";
import { FaCheckCircle, FaRegCalendarAlt } from "react-icons/fa";
import { ImStopwatch } from "react-icons/im";
import { GiFlame } from "react-icons/gi";
import { BsQuestionCircle } from "react-icons/bs";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import { AiFillCloseCircle, AiOutlineCheckCircle } from "react-icons/ai";

import WorkIcon from "@material-ui/icons/Work";
import ScanItemDetail from "./ScanItemDetail";

function ViewScan({ currentScan }) {
	const scanListDetails = [
		{
			icon: <FaRegCalendarAlt />,
			title: "Created At : ",
			detail: currentScan.creates_at,
		},
		{
			icon: <BsQuestionCircle />,
			title: "Status : ",
			detail: currentScan.status,
		},
		{
			icon: <GiFlame />,
			title: "Trigger : ",
			detail: currentScan.spark,
		},
		{
			icon: <ImStopwatch />,
			title: "Execution Time : ",
			detail: currentScan.execution_time + " ms",
		},
	];
	return (
		<div>
			<List>
				<ListItem>
					<ListItemAvatar>
						<Avatar style={{ background: "transparent" }}>
							{currentScan.successful == "Successful" ? (
								<FaCheckCircle size="large" style={{ color: "green" }} />
							) : (
								<AiFillCloseCircle size="large" style={{ color: "red" }} />
							)}
						</Avatar>
					</ListItemAvatar>
					{currentScan.successful == "Successful" ? (
						<ListItemText
							primary="Successful"
							secondary="Test Passed successfully"
						/>
					) : (
						<ListItemText
							primary="UnSuccessful"
							secondary="Test Passed Unsuccessfully"
						/>
					)}
				</ListItem>
			</List>
			<br />
			<h3>Execution Details</h3>
			<Grid container spacing={3}>
				{scanListDetails.map((item, index) => (
					<Grid item xs={6}>
						<ScanItemDetail
							icon={item.icon}
							title={item.title}
							detail={item.detail}
						/>
					</Grid>
				))}
			</Grid>
			<br />
			<h3>Execution Report</h3>
			<List>
				<ListItem>
					<ListItemAvatar>
						<Avatar style={{ background: "transparent" }}>
							{currentScan.successful == "Successful" ? (
								<AiOutlineCheckCircle size="large" style={{ color: "green" }} />
							) : (
								<AiFillCloseCircle size="large" style={{ color: "red" }} />
							)}
						</Avatar>
					</ListItemAvatar>
					<ListItemText
						primary={
							"Http " +
							currentScan.method +
							" " +
							currentScan.execution_time +
							" ms"
						}
						secondary={
							"Got 200 - Response from " +
							currentScan.method +
							" " +
							currentScan.url
						}
					/>
				</ListItem>
				<ListItem>
					<ListItemAvatar>
						<Avatar style={{ background: "transparent" }}>
							{currentScan.successful == "Successful" ? (
								<AiOutlineCheckCircle size="large" style={{ color: "green" }} />
							) : (
								<AiFillCloseCircle size="large" style={{ color: "red" }} />
							)}
						</Avatar>
					</ListItemAvatar>
					{currentScan.successful == "Successful" ? (
						<ListItemText
							primary="Assert Equals"
							secondary="apiResponse.status === '200'"
						/>
					) : (
						<ListItemText
							primary="Assert Equals"
							secondary="apiResponse.status !== '200'"
						/>
					)}
				</ListItem>
			</List>
		</div>
	);
}

export default ViewScan;
