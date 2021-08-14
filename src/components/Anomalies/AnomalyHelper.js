import AnomalyService from "../../services/AnomalyService";

const getApiAnomalies = (id, setApiAnomalies) => {
	AnomalyService.getApiAnomalies(id)
		.then((response) => {
			setApiAnomalies(response.data);
		})
		.catch((e) => {
			console.log(e);
		});
};

const headCells = [
	{ id: "status", label: "Status" },
	{ id: "error", label: "Error" },
	{ id: "path", label: "Path" },
	{ id: "email", label: "Email" },
	{ id: "date", label: "Time" },
	{ id: "fixed", label: "Fixed" },
];

const AnomalyHelper = { getApiAnomalies,headCells };
export default AnomalyHelper;
