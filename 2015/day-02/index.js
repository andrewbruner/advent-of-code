import input from './input.js';

function dayTwo(input) {
	input = input.split('\n')
		.map(dims => {
			dims = dims.split('x');
			// measurements
			const l = +dims[0];
			const w = +dims[1];
			const h = +dims[2];
			const areas = [ l * w, w * h, h * l, ];
			const perims = [ 2 * l + 2 * w, 2 * w + 2 * h, 2 * h + 2 * l ];
			const vol = l * w * h;
			// paper
			const paperWrapping = 2 * areas[0] + 2 * areas[1] + 2 * areas[2];
			const paperSlack = Math.min(...areas);
			const paper = paperWrapping + paperSlack;
			// ribbon
			const ribbonWrapping = Math.min(...perims);
			const ribbonBow = vol;
			const ribbon = ribbonWrapping + ribbonBow;
			const wrapping = { paper, ribbon };
			return wrapping;
		})
		.reduce((acc, curr) => {
			return {
				paper: curr.paper + acc.paper,
				ribbon: curr.ribbon + acc.ribbon,
			};
		});
	return input;
}

console.log(dayTwo(input));
