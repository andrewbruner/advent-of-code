let input = `Monkey 0:
Starting items: 79, 98
Operation: new = old * 19
Test: divisible by 23
	If true: throw to monkey 2
	If false: throw to monkey 3

Monkey 1:
Starting items: 54, 65, 75, 74
Operation: new = old + 6
Test: divisible by 19
	If true: throw to monkey 2
	If false: throw to monkey 0

Monkey 2:
Starting items: 79, 60, 97
Operation: new = old * old
Test: divisible by 13
	If true: throw to monkey 1
	If false: throw to monkey 3

Monkey 3:
Starting items: 74
Operation: new = old + 3
Test: divisible by 17
	If true: throw to monkey 0
	If false: throw to monkey 1`;

input = input.split('\n\n')
	.map(monkey => monkey.split('\n'))
	.map(monkey => {
		let items = monkey[1].split(':')
			[1].split(', ')
			.map(v => +v);
			
		return {
			items,
			operation: monkey[2],
			test: monkey[3],
			true: monkey[4],
			false: monkey[5],
		}
	});

console.dir(input);

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

let monkeyBusiness = max * nextMax;
console.log(monkeyBusiness);