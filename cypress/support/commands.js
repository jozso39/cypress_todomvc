// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//////////
//ELEMENTS
//////////
Cypress.Commands.add(`getItemsList`, index => {
	if (index === undefined) {
		return cy.get(`li[data-cy="todo-item"]`)
	} else {
		return cy.get(`li[data-cy="todo-item"]`).eq(index)
	}
})

/////////
//ACTIONS
/////////
Cypress.Commands.add(`clickFilter`, name => {
	cy.get(`li[data-cy="filter"]`)
		.contains(name)
		.click()
})
//creates random indexes for an array
Cypress.Commands.add(`createRandomInx`, (array, quantity) => {
	let indexes = []
	for (let i = 0; i < quantity; i++) {
		do {
			index = Math.floor(Math.random() * array.length)
		} while (indexes.includes(index))
		indexes.push(index)
	}
	return indexes
})

////////////
//ASSERTIONS
////////////
//check that correct filter is selected and others are not
Cypress.Commands.add(`checkSelectedFilter`, selected => {
	const filters = [`All`, `Active`, `Completed`]

	for (let i = 0; i < filters.length; i++) {
		if (filters[i] == selected) {
			cy.get(`li[data-cy="filter"]`)
				.contains(filters[i])
				.should(`have.class`, `selected`)
		} else {
			cy.get(`li[data-cy="filter"]`)
				.contains(filters[i])
				.should(`not.have.class`, `selected`)
		}
	}
})

//check that button "Clear completed" is shown
Cypress.Commands.add(`clearCompletedExists`, isIt => {
	if (isIt === false) {
		cy.get(`footer[data-cy="footer"]`)
			.contains(`Clear completed`)
			.should(`not.exist`)
	} else {
		cy.get(`footer[data-cy="footer"]`).contains(`Clear completed`)
	}
})
//check item counter
Cypress.Commands.add(`itemCounterShows`, number => {
	cy.get(`span[data-cy="todo-count"]`).should(
		`have.text`,
		`${number} items left`
	)
})

//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })
