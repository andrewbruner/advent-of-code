import input from './02-input.mjs';

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
// X = Rock
// Y = Paper
// Z = Scissors

let tournament = input.split(`\n`)
tournament = tournament.map(round => round.split(' '));
let scores = tournament.map(round => {
	let opponent = round[0];
	let response = round[1];
	let shape;
	let outcome;
	if (opponent === 'A') {
		if (response === 'X') {
			shape = 1;
			outcome = 3;
		} else if (response === 'Y') {
			shape = 2;
			outcome = 6;
		} else if (response === 'Z') {
			shape = 3;
			outcome = 0;
		}
	} else if (opponent === 'B') {
		if (response === 'X') {
			shape = 1;
			outcome = 0;
		} else if (response === 'Y') {
			shape = 2;
			outcome = 3;
		} else if (response === 'Z') {
			shape = 3;
			outcome = 6;
		}
	} else if (opponent === 'C') {
		if (response === 'X') {
			shape = 1;
			outcome = 6;
		} else if (response === 'Y') {
			shape = 2;
			outcome = 0;
		} else if (response === 'Z') {
			shape = 3;
			outcome = 3;
		}
	}
	return shape + outcome;
});
let totalScore = scores.reduce((total, score) => total + score);
console.log(totalScore);

/* --- Part Two --- */
// X = Lose
// Y = Draw
// Z = Win

tournament = input.split(`\n`)
tournament = tournament.map(round => round.split(' '));
scores = tournament.map(round => {
	let opponent = round[0];
	let response = round[1];
	let shape;
	let outcome;
	if (opponent === 'A') {						// Rock
		if (response === 'X') {					// Lose w/ Scissors
			shape = 3;
			outcome = 0;
		} else if (response === 'Y') {	// Draw w/ Rock
			shape = 1;
			outcome = 3;
		} else if (response === 'Z') {	// Win w/ Paper
			shape = 2;
			outcome = 6;
		}
	} else if (opponent === 'B') {		// Paper
		if (response === 'X') {					// Lose w/ Rock
			shape = 1;
			outcome = 0;
		} else if (response === 'Y') {	// Draw w/ Paper
			shape = 2;
			outcome = 3;
		} else if (response === 'Z') {	// Win w/ Scissors
			shape = 3;
			outcome = 6;
		}
	} else if (opponent === 'C') {		// Scissors
		if (response === 'X') {					// Lose w/ Paper
			shape = 2;
			outcome = 0;
		} else if (response === 'Y') {	// Draw w/ Scissors
			shape = 3;
			outcome = 3;
		} else if (response === 'Z') {	// Win w/ Rock
			shape = 1;
			outcome = 6;
		}
	}
	return shape + outcome;
});
totalScore = scores.reduce((total, score) => total + score);
console.log(totalScore);