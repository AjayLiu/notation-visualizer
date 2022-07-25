import InternalLink from "./InternalLink";
import Text from "./Text";

const Navbar: React.FC = () => {
    return (
        <nav className="h-full max-w-sm m-auto flex items-center">
            <ul className="w-full flex justify-evenly">
                <li>
                    <InternalLink href={"/"}>
                        <Text>Home</Text>
                    </InternalLink>
                </li>
                <li>|</li>
                <li>
                    <InternalLink href={"/tree"}>
                        <Text>Tree</Text>
                    </InternalLink>
                </li>
                <li>|</li>
                <li>
                    <InternalLink href={"/"}>
                        <Text>Stack</Text>
                    </InternalLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
