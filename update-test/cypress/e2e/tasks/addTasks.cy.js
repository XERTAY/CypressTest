describe("Add Task - User Workflow", () => 
    {
        beforeEach(() => 
        {
            cy.clearLocalStorage();
            cy.visit("http://localhost:3000/todo_react_app");
        });
    
        it("allows a user to add a new task with title and summary", () => 
        {
            // Simulate user adding a valid task
            cy.addTask("Title test", "Summary test");
            
            // The task should appear with the specified title and summary
            cy.contains('[data-cy="task-card"]', "Title test").should("be.visible");
            cy.contains('[data-cy="task-card"]', "Summary test").should("be.visible");
        
            // The delete button should be visible within the task card
            cy.contains('[data-cy="task-card"]', "Title test")
                .find('[data-cy="delete-task-button"]')
                .should("be.visible");
        });
    
        it("prevents a user from adding a task if the title is not set", () => 
        {
            // User opens the New Task modal
            cy.get('[data-cy="new-task-button"]').click();
            cy.get('[data-cy="task-modal"]').should("be.visible");
            
            // User fills in only the summary, leaving the title empty
            cy.get('[data-cy="task-summary-input"]').clear().type("Task Summary").should("have.value", "Task Summary");
            cy.get('[data-cy="create-task-button"]').click();
            
            // Since no title is provided, the task should not be added, and the empty state should be visible.
            cy.get('[data-cy="empty-message"]').should("be.visible");
        });
    
        it("allows a user to add a task if no summary is provided but title is set", () => 
        {
            // User opens the New Task modal
            cy.get('[data-cy="new-task-button"]').click();
            cy.get('[data-cy="task-modal"]').should("be.visible");
            
            // User fills in only the title
            cy.get('[data-cy="task-title-input"]').clear().type("Task Title").should("have.value", "Task Title");
            cy.get('[data-cy="create-task-button"]').click();
            
            // The task should be created and visible
            cy.contains('[data-cy="task-card"]', "Task Title").should("be.visible");
            
            // The task's delete button should be visible
            cy.contains('[data-cy="task-card"]', "Task Title")
                .find('[data-cy="delete-task-button"]')
                .should("be.visible");
        });
  });