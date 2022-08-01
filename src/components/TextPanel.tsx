import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    header: string;
}

const TextPanel: React.FC<Props> = (props) => {
    return (
        <div className="p-4 bg-ajay-blue rounded-xl m-auto md:p-8">
            <h2 className="text-xl font-bold ">{props.header}</h2>
            {props.children}
        </div>
    );
};

export default TextPanel;
