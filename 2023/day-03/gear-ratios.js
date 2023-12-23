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

console.log(sum);
