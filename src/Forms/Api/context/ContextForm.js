import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { validationSchema } from "./validationSchema";
import { Grid, makeStyles, Button, Typography } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";

const initialValues = {
	id: null,
	name: "",
};
function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}
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
}));

function ContextForm({
	contextList,
	setContextList,
	currentContext,
	setOpenPopup,
	setContextListAdded,
	setContextListUpdated,
	setCurrentContext,
	currentApi,
}) {
	const classes = useStyles();
	const [loading, setLoading] = useState(false);
	const [formValues, setFormValues] = useState(initialValues);
	const [update, setUpdate] = useState(false);
	const customReset = () => {
		setCurrentContext(null);
		setFormValues(initialValues);
		setUpdate(false);
	};
	const submitForm = (values, { setSubmitting, resetForm }) => {
		setLoading(true);
		if (update) {
			setContextList(
				contextList.map((context) => {
					if (context.id === currentContext.id) {
						return { ...context, ...values };
					} else {
						return context;
					}
				})
			);

			setContextListUpdated((contextListUpdated) => [
				...contextListUpdated,
				{ ...values },
			]);
			customReset();
			setOpenPopup(false);
		} else {
			const generatedId = getRandomInt(10000);
			setContextList((contextList) => [
				...contextList,
				{ ...values, id: generatedId },
			]);
			setContextListAdded((contextListAdded) => [
				...contextListAdded,
				values.name,
			]);
			resetForm();
			setOpenPopup(false);
		}
	};

	useEffect(() => {
		if (currentContext != null) {
			setFormValues(currentContext);
			setUpdate(true);
		}
	}, [currentContext]);

	return (
		<div>
			<Formik
				enableReinitialize={true}
				initialValues={formValues}
				validationSchema={validationSchema}
				onSubmit={(values, { setSubmitting, resetForm }) =>
					submitForm(values, { setSubmitting, resetForm })
				}
			>
				{({ values, isSubmitting, dirty, isValid, resetForm }) => (
					<Form id="contextForm" autoComplete="off" className={classes.root}>
						<center>
							<Typography variant="h6" gutterBottom>
								{"http://" +
									currentApi.ip +
									":" +
									currentApi.port +
									"/" +
									values.name}
							</Typography>
						</center>

						<Grid container spacing={8}>
							<Grid item xs={12}>
								<Field
									required
									autoFocus={true}
									name="name"
									id="name"
									className={classes.field}
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Context Url"
								/>
							</Grid>
							<Grid container justify="center">
								<Button
									variant="outlined"
									color="primary"
									disabled={isSubmitting || !dirty || !isValid}
									type="submit"
									className={classes.button}
								>
									{loading ? (
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

export default ContextForm;
