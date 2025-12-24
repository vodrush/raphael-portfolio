/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                christmas: {
                    red: '#E63946',
                    green: '#2A9D8F', // Un vert sympa, ou plus traditionnel #146B3A
                    gold: '#FFD700',
                    bg: '#0F172A', // Slate 900 par défaut, ou #022c22 (emerald 950) pour noel
                },
                background: {
                    dark: '#022c22', // Emerald 950 : Ambiance sapin sombre
                    light: '#F0FDF4', // Emerald 50
                },
                text: {
                    dark: '#ecfdf5', // Emerald 50
                    light: '#14532d', // Emerald 900
                },
                primary: {
                    DEFAULT: '#e11d48', // Rose/Red 600 pour les accents (boules de noel)
                    light: '#be123c',
                },
                card: {
                    dark: 'rgba(6, 78, 59, 0.7)', // Emerald 900 transparent
                    light: '#FFFFFF'
                }
            },
            fontFamily: {
                sans: ['Lato', 'Roboto', 'sans-serif'],
                heading: ['Poppins', 'Montserrat', 'sans-serif'],
            }
        },
    },
    darkMode: 'class', // On garde la gestion via classe sur body
    plugins: [],
}
