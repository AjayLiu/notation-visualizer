import Image from "next/image";
import React from "react";
import { REPO_LINK } from "src/shared";
import ExternalLink from "./ExternalLink";
import SocialIcon from "./SocialIcon";
import Text from "./Text";
const Footer: React.FC = () => {
    const imgPath = "https://ajayliu.com/img";
    return (
        <footer className="bg-ajay-dark flex flex-col-reverse items-center w-full m-auto py-5 mt-48 text-center">
            <Text>
                © {new Date().getFullYear()}{" "}
                <ExternalLink href="https://ajayliu.com">Ajay Liu</ExternalLink>
                . All Rights Reserved •{" "}
                <ExternalLink href="https://mail.google.com/mail/?view=cm&fs=1&to=contact@ajayliu.com">
                    contact@ajayliu.com
                </ExternalLink>
            </Text>
            <div className="m-6 flex justify-evenly">
                <SocialIcon
                    href="https://ajayliu.com"
                    img={{
                        src: `${imgPath}/web_icon.svg`,
                        alt: "Ajay Liu Website",
                    }}
                />
                <SocialIcon
                    href="https://github.com/AjayLiu"
                    img={{
                        src: `${imgPath}/github.svg`,
                        alt: "Github logo",
                    }}
                />
                <SocialIcon
                    href="https://www.linkedin.com/in/ajayliu/"
                    img={{
                        src: `${imgPath}/linkedin.svg`,
                        alt: "LinkedIn logo",
                    }}
                />
                <SocialIcon
                    href="https://www.youtube.com/channel/UCompAYRB224zqCPDyexvmng"
                    img={{
                        src: `${imgPath}/youtube.svg`,
                        alt: "Youtube logo",
                    }}
                />
            </div>
            <div>
                <ExternalLink href={REPO_LINK}>
                    <div className="flex items-center justify-evenly w-80">
                        <Image
                            src={`${imgPath}/repo.svg`}
                            width={60}
                            height={60}
                        />
                        <Text>Contribute to this project on Github</Text>
                    </div>
                </ExternalLink>
            </div>
        </footer>
    );
};

export default Footer;
