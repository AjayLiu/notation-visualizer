import StackVisualizer from "@components/StackVisualizer";
import randomPostorders from "src/data/randomPostorders";
import randomPreorders from "src/data/randomPreorders";

describe("StackVisualizer.cy.tsx", () => {
    randomPreorders.forEach((preorder, idx) => {
        it("Running preorder and postorder: " + preorder, () => {
            cy.mount(
                <StackVisualizer
                    initialPrefixExpression={preorder}
                    initialPostfixExpression={
                        randomPostorders[
                            idx < randomPostorders.length
                                ? idx
                                : randomPostorders.length - 1
                        ]
                    }
                />
            );
            cy.get("div.swal2-container").should("not.exist");
        });
    });
});
