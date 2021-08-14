import {
	ADD_API,
	DELETE_API,
	GET_APIs,
	GET_API,
	UPDATE_API,
	ADD_CONTEXTS_TO_API,
	REMOVE_CONTEXTS_FROM_API,
	UPDATE_CONTEXTS_OF_API,
	ADD_ENDPOINT_TO_CONTEXT,
	REMOVE_ENDPOINT_FROM_CONTEXT,
	UPDATE_ENDPOINTS_OF_CONTEXT,
} from "../types/ApiTypes";

const initialState = {
	apis: [],
	api: {},
};

function ApiReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_API:
			return Object.assign({}, state, {
				apis: payload.concat(state.apis),
			});

		case GET_APIs:
			return Object.assign({}, state, {
				apis: payload,
			});

		case GET_API:
			return Object.assign({}, state, {
				api: payload,
			});

		case DELETE_API:
			return Object.assign({}, state, {
				apis: state.apis.filter((api) => api.id !== payload.id),
			});

		case UPDATE_API:
			return Object.assign({}, state, {
				apis: state.apis.map((api) => {
					if (api.id === payload.id) {
						return { ...api, ...payload };
					}
					return api;
				}),
			});

		case ADD_CONTEXTS_TO_API:
			return Object.assign({}, state, {
				api: {
					...state.api,
					...payload,
				},
			});

		case REMOVE_CONTEXTS_FROM_API:
			return Object.assign({}, state, {
				api: {
					...state.api,
					contexts: state.api.contexts.filter(
						(element) => payload.contexts.contexts.indexOf(element.id) === -1
					),
				},
			});

		case UPDATE_CONTEXTS_OF_API:
			return Object.assign({}, state, {
				api: {
					...state.api,
					contexts: state.api.contexts.map((old_context) => {
						const index = payload.contexts.contexts.findIndex(
							(updated_context) => updated_context.id === old_context.id
						);
						if (index !== -1) {
							return payload.contexts.contexts[index];
						} else {
							return old_context;
						}
					}),
				},
			});

		case ADD_ENDPOINT_TO_CONTEXT:
			return Object.assign({}, state, {
				api: {
					...state.api,
					contexts: state.api.contexts.map((context) => {
						if (context.id === payload.context_id) {
							return {
								...context,
								endpoints: payload.newEndpoints,
							};
						}
						return context;
					}),
				},
			});

		case REMOVE_ENDPOINT_FROM_CONTEXT:
			return Object.assign({}, state, {
				api: {
					...state.api,
					contexts: state.api.contexts.map((context) => {
						// find the correspondent api.
						if (context.id === payload.context_id) {
							return {
								...context,
								endpoints: context.endpoints.filter(
									(element) =>
										payload.endpoints.endpoints.indexOf(element.id) === -1
								),
							};
						}
						return context;
					}),
				},
			});

		case UPDATE_ENDPOINTS_OF_CONTEXT:
			return Object.assign({}, state, {
				api: {
					...state.api,
					contexts: state.api.contexts.map((context) => {
						// find the correspondent api.
						if (context.id === payload.context_id) {
							payload.endpoints.endpoints.map((newEndpoint) => {
								const index = context.endpoints.findIndex(
									(context_endpoint) => context_endpoint.id === newEndpoint.id
								);
								context.endpoints[index] = newEndpoint;
							});
						}
						return context;
					}),
				},
			});

		default:
			return state;
	}
}

export default ApiReducer;
