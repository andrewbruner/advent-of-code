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

	// console.log(gamesPossibleIdsSum);
}

partOne();

function partTwo() {
	// console.dir(games, { depth:null });

	// find the minimumCubes of all games
	let minimumCubes = [];
	
	games.forEach(game => {
		let rounds = game[1];
		let minimumRed;
		let minimumGreen;
		let minimumBlue;

		rounds.forEach(round => {
			round.forEach(die => {
				let number = die[0];
				let color = die[1];

				if (color === 'red' && (number > minimumRed || minimumRed === undefined)) {
					minimumRed = number;
				}
				if (color === 'green' && (number > minimumGreen || minimumGreen === undefined)) {
					minimumGreen = number;
				}
				if (color === 'blue' && (number > minimumBlue || minimumBlue === undefined)) {
					minimumBlue = number;
				}
			});
		});

		minimumCubes.push([minimumRed, minimumGreen, minimumBlue]);
	});

	// console.dir(minimumCubes, { depth: null });

	// find the powers of each game's set of cubes
	let powers = [];

	minimumCubes.forEach(cubes => {
		let red = cubes[0];
		let green = cubes[1];
		let blue = cubes[2];
		let power = red * green * blue;

		powers.push(power);
	});

	// console.log(powers);

	// find the powersSum of all games' sets of cubes

	let powersSum = 0;

	powers.forEach(power => {
		powersSum += power;
	});

	console.log(powersSum);
}

partTwo();