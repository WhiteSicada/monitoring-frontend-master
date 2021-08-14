import React, { useEffect, useState, useDebugValue } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
	Grid,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Checkbox,
	Button,
	Card,
	CardHeader,
	Divider,
} from "@material-ui/core";
import { CircleLoader } from "react-spinners";
import { useDispatch } from "react-redux";
import {
	addApiToProject,
	removeApiToProject,
} from "../../redux/actions/ProjectActions";

const useStyles = makeStyles((theme) => ({
	root: {
		margin: "auto",
	},
	cardHeader: {
		padding: theme.spacing(2),
		borderLeft: "2px solid #ef630b",
	},
	list: {
		height: 350,
	},
	button: {
		width: "40%",
		border: "1px solid #ef630b",
		padding: 10,
		marginTop: 25,
	},
}));

function not(a, b) {
	return a.filter((value) => b.indexOf(value) === -1);
}

function intersection(a, b) {
	return a.filter((value) => b.indexOf(value) !== -1);
}

function useStateWithLabel(initialValue, name) {
	const [value, setValue] = useState(initialValue);
	useDebugValue(`${name}: ${value}`);
	return [value, setValue];
}

export default function ManageApisTransferList({
	apis,
	projectForEdit,
	setProjectForEdit,
	setOpenTransferListPopup,
}) {
	const classes = useStyles();
	const [checked, setChecked] = useStateWithLabel([], "checked");
	const dispatch = useDispatch();
	const fullListAPI = apis.map((api) => api.name);
	const [left, setLeft] = useStateWithLabel(fullListAPI, "left");
	const [initialeList, setInitialeList] = useStateWithLabel([], "initialeList");
	const [loading, setLoading] = useStateWithLabel(false, "loading");
	const [right, setRight] = useStateWithLabel([], "right");
	const leftChecked = intersection(checked, left);
	const rightChecked = intersection(checked, right);

	const handleToggle = (value) => () => {
		const currentIndex = checked.indexOf(value);
		const newChecked = [...checked];

		if (currentIndex === -1) {
			newChecked.push(value);
		} else {
			newChecked.splice(currentIndex, 1);
		}

		setChecked(newChecked);
	};

	const handleCheckedRight = () => {
		setRight(right.concat(leftChecked));
		setLeft(not(left, leftChecked));
		setChecked(not(checked, leftChecked));
	};

	const handleCheckedLeft = () => {
		setLeft(left.concat(rightChecked));
		setRight(not(right, rightChecked));
		setChecked(not(checked, rightChecked));
	};

	useEffect(() => {
		if (projectForEdit != null) {
			const projectListAPIs = projectForEdit.listAPIs.map((api) => api.name);
			setLeft(not(fullListAPI, projectListAPIs));
			setRight(projectListAPIs);
			setInitialeList(projectListAPIs);
		}
	}, [projectForEdit]);

	const updateListAPIS = (id) => {
		setLoading(true);
		const removedAPIS = not(initialeList, right);
		const addedAPIs = not(right, initialeList);
		console.log(removedAPIS.length);
		if (removedAPIS.length !== 0) {
			dispatch(removeApiToProject(id, { apis: removedAPIS }));
		}
		if (addedAPIs.length !== 0) {
			dispatch(addApiToProject(id, { apis: addedAPIs }));
		}
		setLoading(false);
		setOpenTransferListPopup(false);
		setProjectForEdit(null);
	};

	const customList = (title, items,id) => (
		<Card >
			<CardHeader className={classes.cardHeader} title={title} />
			<Divider />

			<List dense className={classes.list} id={id}>
				<Grid container>
					{items.map((api) => (
						<Grid item xs={6} key={Math.random()}>
							<ListItem role="listitem" button onClick={handleToggle(api)}>
								<ListItemIcon>
									<Checkbox
										checked={checked.indexOf(api) !== -1}
										tabIndex={-1}
										disableRipple
									/>
								</ListItemIcon>
								<ListItemText primary={api} />
							</ListItem>
						</Grid>
					))}
					<ListItem />
				</Grid>
			</List>
		</Card>
	);

	return (
		<Grid
			container
			spacing={2}
			justify="center"
			alignItems="center"
			className={classes.root}
		>
			<Grid item xs={5}>
				{customList("Available APIs", left, "AvailableAPIs")}
			</Grid>
			<Grid item>
				<Grid container direction="column" alignItems="center">
					<Button
						variant="outlined"
						size="small"
						id="moveApisToRight"
						className={classes.button}
						onClick={handleCheckedRight}
						disabled={leftChecked.length === 0}
						aria-label="move selected right"
					>
						&gt;
					</Button>
					<Button
						variant="outlined"
						size="small"
						id="moveApisToLeft"
						className={classes.button}
						onClick={handleCheckedLeft}
						disabled={rightChecked.length === 0}
						aria-label="move selected left"
					>
						&lt;
					</Button>
				</Grid>
			</Grid>
			<Grid item xs={5}>
				{customList("Project APIs", right, "ProjectAPIs")}
			</Grid>
			<Grid container justify="center">
				<Button
					variant="outlined"
					color="primary"
					id="manageApisSubmit"
					className={classes.button}
					onClick={() => {
						updateListAPIS(projectForEdit.id);
					}}
				>
					{loading ? <CircleLoader size={10} color="#ef630b" /> : "Submit"}
				</Button>
			</Grid>
		</Grid>
	);
}
