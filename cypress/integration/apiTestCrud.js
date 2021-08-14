describe("Use cypress react selector to test the form", () => {
	before(() => {
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(apiState.apis)
				.should("be.empty");
		});
		cy.visit("http://localhost:3000/APIs");
		cy.waitForReact(1000, "#root");
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(apiState.apis)
				.should("not.be.empty");
		});
	});

	var apis = [
		{
			name: "API " + Math.floor(Math.random() * 1000),
			ip: "127.0.0.1",
			port: Math.floor(Math.random() * 9999),
			description: "description",
		},
	];

	it("display all", () => {
		cy.wait(1000);
		cy.contains("Rows per page")
			.parent("div")
			.within(() => {
				cy.get(".MuiTablePagination-select").click();
			});
		cy.get(".MuiTablePagination-menuItem").eq(3).click();
	});

	var endpoint = {
		name: "get all clientsssssss",
		url: "/api/clients",
		method: "GET",
		data: "",
	};

	apis.forEach((api) => {
		// it("create new API", () => {
		// 	cy.wrap(apis).each((api) => {
		// 		// click on Add new api button
		// 		cy.contains("Add New").click();
		// 		// fill the api name
		// 		fillInput("name", api.name);
		// 		// fill the api ip
		// 		fillInput("ip", api.ip);
		// 		// fill the api port
		// 		fillInput("port", api.port);
		// 		// fill the api description
		// 		fillInput("description", api.description);
		// 		cy.get("#submit").should("not.be.disabled").click();
		// 		cy.wait(1000);
		// 	});
		// });

		// it("search for API", () => {
		// 	// search for the current api name in the list
		// 	cy.get("#search").type(api.name);
		// });

		// it("update API", () => {
		// 	// search for tr of api.name, target the second column and the third button
		// 	clickOnActionButton(api.name, 1, 3);
		// 	// clear input name
		// 	clearInput("name");
		// 	// fill input name
		// 	fillInput("name", api.name + " updated");
		// 	// clear input ip
		// 	clearInput("ip");
		// 	// fill input name
		// 	fillInput("ip", api.ip);
		// 	// clear input port
		// 	clearInput("port");
		// 	// fill input name
		// 	fillInput("port", api.port + 1);
		// 	// clear input description
		// 	clearInput("description");
		// 	// fill input name
		// 	fillInput("description", api.description + " updated");
		// 	// submit
		// 	cy.get("#submit").should("not.be.disabled").click();
		// 	cy.wait(1000);
		// });

		it("create an endpoint", () => {
			// search for tr of api.name, target the second column and the third button
			clickOnActionButton("API 10", 1, 1);
			// fill input name
			fillInput("name", endpoint.name);
			// fill input method
			fillSelectInput("method", endpoint.method);
			// fill input url
			fillInput("url", endpoint.url);
			// fill input data
			if (endpoint.data.length > 0) fillInput("data", endpoint.data);
			// 	// submit
			cy.get("#submitEndpoint").should("not.be.disabled").click();
			cy.wait(500);
			cy.get("#submitAllEndpoints").click();
			cy.wait(1000);
		});

		// it("delete the new api", () => {
		// 	// search for tr of api.name, target the second column and the third button
		// 	clickOnActionButton(api.name, 1, 4);
		// 	// confirm choice to delete
		// 	cy.get(".MuiDialogActions-root").within(() => {
		// 		cy.get("button").eq(1).click();
		// 	});
		// });

		// it("clear search for API", () => {
		// 	// clear search for current project
		// 	cy.get("#search").clear();
		// });
	});

	function fillInput(prop, data) {
		cy.react("TextField", { props: { field: { name: prop } } }).type(data);
	}

	function clearInput(prop) {
		cy.react("TextField", { props: { field: { name: prop } } }).clear();
	}

	function clickOnActionButton(searcheName, columnNumber, buttonOrder) {
		cy.contains(searcheName)
			.parents("tr")
			.within(() => {
				cy.get("td").eq(columnNumber).get("button").eq(buttonOrder).click();
			});
	}

	function fillSelectInput(prop, data) {
		cy.react("TextField", { props: { field: { name: prop } } }).type(
			data + "{enter}"
		);
	}
});
