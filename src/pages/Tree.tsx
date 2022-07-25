import Layout from "@components/Layout";
import NoSSRWrapper from "@components/NoSSRWrapper";
import Text from "@components/Text";
import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import { RawNodeDatum } from "react-d3-tree/lib/types/common";

const TreePage: React.FC = () => {
    const [treeData, setTreeData] = useState<RawNodeDatum>({
        name: "CEO",
        children: [
            {
                name: "Manager",
                attributes: {
                    department: "Production",
                },
                children: [
                    {
                        name: "Foreman",
                        attributes: {
                            department: "Fabrication",
                        },
                        children: [
                            {
                                name: "Worker",
                            },
                        ],
                    },
                    {
                        name: "Foreman",
                        attributes: {
                            department: "Assembly",
                        },
                        children: [
                            {
                                name: "Worker",
                            },
                        ],
                    },
                ],
            },
        ],
    });
    useEffect(() => {
        // setTreeData({ name: "second" });
    }, []);

    return (
        <Layout title="Tree - Notation Visualizer">
            <Text>Hi</Text>
            <NoSSRWrapper>
                <div className="m-auto bg-ajay-light w-sm h-sm">
                    <Tree
                        data={treeData}
                        pathFunc="straight"
                        zoomable
                        orientation="vertical"
                        collapsible={false}
                        zoom={0.8}
                        translate={{ x: 180, y: 20 }}
                        rootNodeClassName="node"
                        branchNodeClassName="node"
                        leafNodeClassName="node"
                    />
                </div>
            </NoSSRWrapper>
        </Layout>
    );
};

export default TreePage;
