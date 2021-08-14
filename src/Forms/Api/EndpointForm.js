import React, { useState, useEffect } from "react";
import {
	Grid,
	makeStyles,
	Button,
	MenuItem,
	IconButton,
	Typography,
	TextField as TextFieldFormParam,
} from "@material-ui/core";
import { v4 as uuidv4 } from "uuid";
import { Formik, Field, Form } from "formik";
import { validationSchemaEndpoint } from "./validationSchemaEndpoint";
import { TextField } from "formik-material-ui";
import { BiMinusCircle, BiPlusCircle } from "react-icons/bi";

const initialValuesForEndpoint = {
	id: 0,
	name: "",
	url: "",
	method: "",
	data: "",
};

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiFormControl-root": {
			width: "100%",
			marginTop: theme.spacing(2),
		},
		padding: theme.spacing(3),
	},
	button: {
		width: "40%",
		border: "1px solid #ef630b",
		padding: 10,
		marginRight: 25,
		marginTop: 25,
	},
	endpointForm: {
		marginBottom: theme.spacing(3),
	},
}));

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function FormRow({
	inputParamsFields,
	inputParamsField,
	setInputParamsFields,
}) {
	const handleChangeInput = (id, event) => {
		const newInputFields = inputParamsFields.map((i) => {
			if (id === i.id) {
				i[event.target.name] = event.target.value;
			}
			return i;
		});
		setInputParamsFields(newInputFields);
	};

	const handleAddFields = () => {
		setInputParamsFields([
			...inputParamsFields,
			{ id: uuidv4(), variable: "", value: "" },
		]);
	};

	const handleRemoveFields = (id) => {
		const values = [...inputParamsFields];
		values.splice(
			values.findIndex((value) => value.id === id),
			1
		);
		setInputParamsFields(values);
	};
	return (
		<React.Fragment>
			<Grid item xs={5}>
				<TextFieldFormParam
					name="variable"
					label="Param"
					variant="outlined"
					value={inputParamsField.variable}
					onChange={(event) => handleChangeInput(inputParamsField.id, event)}
				/>
			</Grid>
			<Grid item xs={5}>
				<TextFieldFormParam
					name="value"
					label="Param Value"
					variant="outlined"
					value={inputParamsField.value}
					onChange={(event) => handleChangeInput(inputParamsField.id, event)}
				/>
			</Grid>
			<Grid item xs={2} style={{ margin: "auto" }}>
				<IconButton
					disabled={inputParamsFields.length === 1}
					onClick={() => handleRemoveFields(inputParamsField.id)}
				>
					<BiMinusCircle />
				</IconButton>
				<IconButton onClick={handleAddFields}>
					<BiPlusCircle />
				</IconButton>
			</Grid>
		</React.Fragment>
	);
}

function EndpointForm({
	endpointList,
	setEndpointList,
	currentEndpoint,
	setCurrentEndpoint,
	setEndpointListAdded,
	setEndpointListUpdated,
	endpointListAdded,
	endpointListUpdated,
	endpointListDeleted,
	setOpenPopup,
	currentApi,
	currentContext,
}) {
	const classes = useStyles();
	const endpointMethods = [
		{
			value: "GET",
			label: "GET",
			color: "green",
		},
		{
			value: "POST",
			label: "POST",
			color: "orange",
		},
		{
			value: "PUT",
			label: "PUT",
			color: "blue",
		},
		{
			value: "DELETE",
			label: "DELETE",
			color: "red",
		},
	];
	const [update, setUpdate] = useState(false);

	const [formValues, setFormValues] = useState(initialValuesForEndpoint);
	useEffect(() => {
		if (currentEndpoint != null) {
			setFormValues(currentEndpoint);
			setUpdate(true);
		}
	}, [currentEndpoint]);

	const customReset = () => {
		setCurrentEndpoint(null);
		setFormValues(initialValuesForEndpoint);
		setUpdate(false);
	};
	const [inputParamsFields, setInputParamsFields] = useState([
		{ id: uuidv4(), variable: "", value: "" },
	]);

	const submitForm = (values, { resetForm }) => {
		if (update) {
			setEndpointList(
				endpointList.map((endpoint) => {
					if (endpoint.id === currentEndpoint.id) {
						return { ...endpoint, ...values };
					} else {
						return endpoint;
					}
				})
			);

			setEndpointListUpdated((endpointListUpdated) => [
				...endpointListUpdated,
				{ ...values },
			]);
			customReset();
			setOpenPopup(false);
		} else {
			// format the params into the final url
			inputParamsFields.forEach((inputParamsField) => {
				if (values.url.includes(inputParamsField.variable)) {
					values.url = values.url.replace(
						"{" + inputParamsField.variable + "}",
						inputParamsField.value
					);
				}
			});
			const generatedId = getRandomInt(10000);
			setEndpointList((endpointList) => [
				...endpointList,
				{ ...values, id: generatedId },
			]);
			setEndpointListAdded((endpointListAdded) => [
				...endpointListAdded,
				{
					name: values.name,
					method: values.method,
					url: values.url,
					data: values.data,
				},
			]);
			resetForm();
			setOpenPopup(false);
		}
	};

	return (
		<div>
			<Formik
				enableReinitialize={true}
				initialValues={formValues}
				validationSchema={validationSchemaEndpoint}
			>
				{({ values, dirty, isValid, resetForm }) => (
					<Form autoComplete="off" id="endpointForm" className={classes.root}>
						<Grid container spacing={3}>
							<Grid item xs={4}>
								<Field
									required
									name="name"
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Endpoint Name"
								/>
							</Grid>
							<Grid item xs={3}>
								<Field
									required
									name="method"
									select
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Method"
								>
									{endpointMethods.map((option) => (
										<MenuItem
											key={option.value}
											value={option.value}
											style={{ color: option.color }}
										>
											{option.label}
										</MenuItem>
									))}
								</Field>
							</Grid>
							<Grid item xs={5}>
								<Field
									required
									name="url"
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Endpoint Url"
								/>
							</Grid>
							<Grid item xs={12}>
								<center>
									<Typography variant="h5">
										{"http://" +
											currentApi.ip +
											":" +
											currentApi.port +
											"/" +
											currentContext.name +
											"/" +
											values.url +
											"/"}
									</Typography>
								</center>
							</Grid>

							<Grid container item xs={12} spacing={3}>
								{inputParamsFields.map((inputParamsField, index) => (
									<FormRow
										key={inputParamsField.id}
										inputParamsFields={inputParamsFields}
										inputParamsField={inputParamsField}
										setInputParamsFields={setInputParamsFields}
									/>
								))}
							</Grid>
							<Grid item xs={12}>
								<Field
									required
									name="data"
									multiline
									rows={4}
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Endpoint Data"
								/>
							</Grid>
							<Grid container justify="center">
								<Button
									variant="contained"
									color="primary"
									id="submitEndpoint"
									disabled={!dirty || !isValid}
									className={classes.button}
									onClick={() => {
										submitForm(values, { resetForm });
									}}
								>
									{update ? "Update" : "Add"}
								</Button>
								{update && (
									<Button
										variant="contained"
										color="primary"
										id="resetForm"
										className={classes.button}
										onClick={() => {
											customReset();
										}}
									>
										Reset Form
									</Button>
								)}
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
}

export default EndpointForm;
