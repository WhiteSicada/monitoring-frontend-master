import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FaCube } from "react-icons/fa";
import clsx from "clsx";
import {
	Card,
	Grid,
	List,
	ListItem,
	ListItemAvatar,
	Avatar,
	Typography,
	ListItemText,
} from "@material-ui/core";

const useStyles = makeStyles({
	root: {
		boxShadow: "0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)",
		"&:hover": {
			cursor: "pointer",
			boxShadow: "0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)",
		},
	},
	selectable: {
		outline: "3px solid green",
	},
	avatar: {
		border: "2px solid #ef630b",
		backgroundColor: "transparent",
		color: "#2c0b06",
	},
	inline: {
		display: "inline",
	},
});

export function ApiCards({ api, formValues, setFormValues }) {
	const classes = useStyles();
	const [selected, setSelected] = useState(false);

	const selectCard = (id) => {
		const found = formValues.apis.find((element) => element === id);

		if (found == null) {
			setSelected(!selected);
			setFormValues({ ...formValues, apis: [...formValues.apis, id] });
		} else {
			setSelected(!selected);
			setFormValues({
				...formValues,
				apis: formValues.apis.filter((item) => item !== id),
			});
		}
	};
	return (
		<div>
			<Card
				className={clsx(classes.root, {
					[classes.selectable]: selected,
				})}
				onClick={() => {
					selectCard(api.id);
				}}
			>
				<List>
					<ListItem>
						<ListItemAvatar>
							<Avatar className={classes.avatar}>
								<FaCube className={"iconStyle"} />
							</Avatar>
						</ListItemAvatar>
						<ListItemText
							primary={api.name}
							secondary={
								<React.Fragment>
									<Typography
										component="span"
										variant="body2"
										className={classes.inline}
										color="textPrimary"
									>
										{api.description}
									</Typography>
								</React.Fragment>
							}
						/>
					</ListItem>
				</List>
			</Card>
		</div>
	);
}
