import { customAxios } from "./customAxios";

const launchScan = (id) => {
	return customAxios.post(`/test/${id}/scan`, id);
};
const ScanService = {
	launchScan,
};

export default ScanService;
