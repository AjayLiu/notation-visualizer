import { ReactNode } from "react";

interface Props {
    children: ReactNode;
    href: string;
}

const ExternalLink: React.FC<Props> = (props) => {
    return (
        <a className="hover:underline" href={props.href}>
            {props.children}
        </a>
    );
};

export default ExternalLink;
