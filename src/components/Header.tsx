import Image from "next/image";
import Link from "next/link";
import { ImageData } from "src/types";
import InternalLink from "./InternalLink";
import Navbar from "./Navbar";
import Text from "./Text";

const Header: React.FC = () => {
    return (
        <header className="py-4 w-full justify-center bg-ajay-dark">
            <div>
                <InternalLink href={"/"}>
                    <div className="w-fit m-auto flex items-center justify-center hover:underline cursor-pointer">
                        <div className="mr-2 pt-2">
                            <Image
                                src={"/img/calculator.svg"}
                                alt={"Calculator icon"}
                                width={40}
                                height={40}
                            />
                        </div>
                        <h1 className="text-2xl text-center">
                            <Text>Notation Visualizer</Text>
                        </h1>
                    </div>
                </InternalLink>
            </div>
            <Navbar />
        </header>
    );
};

export default Header;
