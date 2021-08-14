import { customAxios } from "./customAxios";



const getApiAnomalies = (api_id) => {
	return customAxios.get(`/api/${api_id}/getAnomalies`);
};



const AnomalyService = {
	getApiAnomalies
};

export default AnomalyService;
