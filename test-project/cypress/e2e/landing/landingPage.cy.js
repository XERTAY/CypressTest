describe("Home Page", () => 
{
  beforeEach(() => 
  {
    // Reset the app and visit the page
    cy.clearLocalStorage();
    cy.visit('https://javascriptbear.github.io/todo_react_app/');
  });

  it("should display the correct title", () => 
  {
    cy.contains("h1","My Task").should("be.visible");
  });

  it('show "You have no tasks" when no tasks', () => 
  {
    cy.contains('You have no tasks').should('be.visible');
  });

  it("should display button new task", () => 
  {
    cy.contains('button', 'New Task').should('be.visible');
  });

})