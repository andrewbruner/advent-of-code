export default function(func, isPartOne) {
	const partOneTests = [
		{ name: 'test01', input: `(())`, target: 0, },
		{ name: 'test02', input: `()()`, target: 0, },
		{ name: 'test03', input: `(((`, target: 3, },
		{ name: 'test04', input: `(()(()(`, target: 3, },
		{ name: 'test05', input: `))(((((`, target: 3, },
		{ name: 'test06', input: `())`, target: -1, },
		{ name: 'test07', input: `))(`, target: -1, },
		{ name: 'test08', input: `)))`, target: -3, },
		{ name: 'test09', input: `)())())`, target: -3, },
	];

	const partTwoTests = [
		{ name: 'test01', input: `)`, target: 1, },
		{ name: 'test02', input: `()())`, target: 5, },
	];

	function run(tests, isPartOne) {
		for (let i = 0; i < tests.length; i++) {
			const { name, input, target, } = tests[i];
			const result = func(input, isPartOne);
			if (result !== target) {
				console.error(`${name} failed: input ${input} expected to return ${target} but returned ${result}`);
			} else {
				console.log(`${name} passed`)
			}
		}
	}

	if (isPartOne) {
		run(partOneTests);
	} else {
		run(partTwoTests, false);
	}
};
