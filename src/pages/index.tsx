import Head from "next/head";
import Footer from "@components/Footer";
import GoogleAnalyticsHook from "@components/GoogleAnalyticsHook";

const Home: React.FC = () => {
    return (
        <>
            <GoogleAnalyticsHook />
            <div className="w-full bg-ajay text-white">
                <Head>
                    <title>Notation Visualizer</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                        name="Description"
                        content="An interactive website to visualize how Infix, Prefix (Polish), and Postfix (Reverse Polish) notation are converted and evaluated."
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta property="og:title" content="Notation Visualizer" />
                    <meta property="og:type" content="website" />
                    <meta
                        property="og:url"
                        content="https://notation-visualizer.ajayliu.com"
                    />
                    <meta
                        property="og:image"
                        content="https://ajayliu.com/imgs/ajayliudark.png"
                    />
                    <meta
                        property="og:description"
                        content="An interactive website to visualize how Infix, Prefix (Polish), and Postfix (Reverse Polish) notation are converted and evaluated."
                    />
                </Head>

                <main className="min-h-[60vh]"></main>

                <Footer />
            </div>
        </>
    );
};

export default Home;
