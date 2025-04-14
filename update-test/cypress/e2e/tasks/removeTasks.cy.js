describe("Remove Tasks", () => {
    beforeEach(() => 
    {
      cy.clearLocalStorage();
      cy.visit("http://localhost:3000/todo_react_app");
      // Add a task to delete
      cy.addTask("Test Title", "Test Task");
    });
  
    it("should delete the task", () => 
    {
      cy.deleteTask("Test Title");
    });
  });