import Layout from "@components/Layout";
import TreeVisualizer from "@components/TreeVisualizer";

const Home: React.FC = () => {
    return (
        <Layout title="Notation Visualizer">
            <div className="m-auto my-4 flex flex-col sm:flex-row sm:justify-center">
                <div className="w-vis-container p-6 bg-ajay-blue rounded-xl m-auto sm:w-2/5 sm:mx-6">
                    <h2 className="text-xl font-bold ">
                        What is Infix, Prefix, and Postfix Notation?
                    </h2>
                    <h3 className="font-bold mt-4 mb-2 underline">
                        Operators vs Operands
                    </h3>
                    <p className="text-sm">
                        <strong>Operators</strong> are symbols like +, -, *, ^,
                        anything that operates on... <br />
                        <strong>Operands</strong>, which are values like 8, 21,
                        or even complex terms like 7 * 2 - 3; things to be
                        operated on
                    </p>
                    <h3 className="font-bold mt-8 mb-2 underline">
                        The Three Notations
                    </h3>
                    <div className="text-sm">
                        <strong>Infix: </strong> When we say 9+10, that is{" "}
                        <strong>infix notation </strong>- that is, the operator
                        is <em>in</em> between the operands. It's the one we're
                        all familiar with.
                        <br />
                        ex:
                        <ul className="ml-4 list-disc list-inside">
                            <li>24 / 7</li>
                            <li>8 - 2 * 3 + 7</li>
                        </ul>
                    </div>
                    <div className="mt-2 text-sm">
                        <strong>Prefix: </strong> also known as{" "}
                        <strong>Polish notation</strong>- is where the operator
                        sits <em>before</em> the operands.
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
                    <h3 className="font-bold mt-8 mb-2 underline">
                        Why not stick with Infix notation?
                    </h3>
                    <p className="text-sm">
                        Notice how in the second example, 8 - 2 * 3 + 7, we had
                        to evaluate the multiplication before the subtraction
                        and finally the addition? This is inconvenient for
                        computers to evaluate as parentheses need to be applied
                        as needed according to the order of operations. However,
                        prefix and postfix notation don't suffer from this
                        ambiguity and follow an easy and consistent set of
                        instructions to evaluate, making it very suitable for
                        computers!
                    </p>
                </div>
                <TreeVisualizer initialExpression="8 2 3 * - 7 +" />
            </div>
        </Layout>
    );
};

export default Home;
