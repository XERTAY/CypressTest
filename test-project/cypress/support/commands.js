Cypress.Commands.add("addTask", (title, summary) => 
{
    cy.contains("New Task").click();
    cy.contains("New Task").should("be.visible");
    cy.get("input[placeholder='Task Title']").clear().type(title).should("have.value", title);
    cy.get("input[placeholder='Task Summary']").clear().type(summary).should("have.value", summary);
    cy.contains("Create Task").click();
});
  
Cypress.Commands.add("fastAddTask", (title, summary) => 
{
    cy.contains("New Task").click();
    cy.contains("New Task").should("be.visible");
    // Use { delay: 0 } to type quickly
    cy.get("input[placeholder='Task Title']").clear().type(title, { delay: 0 });
    cy.get("input[placeholder='Task Summary']").clear().type(summary, { delay: 0 });
    cy.contains("Create Task").click();
});
  
Cypress.Commands.add("deleteTask", (title) => 
{
    cy.contains(title).parent().find("button").should("be.visible").click(); // pas le meilleur mais aucun autre moyen de le faire je penses ?
                                                                             // a moins de mettre un attribut stable du genre data-cy="delete-button"
    cy.contains("You have no tasks").should("be.visible");
});
  