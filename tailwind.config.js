/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
        
    ],
    theme: {
        extend: {
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
        },
        extend: {
            colors: {
                primary: '#3a3aac',
                warning: '#fbbf24',
                danger: '#dc2626',
                success: '#10b981'
            }
        }
    },
    plugins: [require("flowbite/plugin")],
}
