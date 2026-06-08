/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                bg: {
                    DEFAULT: '#0a0a0f',
                    card: '#12121a',
                    glass: 'rgba(18, 18, 26, 0.6)',
                },
                txt: {
                    DEFAULT: '#a1a1aa',
                    bright: '#f4f4f5',
                },
                accent: {
                    DEFAULT: '#3b82f6',
                    glow: 'rgba(59, 130, 246, 0.15)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                mono: ['JetBrains Mono', 'monospace'],
            }
        },
    },
    darkMode: 'class',
    plugins: [],
}
