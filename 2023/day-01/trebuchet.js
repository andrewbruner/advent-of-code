import input from './input.js';

// Map input string to calibration document 2D array of single-character strings
const calibrationDocument = input.split(`\n`).map(line => line.split(''));

// Map calibration document 2D array to calibration values array of 2-digit numbers
const calibrationValues = calibrationDocument.map(line => {
    // filter to only number-like strings
    let digits = line.filter(char => (+char).toString() !== 'NaN');
    // return concatenated first digit and last digit as two-digit number
    return +(digits[0] + digits[digits.length - 1]);
});
// Reduce calibration values to sum of all values
const calibrationValuesSum = calibrationValues.reduce((acc, curr) => acc + curr);

// Return calibration values sum
console.log(calibrationValuesSum);