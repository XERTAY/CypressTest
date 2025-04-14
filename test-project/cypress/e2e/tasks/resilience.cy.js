describe('Resilience and Recovery - Clearing localStorage and reloading', () => 
{
  beforeEach(() => 
    {
      // Reset the app and visit the page
      cy.clearLocalStorage();
      cy.visit('https://javascriptbear.github.io/todo_react_app/');
    });

  it('should show an empty task list after clearing local storage and refreshing page', () => 
    {
      // Add a few tasks
      cy.addTask("Resilient Task 1", "Resilience test 1");
      cy.addTask("Resilient Task 2", "Resilience test 2");
      cy.contains("Resilient Task 1").should('be.visible');
      cy.contains("Resilient Task 2").should('be.visible');

      // Simulate data loss by clearing localStorage
      cy.clearLocalStorage();
      cy.reload();

      // Check that after clearing, the interface displays the "You have no tasks" message
      cy.contains("You have no tasks").should('be.visible');
    });
    
});
