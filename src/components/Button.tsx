import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    onClick: () => void;
}

const Button: React.FC<Props> = (props) => {
    return (
        <button
            className="bg-blue-400 text-white active:bg-blue-500 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
            type="button"
            onClick={props.onClick}
        >
            {props.children}
        </button>
    );
};

export default Button;
