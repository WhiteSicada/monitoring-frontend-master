import {
	ADD_TEAM,
	GET_TEAMS,
	UPDATE_TEAM,
	DELETE_TEAM,
} from "../types/teamActionTypes";

const initialState = {
	teams: [],
};

function TeamReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_TEAM:
			return Object.assign({}, state, {
				teams: payload.concat(state.teams),
			});

		case GET_TEAMS:
			return Object.assign({}, state, {
				teams: payload,
			});

		case DELETE_TEAM:
			return Object.assign({}, state, {
				teams: state.teams.filter((team) => team.id !== payload.id),
			});

		case UPDATE_TEAM:
			return Object.assign({}, state, {
				teams: state.teams.map((team) => {
					if (team.id === payload.id) {
						return { ...team, ...payload };
					}
					return team;
				}),
			});

		default:
			return state;
	}
}

export default TeamReducer;
