/// <reference types="Cypress" />

//variables

describe(`todoMVC app - solid test`, () => {
	before(() => {
		//set data
		cy.visit("http://localhost:3000/")
	})
	beforeEach(() => {})
	context(`Create tasks`, () => {
		it(`write tasks`, () => {
			for (let i = 1; i < 6; i++) {
				cy.get(`input[data-cy="new-todo-input"]`).type(`task ${i}{enter}`)
			}
		})
		it(`task names are shown in correct order`, () => {
			//getListItem is a custom command, parameter can be used as index of specific item, otherwise it will get all items
			cy.getItemsList().each((el, i) => {
				cy.getItemsList(i).should(`have.text`, `task ${i + 1}`)
			})
		})
		it(`button "Clear completed" is not shown`, () => {
			//custom command
			cy.clearCompletedExists(false)
		})
		it(`item counter shows 5`, () => {
			//custom command
			cy.itemCounterShows(5)
		})
	})

	context(`complete tasks`, () => {
		it(`complete 2 tasks`, () => {
			//click completion buttons
			cy.getItemsList(1)
				.find(`input[data-cy="toggle"]`)
				.click()
			cy.getItemsList(3)
				.find(`input[data-cy="toggle"]`)
				.click()
		})
		it(`2 tasks are crossed and active are not`, () => {
			cy.getItemsList(0).should(`not.have.class`, `completed`)
			cy.getItemsList(1).should(`have.class`, `completed`)
			cy.getItemsList(2).should(`not.have.class`, `completed`)
			cy.getItemsList(3).should(`have.class`, `completed`)
			cy.getItemsList(4).should(`not.have.class`, `completed`)
		})
		it(`button "Clear completed" is shown`, () => {
			cy.clearCompletedExists(true)
		})
		it(`item counter shows 3`, () => {
			cy.itemCounterShows(3)
		})
	})

	context(`use filters`, () => {
		it(`filter All is selected by default`, () => {
			cy.checkSelectedFilter(`All`)
		})
		it(`use Completed filter`, () => {
			cy.clickFilter(`Completed`)
		})
		it(`only 2 completed tasks are displayed`, () => {
			cy.getItemsList().should(`have.length`, 2)
			cy.getItemsList(0).should(`have.text`, `task 2`)
			cy.getItemsList(1).should(`have.text`, `task 4`)
		})
		it(`filter Completed is selected`, () => {
			cy.checkSelectedFilter(`Completed`)
		})
		it(`use Active filter`, () => {
			cy.clickFilter(`Active`)
		})
		it(`3 active tasks are displayed`, () => {
			//check length of list
			cy.getItemsList().should(`have.length`, 3)
			//check that only completed are displayed
			cy.getItemsList(0).should(`have.text`, `task 1`)
			cy.getItemsList(1).should(`have.text`, `task 3`)
			cy.getItemsList(2).should(`have.text`, `task 5`)
		})
		it(`filter Active is selected`, () => {
			cy.checkSelectedFilter(`Active`)
		})
		it(`use All filter`, () => {
			cy.clickFilter(`All`)
		})
		it(`all 5 tasks are displayed`, () => {
			cy.getItemsList().each((el, i) => {
				cy.getItemsList(i).should(`have.text`, `task ${i + 1}`)
			})
		})
		it(`filter All is selected`, () => {
			cy.checkSelectedFilter(`All`)
		})
	})

	context(`use Clear completed`, () => {
		it(`use Clear completed button`, () => {
			cy.get(`footer[data-cy="footer"]`)
				.contains(`Clear completed`)
				.click()
		})
		it(`completed are deleted`, () => {
			//check length of list
			cy.getItemsList().should(`have.length`, 3)
			//check that only completed are displayed
			cy.getItemsList(0).should(`have.text`, `task 1`)
			cy.getItemsList(1).should(`have.text`, `task 3`)
			cy.getItemsList(2).should(`have.text`, `task 5`)
		})
		it(`button "Clear completed" is not shown`, () => {
			cy.clearCompletedExists(false)
		})
	})

	context(`complete all arrow`, () => {
		it(`use complete all arrow`, () => {
			cy.get(`label[data-cy="toggle-all-label"]`).click()
		})
		it(`all are completed`, () => {
			//check length of list
			cy.get(`li[data-cy="todo-item"]`).each(el => {
				cy.wrap(el).should(`have.class`, `completed`)
			})
		})
		it(`counter shows no tasks`, () => {
			cy.itemCounterShows(`No`)
		})
		it(`use complete all arrow again`, () => {
			cy.get(`label[data-cy="toggle-all-label"]`).click()
		})
		it(`all 3 are active`, () => {
			//check length of list
			cy.get(`li[data-cy="todo-item"]`).each(el => {
				cy.wrap(el).should(`not.have.class`, `completed`)
			})
		})
		it(`counter shows 3`, () => {
			cy.itemCounterShows(3)
		})
	})

	context(`delete item`, () => {
		it(`delete first item`, () => {
			//delete on first item
			cy.getItemsList(0)
				.find(`button[data-cy="todo-item-remove"]`)
				.invoke("show")
				.click()
		})
		it(`only deleted item is gone`, () => {
			cy.get(`li[data-cy="todo-item"]`).should(`have.length`, 2)
			//check that deleted item is not in the list
			cy.getItemsList(0).should(`have.text`, `task 3`)
			cy.getItemsList(1).should(`have.text`, `task 5`)
		})
		it(`counter shows 2`, () => {
			cy.itemCounterShows(2)
		})
	})
})
