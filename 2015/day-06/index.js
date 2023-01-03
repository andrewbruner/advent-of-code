import Input from './input.js';

(function() {
const grid = { };
for (let x = 0; x < 1000; x++) {
	grid[x] = { };
	for (let y = 0; y < 1000; y++) {
		grid[x][y] = false;
	}
}

let input = Input.split('\n')
	.map(line => {
		line = line.split(' ');
		if (line[0] === 'turn') {
			return {
				command: line[1],
				coordinates: [
					{
						x: +line[2].split(',')[0],
						y: +line[2].split(',')[1],
					},
					{
						x: +line[4].split(',')[0],
						y: +line[4].split(',')[1],
					},
				],
			};
		} else {
			return {
				command: line[0],
				coordinates: [
					{
						x: +line[1].split(',')[0],
						y: +line[1].split(',')[1],
					},
					{
						x: +line[3].split(',')[0],
						y: +line[3].split(',')[1],
					},
				],
			};
		}
	});

input.forEach(line => {
	if (line.command === 'on') {
		for (let x = line.coordinates[0].x; x < line.coordinates[1].x + 1; x++) {
	 		for (let y = line.coordinates[0].y; y < line.coordinates[1].y + 1; y++) {
	 			grid[x][y] = true;
	 		}
	 	}
	} else if (line.command === 'off') {
		for (let x = line.coordinates[0].x; x < line.coordinates[1].x + 1; x++) {
			for (let y = line.coordinates[0].y; y < line.coordinates[1].y + 1; y++) {
				grid[x][y] = false;
			}
		}
	} else {
		for (let x = line.coordinates[0].x; x < line.coordinates[1].x + 1; x++) {
			for (let y = line.coordinates[0].y; y < line.coordinates[1].y + 1; y++) {
				grid[x][y] = grid[x][y] ? false : true;
			}
		}
	}
});

let numberOfLitLights = 0;
for (let x in grid) {
	for (let y in grid[x]) {
		if (grid[x][y]) {
			numberOfLitLights++;
		}
	}
}
console.log(numberOfLitLights);
})();

(function() {
	const grid = { };
	for (let x = 0; x < 1000; x++) {
		grid[x] = { };
		for (let y = 0; y < 1000; y++) {
			grid[x][y] = 0;
		}
	}
	
	let input = Input.split('\n')
		.map(line => {
			line = line.split(' ');
			if (line[0] === 'turn') {
				return {
					command: line[1],
					coordinates: [
						{
							x: +line[2].split(',')[0],
							y: +line[2].split(',')[1],
						},
						{
							x: +line[4].split(',')[0],
							y: +line[4].split(',')[1],
						},
					],
				};
			} else {
				return {
					command: line[0],
					coordinates: [
						{
							x: +line[1].split(',')[0],
							y: +line[1].split(',')[1],
						},
						{
							x: +line[3].split(',')[0],
							y: +line[3].split(',')[1],
						},
					],
				};
			}
		});
	
	input.forEach(line => {
		if (line.command === 'on') {
			for (let x = line.coordinates[0].x; x < line.coordinates[1].x + 1; x++) {
				 for (let y = line.coordinates[0].y; y < line.coordinates[1].y + 1; y++) {
					 grid[x][y]++;
				 }
			 }
		} else if (line.command === 'off') {
			for (let x = line.coordinates[0].x; x < line.coordinates[1].x + 1; x++) {
				for (let y = line.coordinates[0].y; y < line.coordinates[1].y + 1; y++) {
					if (grid[x][y] !== 0) {
						grid[x][y]--;
					}
				}
			}
		} else {
			for (let x = line.coordinates[0].x; x < line.coordinates[1].x + 1; x++) {
				for (let y = line.coordinates[0].y; y < line.coordinates[1].y + 1; y++) {
					grid[x][y] += 2;
				}
			}
		}
	});
	
	let totalBrightness = 0;
	for (let x in grid) {
		for (let y in grid[x]) {
			totalBrightness += grid[x][y];
		}
	}
	console.log(totalBrightness);
	})();
// not 14747699