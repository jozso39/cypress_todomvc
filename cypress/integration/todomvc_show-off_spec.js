/// <reference types="Cypress" />

//variables
//I know there are a lot of backflips, but it makes the code easier to read (and I couldnt make aliases work the way I wanted)
let completedIndexes,
  activeIndexes = [];
let deletedIndex, data;
describe(`todoMVC app - show-off test`, () => {
  before(() => {
    //set data from JSON file
    cy.visit("http://localhost:3000/");
    cy.fixture(`data.json`).then((d) => {
      data = d;
    });
  });
  beforeEach(() => {});

  context(`Create tasks`, () => {
    it(`write tasks`, () => {
      data.tasks.forEach((el) => {
        cy.get(`input[data-cy="new-todo-input"]`).type(`${el}{enter}`);
      });
    });

    it(`task names are shown in correct order`, () => {
      //getItemsList is a custom command, parameter can be used as index of specific item, otherwise it will get all items
      cy.getItemsList().each((el, i) => {
        cy.getItemsList().eq(i).should(`have.text`, data.tasks[i]);
      });
    });
    it(`button "Clear completed" is not shown`, () => {
      //custom command
      cy.clearCompletedExists(false);
    });

    it(`item counter shows right amount`, () => {
      //custom command
      cy.itemCounterShows(data.tasks.length);
    });
  });

  context(`complete some tasks`, () => {
    it(`complete random tasks`, () => {
      //not the best practice, create random indexes based on data fixtures
      let indexArray = [];
      for (let i = 0; i < data.completedCount; i++) {
        let newIndex;
        do {
          newIndex = Math.floor(Math.random() * data.tasks.length);
        } while (indexArray.includes(newIndex));
        indexArray.push(newIndex);
      }
      completedIndexes = indexArray.sort();
      //click completion button
      completedIndexes.forEach((el) => {
        cy.getItemsList().eq(el).find(`input[data-cy="toggle"]`).click();
      });
    });
    it(`completed tasks are crossed and active are not`, () => {
      cy.getItemsList().each((el, i) => {
        if (completedIndexes.includes(i)) {
          cy.getItemsList(i).should(`have.class`, `completed`);
        } else {
          cy.getItemsList(i).should(`not.have.class`, `completed`);
        }
      });
    });
    it(`button "Clear completed" is shown`, () => {
      cy.clearCompletedExists(true);
    });
    it(`item counter is correct`, () => {
      cy.itemCounterShows(data.tasks.length - completedIndexes.length);
    });
    //XXX: cant check that circle is checked because dom isnt changing, could be done with visual testing from applitools or percy.io
  });

  context(`use filters`, () => {
    it(`filter All is selected by default`, () => {
      cy.checkSelectedFilter(`All`);
    });
    it(`use Completed filter`, () => {
      cy.clickFilter(`Completed`);
    });
    it(`only completed tasks are displayed`, () => {
      cy.getItemsList().should(`have.length`, completedIndexes.length);
      cy.getItemsList().each((el, i) => {
        cy.wrap(el).should(`have.text`, data.tasks[completedIndexes[i]]);
      });
    });
    it(`filter Completed is selected`, () => {
      cy.checkSelectedFilter(`Completed`);
    });
    it(`use Active filter`, () => {
      cy.clickFilter(`Active`);
    });
    it(`only active tasks are displayed`, () => {
      //define completed tasks & indexes
      data.tasks.forEach((el, i) => {
        if (!completedIndexes.includes(i)) {
          activeIndexes.push(i);
        }
      });
      activeIndexes = activeIndexes.sort();
      //check length of list
      cy.getItemsList().should(
        `have.length`,
        data.tasks.length - completedIndexes.length
      );
      //check that only completed are displayed
      cy.getItemsList().each((el, i) => {
        cy.wrap(el).should(`have.text`, data.tasks[activeIndexes[i]]);
      });
    });
    it(`filter Active is selected`, () => {
      cy.checkSelectedFilter(`Active`);
    });
    it(`use All filter`, () => {
      cy.clickFilter(`All`);
    });
    it(`all tasks are displayed`, () => {
      cy.getItemsList().each((el, i) => {
        cy.getItemsList(i).should(`have.text`, data.tasks[i]);
      });
    });
    it(`filter All is selected`, () => {
      cy.checkSelectedFilter(`All`);
    });
  });

  context(`use Clear completed`, () => {
    it(`use Clear completed button`, () => {
      cy.get(`footer[data-cy="footer"]`).contains(`Clear completed`).click();
    });
    it(`completed are deleted`, () => {
      //check length of list
      cy.getItemsList().should(
        `have.length`,
        data.tasks.length - completedIndexes.length
      );
      //check that only completed are displayed
      cy.getItemsList().each((el, i) => {
        cy.wrap(el).should(`have.text`, data.tasks[activeIndexes[i]]);
      });
    });
    it(`button "Clear completed" is not shown`, () => {
      cy.clearCompletedExists(false);
    });
  });

  context(`complete all arrow`, () => {
    it(`use complete all arrow`, () => {
      cy.get(`label[data-cy="toggle-all-label"]`).click();
    });
    it(`all are completed`, () => {
      //check length of list
      cy.getItemsList().each((el) => {
        cy.wrap(el).should(`have.class`, `completed`);
      });
    });
    it(`counter is correct`, () => {
      cy.itemCounterShows(`No`);
    });
    it(`use complete all arrow again`, () => {
      cy.get(`label[data-cy="toggle-all-label"]`).click();
    });
    it(`all are active`, () => {
      //check length of list
      cy.getItemsList().each((el) => {
        cy.wrap(el).should(`not.have.class`, `completed`);
      });
    });
    it(`counter is correct`, () => {
      cy.itemCounterShows(data.tasks.length - completedIndexes.length);
    });
  });

  context(`delete item`, () => {
    it(`delete random item`, () => {
      //create random int from 0 to number of tasks and delete it
      cy.getItemsList().then((list) => {
        cy.wrap(list)
          .its(`length`)
          .then((l) => {
            deletedIndex = Math.floor(Math.random() * l);
            cy.getItemsList(deletedIndex)
              .find(`button[data-cy="todo-item-remove"]`)
              .invoke("show")
              .click();
          });
      });
    });
    it(`only deleted item is gone`, () => {
      cy.getItemsList().should(
        `have.length`,
        data.tasks.length - completedIndexes.length - 1
      );
      //check that deleted item is not in the list
      cy.getItemsList().each(() => {
        cy.get(`label[data-cy="todo-item-label"]`).should(
          `not.have.value`,
          data.tasks[deletedIndex]
        );
      });
    });
    it(`counter is correct`, () => {
      cy.itemCounterShows(data.tasks.length - completedIndexes.length - 1);
    });
  });
});
