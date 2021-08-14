import {
	ADD_IT_RESPONSABLE,
	GET_IT_RESPONSABLES,
	DELETE_IT_RESPONSABLE,
	UPDATE_IT_RESPONSABLE,
} from "../types/ItResponsablesTypes";

const initialState = {
	itResponsables: [],
};

function ItResponsableReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_IT_RESPONSABLE:
			return Object.assign({}, state, {
				itResponsables: payload.concat(state.itResponsables),
			});

		case GET_IT_RESPONSABLES:
			return Object.assign({}, state, {
				itResponsables: payload,
			});

		case DELETE_IT_RESPONSABLE:
			return Object.assign({}, state, {
				itResponsables: state.itResponsables.filter(
					(itResponsable) => itResponsable.id !== payload.id
				),
			});

		case UPDATE_IT_RESPONSABLE:
			return Object.assign({}, state, {
				itResponsables: state.itResponsables.map((itResponsable) => {
					if (itResponsable.id === payload.id) {
						return {
							...itResponsable,
							...payload,
						};
					}
					return itResponsable;
				}),
			});

		default:
			return state;
	}
}

export default ItResponsableReducer;
