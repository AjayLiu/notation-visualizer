import { useEffect, useRef, useState } from "react";
import { CodeBlock, CopyBlock, monokai } from "react-code-blocks";
import { StackItem } from "src/types";
import Button from "./Button";
import GenerateBar from "./GenerateBar";
import ParagraphHeader from "./ParagraphHeader";
import Slider from "./Slider";
import TextPanel from "./TextPanel";
import VerticalList from "./VerticalList";
import { operators, wait } from "../shared/index";
import Swal from "sweetalert2";
import { flushSync } from "react-dom";

interface Props {
    initialPostfixExpression: string;
    initialPrefixExpression: string;
}

const StackVisualizer: React.FC<Props> = (props) => {
    const waitTime = useRef(0.2);
    const postfixExpression = useRef(props.initialPostfixExpression);
    const prefixExpression = useRef(props.initialPrefixExpression);

    const isRunning = useRef(false);
    const [inputList, setInputList] = useState<StackItem[] | undefined>();
    const inputRef = useRef<StackItem[] | undefined>([]);

    const [stackList, setStackList] = useState<StackItem[] | undefined>();
    const stackRef = useRef<StackItem[] | undefined>([]);

    const [postfixHighlight, setPostfixHighlight] = useState("");
    const [prefixHighlight, setPrefixHighlight] = useState("");

    const simCount = useRef(0);

    const rawExpressionToStackList = (expr: string) => {
        if (expr === undefined) return;
        const exploded = expr.split(" ");
        const ans: StackItem[] = [];
        exploded.forEach((val) => {
            // validate that val is a number or operator
            if (!operators.has(val) && isNaN(+val)) {
                console.error("INVALID INPUT");
                Swal.fire({
                    title: "Invalid Input Data!",
                    text: "Check if your Tree Data is in valid Postorder notation and space-separated",
                    icon: "error",
                    confirmButtonText: "Okay",
                });
                return;
            }
            const item: StackItem = {
                val: val,
                highlight: false,
            };
            ans.push(item);
        });
        return ans;
    };

    const inputListLoaded = useRef(false);
    const triggerPostfix = useRef(false);
    const triggerPrefix = useRef(false);

    const resetToExpression = (isPostfix: boolean) => {
        triggerPostfix.current = false;
        triggerPrefix.current = false;
        simCount.current++;
        setInputList(() => {
            inputListLoaded.current = true;
            return rawExpressionToStackList(
                isPostfix ? postfixExpression.current : prefixExpression.current
            );
        });
        setPostfixHighlight("");
        setPrefixHighlight("");
        setStackList(undefined);
    };

    useEffect(() => {
        if (inputListLoaded) {
            if (triggerPostfix.current) {
                evaluateExpression(true);
                triggerPostfix.current = false;
            } else if (triggerPrefix.current) {
                evaluateExpression(false);
                triggerPrefix.current = false;
            }
            inputListLoaded.current = false;
        }
    }, [inputList]);

    useEffect(() => {
        resetToExpression(true);
    }, []);

    const postfixCode = `for each token in input {
	if token is operand
		push to stack
	else if token is operator
		pop two operands from stack 
			(first popped is right operand)
			(second popped is left operand)
		perform operation on the operands
		push result of operation to stack
}
stack should only have one item: answer`;

    const prefixCode = `for each token in reversed input {
	if token is operand
		push to stack
	else if token is operator
		pop two operands from stack 
			(first popped is left operand)
			(second popped is right operand)
		perform operation on the operands
		push result of operation to stack
}
stack should only have one item: answer`;

    const setHighlight = (isPostfix: boolean, lines: string) => {
        if (isPostfix) setPostfixHighlight(lines);
        else setPrefixHighlight(lines);
    };

    const evaluateExpression = async (isPostfix: boolean) => {
        if (inputList === undefined || inputList.length === 0) return false; // inputList hasnt been loaded in yet
        isRunning.current = true;
        inputRef.current = inputList;

        const ogSimCount = simCount.current;

        let hasError = false;
        while (inputRef.current.length > 0) {
            // highlight top input token
            let top: StackItem | undefined;
            setHighlight(isPostfix, "1");
            setInputList((oldList) => {
                let temp = oldList?.at(0);
                if (!isPostfix) {
                    // get from bottom
                    temp = oldList?.at(oldList.length - 1);
                }
                if (temp !== undefined) {
                    temp.highlight = true;
                    top = temp;
                }
                inputRef.current = oldList;
                return oldList;
            });

            await wait(waitTime.current * 1000);
            if (ogSimCount !== simCount.current) break;

            if (top === undefined) {
                console.error("INPUT EMPTY");
                hasError = true;
                break;
            }

            // check if token is operator
            if (operators.has(top.val)) {
                setHighlight(isPostfix, "4");
                await wait(waitTime.current * 1000);
                if (ogSimCount !== simCount.current) break;

                // remove the token (operator) from input
                let popped: StackItem | undefined;
                setInputList((oldList) => {
                    const temp = isPostfix ? oldList?.shift() : oldList?.pop();
                    if (temp !== undefined) {
                        popped = temp;
                    }
                    inputRef.current = oldList;
                    return oldList;
                });

                // highlight the top 2 from stack
                setHighlight(isPostfix, "5-7");

                setStackList((oldList) => {
                    if (oldList === undefined) return oldList;
                    oldList[0] = { ...oldList[0], highlight: true };
                    oldList[1] = { ...oldList[1], highlight: true };
                    stackRef.current = oldList;
                    return oldList;
                });

                await wait(waitTime.current * 1000);
                if (ogSimCount !== simCount.current) break;

                // pop one from stack (right operand)
                let rightOperand: StackItem | undefined;
                setStackList((oldList) => {
                    const temp = oldList?.shift();
                    if (temp !== undefined && !isNaN(+temp.val)) {
                        rightOperand = temp;
                    } else {
                        hasError = true;
                        Swal.fire({
                            title: "Invalid Input Data!",
                            text: "An error occurred while popping from the stack, indicating the input data was invalid.",
                            icon: "error",
                            confirmButtonText: "Okay",
                        });
                        console.error(
                            "Tried to pop operand from the stack but was empty or the operand was not a number, indicating input was faulty."
                        );
                    }
                    stackRef.current = oldList;
                    return oldList;
                });

                if (hasError) break;

                // pop another from stack (left operand)
                let leftOperand: StackItem | undefined;
                setStackList((oldList) => {
                    const temp = oldList?.shift();
                    if (temp !== undefined && !isNaN(+temp.val)) {
                        leftOperand = temp;
                    } else {
                        hasError = true;
                        Swal.fire({
                            title: "Invalid Input Data!",
                            text: "An error occurred while popping from the stack, indicating the input data was invalid.",
                            icon: "error",
                            confirmButtonText: "Okay",
                        });
                        console.error(
                            "Tried to pop operand from the stack but was empty or the operand was not a number, indicating input was faulty."
                        );
                    }
                    stackRef.current = oldList;
                    return oldList;
                });

                if (hasError) break;

                await wait(waitTime.current * 1000);
                if (ogSimCount !== simCount.current) break;
                setHighlight(isPostfix, "8-9");

                // perform operation
                let calcAns = 0;
                if (
                    leftOperand?.val === undefined ||
                    rightOperand?.val === undefined
                ) {
                    break;
                }
                const leftVal = parseInt(leftOperand?.val);
                const rightVal = parseInt(rightOperand?.val);

                switch (popped?.val) {
                    case "+":
                        calcAns = leftVal + rightVal;
                        break;
                    case "-":
                        calcAns = isPostfix
                            ? leftVal - rightVal
                            : rightVal - leftVal;
                        break;
                    case "*":
                        calcAns = leftVal * rightVal;
                        break;
                    case "/":
                        calcAns = isPostfix
                            ? leftVal / rightVal
                            : rightVal / leftVal;
                        break;
                    case "^":
                        calcAns = isPostfix
                            ? Math.pow(leftVal, rightVal)
                            : Math.pow(rightVal, leftVal);
                        break;
                }

                // push calculated answer to stack
                setStackList((oldList) => {
                    if (oldList === undefined) oldList = [];
                    const newList: StackItem[] = [
                        { val: calcAns.toString(), highlight: true },
                        ...oldList,
                    ];
                    stackRef.current = newList;
                    return newList;
                });
                await wait(waitTime.current * 1000);
                if (ogSimCount !== simCount.current) break;
            } else {
                // token is operand
                setHighlight(isPostfix, "2");
                await wait(waitTime.current * 1000);

                if (ogSimCount !== simCount.current) break;
                setHighlight(isPostfix, "3");

                let popped: StackItem | undefined;
                setInputList((oldList) => {
                    const temp = isPostfix ? oldList?.shift() : oldList?.pop();
                    if (temp !== undefined) {
                        popped = temp;
                    }
                    inputRef.current = oldList;
                    return oldList;
                });

                // push the token to stack
                setStackList((oldList) => {
                    if (oldList === undefined) oldList = [];
                    const newList =
                        popped === undefined ? oldList : [popped, ...oldList];
                    stackRef.current = newList;
                    return newList;
                });
                await wait(waitTime.current * 1000);
                if (ogSimCount !== simCount.current) break;
            }

            // unhighlight the stack
            setStackList((oldList) => {
                if (oldList === undefined) return oldList;
                oldList.forEach((item) => (item.highlight = false));
                return oldList;
            });
        }

        // last item on stack is answer
        setHighlight(isPostfix, "11");
        setStackList((oldList) => {
            if (oldList === undefined) return oldList;
            if (oldList.length !== 1) {
                if (!hasError) {
                    console.error("Invalid Postfix expression");
                    Swal.fire({
                        title: "Invalid Input Data!",
                        text: "Reached end of algorithm but stack did not have 1 element, indicating faulty input",
                        icon: "error",
                        confirmButtonText: "Okay",
                    });
                }
            }

            oldList[0] = { ...oldList[0], highlight: true };
            stackRef.current = oldList;
            return oldList;
        });

        if (stackRef?.current?.length === 1)
            await wait(waitTime.current * 10 * 1000);

        isRunning.current = false;

        resetToExpression(isPostfix);
    };
    return (
        <div className="flex justify-center items-center flex-col md:flex-row m-6 md:m-2">
            <div className="md:m-12 md:mr-6 md:shrink lg:w-3/5">
                <TextPanel
                    header={"How do you evaluate Prefix/Postfix notation?"}
                >
                    <ParagraphHeader>What is a Stack?</ParagraphHeader>
                    <div className="text-sm">
                        <strong>Stacks</strong> are an abstract data type with
                        two primary operations: <br />
                        <div className="mt-2">
                            <ol className="list-decimal list-inside mb-1">
                                <li>
                                    <strong>Push</strong>: Add an element to the
                                    top of the stack
                                </li>
                                <li>
                                    <strong>Pop</strong> Remove an element from
                                    the top of the stack
                                </li>
                            </ol>
                        </div>
                        <p className="my-2">
                            A stack behaves just like a stack of plates: you{" "}
                            <em>push</em> plates to the top and also{" "}
                            <em>pop</em> plates from the top.
                        </p>
                        <p>
                            A stack follows <strong>LIFO</strong>, or Last in
                            First Out.
                        </p>
                    </div>
                    <ParagraphHeader>
                        How to evaluate Postfix and Prefix expressions with a
                        stack?
                    </ParagraphHeader>
                    <div className="text-sm">
                        <p className="mb-2 w-4/5">
                            <strong>Note: </strong>
                            Prefix is basically evaluated the same way as
                            Postfix but backwards! Just reverse the input
                            expression or read it backwards! Also note that
                            since it is reversed, the left and right operands
                            are flipped too!{" "}
                        </p>
                        <div className="md:flex justify-evenly overflow-hidden">
                            <div className="lg:w-2/5">
                                <p className="my-2">Postfix Pseudocode:</p>
                                <CodeBlock
                                    text={postfixCode}
                                    language={"text"}
                                    theme={monokai}
                                    showLineNumbers
                                    highlight={postfixHighlight}
                                />
                                <div className="flex justify-center my-3">
                                    <GenerateBar
                                        text={
                                            "Run Visualizer - Evaluate Postfix Expression"
                                        }
                                        onSubmit={(newVal) => {
                                            postfixExpression.current = newVal;
                                            resetToExpression(true);
                                            triggerPostfix.current = true;
                                        }}
                                        initialInput={postfixExpression.current}
                                    />
                                </div>
                            </div>
                            <div className="lg:w-2/5">
                                <p className="my-2">Prefix Pseudocode:</p>
                                <CodeBlock
                                    text={prefixCode}
                                    language={"text"}
                                    theme={monokai}
                                    showLineNumbers
                                    highlight={prefixHighlight}
                                />
                                <div className="flex justify-center my-3">
                                    <GenerateBar
                                        text={
                                            "Run Visualizer - Evaluate Prefix Expression"
                                        }
                                        onSubmit={(newVal) => {
                                            prefixExpression.current = newVal;
                                            resetToExpression(false);
                                            triggerPrefix.current = true;
                                        }}
                                        initialInput={prefixExpression.current}
                                        prefixOnRandom
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </TextPanel>
            </div>
            <div className="m-auto my-4 w-full md:w-vis-container h-fit px-3 rounded-xl bg-ajay-blue shrink-0 md:mt-0 md:ml-0 md:mr-4 ">
                <div className="m-auto md:w-vis mt-3">
                    <div className="text-center text-lg">
                        Stack Evaluation Visualizer
                    </div>
                    <div className={`bg-gray-300 h-[350px] mt-3`}>
                        <div className="flex h-full">
                            <div className="flex flex-grow justify-center">
                                <VerticalList
                                    list={inputList}
                                    bottomElem={
                                        <div className="m-2 text-black text-center">
                                            Input
                                        </div>
                                    }
                                />
                            </div>
                            <div className="flex flex-grow justify-center">
                                <VerticalList
                                    list={stackList}
                                    bottomElem={
                                        <div className="m-2 text-black text-center">
                                            Stack
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center my-3">
                        <GenerateBar
                            text={"Evaluate Postfix Expression"}
                            onSubmit={(newVal) => {
                                postfixExpression.current = newVal;
                                resetToExpression(true);
                                triggerPostfix.current = true;
                            }}
                            initialInput={postfixExpression.current}
                        />
                    </div>
                    <div className="flex justify-center my-3">
                        <GenerateBar
                            text={"Evaluate Prefix Expression"}
                            onSubmit={(newVal) => {
                                prefixExpression.current = newVal;
                                resetToExpression(false);
                                triggerPrefix.current = true;
                            }}
                            initialInput={prefixExpression.current}
                            prefixOnRandom
                        />
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

export default StackVisualizer;
