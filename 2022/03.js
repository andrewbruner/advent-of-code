import input from './input/03.js'

function rucksackReorganization(input, group = 1) {

	const types = {};
	for (let i = 0; i < 26; i++) {
		types[String.fromCharCode(i+97)] = { priority: i+1 };
	}
	for (let i = 0; i < 26; i++) {
		types[String.fromCharCode(i+97).toUpperCase()] = { priority: i+27 };
	}

	input = input.split(`\n`);

	if (group === 1) {
		input = input.map(el => [el.slice(0, el.length/2), el.slice(el.length/2)]);
		input = input.map(el => {
			let a = el[0];
			let b = el[1];
			for (let i = 0; i < a.length; i++) {
				if (b.includes(a[i])) {
					return a[i];
				}
			}
		});
	} else {

	// find common type within rucksacks of each group of 3
		let groups = [];
		for (let i = 0; i < input.length; i+=3) {
			groups.push([input[i], input[i+1], input[i+2]]);
		}
		input = groups;
		input = input.map(el => {
			let a = el[0];
			let b = el[1];
			let c = el[2];
			for (let i = 0; i < a.length; i++) {
				if (b.includes(a[i])) {
					if (c.includes(a[i])) {
						return a[i];
					}
				}
			}
		});
	}
	// find priorities of each common type
	input = input.map(el => types[el].priority)
	// find sum of each type's priority
	input = input.reduce((acc, curr) => acc + curr, 0);

	return input;
}

console.log(rucksackReorganization(input, 3));