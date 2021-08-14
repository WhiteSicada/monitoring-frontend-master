describe("Use cypress react selector to test the form", () => {
	before(() => {
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(itResponsableState.itResponsables)
				.should("be.empty");
		});
		cy.visit("http://localhost:3000/It-Responsables");
		cy.waitForReact(1000, "#root");
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(itResponsableState.itResponsables)
				.should("not.be.empty");
		});
	});

	var itResponsables = [
		{ name: "IT Responsable Test", email: "itresponsable@gmail.com" },
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

	itResponsables.forEach((itResponsable) => {
		it("create new IT Responsable", () => {
			// click on Add new project button
			cy.contains("Add New").click();
			// fill the itResponsable name
			fillInput("name", itResponsable.name);
			// fill the itResponsable email
			fillInput("email", itResponsable.email);
			// submit
			cy.get("#ItResponsableForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});

		it("search for IT Responsable", () => {
			// search for the current IT Responsable name in the list
			cy.get("#search").type(itResponsable.name);
		});

		it("update the new IT Responsable", () => {
			// search for tr of project.name, target the second column and the second button
			clickOnActionButton(itResponsable.name, 2, 0);
			// clear input name
			clearInput("name");
			// fill input name
			fillInput("name", itResponsable.name + " updated");
			// clear input email
			clearInput("email");
			// fill input email
			fillInput("email", itResponsable.email);
			// submit
			cy.get("#ItResponsableForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});

		it("delete the new IT Responsable", () => {
			// search for tr of project.name, target the second column and the second button
			clickOnActionButton(itResponsable.name, 2, 1);
			// confirm choice to delete
			cy.get(".MuiDialogActions-root").within(() => {
				cy.get("button").eq(1).click();
			});
		});

		it("clear search for IT Responsable", () => {
			// clear search for current it responsable
			cy.get("#search").clear();
		});
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
});
