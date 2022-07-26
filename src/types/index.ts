export interface ImageData {
    src: string;
    alt: string;
}

export interface CalcTreeNode {
    val: string;
    isOperator: boolean;
    left: CalcTreeNode | undefined;
    right: CalcTreeNode | undefined;
}
