import React from "react";
import {
	makeStyles,
	Card,
	CardContent,
	Typography,
	List,
	ListItemAvatar,
	ListItem,
	Avatar,
	ListItemText,
	IconButton,
	ListItemSecondaryAction,
	Chip,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
	card: {
		transition: "0.3s",
		boxShadow: "0 8px 40px -12px rgba(0,0,0,0.3)",
		"&:hover": {
			boxShadow: "0 16px 70px -12.125px rgba(0,0,0,0.3)",
		},
	},
	avatar: {
		border: "2px solid #ef630b",
		backgroundColor: "transparent",
		color: "#2c0b06",
	},
	content: {
		textAlign: "left",
		padding: theme.spacing.unit * 3,
	},
	heading: {
		fontWeight: "bold",
	},
	subheading: {
		lineHeight: 1,
	},
}));

function CardInfo({ title, content, icon }) {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<CardContent className={classes.content}>
				<List dense="true">
					<ListItem>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>{icon}</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={
								<Typography
									className={"MuiTypography--heading"}
									variant={"h6"}
									style={{ fontSize: "1rem" }}
									gutterBottom
								>
									{title}
								</Typography>
							}
						/>
						<ListItemSecondaryAction>
							<Chip label="Today" color="primary" />
						</ListItemSecondaryAction>
					</ListItem>
				</List>

				<Typography
					className={"MuiTypography--subheading"}
					variant={"caption"}
					style={{ fontSize: "1.2rem" }}
				>
					{content}
				</Typography>
			</CardContent>
		</Card>
	);
}

export default CardInfo;
