import { useEffect } from "react";
import ReactGA from "react-ga";

const GoogleAnalyticsHook: React.FC = () => {
    useEffect(() => {
        ReactGA.initialize("UA-123456789-0");
        ReactGA.set({ page: window.location.pathname });
        ReactGA.pageview(window.location.pathname);
    }, []);

    return <></>;
};
export default GoogleAnalyticsHook;
