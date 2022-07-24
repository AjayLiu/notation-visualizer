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
                    light: "#383849",
                    gray: "#303235",
                    dark: "#23262f",
                },
            },
        },
    },
    plugins: [],
};
