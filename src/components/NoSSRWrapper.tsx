import dynamic from "next/dynamic";
import { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const NoSSRWrapper: React.FC<Props> = (props) => <>{props.children}</>;

export default dynamic(() => Promise.resolve(NoSSRWrapper), {
    ssr: false,
});
