import InternalLink from "@components/InternalLink";
import Layout from "@components/Layout";
import Text from "@components/Text";

const FourOhFour: React.FC = () => {
    return (
        <Layout title="Page Not Found :(">
            <InternalLink href={"/"}>
                <div className="text-lg w-fit m-auto my-12">
                    <Text>Click me to return to home page!</Text>
                </div>
            </InternalLink>
        </Layout>
    );
};
export default FourOhFour;
