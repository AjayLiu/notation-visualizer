import Layout from "@components/Layout";
import ParagraphHeader from "@components/ParagraphHeader";
import StackVisualizer from "@components/StackVisualizer";
import TextPanel from "@components/TextPanel";
import TreeVisualizer from "@components/TreeVisualizer";
import Image from "next/image";

const Home: React.FC = () => {
    return (
        <Layout title="Notation Visualizer">
            <div className="flex justify-center items-center flex-col m-6 md:flex-row md:m-0">
                <div className=" md:m-12 md:mr-6 md:shrink lg:w-3/5">
                    <TextPanel
                        header={"What is Infix, Prefix, and Postfix Notation?"}
                    >
                        <ParagraphHeader>Operators vs Operands</ParagraphHeader>
                        <p className="text-sm">
                            <strong>Operators</strong> are symbols like +, -, *,
                            ^, anything that operates on... <br />
                            <strong>Operands</strong>, which are values like 8,
                            21, or even complex terms like 7 * 2 - 3; things to
                            be operated on.
                        </p>
                        <ParagraphHeader>The Three Notations</ParagraphHeader>
                        <div className="text-sm">
                            <strong>Infix: </strong> When we say 9+10, that is{" "}
                            <strong>infix notation </strong>- that is, the
                            operator is <em>in</em> between the operands. It's
                            the one we're all familiar with.
                            <br />
                            ex:
                            <ul className="ml-4 list-disc list-inside">
                                <li>24 / 7</li>
                                <li>8 - 2 * 3 + 7</li>
                            </ul>
                        </div>
                        <div className="mt-2 text-sm">
                            <strong>Prefix: </strong> also known as{" "}
                            <strong>Polish notation</strong>- is where the
                            operator sits <em>before</em> the operands.
                            <br />
                            ex:
                            <ul className="ml-4 list-disc list-inside">
                                <li>/ 24 7</li>
                                <li>+ - 8 * 2 3 7</li>
                            </ul>
                        </div>
                        <div className="mt-2 text-sm">
                            <strong>Postfix: </strong> also known as{" "}
                            <strong>Reverse Polish Notation</strong> or RPN- is
                            where the operator sits <em>after</em> the operands.
                            <br />
                            ex:
                            <ul className="ml-4 list-disc list-inside">
                                <li>24 7 /</li>
                                <li>8 2 3 * - 7 +</li>
                            </ul>
                        </div>
                        <ParagraphHeader>
                            Why not stick with Infix notation?
                        </ParagraphHeader>
                        <p className="text-sm">
                            Notice how in the second example, 8 - 2 * 3 + 7, we
                            had to evaluate the multiplication before the
                            subtraction and finally the addition? This is
                            inconvenient for computers to evaluate as
                            parentheses need to be applied as needed according
                            to the order of operations. However, prefix and
                            postfix notation don't suffer from this ambiguity
                            and follow an easy and consistent set of
                            instructions to evaluate, making it very suitable
                            for computers!
                        </p>
                    </TextPanel>
                </div>
                <div className="mt-4 md:mr-4 shrink-0">
                    <Image
                        src={"/img/diagram.jpg"}
                        width={300}
                        height={300}
                        alt={"Prefix, infix, postfix explanation diagram"}
                    />
                </div>
            </div>
            <TreeVisualizer initialExpression="8 2 3 * - 7 +" />
            <StackVisualizer initialExpression="8 2 3 * - 7 +" />
        </Layout>
    );
};

export default Home;
