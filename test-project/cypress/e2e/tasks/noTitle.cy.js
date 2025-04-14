describe("Negative Case - Adding a Task with an Empty Title", () => {
  beforeEach(() => 
    {
      // Reset the app and visit the page
      cy.clearLocalStorage();
      cy.visit("https://javascriptbear.github.io/todo_react_app/");
   });
  
  it("should not add a task if the title is empty and show 'You have no task' ", () => 
    {
      cy.contains("New Task").click();
      // Leave the title empty and fill the summary
      cy.get("input[placeholder='Task Title']").clear();
      cy.get("input[placeholder='Task Summary']").clear().type("Summary without title");
      cy.contains("Create Task").click();
      
      // Expect that no task is added and "You have no tasks" is visible
      cy.contains("You have no tasks").should("be.visible");
    });
});