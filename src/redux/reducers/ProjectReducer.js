import {
	ADD_API_TO_PROJECT,
	ADD_PROJECT,
	DELETE_PROJECT,
	GET_PROJECTS,
	REMOVE_API_FROM_PROJECT,
	UPDATE_PROJECT,
} from "../types/ProjectTypes";

const initialState = {
	projects: [],
};

function ProjectReducer(state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case ADD_PROJECT:
			return Object.assign({}, state, {
				projects: payload.concat(state.projects),
			});

		case GET_PROJECTS:
			return Object.assign({}, state, {
				projects: payload,
			});

		case DELETE_PROJECT:
			return Object.assign({}, state, {
				projects: state.projects.filter((project) => project.id !== payload.id),
			});

		case UPDATE_PROJECT:
			return Object.assign({}, state, {
				projects: state.projects.map((project) => {
					if (project.id === payload.id) {
						return { ...project, ...payload };
					}
					return project;
				}),
			});

		case ADD_API_TO_PROJECT:
			return Object.assign({}, state, {
				projects: state.projects.map((project) => {
					if (project.id === payload.id) {
						return { ...project, ...payload };
					}
					return project;
				}),
			});

		case REMOVE_API_FROM_PROJECT:
			return Object.assign({}, state, {
				projects: state.projects.map((project) => {
					if (project.id === payload.id) {
						return {
							...project,
							listAPIs: project.listAPIs.filter(
								(element) => payload.list.apis.indexOf(element.name) === -1
							),
						};
					}
					return project;
				}),
			});

		default:
			return state;
	}
}

export default ProjectReducer;
