import {
	ADD_APIS_TO_TEST,
	ADD_TEST,
	DELETE_TEST,
	GET_TESTS,
	REMOVE_APIS_FROM_TEST,
	UPDATE_TEST,
} from "../types/TestTypes";

const initialState = {
	tests: [],
};

function TestReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_TEST:
			return Object.assign({}, state, {
				tests: payload.concat(state.tests),
			});

		case GET_TESTS:
			return Object.assign({}, state, {
				tests: payload,
			});

		case DELETE_TEST:
			return Object.assign({}, state, {
				tests: state.tests.filter((test) => test.id !== payload.id),
			});

		case UPDATE_TEST:
			return Object.assign({}, state, {
				tests: state.tests.map((test) => {
					if (test.id === payload.id) {
						return { ...test, ...payload };
					}
					return test;
				}),
			});

		case ADD_APIS_TO_TEST:
			return Object.assign({}, state, {
				tests: state.tests.map((test) => {
					if (test.id === payload.id) {
						return { ...test, ...payload };
					}
					return test;
				}),
			});

		case REMOVE_APIS_FROM_TEST:
			return Object.assign({}, state, {
				tests: state.tests.map((test) => {
					if (test.id === payload.id) {
						return {
							...test,
							listAPIs: test.listAPIs.filter(
								(element) => payload.list.apis.indexOf(element.name) === -1
							),
						};
					}
					return test;
				}),
			});

		default:
			return state;
	}
}

export default TestReducer;
