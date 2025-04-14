describe("Add task", () => {
    beforeEach(() => 
    {
        // Reset the app and visit the page
        cy.clearLocalStorage();
        cy.visit("https://javascriptbear.github.io/todo_react_app/");
    });

    it("should add a task with a title and summary", () => 
    {
        cy.addTask("Title test", "Summary test");
        // check if task is created
        cy.contains("Title test").should("be.visible");
        cy.contains("Summary test").should("be.visible");

        // check if delete button is visible
        cy.contains("Title test").parent().find("button").should("be.visible");
    });

    it("should not add task if no title as been set", () => 
        {
            cy.contains("New Task").click();
            cy.contains("New Task").should("be.visible");
            cy.get("input[placeholder='Task Summary']").clear().type("Task Summary").should("have.value", "Task Summary");
            cy.contains("Create Task").click();
            // check if task is created
            cy.contains("Summary test").should("be.visible");
    
            // check if delete button is visible
            cy.contains("Summary test").parent().find("button").should("not.exist");
            // We didn't add a task so we should see the message "You have no tasks"
            cy.contains('You have no tasks').should('be.visible');
        });

    it("should add task if no summary as been set but title set", () => 
        {
            cy.contains("New Task").click();
            cy.contains("New Task").should("be.visible");
            cy.get("input[placeholder='Task Title']").clear().type("Task Title").should("have.value", "Task Title");
            cy.contains("Create Task").click();
            // check if task is created
            cy.contains("Task Title").should("be.visible");
    
            // check if delete button is visible
            cy.contains("Task Title").parent().find("button").should("be.visible");
        });

  });
  