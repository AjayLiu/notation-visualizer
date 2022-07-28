import { useState } from "react";
import randomPostorders from "src/data/randomPostorders";

interface Props {
    onSubmit: (newGen: string) => void;
}

const GenerateBar: React.FC<Props> = (props) => {
    const [customInput, setCustomInput] = useState("");
    return (
        <div className="text-center">
            <label htmlFor="Custom Tree Input" className="">
                Tree Data (postorder, space-separated)
            </label>
            <div className="flex items-center h-6 mt-1">
                <input
                    className="text-black text-sm h-full px-1"
                    type="text"
                    placeholder="ex: 1 2 + 3 4 - /"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                />
                <button
                    className="h-full mx-[1px] bg-blue-500 text-white active:bg-blue-500 font-bold uppercase text-xxs p-1 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => props.onSubmit(customInput)}
                >
                    Submit
                </button>
                <button
                    className="h-full mr-[1px] bg-gray-500 text-white active:bg-gray-600 font-bold uppercase text-xxs p-1 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setCustomInput("")}
                >
                    Clear
                </button>
                <button
                    className="h-full bg-orange-400 text-white active:bg-orange-500 font-bold uppercase text-xxs p-1 rounded shadow hover:shadow-md outline-none focus:outline-none ease-linear transition-all duration-150"
                    type="button"
                    onClick={() =>
                        setCustomInput(
                            randomPostorders[
                                Math.floor(
                                    Math.random() * randomPostorders.length
                                )
                            ]
                        )
                    }
                >
                    Random
                </button>
            </div>
        </div>
    );
};

export default GenerateBar;
