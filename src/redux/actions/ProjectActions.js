import ProjectService from "../../services/ProjectService";
import {
	ADD_API_TO_PROJECT,
	ADD_PROJECT,
	DELETE_PROJECT,
	GET_PROJECTS,
	REMOVE_API_FROM_PROJECT,
	UPDATE_PROJECT,
} from "../types/ProjectTypes";

export const createProject = (project) => async (dispatch) => {
	try {
		const response = await ProjectService.createProject(project);
		dispatch({
			type: ADD_PROJECT,
			payload: [response.data],
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getProjects = () => async (dispatch) => {
	try {
		const projects = await ProjectService.getProjects();
		dispatch({
			type: GET_PROJECTS,
			payload: projects.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const deleteProject = (id) => async (dispatch) => {
	try {
		await ProjectService.deleteProject(id);
		dispatch({
			type: DELETE_PROJECT,
			payload: { id },
		});
	} catch (error) {
		console.log(error);
	}
};

export const updateProject = (id, project) => async (dispatch) => {
	try {
		const response = await ProjectService.updateProject(id, project);
		dispatch({
			type: UPDATE_PROJECT,
			payload: project,
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const addApiToProject = (id, list) => async (dispatch) => {
	try {
		const response = await ProjectService.addApiToProject(id, list);
		dispatch({
			type: ADD_API_TO_PROJECT,
			payload: response.data,
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const removeApiToProject = (id, list) => async (dispatch) => {
	try {
		await ProjectService.removeApiToProject(id, list);
		dispatch({
			type: REMOVE_API_FROM_PROJECT,
			payload: { id, list },
		});
	} catch (error) {
		console.log(error);
	}
};
