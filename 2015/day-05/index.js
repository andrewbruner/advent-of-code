import input from './input.js';

function findNumberOfNiceStrings(input) {
	input = input.split('\n');
	let numberOfNiceStrings = 0
	input.forEach(string => {
		const naughtyStrings = [ 'ab', 'cd', 'pq', 'xy', ];
		let isNaughty = false;
		const vowels = 'aeiou';
		let numberOfVowels = 0;
		let hasDouble = false;
		naughtyStrings.forEach(naughtyString => {
			if (string.includes(naughtyString)) {
				isNaughty = true;
			}
		});
		for (let i = 0; i < string.length; i++) {
			if (vowels.includes(string[i])) {
				numberOfVowels++
			}
			if (string[i] === string[i - 1]) {
				hasDouble = true;
			}
		}
		const isNice = numberOfVowels >= 3 && hasDouble;
		if (isNice && !isNaughty) {
			numberOfNiceStrings++;
		}
	});
	return numberOfNiceStrings;
}

function findNumberOfNiceStrings2(input) {
	input = input.split('\n');
	let numberOfNiceStrings = 0
	input.forEach(string => {
		let rule1 = false;
		let rule2 = false;
		for (let i = 0; i < string.length; i++) {
			const pair = `${string[i]}${string[i+1]}`;
			const substring = string.slice(i+2);
			if (substring.includes(pair)) {
				rule1 = true;
			}
			if (string[i] === string[i+2]) {
				rule2 = true;
			}
		}
		if (rule1 && rule2) {
			numberOfNiceStrings++;
		}
	});
	return numberOfNiceStrings;
}

console.log(findNumberOfNiceStrings(input));
console.log(findNumberOfNiceStrings2(input));
