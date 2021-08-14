import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { validationSchema } from "./validationSchema";
import { Grid, makeStyles, Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { updateAPI } from "../../redux/actions/ApiActions";
import CircularProgress from "@material-ui/core/CircularProgress";

const initialValuesForApi = {
	id: null,
	name: "",
	description: "",
	ip: "",
	port: 0,
	context: [""],
	token: "",
	status: false,
	db: false,
	diskspace: false,
	ping: false,
	anomalies: [],
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
	},
	endpointForm: {
		marginBottom: theme.spacing(3),
	},
}));

export default function ApiFormUpdate({ apiForEdit, setNotify, setOpenPopup }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [formValues, setFormValues] = useState(initialValuesForApi);

	const submitForm = (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);
		dispatch(updateAPI(values.id, values)).then((response) => {
			resetForm();
			setSubmitting(false);
			setOpenPopup(false);
			setNotify({
				isOpen: true,
				message: "Updated Successfully",
				type: "success",
			});
		});
	};

	useEffect(() => {
		if (apiForEdit != null) {
			setFormValues(apiForEdit);
		}
	}, [apiForEdit]);
	return (
		<div>
			<Formik
				enableReinitialize={true}
				initialValues={formValues}
				validationSchema={validationSchema}
			>
				{({ values, isSubmitting, setSubmitting, isValid, resetForm }) => (
					<Form autoComplete="off" id="apiForm" className={classes.root}>
						<Grid container spacing={4}>
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
							<Grid item xs={3}>
								<Field
									required
									name="port"
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="API Port"
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
							<Grid item xs={12}>
								<Field
									required
									multiline
									rows={3}
									name="description"
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="API Description"
								/>
							</Grid>

							<Grid container justify="center">
								<Button
									variant="contained"
									color="primary"
									id="submit"
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
							</Grid>
						</Grid>
					</Form>
				)}
			</Formik>
		</div>
	);
}
