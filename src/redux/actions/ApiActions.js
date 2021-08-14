import APIService from "../../services/APIService";
import {
	ADD_API,
	DELETE_API,
	GET_APIs,
	UPDATE_API,
	ADD_CONTEXTS_TO_API,
	REMOVE_CONTEXTS_FROM_API,
	UPDATE_CONTEXTS_OF_API,
	ADD_ENDPOINT_TO_CONTEXT,
	REMOVE_ENDPOINT_FROM_CONTEXT,
	UPDATE_ENDPOINTS_OF_CONTEXT,
	GET_API,
} from "../types/ApiTypes";

export const createAPI = (api) => async (dispatch) => {
	try {
		const response = await APIService.createAPI(api);
		dispatch({
			type: ADD_API,
			payload: [response.data],
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getAPIs = () => async (dispatch) => {
	try {
		const apis = await APIService.getAPIs();
		dispatch({
			type: GET_APIs,
			payload: apis.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getAPI = (id, setCurrentContext) => async (dispatch) => {
	try {
		const response = await APIService.getAPiById(id);
		setCurrentContext(response.data.contexts[0]);
		dispatch({
			type: GET_API,
			payload: response.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const getApiToManageContexts =
	(id, setCurrentApi) => async (dispatch) => {
		try {
			const response = await APIService.getAPiById(id);
			setCurrentApi(response.data);
			dispatch({
				type: GET_API,
				payload: response.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

export const deleteAPI = (id) => async (dispatch) => {
	try {
		await APIService.deleteAPI(id);
		dispatch({
			type: DELETE_API,
			payload: { id },
		});
	} catch (error) {
		console.log(error);
	}
};

export const updateAPI = (id, api) => async (dispatch) => {
	try {
		const response = await APIService.updateAPI(id, api);
		dispatch({
			type: UPDATE_API,
			payload: api,
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const addContextsToApi = (id, contexts) => async (dispatch) => {
	try {
		const response = await APIService.addContextsToApi(id, contexts);
		dispatch({
			type: ADD_CONTEXTS_TO_API,
			payload: response.data,
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const removeContextsFromApi = (id, contexts) => async (dispatch) => {
	try {
		
		await APIService.removeContextsFromApi(id, contexts);
		dispatch({
			type: REMOVE_CONTEXTS_FROM_API,
			payload: { id, contexts },
		});
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};

export const updateContextsForApi = (id, contexts) => async (dispatch) => {
	try {
		// console.log(contexts);
		await APIService.updateContextsForApi(id, contexts);
		dispatch({
			type: UPDATE_CONTEXTS_OF_API,
			payload: { id, contexts },
		});
	} catch (error) {
		console.log(error);
		return Promise.reject(error);
	}
};

export const addEndpointsToContext =
	(api_id, context_id, endpoints) => async (dispatch) => {
		try {
			const response = await APIService.addEndpointsToContext(
				api_id,
				context_id,
				endpoints
			);
			const newEndpoints = response.data.contexts.find(
				(element) => element.id === context_id
			).endpoints;
			dispatch({
				type: ADD_ENDPOINT_TO_CONTEXT,
				payload: { context_id, newEndpoints },
			});
			return Promise.resolve(response.data);
		} catch (error) {
			return Promise.reject(error);
		}
	};

export const removeEndpointsFromContext =
	(api_id, context_id, endpoints) => async (dispatch) => {
		try {
			await APIService.removeEndpointsFromContext(
				api_id,
				context_id,
				endpoints
			);
			dispatch({
				type: REMOVE_ENDPOINT_FROM_CONTEXT,
				payload: { context_id, endpoints },
			});
		} catch (error) {
			console.log(JSON.stringify(error));
			return Promise.reject(error);
		}
	};

export const updateEndpointsForContext =
	(api_id, context_id, endpoints) => async (dispatch) => {
		try {
			await APIService.updateEndpointsForContext(api_id, context_id, endpoints);
			dispatch({
				type: UPDATE_ENDPOINTS_OF_CONTEXT,
				payload: { api_id, context_id, endpoints },
			});
		} catch (error) {
			console.log(error);
			return Promise.reject(error);
		}
	};
