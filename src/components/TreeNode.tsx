import classNames from "classnames";
import { SyntheticEvent, useEffect, useState } from "react";
import {
    CustomNodeElementProps,
    RawNodeDatum,
    TreeNodeDatum,
} from "react-d3-tree/lib/types/common";

interface Props {
    nodeProps: CustomNodeElementProps;
    onClickHandler: (nodeDatum: TreeNodeDatum) => void;
}

const TreeNode: React.FC<Props> = (props) => {
    return (
        <g onClick={() => props.onClickHandler(props.nodeProps.nodeDatum)}>
            <circle
                className={classNames({
                    "fill-white":
                        props.nodeProps.nodeDatum.attributes?.highlight ===
                        "white",
                    "fill-gray-500":
                        props.nodeProps.nodeDatum.attributes?.highlight ===
                        "gray",
                    "fill-green-400":
                        props.nodeProps.nodeDatum.attributes?.highlight ===
                        "green",
                })}
                r="20"
            />
            <text
                strokeWidth={1}
                textAnchor="middle"
                dy=".3em"
                className="text-lg fill-black"
            >
                {props.nodeProps.nodeDatum.name}
            </text>
        </g>
    );
};

export default TreeNode;
