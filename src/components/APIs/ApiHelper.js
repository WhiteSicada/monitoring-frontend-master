import APIService from "../../services/APIService";

const getAPiById = (id, setApi, setCurrentContext) => {
	APIService.getAPiById(id)
		.then((response) => {
			setApi(response.data);
			setCurrentContext(response.data.contexts[0]);
		})
		.catch((e) => {
			console.log(e);
		});
};

const removeEndpointsFromContext = (
	api_id,
	currentContext,
	endpoints,
	setApi,
	api
) => {
	// await APIService.removeEndpointsFromContext(api_id, currentContext.id, endpoints)
	// 	.then((response) => {
	// 		setCurrentEndpoint(currentContext.endpoints.filter(
	//       (element) => endpoints.indexOf(element.id) === -1
	//     ))
	// 	})
	// 	.catch((e) => {
	// 		console.log(e);
	// 	});
	// setApi((prevApi) => ({
	// 	...prevApi,
	// 	// contexts: prevContext.endpoints.filter(
	// 	// 	(element) => endpoints.indexOf(element.id) === -1
	// 	// ),
	//   contexts: prevApi.contexts.map((context) => {
	//     if (context.id === currentContext.id) {
	//       context.endpoints.filter(
	//         (element) => endpoints.indexOf(element.id) === -1
	//       );
	//     }
	//     return context;
	//   })
	// }));
	setApi({
		id: 6,
		name: "Evolan",
		description: "eeeee",
		ip: "127.0.0.1",
		port: 8081,
		token: "n",
		status: true,
		db: true,
		diskspace: true,
		ping: true,
		contexts: [
			{
				id: 10005,
				name: "v1",
				endpoints: [
					{
						id: 10018,
						name: "get all clients",
						url: "/api/clients",
						method: "GET",
						data: "",
					},
					{
						id: 10019,
						name: "create new client",
						url: "/api/clients",
						method: "POST",
						data: "{name : 'dino'}",
					},
					{
						id: 10020,
						name: "update a client",
						url: "/api/clients/1",
						method: "PUT",
						data: "{name : 'dino updated'}",
					},
				],
			},
			{ id: 10006, name: "v2", endpoints: [] },
			{ id: 10007, name: "v3", endpoints: [] },
		],
		anomalies: [],
	});
	console.log("api :" + JSON.stringify(api));
};

const ApiHelper = {
	getAPiById,
	removeEndpointsFromContext,
};

export default ApiHelper;
