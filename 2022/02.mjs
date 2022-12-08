import input from './02-input.mjs';

/**
 * Returns the total score from a Rock-Paper-Scissors encrypted strategy guide
 * @param {string} input - Raw input string of the strategy guide
 * @param {boolean} [key=false] - Whether you have the key to the strategy guide
 * @returns {number} - Total score after following the strategy guide
 */
function getTotalScore(input, key = false) {
	const [A,B,X,Y] = ['A','B','X','Y'];
	return input.split(`\n`).map(el => el.split(' ')).map(el => {
		let [i,j] = [el[0],el[1]];
		return i == A ? j == X ? key ? 3 : 4 : j == Y ? key ? 4 : 8 : key ? 8 : 3
			: i == B ? j == X ? 1 : j == Y ? 5 : 9
			: j == X ? key ? 2 : 7 : j == Y ? key ? 6 : 2 : key ? 7 : 6;
	}).reduce((acc, curr) => acc + curr);
}

console.log(getTotalScore(input));
console.log(getTotalScore(input, true));
