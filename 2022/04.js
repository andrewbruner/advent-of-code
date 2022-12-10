import input from './input/04.js';

function campCleanup(input, option = false) {
	// split input into array of range pairings
	input = input.split('\n');
	// split each pairing into array of two ranges
	input = input.map(pair => pair.split(','));
	// split each range into array of range limits
	input = input.map(pair => pair.map(range => range.split('-')));
	// convert each range limit string into an integer
	input = input.map(pair => pair.map(range => range.map(limit => parseInt(limit))));
	// splice missing IDs into each range array
	input = input.map(pair => pair.map(range => {
		let newRange = [];
		for (let i = range[0]; i <= range[1]; i++) {
			newRange.push(i);
		}
		return newRange;
	}));
	if (option) {
		// map to 0 or 1 if range in pair is overlaps with other range
		input = input.map(pair => pair[0].every(id => pair[1].includes(id)) || pair[1].some(id => pair[0].includes(id)) ? 1 : 0);
	} else {
		// map to 0 or 1 if range in pair is fully contained within other range
		input = input.map(pair => pair[0].every(id => pair[1].includes(id)) || pair[1].every(id => pair[0].includes(id)) ? 1 : 0);
	}
		// reduce input to sum of contained ranges
	input = input.reduce((acc, curr) => acc + curr);
	return input;
}

console.log(campCleanup(input, true));