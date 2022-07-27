import classNames from "classnames";
import Text from "./Text";

interface Props {
    result: string[];
}

const ResultList: React.FC<Props> = (props) => {
    return (
        <Text>
            <div className="flex w-vis h-16 border text-lg items-center">
                <div className="ml-3 mr-1">Result: [</div>
                <output className="flex">
                    {props.result.map((val, idx) => {
                        const isLast = idx === props.result.length - 1;
                        return (
                            <div className="flex">
                                <div
                                    className={classNames(
                                        "h-7 w-8 min-w-min text-center",
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
                </output>
                <div className="ml-1">]</div>
            </div>
        </Text>
    );
};

export default ResultList;
