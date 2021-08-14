import React, { useState, useDebugValue } from "react";
import PropTypes from "prop-types";
import {
	Grid,
	Typography,
	makeStyles,
	Tabs,
	Tab,
	Box,
	Button,
} from "@material-ui/core";
import { useDispatch } from "react-redux";
import EndpointForm from "../../Forms/Api/EndpointForm";
import ListEndpoints from "./ListEndpoints";
import {
	removeEndpointsToApi,
	addEndpointToApi,
	updateEndpointsForApi,
} from "../../redux/actions/ApiActions";

const useStyles = makeStyles((theme) => ({
	title: {
		textDecoration: "underline",
		textAlign: "center",
		textDecorationColor: "#ef630b",
		textDecorationThickness: 2,
	},
	border: {
		borderRight: "1px solid #ef630b",
	},
	button: {
		width: "20%",
		border: "1px solid #ef630b",
		padding: 10,
	},
	listendpoint: {
		paddingLeft: 20,
		height: 320,
	},
	container: {
		height: 500,
	},
	center: { textAlign: "center" },
}));

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box p={3}>
					<Typography>{children}</Typography>
				</Box>
			)}
		</div>
	);
}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.any.isRequired,
	value: PropTypes.any.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		"aria-controls": `simple-tabpanel-${index}`,
	};
}

function useStateWithLabel(initialValue, name) {
	const [value, setValue] = useState(initialValue);
	useDebugValue(`${name}: ${value}`);
	return [value, setValue];
}

function ManageEndpoints({ apiForEdit, setNotify }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [endpointList, setEndpointList] = useState(apiForEdit.endpoints);
	const [currentEndpoint, setCurrentEndpoint] = useState(null);
	const [endpointListAdded, setEndpointListAdded] = useStateWithLabel(
		[],
		"endpointListAdded"
	);
	const [endpointListUpdated, setEndpointListUpdated] = useStateWithLabel(
		[],
		"endpointListUpdated"
	);
	const [endpointListDeleted, setEndpointListDeleted] = useStateWithLabel(
		[],
		"endpointListDeleted"
	);
	// const submit = () => {
	// 	if (endpointListDeleted.length > 0) {
	// 		dispatch(
	// 			removeEndpointsToApi(apiForEdit.id, { endpoints: endpointListDeleted })
	// 		).then((response) => {
	// 			setNotify({
	// 				isOpen: true,
	// 				message: "Operations executed successfully",
	// 				type: "success",
	// 			});
	// 		});
	// 		setEndpointListDeleted([]);
	// 	}
	// 	if (endpointListAdded.length > 0) {
	// 		dispatch(
	// 			addEndpointToApi(apiForEdit.id, { endpoints: endpointListAdded })
	// 		).then((response) => {
	// 			setNotify({
	// 				isOpen: true,
	// 				message: "Operations executed successfully",
	// 				type: "success",
	// 			});
	// 		});
	// 		setEndpointListAdded([]);
	// 	}
	// 	if (endpointListUpdated.length > 0) {
	// 		dispatch(
	// 			updateEndpointsForApi(apiForEdit.id, { endpoints: endpointListUpdated })
	// 		).then((response) => {
	// 			setNotify({
	// 				isOpen: true,
	// 				message: "Operations executed successfully",
	// 				type: "success",
	// 			});
	// 		});
	// 		setEndpointListUpdated([]);
	// 	}
	// };
	const [value, setValue] = React.useState(0);

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};
	return (
		<div>
			<Tabs
				value={value}
				onChange={handleChange}
				indicatorColor="primary"
				textColor="primary"
				centered
			>
				<Tab
					style={{ color: "black" }}
					label="Endpoint Form"
					{...a11yProps(0)}
				/>
				<Tab
					style={{ color: "black" }}
					label="List Endpoints"
					{...a11yProps(1)}
				/>
			</Tabs>
			<TabPanel value={value} index={0}>
				<EndpointForm
					endpointList={endpointList}
					currentEndpoint={currentEndpoint}
					setEndpointList={setEndpointList}
					setCurrentEndpoint={setCurrentEndpoint}
					setEndpointListAdded={setEndpointListAdded}
					setEndpointListUpdated={setEndpointListUpdated}
					endpointListAdded={endpointListAdded}
					endpointListUpdated={endpointListUpdated}
					endpointListDeleted={endpointListDeleted}
					setValue={setValue}
				/>
			</TabPanel>
			<TabPanel value={value} index={1}>
				<ListEndpoints
					endpointList={endpointList}
					setCurrentEndpoint={setCurrentEndpoint}
					setEndpointList={setEndpointList}
					setEndpointListAdded={setEndpointListAdded}
					endpointListAdded={endpointListAdded}
					setEndpointListDeleted={setEndpointListDeleted}
					setValue={setValue}
				/>
				<Grid container spacing={5} alignItems="center">
					<Grid item xs={6} className={classes.center}>
						<Button
							variant="contained"
							color="primary"
							id="submitAllEndpoints"
							className={classes.button}
							onClick={() => {
								// submit();
							}}
						>
							Submit
						</Button>
					</Grid>
					<Grid item xs={6}>
						{endpointListAdded.length} Added , {endpointListUpdated.length}{" "}
						Updated , {endpointListDeleted.length} Deleted.
					</Grid>
				</Grid>
			</TabPanel>
		</div>
	);
}

export default ManageEndpoints;
