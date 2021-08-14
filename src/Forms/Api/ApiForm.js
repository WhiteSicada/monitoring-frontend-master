import React, { useState } from "react";
import { Field, Form, Formik, FieldArray } from "formik";
import { TextField } from "formik-material-ui";
import { validationSchema } from "./validationSchema";
import {
	Grid,
	makeStyles,
	Button,
	Box,
	Stepper,
	Step,
	StepLabel,
	Typography,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";
import {
	createAPI,
	addContextsToApi,
} from "../../redux/actions/ApiActions";

const initialValuesForApi = {
	id: null,
	name: "",
	description: "",
	ip: "",
	port: 0,
	contexts: [""],
	token:
		"",
};

function getSteps() {
	return ["API Infos", "Add API Contexts"];
}

const useStyles = makeStyles((theme) => ({
	root: {
		"& .MuiFormControl-root": {
			width: "100%",
			marginTop: theme.spacing(2),
		},
		padding: theme.spacing(3),
	},
	formControl: {
		margin: theme.spacing(1),
		minWidth: 120,
	},
	button: {
		width: "40%",
		border: "1px solid #ef630b",
		padding: 10,
		marginRight: 25,
	},
	endpointForm: {
		marginBottom: theme.spacing(3),
	},
}));

export default function ApiForm({ setNotify, setOpenPopup }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [activeStep, setActiveStep] = useState(0);
	const steps = getSteps();

	const handleNext = () => {
		setActiveStep((prevActiveStep) => prevActiveStep + 1);
	};
	const handleBack = () => {
		setActiveStep((prevActiveStep) => prevActiveStep - 1);
	};
	const [formValues, setFormValues] = useState(initialValuesForApi);

	const submitForm = (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);
		var apiObject = {
			name: values.name,
			description: values.description,
			ip: values.ip,
			port: values.port,
			token: values.token,
		};
		dispatch(createAPI(apiObject))
			.then((response) => {
				if (values.contexts.length > 0) {
					dispatch(
						addContextsToApi(response.id, { contexts: values.contexts })
					).then((response) => {
						resetForm();
						setSubmitting(false);
						setOpenPopup(false);
						setNotify({
							isOpen: true,
							message: "Created Successfully",
							type: "success",
						});
					});
				}
			})
			.catch((error) => {
				resetForm();
				setSubmitting(false);
				console.log("error");
			});
	};

	return (
		<div>
			<Stepper activeStep={activeStep}>
				{steps.map((label, index) => {
					return (
						<Step key={label}>
							<StepLabel>{label}</StepLabel>
						</Step>
					);
				})}
			</Stepper>
			<Formik
				enableReinitialize={true}
				initialValues={formValues}
				validationSchema={validationSchema}
			>
				{({
					errors,
					values,
					isSubmitting,
					setSubmitting,
					isValid,
					resetForm,
					touched,
					setValues,
					handleChange,
				}) => (
					<Form autoComplete="off" id="apiForm" className={classes.root}>
						{activeStep === 0 && (
							<Grid container spacing={1} justify="center">
								<Grid item xs={12}>
									<Field
										required
										autoFocus={true}
										name="name"
										component={TextField}
										variant="outlined"
										InputLabelProps={{ shrink: true }}
										label="API Name"
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										required
										name="ip"
										component={TextField}
										variant="outlined"
										InputLabelProps={{ shrink: true }}
										label="API Ip Adress"
									/>
								</Grid>
								<Grid item xs={4}>
									<Field
										required
										name="port"
										component={TextField}
										variant="outlined"
										InputLabelProps={{ shrink: true }}
										label="API Port"
									/>
								</Grid>
								<Grid item xs={4}>
									<Box
										height="100%"
										display="flex"
										justifyContent="center"
										flexDirection="column"
									>
										{"http://" + values.ip + ":" + values.port + "/"}
									</Box>
								</Grid>
								<Grid item xs={12}>
									<Field
										required
										multiline
										rows={2}
										name="description"
										component={TextField}
										variant="outlined"
										InputLabelProps={{ shrink: true }}
										label="API Description"
									/>
								</Grid>
								<Grid item xs={12}>
									<Field
										required
										multiline
										rows={8}
										name="token"
										component={TextField}
										variant="outlined"
										InputLabelProps={{ shrink: true }}
										label="API Token"
									/>
								</Grid>
							</Grid>
						)}

						{activeStep === 1 && (
							<Grid item xs={12}>
								<FieldArray
									name="contexts"
									render={(arrayHelpers) => (
										<div>
											{values.contexts && values.contexts.length > 0 ? (
												values.contexts.map((friend, index) => (
													<Grid container spacing={2} key={index}>
														<Grid item xs={3}>
															<Box
																height="100%"
																display="flex"
																justifyContent="center"
																flexDirection="column"
															>
																<Typography variant="h6" gutterBottom>
																	{"http://" +
																		values.ip +
																		":" +
																		values.port +
																		"/"}
																</Typography>
															</Box>
														</Grid>
														<Grid item xs={7}>
															<Field
																name={`contexts.${index}`}
																component={TextField}
																variant="outlined"
																label="Context value"
															/>
														</Grid>
														<Grid item xs={2}>
															<Button
																type="button"
																onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
															>
																-
															</Button>
															<Button
																type="button"
																onClick={() => arrayHelpers.insert(index, "")} // insert an empty string at a position
															>
																+
															</Button>
														</Grid>
													</Grid>
												))
											) : (
												<button
													type="button"
													onClick={() => arrayHelpers.push("")}
												>
													{/* show this when user has removed all friends from the list */}
													Add a context
												</button>
											)}
										</div>
									)}
								/>
							</Grid>
						)}

						<Grid container justify="center" style={{ marginTop: "2%" }}>
							<Button
								disabled={activeStep === 0}
								onClick={handleBack}
								className={classes.button}
							>
								Back
							</Button>
							{activeStep === steps.length - 1 ? (
								<Button
									variant="contained"
									color="primary"
									id="submit"
									disabled={!isValid}
									className={classes.button}
									onClick={() => {
										submitForm(values, { setSubmitting, resetForm });
									}}
								>
									{isSubmitting ? (
										<CircularProgress
											size={24}
											className={classes.buttonProgress}
										/>
									) : (
										"Submit"
									)}
								</Button>
							) : (
								<Button
									size="small"
									variant="contained"
									color="primary"
									id="next"
									onClick={handleNext}
									className={classes.button}
								>
									Next
								</Button>
							)}
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
}
