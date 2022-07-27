import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    size?: string;
}

const Text: React.FC<Props> = (props) => {
    return <div className="text-white">{props.children}</div>;
};

export default Text;
