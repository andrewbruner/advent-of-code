import input from './input.js';

let calibrationDocument = input.split(`\n`).map(line => line.split(''));
const stringNumbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

let calibrationValues = [];
let calibrationValuesSum = 0;

calibrationDocument.forEach((row, idx) => {
	row.forEach(char => {
		if (stringNumbers.includes(char) && calibrationValues[idx] === undefined) {
			calibrationValues = [...calibrationValues, char];
		}
	});
	row.slice().reverse().forEach(char => {
		if (stringNumbers.includes(char) && calibrationValues[idx].length === 1) {
			calibrationValues[idx] += char;
		}
	});
});

// console.log(calibrationValues)

calibrationValuesSum = calibrationValues.reduce((acc, curr) => +acc + +curr);

// console.log(calibrationValuesSum);

function partTwo() {
	const wordNumbers = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];

	// find firstDigits: string[]
	let firstDigits = [];
	calibrationDocument.forEach(row => {
		let firstDigitIsFound = false;
		row.forEach((char, idx) => {
			// only look if firstDigit is not already found
			if (firstDigitIsFound === false) {
				// if number is found
				if (Number(char) >= 0) {
					firstDigits.push(char);
					firstDigitIsFound = true;
				}
				// if 'one' is found
				if (char === 'o' && row[idx+1] === 'n' && row[idx+2] === 'e') {
					firstDigits.push('1');
					firstDigitIsFound = true;
				}
				// if 'two' is found
				if (char === 't' && row[idx+1] === 'w' && row[idx+2] === 'o') {
					firstDigits.push('2');
					firstDigitIsFound = true;
				}
				// if 'three' is found
				if (char === 't' && row[idx+1] === 'h' && row[idx+2] === 'r' && row[idx+3] === 'e' && row[idx+4] === 'e') {
                    firstDigits.push('3');
                    firstDigitIsFound = true;
                }
				// if 'four' is found
				if (char === 'f' && row[idx+1] === 'o' && row[idx+2] === 'u' && row[idx+3] === 'r') {
                    firstDigits.push('4');
                    firstDigitIsFound = true;
                }
				// if 'five' is found
				if (char === 'f' && row[idx+1] === 'i' && row[idx+2] === 'v' && row[idx+3] === 'e') {
                    firstDigits.push('5');
                    firstDigitIsFound = true;
                }
				// if 'six' is found
				if (char === 's' && row[idx+1] === 'i' && row[idx+2] === 'x') {
                    firstDigits.push('6');
                    firstDigitIsFound = true;
                }
				// if 'seven' is found
				if (char === 's' && row[idx+1] === 'e' && row[idx+2] === 'v' && row[idx+3] === 'e' && row[idx+4] === 'n') {
                    firstDigits.push('7');
                    firstDigitIsFound = true;
                }
				// if 'eight' is found
				if (char === 'e' && row[idx+1] === 'i' && row[idx+2] === 'g' && row[idx+3] === 'h' && row[idx+4] === 't') {
                    firstDigits.push('8');
                    firstDigitIsFound = true;
                }
				// if 'nine' is found
				if (char === 'n' && row[idx+1] === 'i' && row[idx+2] === 'n' && row[idx+3] === 'e') {
                    firstDigits.push('9');
                    firstDigitIsFound = true;
                }
			}
		});
	});

	// find lastDigits: string[]
	let lastDigits = [];
	calibrationDocument.forEach(row => {
		row = row.slice().reverse();
		let lastDigitIsFound = false;
		row.forEach((char, idx) => {
			// only look if firstDigit is not already found
			if (lastDigitIsFound === false) {
				// if number is found
				if (Number(char) >= 0) {
					lastDigits.push(char);
					lastDigitIsFound = true;
				}
				// if 'one' is found
				if (char === 'e' && row[idx+1] === 'n' && row[idx+2] === 'o') {
					lastDigits.push('1');
					lastDigitIsFound = true;
				}
				// if 'two' is found
				if (char === 'o' && row[idx+1] === 'w' && row[idx+2] === 't') {
					lastDigits.push('2');
					lastDigitIsFound = true;
				}
				// if 'three' is found
				if (char === 'e' && row[idx+1] === 'e' && row[idx+2] === 'r' && row[idx+3] === 'h' && row[idx+4] === 't') {
                    lastDigits.push('3');
                    lastDigitIsFound = true;
                }
				// if 'four' is found
				if (char === 'r' && row[idx+1] === 'u' && row[idx+2] === 'o' && row[idx+3] === 'f') {
                    lastDigits.push('4');
                    lastDigitIsFound = true;
                }
				// if 'five' is found
				if (char === 'e' && row[idx+1] === 'v' && row[idx+2] === 'i' && row[idx+3] === 'f') {
                    lastDigits.push('5');
                    lastDigitIsFound = true;
                }
				// if 'six' is found
				if (char === 'x' && row[idx+1] === 'i' && row[idx+2] === 's') {
                    lastDigits.push('6');
                    lastDigitIsFound = true;
                }
				// if 'seven' is found
				if (char === 'n' && row[idx+1] === 'e' && row[idx+2] === 'v' && row[idx+3] === 'e' && row[idx+4] === 's') {
                    lastDigits.push('7');
                    lastDigitIsFound = true;
                }
				// if 'eight' is found
				if (char === 't' && row[idx+1] === 'h' && row[idx+2] === 'g' && row[idx+3] === 'i' && row[idx+4] === 'e') {
                    lastDigits.push('8');
                    lastDigitIsFound = true;
                }
				// if 'nine' is found
				if (char === 'e' && row[idx+1] === 'n' && row[idx+2] === 'i' && row[idx+3] === 'n') {
                    lastDigits.push('9');
                    lastDigitIsFound = true;
                }
			}
		});
	});

	// calibrationValues: number[] = [Number(firstDigit + lastDigit), ...]
	let calibrationValues = [];
	for (let i = 0; i < firstDigits.length; i++) {
		let calibrationValue = Number(firstDigits[i] + lastDigits[i]);
		calibrationValues.push(calibrationValue);
	}

	// calibrationValuesSum: number = calibrationValues.reduce((acc, curr) => acc + curr)
	let calibrationValuesSum = 0;
	calibrationValuesSum = calibrationValues.reduce((acc, curr) => acc + curr);
	console.log(calibrationValuesSum);
}

partTwo();