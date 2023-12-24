import input from './input.js';
let schematic = {};
let partNumbers = {};
let sum = 0;

input.split('\n').map(row => row.split(''))
	.forEach((row, y) => row.forEach((char, x) => char !== '.'
		? char >= 0
			? !(row[x-1] >= 0) 
				? schematic[`${x}-${y}`] = { id: `${x}-${y}`, type: 'number', mainCoords: [x,y], subCoords: [[x,y]], value: char }
				: (
					schematic[`${x}-${y}`] = schematic[`${x-1}-${y}`],
					schematic[`${x}-${y}`].subCoords = [...schematic[`${x}-${y}`].subCoords, [x,y]],
					schematic[`${x}-${y}`].value = schematic[`${x}-${y}`].value + char
				)
			: schematic[`${x}-${y}`] = { id: `${x}-${y}`, type: 'symbol', mainCoords: [x,y], subCoords: [[x,y]], value: char }
		: null));

// console.dir(schematic, { depth: null });

for (let _id in schematic) {
	let _x = _id.split('-')[0];
	let _y = _id.split('-')[1];
	schematic[_id].type === 'number'
		? schematic[`${_x}-${+_y-1}`]?.type === 'symbol'
				|| schematic[`${+_x+1}-${+_y-1}`]?.type === 'symbol'
				|| schematic[`${+_x+1}-${_y}`]?.type === 'symbol'
				|| schematic[`${+_x+1}-${+_y+1}`]?.type === 'symbol'
				|| schematic[`${_x}-${+_y+1}`]?.type === 'symbol'
				|| schematic[`${+_x-1}-${+_y+1}`]?.type === 'symbol'
				|| schematic[`${+_x-1}-${_y}`]?.type === 'symbol'
				|| schematic[`${+_x-1}-${+_y-1}`]?.type === 'symbol'
			? (partNumbers = partNumbers[schematic[_id].id] ? partNumbers : { ...partNumbers, [schematic[_id].id]: schematic[_id] })
			: null
		: null;
}

// console.dir(partNumbers, { depth: null });

for (let number in partNumbers) {
	sum = sum + +partNumbers[number].value;
}

// console.log(sum);

let gears = [];
let gearRatios = [];
let gearRatioSum = 0;

for (let _id in schematic) {
	let gear = schematic[_id];
	if (gear.type === 'symbol') {
		let [gearX, gearY] = gear.mainCoords;		
		let top = schematic[`${gearX}-${gearY-1}`];
		let topRight = schematic[`${gearX+1}-${gearY-1}`];
		let right = schematic[`${gearX+1}-${gearY}`];
		let bottomRight = schematic[`${gearX+1}-${gearY+1}`];
		let bottom = schematic[`${gearX}-${gearY+1}`];
		let bottomLeft = schematic[`${gearX-1}-${gearY+1}`];
		let left = schematic[`${gearX-1}-${gearY}`];
		let topLeft = schematic[`${gearX-1}-${gearY-1}`];
		let adjacentPartNumbers = [];
		let uniquePartNumberIds = [];

		if (top?.type === 'number') {
			adjacentPartNumbers = [...adjacentPartNumbers, top];
		}
		if (topRight?.type === 'number') {
			adjacentPartNumbers = [...adjacentPartNumbers, topRight];
		}
		if (right?.type === 'number') {
			adjacentPartNumbers = [...adjacentPartNumbers, right];
		}
		if (bottomRight?.type === 'number') {
			adjacentPartNumbers = [...adjacentPartNumbers, bottomRight];
		}
		if (bottom?.type === 'number') {
			adjacentPartNumbers = [...adjacentPartNumbers, bottom];
		}
		if (bottomLeft?.type === 'number') {
			adjacentPartNumbers = [...adjacentPartNumbers, bottomLeft];
		}
		if (left?.type === 'number') {
			adjacentPartNumbers = [...adjacentPartNumbers, left];
		}
		if (topLeft?.type === 'number') {
			adjacentPartNumbers = [...adjacentPartNumbers, topLeft];
		}
		adjacentPartNumbers.forEach(partNumber => {
			if (!uniquePartNumberIds.includes(partNumber.id)) {
				uniquePartNumberIds = [...uniquePartNumberIds, partNumber.id];
			}
		});
		if (uniquePartNumberIds.length === 2) {
			gears = [...gears, { gear, uniquePartNumberIds }];
		}
	}
}

// console.dir(gears, { depth: null });

gears.forEach(gear => {
	let partValues = [schematic[gear.uniquePartNumberIds[0]].value, schematic[gear.uniquePartNumberIds[1]].value];
	let gearRatio = partValues[0] * partValues[1];
	gearRatios = [...gearRatios, gearRatio];
});

// console.log(gearRatios);

gearRatioSum = gearRatios.reduce((acc, curr) => acc + curr);

console.log(gearRatioSum);