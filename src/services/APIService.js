import { customAxios } from "./customAxios";

//  API section
const createAPI = (api) => {
	return customAxios.post("/api", api);
};

const getAPIs = () => {
	return customAxios.get("/apis");
};

const getAPiById = (id) => {
	return customAxios.get(`/apis/${id}`);
};

const deleteAPI = (id) => {
	return customAxios.delete(`/api/${id}`);
};

const updateAPI = (id, api) => {
	return customAxios.put(`/api/${id}`, api);
};

// /////////////////////////////////////  Context Section

// provide context list names and store them
const addContextsToApi = (id, contexts) => {
	return customAxios.put(`/api/${id}/addContexts`, contexts);
};
// provide context list Ids and delete them
const removeContextsFromApi = (id, contexts) => {
	return customAxios.put(`/api/${id}/removeContexts`, contexts);
};
// provide updated context names and save them
const updateContextsForApi = (id, contexts) => {
	return customAxios.put(`/api/${id}/updateContexts`, contexts);
};

// ///////////////////////////////////// Endpoint Section

// provide endpoints list objects and store them
const addEndpointsToContext = (api_id, context_id, endpoints) => {
	return customAxios.post(
		`/api/${api_id}/context/${context_id}/addEndpoints`,
		endpoints
	);
};
// provide endpoints list objects and delete them
const removeEndpointsFromContext = (api_id, context_id,endpoints) => {
	return customAxios.put(
		`/api/${api_id}/context/${context_id}/removeEndpoints`,
		endpoints
	);
};
// provide endpoints list objects and updat them them
const updateEndpointsForContext = (api_id, context_id, endpoints) => {
	return customAxios.put(
		`/api/${api_id}/context/${context_id}/updateEndpoints`,
		endpoints
	);
};

const APIService = {
	createAPI,
	getAPIs,
	deleteAPI,
	updateAPI,
	getAPiById,
	addContextsToApi,
	removeContextsFromApi,
	updateContextsForApi,
	addEndpointsToContext,
	removeEndpointsFromContext,
	updateEndpointsForContext,
};

export default APIService;
