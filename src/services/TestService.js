import { customAxios } from "./customAxios";

const createTest = (test) => {
	return customAxios.post("/test", test);
};

const getTests = () => {
	return customAxios.get("/tests");
};

const getTestScans = (id) => {
	return customAxios.get(`/tests/${id}/scans`);
};

const deleteTest = (id) => {
	return customAxios.delete(`/test/${id}`);
};

const updateTest = (id, test) => {
	return customAxios.put(`/test/${id}`, test);
};

const addApisToTest = (id, apis) => {
	return customAxios.put(`/test/${id}/addApis`, apis);
};

const removeApisFromTest = (id, apis) => {
	return customAxios.put(`/test/${id}/removeApis`, apis);
};

const TestService = {
	createTest,
	getTests,
	deleteTest,
	updateTest,
	addApisToTest,
	removeApisFromTest,
	getTestScans,
};

export default TestService;
