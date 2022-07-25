import Head from "next/head";
import Footer from "@components/Footer";
import Header from "@components/Header";
import { ReactNode, useEffect, useState } from "react";

interface Props {
    children: ReactNode;
    title: string;
}

const Layout: React.FC<Props> = (props) => {
    return (
        <>
            <Head>
                <title>{props.title}</title>
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
                    content="https://notation-visualizer.ajayliu.com/img/calculator.png"
                />
                <meta
                    property="og:description"
                    content="An interactive website to visualize how Infix, Prefix (Polish), and Postfix (Reverse Polish) notation are converted and evaluated."
                />
            </Head>
            <div className="w-full h-full bg-ajay text-white">
                <Header />

                <main className="min-h-[60vh]">{props.children}</main>

                <Footer />
            </div>
        </>
    );
};

export default Layout;
