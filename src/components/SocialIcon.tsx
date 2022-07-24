import Image from "next/image";
import { ImageData } from "src/types";
import ExternalLink from "./ExternalLink";

interface Props {
    href: string;
    img: ImageData;
}

const SocialIcon: React.FC<Props> = (props) => {
    return (
        <div className="mx-5">
            <ExternalLink href={props.href}>
                <Image
                    src={props.img.src}
                    alt={props.img.alt}
                    width={40}
                    height={40}
                />
            </ExternalLink>
        </div>
    );
};

export default SocialIcon;
