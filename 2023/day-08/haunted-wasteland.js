import input from './input.js';
// import { test1 as input } from './test.js';
// import { test2 as input } from './test.js';

// console.log(input);

// Define map array
const _map = input.split('\n\n')
	.map((x,i) => i
		? x.split('\n')
			.map(y => y.split(' = ')
				.map((z,i) => i
					? z.split(', ')
						.map((a,i) => i
							? a.slice(0,3)
							: a.slice(1)
						)
					: z
				)
			)
		: x.split('')
	);


// console.dir(_map, { depth: null });

// Define map object
let vectors = _map[0];
let nodes = {};
_map[1].map(x => {
	let id = x[0];
	let L = x[1][0];
	let R = x[1][1];
	nodes[id] = { L, R };
});

const map = { vectors, nodes };

// console.dir(map);

// Find number of steps
let loc = 'AAA';
let i = 0;
let sum = 0;
while (loc != 'ZZZ') {
	let vector = map.vectors[i];
	loc = map.nodes[loc][vector];
	sum++;
	i = i < map.vectors.length-1 ? i+1: 0;
}

console.log(sum);