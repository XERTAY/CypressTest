describe('Removing Tasks', () => {
    beforeEach(() => 
        {
            // Reset the app and visit the page
            cy.clearLocalStorage();
            cy.visit('https://javascriptbear.github.io/todo_react_app/');

            // add a task to delete later
            cy.addTask("Title test", "Summary test");
        });

        it("delete task", () => 
        {
            // click on delete button
            cy.deleteTask("Title test");
        });
});