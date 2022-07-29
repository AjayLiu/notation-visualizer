import classNames from "classnames";

interface Props {
    result: string[];
}

const ResultList: React.FC<Props> = (props) => {
    return (
        <div className="flex w-vis min-h-fit py-2 border items-center text-sm ">
            <div className="ml-3 mr-1">Result:</div>
            <output className="flex w-full flex-wrap ">
                [
                {props.result.map((val, idx) => {
                    const isLast = idx === props.result.length - 1;
                    return (
                        <div className="flex" key={idx}>
                            <div
                                className={classNames(
                                    "w-3 min-w-min text-center",
                                    {
                                        "bg-green-500": isLast,
                                    }
                                )}
                            >
                                {val}
                            </div>
                            <div>{!isLast && ","}</div>
                        </div>
                    );
                })}
                ]
            </output>
        </div>
    );
};

export default ResultList;
