import React from "react";
import {
	Card,
	CardContent,
	Typography,
	List,
	ListItem,
	ListItemText,
} from "@material-ui/core";
import ContextHelper from "./ContextHelper";

function ContextCard({ title, index, toggleTab, toggleContextCard }) {
	const classes = ContextHelper.useStylesContextCard();
	return (
		<Card
			className={
				toggleContextCard === index ? classes.cardActive : classes.card
			}
			onClick={() => toggleTab(index)}
		>
			<CardContent>
				<List dense="true">
					<ListItem>
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
					</ListItem>
				</List>
			</CardContent>
		</Card>
	);
}

export default ContextCard;
