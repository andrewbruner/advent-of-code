import input from './input.js';

function dayTwo(input) {
	input = input.split('\n')
		.map(dims => {
			dims = dims.split('x');
			const l = +dims[0];
			const w = +dims[1];
			const h = +dims[2];
			const sides = [ l * w, w * h, h * l, ];
			const area = 2 * sides[0] + 2 * sides[1] + 2 * sides[2];
			const slack = Math.min(...sides);
			const sum = area + slack;
			return sum;
		})
		.reduce((acc, curr) => curr + acc);
	return input;
}

console.log(dayTwo(input));
