import React from "react";
import { Divider, Grid } from "@material-ui/core";
import CardInfo from "./Card";
import { FaTasks } from "react-icons/fa";
import { AiOutlineBug, AiOutlineCheck, AiFillTool } from "react-icons/ai";
import ChartInfo from "./Chart";
import HomeHelper from "./HomeHelper";
import {
	ScatterChart,
	Scatter,
	XAxis,
	YAxis,
	ZAxis,
	CartesianGrid,
	Tooltip,
	Legend,
} from "recharts";

const data01 = [
	{ x: 10, y: 30 },
	{ x: 30, y: 200 },
	{ x: 45, y: 100 },
	{ x: 50, y: 400 },
	{ x: 70, y: 150 },
	{ x: 100, y: 250 },
	{ x: 110, y: 20 },
	{ x: 50, y: 180 },
	{ x: 75, y: 240 },
	{ x: 100, y: 100 },
	{ x: 120, y: 190 },
];
const data02 = [
	{ x: 30, y: 20 },
	{ x: 50, y: 180 },
	{ x: 75, y: 240 },
	{ x: 100, y: 100 },
	{ x: 120, y: 190 },
	{ x: 10, y: 30 },
	{ x: 30, y: 200 },
	{ x: 45, y: 100 },
	{ x: 50, y: 400 },
	{ x: 70, y: 150 },
	{ x: 100, y: 250 },
];

export function Main() {
	return (
		<div style={{ marginTop: "2.5%" }}>
			<h1>Analytic Dashboard</h1>
			<h3>Welcome back, User! We've missed you. 👋</h3>
			<Divider />
			<Grid container spacing={2} style={{ marginTop: "1%" }}>
				{HomeHelper.cardsData.map((cardItem, index) => (
					<Grid item xs={3}>
						<CardInfo
							title={cardItem.title}
							content={cardItem.content}
							icon={cardItem.icon}
						/>
					</Grid>
				))}
			</Grid>
		</div>
	);
}
