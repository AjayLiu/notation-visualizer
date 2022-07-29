import Layout from "@components/Layout";
import TreeVisualizer from "@components/TreeVisualizer";

const TreePage: React.FC = () => {
    return (
        <Layout title="Tree - Notation Visualizer">
            <TreeVisualizer initialExpression="43 7 123 * + 6 9 - /" />
        </Layout>
    );
};

export default TreePage;
