import input from './input.js';

function split(input, char) {
	let arr = [ ];
	let prevIdx = 0;
	for (let i = 0; i < input.length; i++) {
		if (input[i] === char) {
			let item = '';
			for (let j = prevIdx; j < i; j++) {
				item += input[j];
			}
			arr = [ ...arr, item, ];
			prevIdx = i + 1;
		}
	}
	let item = '';
	for (let j = prevIdx; j < input.length; j++) {
		item += input[j];
	}
	arr = [ ...arr, item, ];
	return arr;
}

function dayTwo(input) {
	input = split(input, '\n');
	console.log(input[1]);
	for (let i = 0; i < input.length; i++) {
		input[i] = split(input[i], 'x');
		const l = input[i][0];
		const w = input[i][1];
		const h = input[i][2];
		const sides = [ l * w, w * h, h * l, ];
		const area = 2 * sides[0] + 2 * sides[1] + 2 * sides[2];
		let slack = sides[0];
		for (let j = 1; j < sides.length; j++) {
			if (sides[j] < slack) {
				slack = sides[j];
			}
		}
		input[i] = area + slack;
		let sum = 0;
		for (let j = 0; j < input.length; j++) {
			sum += input[j];
		}
		input = sum;
	}
	return input;
}

console.log(dayTwo(input));
