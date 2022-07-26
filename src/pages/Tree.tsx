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
import { MyTreeNode } from "src/types";

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
        const stack: Array<MyTreeNode> = [];
        terms.forEach((t) => {
            // if this term is an operand
            if (!operators.has(t)) {
                // just push it into the stack
                stack.push({
                    val: t,
                    isOperator: false,
                    left: undefined,
                    right: undefined,
                    rendered: undefined,
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
                    rendered: undefined,
                });
            }
        });

        // stack[0] will be the root node, return it
        if (stack.length != 1) {
            console.error("Bad Expression!");
        }
        return stack[0];
    };

    const dfs = (
        dataRoot: MyTreeNode | undefined
    ): RawNodeDatum | undefined => {
        let r: RawNodeDatum | undefined = undefined;
        if (dataRoot) {
            const left = dfs(dataRoot.left);
            const right = dfs(dataRoot.right);
            const children: RawNodeDatum[] = [];
            if (left !== undefined) {
                children.push(left);
            }
            if (right !== undefined) {
                children.push(right);
            }

            r = {
                name: dataRoot.val,
                children: children,
            };

            dataRoot.rendered = r; // make a reference back to this rendered node
        }
        return r;
    };
    const renderTreeWithRoot = (root: MyTreeNode) => {
        const rawRoot = dfs(root);
        if (rawRoot === undefined) {
            console.error("Empty tree!");
        } else {
            setTreeData(rawRoot);
        }
    };

    const expression = "4 7 11 * +";
    useEffect(() => {
        renderTreeWithRoot(buildExpressionTree(expression));
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
