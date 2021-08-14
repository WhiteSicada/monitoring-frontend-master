describe("Use cypress react selector to test the form", () => {
	before(() => {
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(workResponsableState.workResponsables)
				.should("be.empty");
		});
		cy.visit("http://localhost:3000/Work-Responsables");
		cy.waitForReact(1000, "#root");
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(workResponsableState.workResponsables)
				.should("not.be.empty");
		});
	});

	var workResponsables = [
		{ name: "Work Responsable Test", email: "workresponsable@gmail.com" },
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

	workResponsables.forEach((workResponsable) => {
		it("create new Work Responsable", () => {
			// click on Add new project button
			cy.contains("Add New").click();
			// fill the workResponsable name
			fillInput("name", workResponsable.name);
			// fill the workResponsable email
			fillInput("email", workResponsable.email);
			// submit
			cy.get("#WorkResponsableForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});

		it("search for Work Responsable", () => {
			// search for the current workResponsable name in the list
			cy.get("#search").type(workResponsable.name);
		});

		it("update the new Work Responsable", () => {
			// search for tr of project.name, target the second column and the second button
			clickOnActionButton(workResponsable.name, 1, 0);
			// clear input name
			clearInput("name");
			// fill input name
			fillInput("name", workResponsable.name + " updated");
			// clear input email
			clearInput("email");
			// fill input email
			fillInput("email", workResponsable.email);
			// submit
			cy.get("#WorkResponsableForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});

		it("delete the new Work Responsable", () => {
			// search for tr of project.name, target the 4 column and the third button
			clickOnActionButton(workResponsable.name, 1, 1);
			// confirm choice to delete
			cy.get(".MuiDialogActions-root").within(() => {
				cy.get("button").eq(1).click();
			});
		});

		it("clear search for Work Responsable", () => {
			// clear search for Work Responsable project
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
