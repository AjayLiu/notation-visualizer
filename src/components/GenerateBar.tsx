import { useState } from "react";
import randomPostorders from "src/data/randomPostorders";
import randomPreorders from "src/data/randomPreorders";

interface Props {
    text: string;
    onSubmit: (newGen: string) => void;
    initialInput: string;
    prefixOnRandom?: boolean;
}

const GenerateBar: React.FC<Props> = (props) => {
    const [customInput, setCustomInput] = useState(props.initialInput);
    return (
        <div className="text-center w-full">
            <label htmlFor="Custom Tree Input" className="">
                {props.text}
            </label>
            <div className="flex items-center mt-1 h-6 w-full">
                <input
                    className="text-black text-sm h-full px-1 shrink w-full"
                    type="text"
                    placeholder="ex: 1 2 + 3 4 - /"
                    value={customInput}
                    onChange={(e) => setCustomInput(e.target.value)}
                />
                <div className="flex">
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
                            setCustomInput(() => {
                                return props.prefixOnRandom
                                    ? randomPreorders[
                                          Math.floor(
                                              Math.random() *
                                                  randomPostorders.length
                                          )
                                      ]
                                    : randomPostorders[
                                          Math.floor(
                                              Math.random() *
                                                  randomPostorders.length
                                          )
                                      ];
                            })
                        }
                    >
                        Random
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GenerateBar;
