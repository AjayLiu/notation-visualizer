import Layout from "@components/Layout";
import TreeVisualizer from "@components/TreeVisualizer";

const TreePage: React.FC = () => {
    return (
        <Layout title="Tree - Notation Visualizer">
            <TreeVisualizer initialExpression="8 2 3 * - 7 +" />
        </Layout>
    );
};

export default TreePage;
