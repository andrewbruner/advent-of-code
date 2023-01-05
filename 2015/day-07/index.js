import Input from './input.js';

let input = Input.split('\n');
// let input = `123 -> x
// 456 -> y
// d -> k
// x AND y -> d
// x OR y -> e
// x LSHIFT 2 -> f
// y RSHIFT 2 -> g
// NOT x -> h
// NOT y -> i
// i -> j`.split('\n');

const AND = 'AND';
const OR = 'OR';
const LSHIFT = 'LSHIFT';
const RSHIFT = 'RSHIFT';
const NOT = 'NOT';

let wires = { };

let instructions = input;
// populate wires object
instructions.forEach(instruction => {
	instruction = instruction.split(' -> ');
	wires[instruction[1]] = undefined;
});

let wiresAreUndefined = true;

while (wiresAreUndefined) {
	instructions.forEach(instruction => {
		// @type [ SIGNAL: String, WIRE: String ]
		instruction = instruction.split(' -> ');
		// @type SIGNAL: [String, (String,) (String,) ]
		let signal = instruction[0].split(' ');
		// @type WIRE: String
		let wire = instruction[1];
		// SIGNAL is WIRE or NUMBER
		if (signal.length === 1) {
			if (wires[wire] === undefined) {
				if (Number.isNaN(+signal[0])) {
					if (wires[signal[0]] !== undefined) {
						wires[wire] = wires[signal[0]];
					}
				} else {
					wires[wire] = +signal[0];
				}
			}
		// signal is NOTGATE
		} else if (signal.length === 2) {
			if (wires[signal[1]] !== undefined) {
				// @type String (base 10)
				let number = wires[signal[1]];
				// @type String (base 2)
				number = number.toString(2);

				number = number.split('');
				while (number.length < 16) {
					number = ['0', ...number];
				}
				number = number.map(bit => bit === '0' ? '1' : '0');
				number = number.join('');

				// @type Number (base 2)
				number = parseInt(number, 2);

				wires[wire] = number;
			}
		// signal is AND, OR, LSHIFT or RSHIFT
		} else {
			if (
				// number, number
				(!Number.isNaN(+signal[0]) && !Number.isNaN(+signal[2]))
				// OR number, defined
				|| (!Number.isNaN(+signal[0]) && wires[signal[2]] !== undefined)
				// OR defined, number
				|| (wires[signal[0]] !== undefined && !Number.isNaN(+signal[2]))
				// Or defined, defined
				|| (wires[signal[0]] !== undefined && wires[signal[2]] !== undefined)
			) {
				if (signal[1] === AND) {
					if (Number.isNaN(+signal[0])) {
						wires[wire] = wires[signal[0]] & wires[signal[2]];
					} else {
						wires[wire] = +signal[0] & wires[signal[2]];
					}
				} else if (signal[1] === OR) {
					wires[wire] = wires[signal[0]] | wires[signal[2]];
				} else if (signal[1] === LSHIFT) {
					wires[wire] = wires[signal[0]] << +signal[2];
				} else /* if (signal[1] === RSHIFT) */ {
					wires[wire] = wires[signal[0]] >> +signal[2];
				}
			}
		}
		// check if any wires are undefined
		let undefinedWires = [];
		for (let wire in wires) {
			if (wires[wire] === undefined) {
				undefinedWires.push(wire);
			}
		}
		if (undefinedWires.length === 0) {
			wiresAreUndefined = false;
		}
	});
}

console.log(wires.a);

