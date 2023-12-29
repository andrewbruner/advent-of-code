import input from './input.js';

const cards = input.split('\n').map(card => card.split(': ')
	.map((x, i) => i == 0 ? x.split(/\s+/)[1] : x.split(' | ').map(y => y.split(/\s+/))));

// console.dir(cards, { depth: null });

function partOne() {
	let winningCardValues = [];
	let totalCardValues = 0;

	cards.forEach(card => {
		let winningNumbers = card[1][0];
		let cardNumbers = card[1][1];
		let totalMatches = 0;
		let totalValue = 0;

		winningNumbers.forEach(winningNumber => {
			if (cardNumbers.includes(winningNumber)) {
				totalMatches++;
			}
		});
		for (let i = 0; i < totalMatches; i++) {
			if (i == 0) {
				totalValue = 1;
			} else {
				totalValue = totalValue * 2;
			}
		}
		winningCardValues.push(totalValue);
	});
	winningCardValues.forEach(value => totalCardValues += value);
	console.log(totalCardValues);
}

partOne();