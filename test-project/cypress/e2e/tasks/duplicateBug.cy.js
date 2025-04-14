describe('Bug Reproduction - Duplicate Task with Rapid Clicks on "Create Task"', () => {
  beforeEach(() => 
    {
      // Reset the app and visit the page
      cy.clearLocalStorage();
      cy.visit("https://javascriptbear.github.io/todo_react_app/");
    });

  it("shows duplicate entries when a user rapidly clicks the Create Task button if no duplication return 2 DIVS", () => 
    {
      // Open the task modal and fill the form
      cy.contains("New Task").click();
      cy.contains("New Task").should("be.visible");
      
      cy.get("input[placeholder='Task Title']").clear().type("Duplicate Bug");
      cy.get("input[placeholder='Task Summary']").clear().type("Bug reproduction test");
      
      // Get and alias the "Create Task" button
      cy.contains("Create Task").should("be.visible").as("createButton");
      
      const rapidClicks = 5; // Using more than 5 clicks is not effective for this test
      for (let i = 0; i < rapidClicks; i++) 
      {
        cy.get("@createButton").click({ force: true });
      }
      
      // Each rapid click creates 2 DIV elements showing "Duplicate Bug"
      const expectedCount = 2;
      
      // Count only the DIVs with text exactly equal to "Duplicate Bug"
      cy.get("div").filter((index, element) =>
          Cypress.$(element).text().trim() === "Duplicate Bug"
        ).then($matchedDivs => 
          {
          const actualCount = $matchedDivs.length;
          cy.log(`With ${rapidClicks} rapid click(s), found ${actualCount} DIV(s) with the text "Duplicate Bug". Expected: ${expectedCount}`);
          expect(actualCount).to.equal(expectedCount);
          });
    });
});
