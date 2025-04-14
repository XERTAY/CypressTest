describe("Complete Workflow - Add, Persist, and Delete a Task", () => {
  beforeEach(() => 
  {
    cy.clearLocalStorage();
    cy.visit("http://localhost:3000/todo_react_app");
  });

  it("should add a task, reload to check persistence, then delete and reload to show empty state", () => 
  {
    // User adds a task
    cy.addTask("Workflow Task", "Complete workflow test");
    cy.contains('[data-cy="task-card"]', "Workflow Task").should("be.visible");
    
    // Reload to verify that the task persists (stored in localStorage)
    cy.reload();
    cy.contains('[data-cy="task-card"]', "Workflow Task").should("be.visible");
    
    // Delete the task using the custom command
    cy.deleteTask("Workflow Task");
    cy.contains("Workflow Task").should("not.exist");

    // Reload to verify that the empty state message is visible
    cy.reload();
    cy.get('[data-cy="empty-message"]').should("be.visible");
  });
});