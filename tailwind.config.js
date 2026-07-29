/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                surface: {
                    DEFAULT: '#0A0A0F',
                    secondary: '#121216',
                    card: '#1A1A22',
                    'card-hover': '#22222E',
                },
                accent: {
                    DEFAULT: '#6E56CF',
                    light: '#C4B5FD',
                    glow: 'rgba(110, 86, 207, 0.12)',
                },
                text: {
                    primary: '#EDEDF5',
                    secondary: '#8A8A9A',
                    muted: '#555565',
                },
                border: {
                    DEFAULT: 'rgba(255,255,255,0.06)',
                },
            },
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                heading: ['Playfair Display', 'Georgia', 'serif'],
                mono: ['JetBrains Mono', 'monospace'],
            },
            animation: {
                'float': 'float 6s ease-in-out infinite',
                'fade-in': 'fadeIn 0.8s ease-out forwards',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-12px)' },
                },
                fadeIn: {
                    from: { opacity: '0', transform: 'translateY(20px)' },
                    to: { opacity: '1', transform: 'translateY(0)' },
                },
            },
        },
    },
    darkMode: 'class',
    plugins: [],
}
