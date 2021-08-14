import { makeStyles } from "@material-ui/core";
import TestService from "../../services/TestService";

const headCells = [
	// { id: "id", label: "Team Id" },
	{ id: "created_at", label: "Created" },
	{ id: "status", label: "Status" },
	{ id: "spark", label: "Trigger" },
	{ id: "successful", label: "Successful" },
	{ id: "execution_time", label: "Execution time" },
	{ id: "api", label: "API" },
	{ id: "method", label: "Method" },
	{ id: "endpoint", label: "Endpoint" },
	{ id: "actions", label: "Actions", disableSorting: true },
];

const getTestScans = (id, setTestScans) => {
	TestService.getTestScans(id)
		.then((response) => {
			setTestScans(response.data);
		})
		.catch((e) => {
			console.log(e);
		});
};

const handleSearch = (e, setFilterFn) => {
	let target = e.target;
	setFilterFn({
		fn: (testScans) => {
			if (target.value == "") return testScans;
			else return testScans.filter((x) => x.name.includes(target.value));
		},
	});
};

const useStyles = makeStyles((theme) => ({
	pageContent: {
		padding: theme.spacing(3),
	},
	searchInput: {
		width: "75%",
	},
	newButton: {
		position: "absolute",
		right: "10px",
	},
}));

const ScansHelper = {
	headCells,
	useStyles,
	getTestScans,
	handleSearch,
};

export default ScansHelper;
