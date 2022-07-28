import Button from "@components/Button";
import Layout from "@components/Layout";
import NoSSRWrapper from "@components/NoSSRWrapper";
import ResultList from "@components/ResultList";
import Text from "@components/Text";
import TreeNode from "@components/TreeNode";
import { resolve } from "path";
import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import {
    CustomNodeElementProps,
    RawNodeDatum,
    RenderCustomNodeElementFn,
    TreeNodeDatum,
} from "react-d3-tree/lib/types/common";
import { MyTreeNode, TraversalParams } from "src/types";

const TreePage: React.FC = () => {
    const [treeData, setTreeData] = useState<RawNodeDatum>({
        name: "Loading...",
    });

    const operators = new Set(["+", "-", "*", "/", "^"]);

    const buildExpressionTree = (expression: string) => {
        const terms = expression.split(" ");
        const stack: Array<MyTreeNode> = [];
        terms.forEach((t) => {
            // generate a uuid for this node for search later
            // const uuid = uuidv4();
            // if this term is an operand
            if (!operators.has(t)) {
                // just push it into the stack
                stack.push({
                    val: t,
                    isOperator: false,
                    left: undefined,
                    right: undefined,
                    raw: undefined,
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
                    raw: undefined,
                });
            }
        });

        simCount.current++;

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
                attributes: {
                    highlight: dataRoot.raw?.attributes?.highlight ?? "white",
                },
            };

            dataRoot.raw = r; // make a reference back to this raw node
        }
        return r;
    };
    const renderTreeWithRoot = (root: MyTreeNode | undefined) => {
        const rawRoot = dfs(root);
        if (rawRoot === undefined) {
            console.error("Empty tree!");
        } else {
            setTreeData(rawRoot);
        }
    };

    const expression = "43 7 123 * + 6 9 - /";
    const [myRoot, setMyRoot] = useState<MyTreeNode | undefined>(undefined);
    const resetToExpression = () => {
        clearResults();
        const cleanRoot = buildExpressionTree(expression);
        setMyRoot(cleanRoot);
        if (myRoot === undefined) {
            renderTreeWithRoot(cleanRoot);
        } else {
            renderTreeWithRoot(myRoot);
        }
    };
    const simCount = useRef<number>(0);

    useEffect(() => {
        resetToExpression();
    }, []);

    const onNodeClick = (nodeDatum: TreeNodeDatum) => {
        console.log("ID clicked: " + nodeDatum.__rd3t.id);
    };

    const nodeRenderer: RenderCustomNodeElementFn = (
        nodeProps: CustomNodeElementProps
    ) => {
        const nodeID = nodeProps.nodeDatum.__rd3t.id;
        return <TreeNode nodeProps={nodeProps} onClickHandler={onNodeClick} />;
    };

    function wait(milliseconds: number) {
        return new Promise((resolve) => setTimeout(resolve, milliseconds));
    }

    const resultRef = useRef<string[]>([]);
    const clearResults = () => {
        resultRef.current = [];
    };

    const waitTime = 1;

    const updateNodeWithColor = (
        root: MyTreeNode,
        color: "green" | "gray" | "light-green" | "white",
        mySimCount: number
    ) => {
        if (root.raw?.attributes === undefined) return;
        if (mySimCount !== simCount.current) return;
        root.raw.attributes.highlight = color;
        if (color != "gray") renderTreeWithRoot(myRoot);
    };
    const preorder = async ({ root, mySimCount }: TraversalParams) => {
        if (
            root === undefined ||
            root.raw?.attributes === undefined ||
            mySimCount !== simCount.current
        ) {
            return;
        }
        resultRef.current.push(root.val);
        updateNodeWithColor(root, "green", mySimCount);
        await wait(waitTime * 1000);
        updateNodeWithColor(root, "gray", mySimCount);
        if (root.left) {
            updateNodeWithColor(root.left, "light-green", mySimCount);
            await wait(waitTime * 1000);
            await preorder({ root: root.left, mySimCount: mySimCount });
        }
        if (root.right) {
            updateNodeWithColor(root.right, "light-green", mySimCount);
            await wait(waitTime * 1000);
            await preorder({ root: root.right, mySimCount: mySimCount });
        }
    };
    const inorder = async ({ root, mySimCount }: TraversalParams) => {
        if (
            root === undefined ||
            root.raw?.attributes === undefined ||
            mySimCount != simCount.current
        ) {
            return;
        }
        updateNodeWithColor(root, "light-green", mySimCount);
        await wait(waitTime * 1000);
        if (root.left && root.left.raw?.attributes !== undefined) {
            await inorder({ root: root.left, mySimCount: mySimCount });
        }
        resultRef.current.push(root.val);
        updateNodeWithColor(root, "green", mySimCount);
        await wait(waitTime * 1000);
        updateNodeWithColor(root, "gray", mySimCount);
        if (root.right && root.right.raw?.attributes !== undefined) {
            await inorder({ root: root.right, mySimCount: mySimCount });
        }
    };
    const postorder = async ({ root, mySimCount }: TraversalParams) => {
        if (
            root === undefined ||
            root.raw?.attributes === undefined ||
            mySimCount != simCount.current
        ) {
            return;
        }
        updateNodeWithColor(root, "light-green", mySimCount);
        await wait(waitTime * 1000);
        if (root.left) {
            await postorder({ root: root.left, mySimCount: mySimCount });
        }
        if (root.right) {
            await postorder({ root: root.right, mySimCount: mySimCount });
        }
        updateNodeWithColor(root, "green", mySimCount);
        resultRef.current.push(root.val);
        await wait(waitTime * 1000);
        updateNodeWithColor(root, "gray", mySimCount);
    };

    const onTraversalButtonClick = async (
        func: (trav: TraversalParams) => Promise<void>
    ) => {
        resetToExpression();
        func({ root: myRoot, mySimCount: simCount.current });
    };

    return (
        <Layout title="Tree - Notation Visualizer">
            <div className="m-auto w-fit">
                <div className={`bg-gray-300 w-vis h-vis `}>
                    <NoSSRWrapper>
                        <Tree
                            data={treeData}
                            pathFunc="straight"
                            zoomable
                            orientation="vertical"
                            collapsible={false}
                            zoom={0.8}
                            translate={{ x: 500 / 2, y: 20 }}
                            renderCustomNodeElement={nodeRenderer}
                            separation={{ nonSiblings: 1, siblings: 1 }}
                        />
                    </NoSSRWrapper>
                </div>
                <ResultList result={resultRef.current} />
                <Button onClick={() => onTraversalButtonClick(preorder)}>
                    Preorder
                </Button>
                <Button onClick={() => onTraversalButtonClick(inorder)}>
                    Inorder
                </Button>
                <Button onClick={() => onTraversalButtonClick(postorder)}>
                    Postorder
                </Button>
            </div>
        </Layout>
    );
};

export default TreePage;
