import input from './input.js';

function dayOne(input) {
	let floor = 0;
	let position = 0;
	for (let i = 0; i < input.length; i++) {
		if (input[i] === '(') {
			floor++;
		} else {
			floor--;
			if (floor < 0 && position < 1) {
				position += i + 1;
			}
		}
	}
	return { floor, position };
};

const { floor, position } = dayOne(input);
console.log(floor, position);
