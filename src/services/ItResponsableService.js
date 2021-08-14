import { customAxios } from "./customAxios";

const createItResponsable = (itResponsable) => {
	return customAxios.post("/responsableit", itResponsable);
};

const getItResponsables = () => {
	return customAxios.get("/responsableits");
};

const deleteItResponsable = (id) => {
	return customAxios.delete(`/responsableit/${id}`);
};

const updateItResponsable = (id, itResponsable) => {
	return customAxios.put(`/responsableit/${id}`, itResponsable);
};

const ItResponsableService = {
	createItResponsable,
	getItResponsables,
	deleteItResponsable,
	updateItResponsable,
};

export default ItResponsableService;
