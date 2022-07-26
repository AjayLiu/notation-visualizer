import Button from "@components/Button";
import GenerateBar from "@components/GenerateBar";
import NoSSRWrapper from "@components/NoSSRWrapper";
import ResultList from "@components/ResultList";
import Slider from "@components/Slider";
import TreeNode from "@components/TreeNode";
import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import {
    CustomNodeElementProps,
    RawNodeDatum,
    RenderCustomNodeElementFn,
    TreeNodeDatum,
} from "react-d3-tree/lib/types/common";
import { MyTreeNode, TraversalParams } from "src/types";
import Swal from "sweetalert2";
import ParagraphHeader from "./ParagraphHeader";
import TextPanel from "./TextPanel";
import { operators, wait } from "../shared/index";

interface Props {
    initialExpression: string;
}
const TreeVisualizer: React.FC<Props> = (props) => {
    const [treeData, setTreeData] = useState<RawNodeDatum>({
        name: "Loading...",
    });

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
                    Swal.fire({
                        title: "Invalid Input Data!",
                        text: "Check if your Tree Data is in valid Postorder notation and space-separated",
                        icon: "error",
                        confirmButtonText: "Okay",
                    });
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
            Swal.fire({
                title: "Invalid Input Data!",
                text: "Check if your Tree Data is in valid Postorder notation and space-separated",
                icon: "error",
                confirmButtonText: "Okay",
            });
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
            Swal.fire({
                title: "Error!",
                text: "Tree is empty! (probably a developer error)",
                icon: "error",
                confirmButtonText: "Okay",
            });
        } else {
            setTreeData(rawRoot);
        }
    };

    const expression = useRef(props.initialExpression);
    const myRoot = useRef<MyTreeNode | undefined>(undefined);
    const resetToExpression = () => {
        clearResults();
        const cleanRoot = buildExpressionTree(expression.current);
        myRoot.current = cleanRoot;
        renderTreeWithRoot(myRoot.current);
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

    const resultRef = useRef<string[]>([]);
    const clearResults = () => {
        resultRef.current = [];
    };

    const waitTime = useRef(0.5);

    const updateNodeWithColor = (
        root: MyTreeNode,
        color: "green" | "gray" | "light-green" | "white",
        mySimCount: number
    ) => {
        if (root.raw?.attributes === undefined) return;
        if (mySimCount !== simCount.current) return;
        root.raw.attributes.highlight = color;
        if (color != "gray") renderTreeWithRoot(myRoot.current);
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
        await wait(waitTime.current * 1000);
        if (mySimCount !== simCount.current) return;
        updateNodeWithColor(root, "gray", mySimCount);
        if (root.left) {
            updateNodeWithColor(root.left, "light-green", mySimCount);
            await wait(waitTime.current * 1000);
            await preorder({ root: root.left, mySimCount: mySimCount });
        }
        if (root.right) {
            updateNodeWithColor(root.right, "light-green", mySimCount);
            await wait(waitTime.current * 1000);
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
        await wait(waitTime.current * 1000);
        if (mySimCount !== simCount.current) return;
        if (root.left && root.left.raw?.attributes !== undefined) {
            await inorder({ root: root.left, mySimCount: mySimCount });
            if (mySimCount !== simCount.current) return;
        }
        resultRef.current.push(root.val);
        updateNodeWithColor(root, "green", mySimCount);
        await wait(waitTime.current * 1000);
        if (mySimCount !== simCount.current) return;
        updateNodeWithColor(root, "gray", mySimCount);
        if (root.right && root.right.raw?.attributes !== undefined) {
            await inorder({ root: root.right, mySimCount: mySimCount });
            if (mySimCount !== simCount.current) return;
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
        await wait(waitTime.current * 1000);
        if (mySimCount !== simCount.current) return;
        if (root.left) {
            await postorder({ root: root.left, mySimCount: mySimCount });
            if (mySimCount !== simCount.current) return;
        }
        if (root.right) {
            await postorder({ root: root.right, mySimCount: mySimCount });
            if (mySimCount !== simCount.current) return;
        }
        updateNodeWithColor(root, "green", mySimCount);
        resultRef.current.push(root.val);
        await wait(waitTime.current * 1000);
        if (mySimCount !== simCount.current) return;
        updateNodeWithColor(root, "gray", mySimCount);
    };

    const onTraversalButtonClick = async (
        func: (trav: TraversalParams) => Promise<void>
    ) => {
        resetToExpression();
        func({ root: myRoot.current, mySimCount: simCount.current });
    };

    return (
        <div className="flex justify-center items-center flex-col md:flex-row m-6 md:m-2">
            <div className="md:m-12 md:mr-6 md:shrink lg:w-3/5">
                <TextPanel header={"What's an Expression Tree?"}>
                    <ParagraphHeader>Expression Tree</ParagraphHeader>
                    <p className="text-sm">
                        <strong>Expression Trees</strong> are binary trees whose
                        parent nodes are operators and children nodes are
                        operands of which the operators will execute on. Refer
                        to the Expression Tree Visualizer for the Expression
                        Tree representation of the expression (8 - 2 * 3 + 7).
                    </p>
                    <ParagraphHeader>
                        What's so special about it?
                    </ParagraphHeader>
                    <p className="text-sm">
                        There are three basic ways to traverse binary trees:
                        <strong> Preorder, Inorder, and Postorder.</strong>{" "}
                        Sound familiar? Yup, for expression trees, preorder
                        traversal outputs prefix notation, inorder outputs
                        infix, postorder outputs postfix!
                    </p>
                    <ParagraphHeader>
                        How do these three traversals work?
                    </ParagraphHeader>
                    <div className="text-sm">
                        All these traversals use recursion, which is
                        straightforward for a computer but often difficult for
                        humans to grasp. Hence, I've provided buttons to help
                        you visualize each traversal in action!
                        <div className="mt-2">
                            <strong>Preorder: </strong>
                            <ol className="list-decimal list-inside mb-1">
                                <li>Put current node in result</li>
                                <li>Go to left child, repeat</li>
                                <li>Go to right child, repeat</li>
                            </ol>
                            <Button
                                onClick={() => onTraversalButtonClick(preorder)}
                            >
                                Run Preorder Simulation
                            </Button>
                        </div>
                        <div className="mt-2">
                            <strong>Inorder: </strong>
                            <ol className="list-decimal list-inside mb-1">
                                <li>Go to left child, repeat</li>
                                <li>Put current node in result</li>
                                <li>Go to right child, repeat</li>
                            </ol>
                            <Button
                                onClick={() => onTraversalButtonClick(inorder)}
                            >
                                Run Inorder Simulation
                            </Button>
                        </div>
                        <div className="mt-2">
                            <strong>Postorder: </strong>
                            <ol className="list-decimal list-inside mb-1">
                                <li>Go to left child, repeat</li>
                                <li>Go to right child, repeat</li>
                                <li>Put current node in result</li>
                            </ol>
                            <Button
                                onClick={() =>
                                    onTraversalButtonClick(postorder)
                                }
                            >
                                Run Postorder Simulation
                            </Button>
                        </div>
                    </div>
                </TextPanel>
            </div>
            <div className="m-auto my-4 w-full md:w-vis-container h-fit px-3 rounded-xl bg-ajay-blue shrink-0 md:mt-0 md:ml-0 md:mr-4 ">
                <div className="m-auto md:w-vis mt-3">
                    <div className="text-center text-lg">
                        Expression Tree Visualizer
                    </div>
                    <div className="text-center text-xs">
                        <em>
                            it's interactive! (scroll to zoom / drag to pan)!
                        </em>
                    </div>
                    <div className={`bg-gray-300 h-[350px] mt-3 `}>
                        <NoSSRWrapper>
                            <Tree
                                data={treeData}
                                pathFunc="straight"
                                zoomable
                                orientation="vertical"
                                collapsible={false}
                                zoom={0.7}
                                translate={{ x: 250 / 2, y: 20 }}
                                renderCustomNodeElement={nodeRenderer}
                                separation={{ nonSiblings: 1, siblings: 1 }}
                            />
                        </NoSSRWrapper>
                    </div>
                    <ResultList result={resultRef.current} />
                    <div className="flex justify-center my-3">
                        <GenerateBar
                            text="Tree Data (postorder, space-separated)"
                            onSubmit={(newVal) => {
                                expression.current = newVal;
                                resetToExpression();
                            }}
                            initialInput={expression.current}
                        />
                    </div>
                    <div className="text-center w-full">Run Visualizer:</div>
                    <div className="flex justify-center m-auto ml-1 my-2 w-full items-center">
                        <Button
                            onClick={() => onTraversalButtonClick(preorder)}
                        >
                            Preorder
                        </Button>
                        <Button onClick={() => onTraversalButtonClick(inorder)}>
                            Inorder
                        </Button>
                        <Button
                            onClick={() => onTraversalButtonClick(postorder)}
                        >
                            Postorder
                        </Button>
                    </div>
                    <div className="flex justify-center mb-6">
                        <Slider
                            onChange={(speed) => {
                                waitTime.current = 0.25 / speed;
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TreeVisualizer;
