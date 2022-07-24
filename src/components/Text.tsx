import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    size?: string;
}

const Text: React.FC<Props> = (props) => {
    return <p className="text-white">{props.children}</p>;
};

export default Text;
