import input from '01-input.js';

/**
 * Used Functions/Methods
 * 
 * parseInt()
 * Array.prototype.at()
 * Array.prototype.map()
 * Array.prototype.reduce()
 * Array.prototype.sort()
 * Array.prototype.split()
 * console.log()
 */

/* --- Part One --- */

// Split input into a 2D array
input = input
	.split(`\n\n`)
	.map(element => element
		.split(`\n`)
		.map(element => parseInt(element)));

// Sort the sums of each inner array's values
input = input
	.map(element => element
		.reduce((accumulator, currentValue) => accumulator + currentValue))
	.sort((a, b) => a - b);

// Find the last (largest) value of the input array
let answer = input.at(-1);
console.log(answer);

/* --- Part Two --- */

// Find the sum of the last 3 (largest) values of the input array
answer = [input.at(-1), input.at(-2), input.at(-3)].reduce((accumulator, currentValue) => accumulator + currentValue);
console.log(answer);
