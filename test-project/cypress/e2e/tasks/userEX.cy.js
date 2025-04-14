describe("User Experience - Add, Persist, and Delete a Task", () => {
  beforeEach(() => 
    {
      // Reset the app and visit the page
      cy.clearLocalStorage();
      cy.visit("https://javascriptbear.github.io/todo_react_app/");
    });

  it("should add a task, reload to check persistence, then delete and reload to see empty state", () => 
    {
      // Add the task
      cy.addTask("Workflow Task", "Complete workflow test");
      cy.contains("Workflow Task").should("be.visible");
      
      // Reload to check that the task persists (stored on the client)
      cy.reload();
      cy.contains("Workflow Task").should("be.visible");
      
      // Delete the task using the custom commandf
      cy.deleteTask("Workflow Task");
      cy.contains("Workflow Task").should("not.exist");
      
      // Reload to verify that the empty state is shown
      cy.reload();
      cy.contains("You have no tasks").should("be.visible");
  });
});