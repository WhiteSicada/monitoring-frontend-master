import React, { useState, Fragment } from "react";
import { Field, Form, Formik, FieldArray } from "formik";
import { TextField, CheckboxWithLabel } from "formik-material-ui";
import { validationSchema } from "./validationSchema";
import Button from "@material-ui/core/Button";
import { Grid } from "@material-ui/core";
import PropTypes from "prop-types";
import CheckBoxContext from "../../components/Projects/customTags/CheckBoxContext";
import {
  makeStyles,
  Typography,
  Tabs,
  Tab,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  Card,
  CardHeader,
  Divider,
  List,
  Box,
  ListItem,
} from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import { useDispatch } from "react-redux";
import {
  createProject,
  addApiToProject,
} from "../../redux/actions/ProjectActions";

const initialValues = {
  id: null,
  name: "",
  responsableIt: "",
  responsableMetier: "",
  equipe: "",
  description: "",
  apis: [],
  contexts: [],
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
  cardHeader: {
    padding: theme.spacing(2),
    borderLeft: "2px solid #ef630b",
  },
  list: {
    height: 350,
  },
  card: {
    marginRight: 25,
    marginLeft: 25,
  },
}));

function getSteps() {
  return ["Project Infos", "Select APIs", "Select Contexts"];
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-auto-tabpanel-${index}`}
      aria-labelledby={`scrollable-auto-tab-${index}`}
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
    id: `scrollable-auto-tab-${index}`,
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

function formatProjectObject(values, apis) {
  const new_apis = [];
  for (let i = 0; i < values.apis.length; i++) {
    const api = apis.find((element) => element.name === values.apis[i]);
    let custom_api = { api: api.name, contexts: [] };
    for (let k = 0; k < values.contexts.length; k++) {
      const context = api.contexts.find(
        (element) => element.name === values.contexts[k]
      );
      if (context !== null) {
        custom_api.contexts.push(values.contexts[k]);
      }
    }
    new_apis.push(custom_api);
  }
  return {
    id: values.id,
    name: values.name,
    responsableIt: values.responsableIt,
    responsableMetier: values.responsableMetier,
    equipe: values.equipe,
    description: values.description,
    apis: new_apis,
  };
}

export default function ProjectCreationForm({
  teams,
  itResponsables,
  workResponsables,
  apis,
  setNotify,
  setOpenPopup,
}) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const steps = getSteps();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const [formValues, setFormValues] = useState(initialValues);
  // const [apiItems, setApiItems] = useState([]);
  const submitForm = (values, { setSubmitting, resetForm }) => {
    // console.log(values.id + " " + values.apis);
    setSubmitting(true);
    console.log(JSON.stringify(formatProjectObject(values, apis)));
    // dispatch(createProject(values))
    // 	.then((response) => {
    // 		if (values.apis.length !== 0) {
    // 			dispatch(addApiToProject(response.id, { apis: values.apis }))
    // 				.then((e) => {
    // 					resetForm();
    // 					setSubmitting(false);
    // 					setOpenPopup(false);
    // 					setNotify({
    // 						isOpen: true,
    // 						message: "Created Successfully",
    // 						type: "success",
    // 					});
    // 				})
    // 				.catch((error) => {
    // 					resetForm();
    // 					setSubmitting(false);
    // 					console.log(error);
    // 				});
    // 		} else {
    // 			resetForm();
    // 			setSubmitting(false);
    // 			setOpenPopup(false);
    // 			setNotify({
    // 				isOpen: true,
    // 				message: "Created Successfully",
    // 				type: "success",
    // 			});
    // 		}
    // 	})
    // 	.catch((error) => {
    // 		resetForm();
    // 		setSubmitting(false);
    // 		console.log(error);
    // 	});
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
  // finds the contexts of the given api
  const findContent = (api) => {
    for (let k = 0; k < apis.length; k++) {
      if (apis[k].name === api) {
        return apis[k].contexts;
      }
    }
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
      <div>
        <Formik
          enableReinitialize={true}
          initialValues={formValues}
          validationSchema={validationSchema}
        >
          {({
            values,
            isSubmitting,
            dirty,
            isValid,
            setSubmitting,
            resetForm,
          }) => (
            <Form autoComplete="off" id="projectForm" className={classes.root}>
              <Grid container spacing={8}>
                {activeStep === 0 && (
                  <Grid
                    item
                    xs={12}
                    md={6}
                    lg={6}
                    style={{
                      width: "50%",
                      marginLeft: "auto",
                      marginRight: "auto",
                      height: 500,
                    }}
                  >
                    <Field
                      required
                      name="name"
                      component={TextField}
                      variant="outlined"
                      InputLabelProps={{ shrink: true }}
                      label="Name of Project"
                    />

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
                )}

                {activeStep === 1 && (
                  <Grid item xs={12}>
                    <Card className={classes.card}>
                      <CardHeader
                        className={classes.cardHeader}
                        title="Available APIs"
                      />
                      <Divider />

                      <List
                        dense
                        className={classes.list}
                        id="listApisForProject"
                      >
                        <Grid container>
                          {apis.map((api) => (
                            <Grid item xs={4} key={api.id}>
                              <ListItem>
                                <Field
                                  component={CheckboxWithLabel}
                                  type="checkbox"
                                  name="apis"
                                  Label={{ label: api.name }}
                                  value={api.name}
                                />
                              </ListItem>
                            </Grid>
                          ))}
                          <ListItem />
                        </Grid>
                      </List>
                    </Card>
                  </Grid>
                )}

                {activeStep === 2 && (
                  <Grid item xs={12}>
                    {values.apis && values.apis.length > 0 ? (
                      <div>
                        <Tabs
                          value={value}
                          onChange={handleChange}
                          indicatorColor="primary"
                          textColor="primary"
                          centered
                        >
                          {values.apis.map((api, index) => (
                            <Tab label={api} {...a11yProps(index)} />
                          ))}
                        </Tabs>
                        {values.apis.map((api, index) => (
                          <TabPanel value={value} index={index}>
                            <FieldArray
                              name="contexts"
                              render={(arrayHelpers) => (
                                <Fragment>
                                  {findContent(api).map((context, index) => {
                                    return (
                                      <Field
                                        key={`${context.name}_${index}`}
                                        name={context.name}
                                        render={({ field }) => {
                                          return (
                                            <CheckBoxContext
                                              {...field}
                                              endpoints={
                                                context.endpoints.length
                                              }
                                              id={`${context.name}_${index}`}
                                              name={context.name}
                                              label={context.name}
                                              arrayHelpers={arrayHelpers}
                                            />
                                          );
                                        }}
                                      />
                                    );
                                  })}
                                </Fragment>
                              )}
                            />
                          </TabPanel>
                        ))}
                      </div>
                    ) : (
                      <div>
                        <center>
                          <h3>No API selected. 😲</h3>
                        </center>
                      </div>
                    )}
                  </Grid>
                )}

                <Grid container justify="center">
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
                      {isSubmitting ? <CircularProgress size={24} /> : "Submit"}
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
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
