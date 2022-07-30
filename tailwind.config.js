/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx}",
        "./src/components/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                ajay: {
                    DEFAULT: "#252934",
                    blue: "#23395d",
                    gray: "#303235",
                    "light-gray": "#777d8c",
                    dark: "#23262f",
                },
            },
            spacing: {
                sm: "24rem",
                vis: "250px",
                "vis-container": "300px",
            },
            fontSize: {
                xxs: ".5rem",
            },
        },
    },
    plugins: [],
};
