import Link from "next/link";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    href: string;
}

const InternalLink: React.FC<Props> = (props) => {
    return (
        <Link href={props.href}>
            <a className="hover:underline">{props.children}</a>
        </Link>
    );
};

export default InternalLink;
