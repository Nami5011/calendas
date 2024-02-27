/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {},
  },
  plugins: [
    function ({ addUtilities }) {
		const newUtilities = {
		  '@media (prefers-color-scheme: dark)': {
			'.svg-white': {
			  filter: 'brightness(0) saturate(100%) invert(100%) sepia(0%) saturate(7499%) hue-rotate(176deg) brightness(109%) contrast(94%)',
			},
			'.svg-black': {
				filter: 'brightness(0) invert(1) sepia(1) saturate(8) hue-rotate(175deg)',
			},
		  },
		};
  
		addUtilities(newUtilities);
	  },
  ],
}

