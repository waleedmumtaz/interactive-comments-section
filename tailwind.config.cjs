module.exports = {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			colors: {
				'clr-moderate-blue': 'hsl(238, 40%, 52%)',
				'clr-soft-red': 'hsl(358, 79%, 66%)',
				'clr-light-grayish-blue': 'hsl(239, 57%, 85%)',
				'clr-pale-red': 'hsl(357, 100%, 86%)',
				'clr-dark-blue': 'hsl(212, 24%, 26%)',
				'clr-grayish-blue': 'hsl(211, 10%, 45%)',
				'clr-light-gray': 'hsl(223, 19%, 93%)',
				'clr-very-light-gray': 'hsl(228, 33%, 97%)',
				'clr-white': 'hsl(0, 0%, 100%)'
			},
			fontFamily: {
				rubik: ['Rubik', 'sans-serif']
			},
			fontSize: {
				'fs-body': '1rem'
			},
			fontWeight: {
				'fw-regular': 400,
				'fw-medium': 500,
				'fw-bold': 700
			}
		}
	},
	plugins: []
};
