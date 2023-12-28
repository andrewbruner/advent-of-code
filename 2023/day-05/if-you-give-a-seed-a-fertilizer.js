import input from './input.js';

// Almanac Array
let _almanac = input.split('\n\n')
	.map((x,xi) => xi
		? x.split(':\n')
			.map((a,ai) => ai
				? a.split('\n')
					.map(b => b.split(' ')
						.map(c => +c))
				: a.split(' ')[0])
		: x.split(': ')
			.map((y,yi) => yi
				? y.split(' ')
					.map(z => +z)
				: y));
_almanac = [_almanac.shift(), ['maps', _almanac]];

// console.dir(_almanac, { depth: null });

// Almanac Object
let _seeds = _almanac[0][1];
let _maps = {};
_almanac[1][1].forEach(x => _maps[x[0].split('-')
	.map((y,i) => i
		? `${y.charAt(0).toUpperCase()}${y.slice(1)}`
		: y).join('')]
			= x[1]
				.map(z => z
					.reduce((acc,curr,i) => i < 1
						? { ...acc, desinationRangeStart: curr }
						: i < 2
							? { ...acc, sourceRangeStart: curr }
							: { ...acc, rangeLength: curr }, {})));
let almanac = {
	seeds: _seeds,
	maps: _maps
};

// console.dir(almanac, { depth: null });

// Conversion Array
const conversions = almanac.seeds.map(seed => {
	let conversion = { seed };
	for (let map in almanac.maps) {
		let [source, destination] = map.split('To');
		destination = `${destination.charAt(0).toLowerCase()}${destination.slice(1)}`;
		conversion[destination] = almanac.maps[map].filter(entry => entry.sourceRangeStart <= conversion[source] && entry.sourceRangeStart+entry.rangeLength-1 >= conversion[source])
			.map(entry => entry.desinationRangeStart+conversion[source]-entry.sourceRangeStart)[0]
				|| conversion[source];
	}
	return conversion;
});

// console.dir(conversions);

// Lowest Location Number
let closestLocation = conversions.reduce((acc, curr) => curr.location < acc.location ? curr : acc).location;
console.log(closestLocation);
