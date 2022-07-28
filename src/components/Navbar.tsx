import InternalLink from "./InternalLink";

const Navbar: React.FC = () => {
    return (
        <nav className="h-full max-w-sm m-auto flex items-center">
            <ul className="w-full flex justify-evenly">
                <li>
                    <InternalLink href={"/"}>
                        <div>Home</div>
                    </InternalLink>
                </li>
                <li>|</li>
                <li>
                    <InternalLink href={"/tree"}>
                        <div>Tree</div>
                    </InternalLink>
                </li>
                <li>|</li>
                <li>
                    <InternalLink href={"/"}>
                        <div>Stack</div>
                    </InternalLink>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
