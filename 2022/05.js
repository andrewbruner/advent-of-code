import input from './input/05.js';

function supplyStacks(input, part) {
	// split major sections of input data into supplies and procedure
	input = input.split('\n\n');
	// construct input object from input data
	input = { supplies: input[0], procedure: input[1] };
	// split supplies into stacks
	input.supplies = [
		['B','G','S','C'],
		['T','M','W','H','J','N','V','G'],
		['M','Q','S'],
		['B','S','L','T','W','N','M'],
		['J','Z','F','T','V','G','W','P'],
		['C','T','B','G','Q','H','S'],
		['T','J','P','B','W'],
		['G','D','C','Z','F','T','Q','M'],
		['N','S','H','B','P','F']
	];
	// split procedure into steps
	input.procedure = input.procedure.split('\n');
	// split steps into number array
	input.procedure = input.procedure.map(step => {
		step = step.split(' from ');
		step[0] = step[0].slice(5);
		step[1] = step[1].split(' to ');
		step = [step[0], ...step[1]];
		step = step.map(num => parseInt(num));
		step = step.map((num, idx) => idx > 0 ? num - 1 : num);
		return step;
	});
	// run procedure
	input.procedure.forEach(step => {
		let qty = step[0]
		let src = input.supplies[step[1]];
		let tgt = input.supplies[step[2]];

		if (part === 1) {
			for (let i = 0; i < qty; i++) {
				let crate = src.pop();
				tgt.push(crate);
			}
		} else {
			let crates = src.splice(-qty);
			tgt.push(...crates);
		}
	});
	// find top crate of each stack
	input.supplies = input.supplies.map(stack => stack.pop());
	// return answer
	let answer = '';
	input.supplies.forEach(crate => answer += crate);
	return answer;
}

console.log(supplyStacks(input, 2));