describe("Home Page", () => {
  beforeEach(() => {
    cy.clearLocalStorage();
    cy.visit("http://localhost:3000/todo_react_app");
  });

  it("should display the correct title", () => {
    cy.contains("h1", "My Tasks").should("be.visible");
  });

  it('should show "You have no tasks" when no tasks', () => {
    cy.get('[data-cy="empty-message"]').should("be.visible");
  });

  it("should display the New Task button", () => {
    cy.get('[data-cy="new-task-button"]').should("be.visible");
  });
});

