import input from './input.js';
// import input from './test.js';

// console.log(input);

// Define hands array
let hands = input.split(/\n/)
	.map(hand => {
		let [cards, bid] = hand.split(/\s/);
		return { cards, bid };
	});

// console.log(hands);

// Define types
hands = hands.map(hand => {
	// Define a sorted copy of cards string
	const cards = hand.cards.split('').slice().sort().join('');
	
	// Define each type
	if (/(.)\1{4}/.test(cards)) {
		return { ...hand, type: 'fiveOfAKind' };
	} else if (/(.)\1{3}/.test(cards)) {
		return { ...hand, type: 'fourOfAKind' };
	} else if (/(.)\1{2}(.)\2|(.)\3(.)\4{2}/.test(cards)) {
		return { ...hand, type: 'fullHouse' };
	} else if (/(.)\1{2}/.test(cards)) {
		return { ...hand, type: 'threeOfAKind' };
	} else if (/(.)\1(.)\2|(.)\3.(.)\4/.test(cards)) {
		return { ...hand, type: 'twoPair' };
	} else if (/(.)\1/.test(cards)) {
		return { ...hand, type: 'onePair' };
	} else {
		return { ...hand, type: 'highCard' };
	}
});

// Define strengths (mutates array order)
hands = hands.sort((a,b) => {
	const typeStrengths = { fiveOfAKind: 7, fourOfAKind: 6, fullHouse: 5, threeOfAKind: 4, twoPair: 3, onePair: 2, highCard: 1 };
	const cardStrengths = { A: 13, K: 12, Q: 11, J: 10, T: 9, [9]: 8, [8]: 7, [7]: 6, [6]: 5, [5]: 4, [4]: 3, [3]: 2, [2]: 1 };
	const typeStrength = typeStrengths[a.type] - typeStrengths[b.type];
	if (typeStrength === 0) {
		for (let i = 0; i < 5; i++) {
			const cardStrength = cardStrengths[a.cards.charAt(i)] - cardStrengths[b.cards.charAt(i)];
			if (cardStrength !== 0) {
				return cardStrength;
			}
		}
	} else {
		return typeStrength;
	}
}).map((hand,i) => ({...hand, rank: i+1 }));

// console.dir(hands, { depth: null });

// Define winnings
hands = hands.map(hand => {
	const winning = hand.bid * hand.rank;
	return { ...hand, winning };
});

// console.log(hands);

// Define total winnings
const totalWinnings = hands.reduce((acc,curr) => acc + curr.winning, 0);

console.log(totalWinnings);
