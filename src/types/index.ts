import { RawNodeDatum } from "react-d3-tree/lib/types/common";

export interface ImageData {
    src: string;
    alt: string;
}

export interface MyTreeNode {
    val: string;
    isOperator: boolean;
    left: MyTreeNode | undefined;
    right: MyTreeNode | undefined;
    raw: RawNodeDatum | undefined;
}

export interface TraversalParams {
    root: MyTreeNode | undefined;
    mySimCount: number;
}
