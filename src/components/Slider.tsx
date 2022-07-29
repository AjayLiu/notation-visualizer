import { useState } from "react";

interface Props {
    onChange: (speed: number) => void;
}

const Slider: React.FC<Props> = (props) => {
    const [sliderVal, setSliderVal] = useState(0.5);
    const sliderChange = (e: React.FormEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.valueAsNumber;
        setSliderVal(newValue);
        props.onChange(newValue);
    };
    return (
        <div className="flex w-full">
            <label htmlFor="Speed" className="mr-2 text-sm shrink-0">
                Simulation Speed
            </label>
            <input
                className="w-full shrink"
                type="range"
                min="0.1"
                max="1"
                value={sliderVal}
                onChange={sliderChange}
                step="0.02"
            />
        </div>
    );
};

export default Slider;
