import ExternalLink from "@components/ExternalLink";
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
                            /, ^, anything that operates on... <br />
                            <strong>Operands</strong>, which are values like 8,
                            21; things to be operated on.
                        </p>
                        <ParagraphHeader>The Three Notations</ParagraphHeader>
                        <div className="text-sm">
                            <strong>Infix: </strong> When we say 9+10, that is{" "}
                            <strong>infix notation </strong>- that is, the
                            operator is <em>in</em> between the operands. It's
                            the one we're all familiar with.
                            <br />
                            Ex:
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
                            Ex:
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
                            Ex:
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
                            parentheses need to be applied according to the
                            order of operations. However, prefix and postfix
                            notation don't suffer from this ambiguity and follow
                            an easy and consistent set of instructions to
                            evaluate, making it very suitable for computers!
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
            <StackVisualizer
                initialPostfixExpression="8 2 3 * - 7 +"
                initialPrefixExpression="+ - 8 * 2 3 7"
            />
            <div className="flex justify-center items-center flex-col m-6 md:flex-row md:m-0">
                <div className="w-full md:m-12 md:mr-6 md:shrink lg:w-3/5">
                    <TextPanel header="For more information">
                        <br />
                        <div>
                            I filmed an explainer video using this website:
                            <div className="my-8 md:w-1/2">
                                <div className="aspect-w-16 aspect-h-9">
                                    <iframe
                                        src="https://www.youtube.com/embed/3RhLATMb7OI"
                                        title="What is Prefix, Infix, Postfix Notation | Introductory Computer Science | Notation Visualizer"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                        <p>
                            While reviewing information about this topic, I
                            primarily used UCSB Lecturer Mike Costanza's slides
                            for CS12 linked below. Sadly he retired in 2018 so I
                            won't be able to meet him in college :({" "}
                        </p>
                        <br />
                        <div className="truncate">
                            <ExternalLink href="https://sites.cs.ucsb.edu/~mikec/cs12/slides/week08c.pdf">
                                https://sites.cs.ucsb.edu/~mikec/cs12/slides/week08c.pdf
                            </ExternalLink>
                        </div>
                    </TextPanel>
                </div>
            </div>
        </Layout>
    );
};

export default Home;
