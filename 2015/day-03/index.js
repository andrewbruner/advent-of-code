import input from './input.js';

function dayThree(input) {
	input = input.split('');
	
	let soloCoords = [ 0, 0, ];
	let realCoords = [ 0, 0, ];
	let roboCoords = [ 0, 0, ];
	let turn = 0; // 0 === real; 1 === robo;
	let grid1 = { 0: { 0: 1 }, };
	let grid2 = { 0: { 0: 2 }, };

	input.forEach(v => {
		// solo
		if (v === '^') {
			soloCoords[1]++;
		} else if (v === '>') {
			soloCoords[0]++;
		} else if (v === 'v') {
			soloCoords[1]--;
		} else {
			soloCoords[0]--;
		}
		if (grid1[soloCoords[0]] !== undefined) {
			grid1[soloCoords[0]][soloCoords[1]]++;
		} else {
			grid1[soloCoords[0]] = { [soloCoords[1]]: 1 };
		}

		// real
		if (turn === 0) {
			if (v === '^') {
				realCoords[1]++;
			} else if (v === '>') {
				realCoords[0]++;
			} else if (v === 'v') {
				realCoords[1]--;
			} else {
				realCoords[0]--;
			}
			if (grid2[realCoords[0]] !== undefined) {
				grid2[realCoords[0]][realCoords[1]]++;
			} else {
				grid2[realCoords[0]] = { [realCoords[1]]: 1 };
			}
			turn++
		}
		// robo
		else {
			if (v === '^') {
				roboCoords[1]++;
			} else if (v === '>') {
				roboCoords[0]++;
			} else if (v === 'v') {
				roboCoords[1]--;
			} else {
				roboCoords[0]--;
			}
			if (grid2[roboCoords[0]] !== undefined) {
				grid2[roboCoords[0]][roboCoords[1]]++;
			} else {
				grid2[roboCoords[0]] = { [roboCoords[1]]: 1 };
			}
			turn--;
		}
	});

	// solo
	let solo = 0;
	for (let row in grid1) {
		for (let house in grid1[row]) {
			solo++;
		}
	}

	// duo
	let duo = 0;
	for (let row in grid2) {
		for (let house in grid2[row]) {
			duo++;
		}
	}

	const houses = { solo, duo, };
	return houses;
}

console.log(dayThree(input));
