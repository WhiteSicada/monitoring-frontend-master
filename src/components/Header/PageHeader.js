import { Paper, Card, Typography, makeStyles } from "@material-ui/core";
import React from "react";

const useStyles = makeStyles((theme) => ({
	root: {
		backgroundColor: "#fdfdff",
		marginLeft: "30%",
	},
	rootNoMargin: {
		backgroundColor: "#fdfdff",
	},
	pageHeader: {
		paddingTop: theme.spacing(2),
		display: "flex",
		marginBottom: theme.spacing(1),
	},
	pageIcon: {
		display: "inline-block",
		padding: theme.spacing(2),
		paddingBottom: theme.spacing(1.5),
		color: "#2c0b06",
		fontSize: 40,
		border: "2px solid #ef630b",
	},
	pageTitle: {
		paddingLeft: theme.spacing(4),
		paddingTop: theme.spacing(2),
		"& .MuiTypography-subtitle2": {
			opacity: "0.6",
		},
	},
}));

function PageHeader(props) {
	const { title, subTitle, icon, noMargin } = props;
	const classes = useStyles();
	
	return (
		<Paper elevation={0} square className={noMargin ? classes.rootNoMargin : classes.root}>
			<div className={classes.pageHeader}>
				<Card className={classes.pageIcon}>{icon}</Card>
				<div className={classes.pageTitle}>
					<Typography variant="h6" component="div">
						{title}
					</Typography>
					<Typography variant="subtitle2" component="div">
						{subTitle}
					</Typography>
				</div>
			</div>
		</Paper>
	);
}
export default PageHeader;
