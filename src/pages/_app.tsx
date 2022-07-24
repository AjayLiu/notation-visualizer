import type { AppProps } from "next/app";

import "@styles/index.css";

import GoogleAnalyticsHook from "@components/GoogleAnalyticsHook";
function Application({ Component, pageProps }: AppProps) {
    return (
        <>
            <GoogleAnalyticsHook />
            <Component {...pageProps} />
        </>
    );
}

export default Application;
