import Layout from "@components/Layout";
import StackVisualizer from "@components/StackVisualizer";

const StackPage: React.FC = () => {
    return (
        <Layout title="Stack - Notation Visualizer">
            <StackVisualizer initialExpression="8 2 3 * - 7 +" />
        </Layout>
    );
};

export default StackPage;
