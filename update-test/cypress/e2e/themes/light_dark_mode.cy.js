describe('Mode Sombre', () => 
    {
        beforeEach(() => 
        {
            // Reset the app and visit the page
            cy.clearLocalStorage();
            cy.visit('https://javascriptbear.github.io/todo_react_app/');
        });

        it('On/off dark mode', () => 
        {
            // turn on dark mode
            cy.contains("My Tasks").parent().find("button").should("be.visible").click();
            cy.get('body').should('have.css', 'background-color', 'rgb(26, 27, 30)');

            //turn off dark mode
            cy.contains("My Tasks").parent().find("button").should("be.visible").click();
            cy.get('body').should('have.css', 'background-color', 'rgb(255, 255, 255)');
        });
  });
  