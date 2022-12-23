let monkeys = [
	{
		items: [ 79, 98, ],
		operation(old) { return Math.floor((old * 19) / 3) },
		test(item) { return !(item % 23) ? 2 : 3 },
	},
	{
		items: [ 54, 65, 75, 74, ],
		operation(old) { return Math.floor((old + 6) / 3) },
		test(item) { return !(item % 19) ? 2 : 0 },
	},
	{
		items: [ 79, 60, 97, ],
		operation(old) { return Math.floor((old * old) / 3) },
		test(item) { return !(item % 13) ? 1 : 3 },
	},
	{
		items: [ 74, ],
		operation(old) { return Math.floor((old + 3) / 3) },
		test(item) { return !(item % 17) ? 0 : 1 },
	},
];

let inspections = [ ];
monkeys.forEach(monkey => inspections.push(0));

for (let i = 0; i < 20; i++) {
	monkeys.forEach((monkey, idx) => {
		inspections[idx] += monkey.items.length;
		while (monkey.items.length) {
			let item = monkey.items[0];
			item = monkey.operation(item);
			let test = monkey.test(item);
			monkey.items.shift();
			monkeys[test].items.push(item);
		};
	});
}

let max = 0;
let nextMax = 0;
inspections.forEach(num => {
	if (num >= max) {
		nextMax = max;
		max = num;
	} else if (num > nextMax) {
		nextMax = num;
	}
});

console.log(inspections);
console.log(max, nextMax);
let monkeyBusiness = max * nextMax;
console.log(monkeyBusiness);