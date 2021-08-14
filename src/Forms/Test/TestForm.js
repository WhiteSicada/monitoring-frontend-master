import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { validationSchema } from "./validationSchema";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { CircleLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import {  updateTest } from "../../redux/actions/TestActions";

const initialValues = {
	id: null,
	name: "",
	interval: 0,
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
}));

function TestForm({ testForEdit, setNotify, setOpenPopup }) {
	const classes = useStyles();
	const dispatch = useDispatch();

	const [formValues, setFormValues] = useState(initialValues);

	const submitForm = (values, { setSubmitting, resetForm }) => {
		setSubmitting(true);
		dispatch(updateTest(values.id, values)).then((response) => {
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
		if (testForEdit != null) {
			setFormValues(testForEdit);
		}
	}, [testForEdit]);

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
				{({ isSubmitting, dirty, isValid, resetForm }) => (
					<Form id="testForm" autoComplete="off" className={classes.root}>
						<Grid container spacing={8}>
							<Grid item xs={8}>
								<Field
									required
									autoFocus={true}
									name="name"
									id="name"
									className={classes.field}
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Test Name"
								/>
							</Grid>
							<Grid item xs={4}>
								<Field
									required
									name="interval"
									id="interval"
									className={classes.field}
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Test Interval"
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
									{isSubmitting ? (
										<CircleLoader size={10} color="#ef630b" />
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

export default TestForm;
