import React, { useState } from "react";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import {
	List,
	ListItem,
	Divider,
	ListItemIcon,
	ListItemText,
	makeStyles,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import styled from "styled-components";

const DropdownLink = styled(Link)`
	padding-left: 1rem;
	display: flex;
	color: #2c0b06;
	align-items: center;
	text-decoration: none;
	font-size: 18px;
	&:hover {
		cursor: pointer;
	}
`;

const CustomLink = styled(Link)`
	display: flex;
	color: #2c0b06;
	align-items: center;
	text-decoration: none;
	font-size: 18px;
	&:hover {
		cursor: pointer;
	}
`;

const useStyles = makeStyles((theme) => ({
	icon: {
		color: "rgba(0, 0, 0, 0.54)",
		display: "inline-flex",
		minWidth: 35,
		flexShrink: 0,
	},
}));

function CustomSubDrawer({ item }) {
	const classes = useStyles();
	const [subnav, setSubnav] = useState(false);
	const showSubnav = () => {
		setSubnav(!subnav);
	};
	return (
		<div>
			{item.path ? (
				<CustomLink to={item.path}>
					<ListItem button onClick={item.subNavs && showSubnav}>
						<ListItemIcon>{item.icon}</ListItemIcon>
						<ListItemText primary={item.title} />
						{item.subNavs ? subnav ? <ExpandLess /> : <ExpandMore /> : ""}
					</ListItem>
				</CustomLink>
			) : (
				<ListItem button onClick={item.subNavs && showSubnav}>
					<ListItemIcon>{item.icon}</ListItemIcon>
					<ListItemText primary={item.title} />
					{item.subNavs ? subnav ? <ExpandLess /> : <ExpandMore /> : ""}
				</ListItem>
			)}

			<Collapse in={subnav} timeout="auto" unmountOnExit>
				<Divider />
				<List component="div" disablePadding>
					{item.subNavs?.map((subNav, index) => (
						<DropdownLink to={subNav.path} key={index} onClick={showSubnav}>
							<ListItem button>
								<ListItemIcon classes={{ root: classes.icon }}>
									{subNav.icon}
								</ListItemIcon>
								<ListItemText primary={subNav.title} />
							</ListItem>
						</DropdownLink>
					))}
				</List>
			</Collapse>
		</div>
	);
}

export default CustomSubDrawer;
