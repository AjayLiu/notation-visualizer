import type { AppProps } from "next/app";
import Script from "next/script";

import "@styles/index.css";

function Application({ Component, pageProps }: AppProps) {
    return (
        <>
            <Script
                src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"
                strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
                {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          gtag('js', new Date());

          gtag('config', 'G-6MM8WDDYDD');
        `}
            </Script>
            <Component {...pageProps} />
        </>
    );
}

export default Application;
