describe("Bug Reproduction - Duplicate Task with Rapid Clicks on 'Create Task'", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:3000/todo_react_app");
  });

  it("should create duplicates when a user rapidly clicks the Create Task button", () => {
    // User opens the New Task modal and fills in the form
    cy.get('[data-cy="new-task-button"]').click();
    cy.get('[data-cy="task-modal"]').should("be.visible");
    
    cy.get('[data-cy="task-title-input"]').clear().type("Duplicate Bug");
    cy.get('[data-cy="task-summary-input"]').clear().type("Bug reproduction test");
    
    // Get and alias the "Create Task" button
    cy.get('[data-cy="create-task-button"]').should("be.visible").as("createButton");
    
    const rapidClicks = 5; // For example, the user clicks rapidly 5 times
    for (let i = 0; i < rapidClicks; i++) {
      cy.get("@createButton").click({ force: true });
    }
    
    // Expected : even with rapid clicks, only one task card should be created.
    // Using data-cy attributes, we target the task card container directly.
    const expectedCount = 1;
    
    // Now, check all task cards that include the text "Duplicate Bug"
    cy.get('[data-cy="task-card"]')
      .filter((index, card) => Cypress.$(card).text().trim().includes("Duplicate Bug"))
      .then($matchedCards => {
        const actualCount = $matchedCards.length;
        cy.log(`With ${rapidClicks} rapid clicks, found ${actualCount} matching task card(s). Expected: ${expectedCount}`);
        expect(actualCount).to.equal(expectedCount);
      });
  });
});