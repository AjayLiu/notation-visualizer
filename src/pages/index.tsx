import Head from "next/head";
import Footer from "@components/Footer";
import GoogleAnalyticsHook from "@components/GoogleAnalyticsHook";

const Home: React.FC = () => {
    return (
        <>
            <GoogleAnalyticsHook />
            <div className="w-full bg-ajay text-white">
                <Head>
                    <title>Ajay Liu</title>
                    <link rel="icon" href="/favicon.ico" />
                    <meta
                        name="Description"
                        content="My name is Ajay Liu and I love creating things!"
                    />
                    <meta
                        name="viewport"
                        content="width=device-width, initial-scale=1"
                    />
                    <meta property="og:title" content="Ajay Liu" />
                    <meta property="og:type" content="website" />
                    <meta property="og:url" content="https://ajayliu.com/" />
                    <meta
                        property="og:image"
                        content="https://ajayliu.com/imgs/ajayliudark.png"
                    />
                    <meta
                        property="og:description"
                        content="My name is Ajay Liu and I love creating things!"
                    />
                </Head>

                <main className="min-h-[40vh]"></main>

                <Footer />
            </div>
        </>
    );
};

export default Home;
