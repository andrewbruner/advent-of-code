import input from './input.js';
import test from './test.js';

function followInstructions(instructions) {
	let floor = 0;
	for (let i = 0; i < instructions.length; i++) {
		if (instructions[i] === '(') {
			floor++;
		} else {
			floor--;
		}
	}
	return floor;
}

test(followInstructions);
const floor = followInstructions(input);
console.log(floor);
