import { customAxios } from "./customAxios";

const createProject = (project) => {
	return customAxios.post("/projet", project);
};

const getProjects = () => {
	return customAxios.get("/projets");
};

const deleteProject = (id) => {
	return customAxios.delete(`/projet/${id}`);
};

const updateProject = (id, project) => {
	return customAxios.put(`/projet/${id}`, project);
};

const addApiToProject = (id, apis) => {
	return customAxios.put(`/projet/${id}/addApis`, apis);
};

const removeApiToProject = (id, apis) => {
	return customAxios.put(`/projet/${id}/removeApis`, apis);
};

const ProjectService = {
	createProject,
	getProjects,
	deleteProject,
	updateProject,
	addApiToProject,
	removeApiToProject,
};

export default ProjectService;
