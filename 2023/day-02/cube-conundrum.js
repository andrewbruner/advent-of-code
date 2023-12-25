import input from './input.js';

// define games data structure
const games = input.split('\n').map(game => game.split(': ').map((x, idx) => {
	if (idx === 0) {
		return Number(x.slice(5));
	}
	if (idx === 1) {
		return x.split('; ').map(y => y.split(', ').map(z => z.split(' ').map((a, idx) => {
			if (idx === 0) {
				return Number(a);
			}
			if (idx === 1) {
				return a;
			}
		})));
	}
}));

// console.dir(games, { depth: null });

function partOne() {
	// find gamesPossible
	let gamesPossible = [];
	games.forEach(game => {
		let rounds = game[1];
		let gamePossible = true;
		rounds.forEach(round => {
			round.forEach(die => {
				let number = die[0];
				let color = die[1];
				if (color === 'red' && number > 12) {
					gamePossible = false;
				}
				if (color === 'green' && number > 13) {
					gamePossible = false;
				}
				if (color === 'blue' && number > 14) {
					gamePossible = false;
				}
			})
		});
		if (gamePossible) {
			gamesPossible.push(game);
		}
	});

	// find sum of all gamesPossible ids: gamesPossibleIdsSum
	let gamesPossibleIdsSum = 0;
	gamesPossible.forEach(game => {
		let id = game[0];
		gamesPossibleIdsSum += id;
	});

	console.log(gamesPossibleIdsSum);
}

partOne();

function partTwo() {}

partTwo();