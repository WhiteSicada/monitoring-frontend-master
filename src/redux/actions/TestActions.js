import TestService from "../../services/TestService";
import {
	ADD_APIS_TO_TEST,
	ADD_TEST,
	DELETE_TEST,
	GET_TESTS,
	REMOVE_APIS_FROM_TEST,
	UPDATE_TEST,
} from "../types/TestTypes";

export const createTest = (test) => async (dispatch) => {
	try {
		const response = await TestService.createTest(test);
		dispatch({
			type: ADD_TEST,
			payload: [response.data],
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getTests = () => async (dispatch) => {
	try {
		const tests = await TestService.getTests();
		dispatch({
			type: GET_TESTS,
			payload: tests.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const deleteTest = (id) => async (dispatch) => {
	try {
		await TestService.deleteTest(id);
		dispatch({
			type: DELETE_TEST,
			payload: { id },
		});
	} catch (error) {
		console.log(error);
	}
};

export const updateTest = (id, test) => async (dispatch) => {
	try {
		const response = await TestService.updateTest(id, test);
		dispatch({
			type: UPDATE_TEST,
			payload: test,
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const addApisToTest = (id, list) => async (dispatch) => {
	try {
		const response = await TestService.addApisToTest(id, list);
		dispatch({
			type: ADD_APIS_TO_TEST,
			payload: response.data,
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const removeApisFromTest = (id, list) => async (dispatch) => {
	try {
		await TestService.removeApisFromTest(id, list);
		dispatch({
			type: REMOVE_APIS_FROM_TEST,
			payload: { id, list },
		});
	} catch (error) {
		console.log(error);
	}
};
