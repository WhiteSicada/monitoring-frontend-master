import React from "react";
import {
	BarChart,
	Bar,
	XAxis,
	YAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

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

const data = [
	{
		name: "Page A",
		uv: 4000,
		pv: 2400,
		amt: 2400,
	},
	{
		name: "Page B",
		uv: 3000,
		pv: 1398,
		amt: 2210,
	},
	{
		name: "Page C",
		uv: 2000,
		pv: 9800,
		amt: 2290,
	},
	{
		name: "Page D",
		uv: 2780,
		pv: 3908,
		amt: 2000,
	},
	{
		name: "Page E",
		uv: 1890,
		pv: 4800,
		amt: 2181,
	},
	{
		name: "Page F",
		uv: 2390,
		pv: 3800,
		amt: 2500,
	},
	{
		name: "Page G",
		uv: 3490,
		pv: 4300,
		amt: 2100,
	},
];

const useStyles = makeStyles((theme) => ({
	card: {
		margin: "auto",
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
	media: {
		paddingTop: "56.25%",
	},
	content: {
		textAlign: "left",
		padding: theme.spacing.unit * 3,
	},
	heading: {
		fontWeight: "bold",
	},
	subheading: {
		lineHeight: 1.8,
	},
}));

function ChartInfo() {
	const classes = useStyles();
	return (
		<Card className={classes.card}>
			<BarChart
				width={750}
				height={318}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5,
				}}
			>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="pv" fill="#ef630b" />
				<Bar dataKey="uv" fill="#2c0b06" />
			</BarChart>
		</Card>
	);
}

export default ChartInfo;
