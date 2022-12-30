import input from './input.js';
import test from './test.js';

function followInstructions(instructions, isPartOne = true) {
	let floor = 0;
	for (let i = 0; i < instructions.length; i++) {
		if (instructions[i] === '(') {
			floor++;
		} else {
			floor--;
			if (!isPartOne && floor < 0) {
				const position = i + 1;
				return position;
			}
		}
	}
	return floor;
}

test(followInstructions);
const floor = followInstructions(input);
console.log(floor);

test(followInstructions, false);
const position = followInstructions(input, false);
console.log(position);
