import { Formik, Form, Field } from "formik";
import React, { useEffect, useState } from "react";
import { validationSchema } from "./validationSchema";
import { Grid, makeStyles, MenuItem, Button } from "@material-ui/core";
import { BeatLoader } from "react-spinners";
import { TextField } from "formik-material-ui";
import { useDispatch } from "react-redux";
import { updateProject } from "../../redux/actions/ProjectActions";

const initialValues = {
	id: null,
	name: "",
	responsableIt: "",
	responsableMetier: "",
	equipe: "",
	description: "",
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

function ProjectUpdateForm({
	teams,
	itResponsables,
	workResponsables,
	projectForEdit,
	setNotify,
	setOpenPopup,
}) {
	const classes = useStyles();
	const dispatch = useDispatch();
	const [formValues, setFormValues] = useState(initialValues);

	useEffect(() => {
		if (projectForEdit != null) {
			setFormValues(projectForEdit);
		}
	}, [projectForEdit]);

	const submitForm = (values, { setSubmitting }) => {
		setSubmitting(true);
		dispatch(updateProject(values.id, values)).then((response) => {
			setSubmitting(false);
			setOpenPopup(false);
			setNotify({
				isOpen: true,
				message: "Updated Successfully",
				type: "success",
			});
		});
	};
	const itResponsableItems = itResponsables.map((itResponsable) => {
		return {
			value: itResponsable.name,
			label: itResponsable.name,
		};
	});
	const workResponsableItems = workResponsables.map((workResponsable) => {
		return {
			value: workResponsable.name,
			label: workResponsable.name,
		};
	});
	const teamsItems = teams.map((teamsItem) => {
		return {
			value: teamsItem.name,
			label: teamsItem.name,
		};
	});

	return (
		<div>
			<Formik
				validationSchema={validationSchema}
				initialValues={formValues}
				enableReinitialize={true}
				onSubmit={(values, { setSubmitting }) =>
					submitForm(values, { setSubmitting })
				}
			>
				{({ isSubmitting, dirty, isValid }) => (
					<Form autoComplete="off" id="projectUpdateForm" className={classes.root}>
						<Grid container spacing={2}>
							<Grid item xs={12}>
								<Field
									required
									autoFocus={true}
									name="name"
									className={classes.field}
									component={TextField}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Name of Project"
								/>
							</Grid>
							<Grid item xs={12}>
								<Field
									required
									name="description"
									component={TextField}
									multiline
									rows={4}
									variant="outlined"
									InputLabelProps={{ shrink: true }}
									label="Description"
								/>
							</Grid>
							<Grid item xs={12}>
								<Field
									required
									name="responsableIt"
									type="text"
									select
									component={TextField}
									label="Select It Responsable"
									variant="outlined"
								>
									{itResponsableItems.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</Field>
								<Field
									required
									name="responsableMetier"
									type="text"
									select
									component={TextField}
									label="Select Work Responsable"
									variant="outlined"
								>
									{workResponsableItems.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</Field>
								<Field
									required
									name="equipe"
									type="text"
									select
									component={TextField}
									label="Select Team"
									variant="outlined"
								>
									{teamsItems.map((option) => (
										<MenuItem key={option.value} value={option.value}>
											{option.label}
										</MenuItem>
									))}
								</Field>
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
										<BeatLoader size={15} color="#ef630b" />
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

export default ProjectUpdateForm;
