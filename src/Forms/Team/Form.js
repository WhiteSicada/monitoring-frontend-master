import React, { useState, useEffect } from "react";
import { Field, Form, Formik } from "formik";
import { TextField } from "formik-material-ui";
import { validationSchema } from "./validationSchema";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";
import {
	createTeam,
	getTeams,
	updateTeam,
} from "../../redux/actions/TeamActions";

const initialValues = {
	id: null,
	name: "",
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

function TeamForm({ teamForEdit, setNotify, setOpenPopup }) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	

	const [formValues, setFormValues] = useState(initialValues);
	const [update, setUpdate] = useState(false);

	const submitForm = (values, { setSubmitting, resetForm }) => {
		setLoading(true);
		if (update) {
			dispatch(updateTeam(values.id, values)).then((response) => {
				resetForm();
				setLoading(false);
				setOpenPopup(false);
				dispatch(getTeams());
				setNotify({
					isOpen: true,
					message: "Updated Successfully",
					type: "success",
				});
			});
		} else {
			dispatch(createTeam(values))
				.then((response) => {
					resetForm();
					setLoading(false);
					setOpenPopup(false);
					setNotify({
						isOpen: true,
						message: "Created Successfully",
						type: "success",
					});
				})
				.catch((error) => {
					resetForm();
					setLoading(false);
					console.log("error");
				});
		}
	};

	useEffect(() => {
		if (teamForEdit != null) {
			setFormValues(teamForEdit);
			setUpdate(true);
		}
	}, [teamForEdit]);

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
					<Form id="teamForm" autoComplete="off" className={classes.root}>
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
									label="Nom de l'équipe"
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

export default TeamForm;
