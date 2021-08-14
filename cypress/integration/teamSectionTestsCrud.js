describe("Use cypress react selector to test the form", () => {
	before(() => {
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(teamState.teams)
				.should("be.empty");
		});
		cy.visit("http://localhost:3000/Teams");
		cy.waitForReact(1000, "#root");
		it("should have the right initial state", function () {
			cy.window()
				.its("store")
				.invoke("getState")
				.its(teamState.teams)
				.should("not.be.empty");
		});
	});

	var teams = [{ name: "Team Test A" }];

	it("display all", () => {
		cy.wait(1000);
		cy.contains("Rows per page")
			.parent("div")
			.within(() => {
				cy.get(".MuiTablePagination-select").click();
			});
		cy.get(".MuiTablePagination-menuItem").eq(3).click();
	});

	teams.forEach((team) => {
		it("create new team", () => {
			// click on Add new project button
			cy.contains("Add New").click();
			// fill the team name
			fillInput("name", team.name);
			// submit
			cy.get("#teamForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});

		it("search for Team", () => {
			// search for the current team name in the list
			cy.get("#search").type(team.name);
		});

		it("update the new team", () => {
			// search for tr of project.name, target the second column and the second button
			clickOnActionButton(team.name, 1, 0);
			// clear input name
			clearInput("name");
			// fill input name
			fillInput("name", team.name + " updated");
			// submit
			cy.get("#teamForm").should("not.be.disabled").submit();
			cy.wait(1000);
		});

		it("delete the new team", () => {
			// search for tr of team.name, target the 4 column and the third button
			clickOnActionButton(team.name, 1, 1);
			// confirm choice to delete
			cy.get(".MuiDialogActions-root").within(() => {
				cy.get("button").eq(1).click();
			});
		});

		it("clear search for Team", () => {
			// clear search for current Team
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
