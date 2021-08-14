import TeamService from "../../services/TeamService";
import {
	ADD_TEAM,
	DELETE_TEAM,
	GET_TEAMS,
	UPDATE_TEAM,
} from "../types/teamActionTypes";

export const createTeam = (team) => async (dispatch) => {
	try {
		const response = await TeamService.createTeam(team);
		dispatch({
			type: ADD_TEAM,
			payload: [response.data],
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};

export const getTeams = () => async (dispatch) => {
	try {
		const teams = await TeamService.getTeams();
		dispatch({
			type: GET_TEAMS,
			payload: teams.data,
		});
	} catch (error) {
		console.log(error);
	}
};

export const deleteTeam = (id) => async (dispatch) => {
	try {
		await TeamService.deleteTeam(id);
		dispatch({
			type: DELETE_TEAM,
			payload: { id },
		});
	} catch (error) {
		console.log(error);
	}
};

export const updateTeam = (id, team) => async (dispatch) => {
	try {
		const response = await TeamService.updateTeam(id, team);
		dispatch({
			type: UPDATE_TEAM,
			payload: team,
		});
		return Promise.resolve(response.data);
	} catch (error) {
		return Promise.reject(error);
	}
};
