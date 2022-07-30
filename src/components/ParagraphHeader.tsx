import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const ParagraphHeader: React.FC<Props> = (props) => {
    return <h3 className="font-bold mt-4 mb-2 underline">{props.children}</h3>;
};

export default ParagraphHeader;
