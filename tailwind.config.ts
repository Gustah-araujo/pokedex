import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                "normal": "#B7B6A8",
                "fire": "#FD4423",
                "water": "#3399FF",
                "grass": "#9BCC51",
                "poison": "#B66EA8",
                "electric": "#FFD356",
                "ice": "#7DD4FE",
                "fighting": "#C66F60",
                "ground": "#E2C46E",
                "flying": "#8899FF",
                "psychic": "#FC6FA9",
                "bug": "#AABB22",
                "rock": "#C5B67D",
                "ghost": "#6666BB",
                "dragon": "#8C7AF1",
                "dark": "#8B6E60",
                "steel": "#B7B7C5",
                "fairy": "#F1A8F0"
            },
            backgroundImage: {
                "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
                "gradient-conic":
                    "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
            },
        },
    },
    safelist: [
        {
            pattern: /bg-(grass|poison|fire|water|normal|flying|fighting|rock|ground|electric|bug|ghost|fairy|psychic|dark|steel|ice|dragon)/
        }
    ],
    plugins: [],
};
export default config;
