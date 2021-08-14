describe("Test Project Crud functionalities", () => {
	before(() => {
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(projectState.projects)
				.should("be.empty");
		});
		cy.visit("http://localhost:3000/Projects");
		cy.waitForReact(1000, "#root");
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(projectState.projects)
				.should("not.be.empty");
		});
	});

	var projects = [
		{
			name: "Project Test",
			responsableIt: "M. LAMTALEK Mohamed Ali",
			responsableMetier: "M. QALIDI Mohamed Amine	",
			equipe: "Equipe Crédit Immo",
			description: "description",
			apis: ["first api", "second api", "Third API"],
		},
	];

	var newApis = ["Fourth API"];
	var removedApis = ["first api", "second api"];

	it("display all", () => {
		cy.wait(1000);
		cy.contains("Rows per page")
			.parent("div")
			.within(() => {
				cy.get(".MuiTablePagination-select").click();
			});
		cy.get(".MuiTablePagination-menuItem").eq(3).click();
	});

	projects.forEach((project) => {
		it("create new project", () => {
			// click on Add new project button
			cy.contains("Add New").click();
			// fill the project name
			fillInput("name", project.name);
			// fill the project name
			fillInput("description", project.description);
			// next step
			cy.get("#next").click();
			// fill the project responsableIt
			fillSelectInput("responsableIt", project.responsableIt);
			// fill the project responsableMetier
			fillSelectInput("responsableMetier", project.responsableMetier);
			// fill the project equipe
			fillSelectInput("equipe", project.equipe);
			// next step
			cy.get("#next").click();
			// check the wanted aPIs for project
			cy.wrap(project.apis).each((api) => {
				cy.contains(api).click({ force: true });
			});
			// submit
			cy.get("#submit").click();
			cy.wait(1000);
		});

		it("search for project", () => {
			// search for the current project name in the list
			cy.get("#search").type(project.name);
		});

		it("update the new project", () => {
			// search for tr of project.name, target the second column and the second button
			clickOnActionButton(project.name, 1, 1);
			// clear input name
			clearInput("name");
			// fill input name
			fillInput("name", project.name + " updated");
			// clear input description
			clearInput("description");
			// fill input description
			fillInput("description", project.description + " updated");
			// fill input responsableIt
			fillSelectInput("responsableIt", "fouad");
			// fill input responsableMetier
			fillSelectInput("responsableMetier", "Sitaleb Ali");
			// fill input equipe
			fillSelectInput("equipe", "Equipe Chaabi Net");
			// submit
			cy.get("#projectUpdateForm").should("not.be.disabled").submit();
			cy.wait(500);
		});

		it("update Project APIS", () => {
			// search for tr of project.name, target the 4 column and the first button
			clickOnActionButton(project.name, 3, 0);
			// add the available apis selected to the current project apis
			addApis();
			// remove the available apis selected from the current project apis
			removeApis();
			// submit
			cy.get("#manageApisSubmit").click();
			cy.wait(1000);
		});

		it("delete the new project", () => {
			// search for tr of project.name, target the 4 column and the third button
			clickOnActionButton(project.name, 3, 2);
			// confirm choice to delete
			cy.get(".MuiDialogActions-root").within(() => {
				cy.get("button").eq(1).click();
			});
		});

		it("clear search for a project", () => {
			// clear search for current project
			cy.get("#search").clear();
		});
	});

	function clickOnActionButton(searcheName, columnNumber, buttonOrder) {
		cy.contains(searcheName)
			.parents("tr")
			.within(() => {
				cy.get("td").eq(columnNumber).get("button").eq(buttonOrder).click();
			});
	}

	function fillInput(prop, data) {
		cy.react("TextField", { props: { field: { name: prop } } }).type(data);
	}

	function clearInput(prop) {
		cy.react("TextField", { props: { field: { name: prop } } }).clear();
	}

	function fillSelectInput(prop, data) {
		cy.react("TextField", { props: { field: { name: prop } } }).type(
			data + "{enter}"
		);
	}

	function addApis() {
		cy.get("#AvailableAPIs").within(() => {
			cy.wrap(newApis).each((api) => {
				cy.contains(api).click({ force: true });
			});
		});
		cy.get("#moveApisToRight").click();
	}

	function removeApis() {
		cy.get("#ProjectAPIs").within(() => {
			cy.wrap(removedApis).each((api) => {
				cy.contains(api).click({ force: true });
			});
		});
		cy.get("#moveApisToLeft").click();
	}
});
