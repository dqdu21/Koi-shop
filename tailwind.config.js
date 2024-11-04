/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: ['./index.html', './src/**/*.{css,js,ts,jsx,tsx}'],
  theme: {
  	extend: {
  		transitionProperty: {
  			transform: 'transform'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {}
  	}
  },
  variants: {
    extends: {
      translate: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [require("tailwindcss-animate")],
};
