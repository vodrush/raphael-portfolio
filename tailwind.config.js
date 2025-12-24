/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                // Palette Originale du Portfolio
                background: {
                    dark: '#1F1C2C',
                    light: '#F1F3F5',
                },
                text: {
                    dark: '#B0B0B0',
                    light: '#212529',
                },
                primary: {
                    DEFAULT: '#B3AEDB', // Lilac pour le mode sombre
                    light: '#34495E',   // Slate Blue pour le mode clair
                },
                secondary: {
                    DEFAULT: '#e74c3c', // Rouge pour les actions/boutons
                },
                card: {
                    dark: '#2A263C',
                    light: '#FFFFFF'
                },
                // Palette Noël (Optionnelle / Legacy)
                christmas: {
                    red: '#E63946',
                    green: '#2A9D8F',
                    gold: '#FFD700',
                    bg: '#0F172A',
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
