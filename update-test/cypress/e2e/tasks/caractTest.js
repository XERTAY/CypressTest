describe("Edge Cases - Advanced Input Tests", () => {
  beforeEach(() => 
    {
      // Reset the app and visit the page
      cy.clearLocalStorage();
      cy.visit("http://localhost:3000/todo_react_app");
    });

  it("should write a task only spaces in the title and reject it", () => 
    {
      cy.contains("New Task").click();
      cy.get("input[placeholder='Task Title']").clear().type("     ");
      cy.get("input[placeholder='Task Summary']").clear().type("Empty title summary");
      cy.contains("Create Task").click();
      // Expect no task to be added
      cy.contains("Empty title summary").should("not.exist");
      cy.contains("You have no tasks").should("be.visible");
    });

  it("should write a task with multi-line inputs for the summary", () => 
    {
      const multilineSummary = "Line one\nLine two\nLine three";
      cy.contains("New Task").click();
      cy.get("input[placeholder='Task Title']").clear().type("Multi-line Task");
      cy.get("input[placeholder='Task Summary']").clear().type(multilineSummary);
      cy.contains("Create Task").click();
      // Verify that the task title and first line of the summary are visible
      cy.contains("Multi-line Task").should("be.visible");
      cy.contains("Line one").should("be.visible");
    });

  it("should add a task and write extreme inputs (1000 characters)", () => 
    {
      const extremeTitle = "T".repeat(1000);
      const extremeSummary = "S".repeat(2000);
      cy.fastAddTask(extremeTitle, extremeSummary);
      // Check that the extreme texts are visible
      cy.contains(extremeTitle).should("be.visible");
      cy.contains(extremeSummary).should("be.visible");
    });

  it("should add a task and handle Unicode, non-Latin characters, and the backslash", () => 
    {
      // Include a backslash (\) in the title and summary.
      const unicodeTitle = "任务测试 – 测试标题 🚀 \\";
      const unicodeSummary = "这是一个测试总结，包含多种语言字符 مثل العربية والإنجليزية. \\";
      cy.addTask(unicodeTitle, unicodeSummary);
      cy.contains(unicodeTitle).should("be.visible");
      cy.contains(unicodeSummary).should("be.visible");
    });
});
