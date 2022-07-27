import Layout from "@components/Layout";
import NoSSRWrapper from "@components/NoSSRWrapper";
import ResultList from "@components/ResultList";
import Text from "@components/Text";
import TreeNode from "@components/TreeNode";
import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import {
    CustomNodeElementProps,
    RawNodeDatum,
    RenderCustomNodeElementFn,
    TreeNodeDatum,
} from "react-d3-tree/lib/types/common";
import { MyTreeNode } from "src/types";

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
    const renderTreeWithRoot = (root: MyTreeNode) => {
        const rawRoot = dfs(root);
        if (rawRoot === undefined) {
            console.error("Empty tree!");
        } else {
            setTreeData(rawRoot);
        }
    };

    const expression = "43 7 123 * + 6 9 - /";
    let myRoot: MyTreeNode;
    useEffect(() => {
        clearResults();
        myRoot = buildExpressionTree(expression);
        renderTreeWithRoot(myRoot);

        postorder(myRoot);
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
    const preorder = async (root: MyTreeNode) => {
        if (root === undefined || root.raw?.attributes === undefined) {
            return;
        }
        resultRef.current.push(root.val);
        root.raw.attributes.highlight = "green";
        renderTreeWithRoot(myRoot);
        await wait(waitTime * 1000);
        root.raw.attributes.highlight = "gray";
        if (root.left && root.left.raw?.attributes !== undefined) {
            root.left.raw.attributes.highlight = "light-green";
            renderTreeWithRoot(myRoot);
            await wait(waitTime * 1000);
            await preorder(root.left);
        }
        if (root.right && root.right.raw?.attributes !== undefined) {
            root.right.raw.attributes.highlight = "light-green";
            renderTreeWithRoot(myRoot);
            await wait(waitTime * 1000);
            await preorder(root.right);
        }
    };
    const inorder = async (root: MyTreeNode) => {
        if (root === undefined || root.raw?.attributes === undefined) {
            return;
        }
        root.raw.attributes.highlight = "light-green";
        renderTreeWithRoot(myRoot);
        await wait(waitTime * 1000);
        if (root.left && root.left.raw?.attributes !== undefined) {
            await inorder(root.left);
        }
        resultRef.current.push(root.val);
        root.raw.attributes.highlight = "green";
        renderTreeWithRoot(myRoot);
        await wait(waitTime * 1000);
        root.raw.attributes.highlight = "gray";
        if (root.right && root.right.raw?.attributes !== undefined) {
            await inorder(root.right);
        }
    };
    const postorder = async (root: MyTreeNode) => {
        if (root === undefined || root.raw?.attributes === undefined) {
            return;
        }
        root.raw.attributes.highlight = "light-green";
        renderTreeWithRoot(myRoot);
        await wait(waitTime * 1000);
        if (root.left) {
            await postorder(root.left);
        }
        if (root.right) {
            await postorder(root.right);
        }
        resultRef.current.push(root.val);
        root.raw.attributes.highlight = "green";
        renderTreeWithRoot(myRoot);
        await wait(waitTime * 1000);
        root.raw.attributes.highlight = "gray";
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
            </div>
        </Layout>
    );
};

export default TreePage;
