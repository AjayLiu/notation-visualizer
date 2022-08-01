import classNames from "classnames";
import { ReactNode } from "react";
import { StackItem } from "src/types";

interface Props {
    list: StackItem[] | undefined;
    bottomElem?: ReactNode;
}

const VerticalList: React.FC<Props> = (props) => {
    return (
        <div className="h-full w-1/2 flex flex-col justify-end overflow-clip">
            {props.list?.map((item, idx) => {
                return (
                    <div
                        className={classNames([
                            "text-center border",
                            { "bg-ajay-light-gray": !item.highlight },
                            { "bg-green-500": item.highlight },
                        ])}
                        key={idx}
                    >
                        {item.val}
                    </div>
                );
            })}
            {props.bottomElem}
        </div>
    );
};

export default VerticalList;
