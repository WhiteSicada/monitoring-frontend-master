import { customAxios } from "./customAxios";

const createWorkResponsable = (workResponsable) => {
	return customAxios.post("/responsablemetier", workResponsable);
};

const getWorkResponsables = () => {
	return customAxios.get("/responsablemetiers");
};

const deleteWorkResponsable = (id) => {
	return customAxios.delete(`/responsablemetier/${id}`);
};

const updateWorkResponsable = (id, workResponsable) => {
	return customAxios.put(`/responsablemetier/${id}`, workResponsable);
};

const WorkResponsableService = {
	createWorkResponsable,
	getWorkResponsables,
	deleteWorkResponsable,
	updateWorkResponsable,
};

export default WorkResponsableService;
