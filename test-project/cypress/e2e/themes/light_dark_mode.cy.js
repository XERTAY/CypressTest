describe('Mode Sombre', () => 
    {
        beforeEach(() => 
        {
            // Reset the app and visit the page
            cy.clearLocalStorage();
            cy.visit('https://javascriptbear.github.io/todo_react_app/');
        });

        // On pourrait si on a accès au code --> Récupérer la couleur du fond du body
        // Ou bien, calculé la luminence de la couleur du body et comparer voir si la premiere couleur est plus foncée que la deuxieme
        // Ou bien, faire une comparaison de la couleur du body avant et après le click sur le bouton dark mode

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
  