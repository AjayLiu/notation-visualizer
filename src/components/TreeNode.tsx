import classNames from "classnames";
import { SyntheticEvent, useEffect, useState } from "react";
import { CustomNodeElementProps } from "react-d3-tree/lib/types/common";

interface Props {
    nodeProps: CustomNodeElementProps;
    highlight: boolean;
}

const TreeNode: React.FC<Props> = ({ nodeProps, highlight }) => {
    return (
        <g>
            <circle
                className={classNames({
                    "fill-white": !highlight,
                    "fill-green-400": highlight,
                })}
                r="20"
            />
            <text
                strokeWidth={1}
                textAnchor="middle"
                dy=".3em"
                className="text-lg fill-black"
            >
                {nodeProps.nodeDatum.name}
            </text>
        </g>
    );
};

export default TreeNode;
