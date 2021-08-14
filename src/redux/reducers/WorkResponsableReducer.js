import {
	ADD_WORK_RESPONSABLE,
	GET_WORK_RESPONSABLES,
	DELETE_WORK_RESPONSABLE,
	UPDATE_WORK_RESPONSABLE,
} from "../types/WorkResponsablesTypes";

const initialState = {
	workResponsables: [],
};

function WorkResponsableReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_WORK_RESPONSABLE:
			return Object.assign({}, state, {
				workResponsables: payload.concat(state.workResponsables),
			});

		case GET_WORK_RESPONSABLES:
			return Object.assign({}, state, {
				workResponsables: payload,
			});

		case DELETE_WORK_RESPONSABLE:
			return Object.assign({}, state, {
				workResponsables: state.workResponsables.filter(
					(workResponsable) => workResponsable.id !== payload.id
				),
			});

		case UPDATE_WORK_RESPONSABLE:
			return Object.assign({}, state, {
				workResponsables: state.workResponsables.map((workResponsable) => {
					if (workResponsable.id === payload.id) {
						return {
							...workResponsable,
							...payload,
						};
					}
					return workResponsable;
				}),
			});

		default:
			return state;
	}
}

export default WorkResponsableReducer;
