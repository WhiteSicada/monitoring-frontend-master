import WorkResponsableService from "../../services/WorkResponsableService";
import {
	ADD_WORK_RESPONSABLE,
	GET_WORK_RESPONSABLES,
	DELETE_WORK_RESPONSABLE,
	UPDATE_WORK_RESPONSABLE,
} from "../types/WorkResponsablesTypes";

export const createWorkResponsable = (workResponsable) => async (dispatch) => {
	try {
		const response = await WorkResponsableService.createWorkResponsable(
			workResponsable
		);
		dispatch({
			type: ADD_WORK_RESPONSABLE,
			payload: [response.data],
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getWorkResponsables = () => async (dispatch) => {
	try {
		const workResponsable = await WorkResponsableService.getWorkResponsables();
		dispatch({
			type: GET_WORK_RESPONSABLES,
			payload: workResponsable.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const deleteWorkResponsable = (id) => async (dispatch) => {
	try {
		await WorkResponsableService.deleteWorkResponsable(id);
		dispatch({
			type: DELETE_WORK_RESPONSABLE,
			payload: { id },
		});
	} catch (error) {
		console.log(error);
	}
};

export const updateWorkResponsable = (id, workResponsable) => async (dispatch) => {
	try {
		const response = await WorkResponsableService.updateWorkResponsable(id, workResponsable);
		dispatch({
			type: UPDATE_WORK_RESPONSABLE,
			payload: workResponsable,
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};