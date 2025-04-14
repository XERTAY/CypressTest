describe("Resilience and Recovery - Clearing localStorage and Reloading", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:3000/todo_react_app");
  });

  it("should behave correctly after clearing localStorage and reloading", () => {
    // User adds two tasks
    cy.addTask("Resilient Task 1", "Resilience test 1");
    cy.addTask("Resilient Task 2", "Resilience test 2");
    cy.contains('[data-cy="task-card"]', "Resilient Task 1").should("be.visible");
    cy.contains('[data-cy="task-card"]', "Resilient Task 2").should("be.visible");

    // Simulate data loss by clearing localStorage and reloading
    cy.clearLocalStorage();
    cy.reload();

    // Verify that the empty state is displayed
    cy.get('[data-cy="empty-message"]').should("be.visible");
  });
});