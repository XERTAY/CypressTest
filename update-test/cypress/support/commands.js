/// <reference types="cypress" />

Cypress.Commands.add("addTask", (title, summary) => {
    cy.get('[data-cy="new-task-button"]').click();
    cy.get('[data-cy="task-modal"]').should("be.visible");
    cy.get('[data-cy="task-title-input"]')
      .clear()
      .type(title)
      .should("have.value", title);
    cy.get('[data-cy="task-summary-input"]')
      .clear()
      .type(summary)
      .should("have.value", summary);
    cy.get('[data-cy="create-task-button"]').click();
  });
  
  Cypress.Commands.add("fastAddTask", (title, summary) => {
    cy.get('[data-cy="new-task-button"]').click();
    cy.get('[data-cy="task-modal"]').should("be.visible");
    cy.get('[data-cy="task-title-input"]').clear().type(title, { delay: 0 });
    cy.get('[data-cy="task-summary-input"]').clear().type(summary, { delay: 0 });
    cy.get('[data-cy="create-task-button"]').click();
  });
  
  Cypress.Commands.add("deleteTask", (title) => {
    // Find the task card by its title and click the associated delete button
    cy.contains('[data-cy="task-card"]', title)
      .find('[data-cy="delete-task-button"]')
      .should("be.visible")
      .click();
    // Verify that, if no tasks remain, the empty state message is visible.
    cy.get('[data-cy="empty-message"]').should("be.visible");
  });
  