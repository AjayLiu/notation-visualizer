import Layout from "@components/Layout";
import NoSSRWrapper from "@components/NoSSRWrapper";
import Text from "@components/Text";
import TreeNode from "@components/TreeNode";
import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import {
    CustomNodeElementProps,
    RawNodeDatum,
    RenderCustomNodeElementFn,
} from "react-d3-tree/lib/types/common";
import { CalcTreeNode } from "src/types";

const TreePage: React.FC = () => {
    const [treeData, setTreeData] = useState<RawNodeDatum>({
        name: "1",
        children: [
            {
                name: "2",
                children: [
                    {
                        name: "3",
                        children: [
                            {
                                name: "7",
                            },
                        ],
                    },
                    {
                        name: "3",
                        children: [
                            {
                                name: "4",
                            },
                        ],
                    },
                ],
            },
        ],
    });

    const operators = new Set(["+", "-", "*", "/", "^"]);

    const buildExpressionTree = (expression: string) => {
        const terms = expression.split(" ");
        const stack: Array<CalcTreeNode> = [];
        terms.forEach((t) => {
            // if this term is an operand
            if (!operators.has(t)) {
                stack.push({
                    val: t,
                    isOperator: false,
                    left: undefined,
                    right: undefined,
                });
            } else {
                // this term is an operator
                // pop two values from the stack
                // first to be popped is right, second is left child
                if (stack.length <= 1) {
                    console.error("Bad expression!");
                }
                const right = stack.pop();
                const left = stack.pop();

                stack.push({
                    val: t,
                    isOperator: true,
                    left: left,
                    right: right,
                });
            }
        });
        console.log(stack);
    };

    const expression = "4 7 11 * +";
    useEffect(() => {
        buildExpressionTree(expression);
    }, []);

    const nodeRenderer: RenderCustomNodeElementFn = (
        nodeProps: CustomNodeElementProps
    ) => <TreeNode nodeProps={nodeProps} highlight={true} />;

    return (
        <Layout title="Tree - Notation Visualizer">
            <Text>Hi</Text>
            <NoSSRWrapper>
                <div className={`m-auto bg-ajay-light w-[500px] h-[500px]`}>
                    <Tree
                        data={treeData}
                        pathFunc="straight"
                        zoomable
                        orientation="vertical"
                        collapsible={false}
                        zoom={0.8}
                        translate={{ x: 500 / 2, y: 20 }}
                        renderCustomNodeElement={nodeRenderer}
                        separation={{ nonSiblings: 1.5, siblings: 1.5 }}
                    />
                </div>
            </NoSSRWrapper>
        </Layout>
    );
};

export default TreePage;
