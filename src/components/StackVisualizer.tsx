import { useEffect, useRef } from "react";
import { CodeBlock, CopyBlock, monokai } from "react-code-blocks";
import Button from "./Button";
import GenerateBar from "./GenerateBar";
import ParagraphHeader from "./ParagraphHeader";
import Slider from "./Slider";
import TextPanel from "./TextPanel";

interface Props {
    initialExpression: string;
}

const StackVisualizer: React.FC<Props> = (props) => {
    const waitTime = useRef(0.5);
    const expression = useRef(props.initialExpression);

    const resetToExpression = () => {};

    useEffect(() => {
        resetToExpression();
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
                        How to evaluate Postfix expressions with a stack?
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
                                />
                            </div>
                            <div className="lg:w-2/5">
                                <p className="my-2">Prefix Pseudocode:</p>
                                <CodeBlock
                                    text={prefixCode}
                                    language={"text"}
                                    theme={monokai}
                                    showLineNumbers
                                />
                            </div>
                        </div>
                    </div>
                </TextPanel>
            </div>
            {/* <div className="m-auto my-4 w-vis-container h-fit px-3 rounded-xl bg-ajay-blue shrink-0 md:mt-0 md:ml-0 mt-4 md:mr-4 ">
                <div className="m-auto w-vis mt-3">
                    <div className="text-center text-lg">
                        Stack Evaluation Visualizer
                    </div>
                    <div className={`bg-gray-300 w-vis h-[350px] mt-3`}></div>
                    <div className="flex justify-center my-3">
                        <GenerateBar
                            text={"Prefix to Postfix"}
                            onSubmit={(newVal) => {
                                expression.current = newVal;
                                resetToExpression();
                            }}
                            initialInput={expression.current}
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
            </div> */}
        </div>
    );
};

export default StackVisualizer;
