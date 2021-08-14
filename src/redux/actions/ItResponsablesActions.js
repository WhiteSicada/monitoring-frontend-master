import ItResponsableService from "../../services/ItResponsableService";
import {
	ADD_IT_RESPONSABLE,
	GET_IT_RESPONSABLES,
	DELETE_IT_RESPONSABLE,
	UPDATE_IT_RESPONSABLE,
} from "../types/ItResponsablesTypes";

export const createItResponsable = (itResponsable) => async (dispatch) => {
	try {
		const response = await ItResponsableService.createItResponsable(
			itResponsable
		);
		dispatch({
			type: ADD_IT_RESPONSABLE,
			payload: [response.data],
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getItResponsables = () => async (dispatch) => {
	try {
		const itResponsables = await ItResponsableService.getItResponsables();
		dispatch({
			type: GET_IT_RESPONSABLES,
			payload: itResponsables.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const deleteItResponsable = (id) => async (dispatch) => {
	try {
		await ItResponsableService.deleteItResponsable(id);
		dispatch({
			type: DELETE_IT_RESPONSABLE,
			payload: { id },
		});
	} catch (error) {
		console.log(error);
	}
};

export const updateItResponsable = (id, itResponsable) => async (dispatch) => {
	try {
		const response = await ItResponsableService.updateItResponsable(
			id,
			itResponsable
		);
		dispatch({
			type: UPDATE_IT_RESPONSABLE,
			payload: itResponsable,
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};
