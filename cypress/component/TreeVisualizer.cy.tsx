import TreeVisualizer from "@components/TreeVisualizer";
import failOnConsoleError from "cypress-fail-on-console-error";
import randomPostorders from "src/data/randomPostorders";

describe("TreeVisualizer.cy.tsx", () => {
    randomPostorders.forEach((postorder) => {
        it("Running postorder: " + postorder, () => {
            cy.mount(<TreeVisualizer initialExpression={postorder} />);
            cy.get("div.swal2-container").should("not.exist");
        });
    });
});
