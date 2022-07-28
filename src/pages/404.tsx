import InternalLink from "@components/InternalLink";
import Layout from "@components/Layout";

const FourOhFour: React.FC = () => {
    return (
        <Layout title="Page Not Found :(">
            <div>
                <h1 className="text-lg w-fit m-auto my-12">Page Not Found!</h1>
            </div>
            <InternalLink href={"/"}>
                <div className="text-lg w-fit m-auto my-12">
                    <div>Click me to return to home page!</div>
                </div>
            </InternalLink>
        </Layout>
    );
};
export default FourOhFour;
