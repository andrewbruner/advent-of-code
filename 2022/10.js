// clock circuit
	// tick/cycle
// cpu
	// register: x, val 1
	// inst1: addx V 2cycles x += V
	// inst2: noop 1cycle
// signal strength: cycleNum * x @ 20 += 40...

import Input from './input/10.js';

let input = `addx 15
addx -11
addx 6
addx -3
addx 5
addx -1
addx -8
addx 13
addx 4
noop
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx 5
addx -1
addx -35
addx 1
addx 24
addx -19
addx 1
addx 16
addx -11
noop
noop
addx 21
addx -15
noop
noop
addx -3
addx 9
addx 1
addx -3
addx 8
addx 1
addx 5
noop
noop
noop
noop
noop
addx -36
noop
addx 1
addx 7
noop
noop
noop
addx 2
addx 6
noop
noop
noop
noop
noop
addx 1
noop
noop
addx 7
addx 1
noop
addx -13
addx 13
addx 7
noop
addx 1
addx -33
noop
noop
noop
addx 2
noop
noop
noop
addx 8
noop
addx -1
addx 2
addx 1
noop
addx 17
addx -9
addx 1
addx 1
addx -3
addx 11
noop
noop
addx 1
noop
addx 1
noop
noop
addx -13
addx -19
addx 1
addx 3
addx 26
addx -30
addx 12
addx -1
addx 3
addx 1
noop
noop
noop
addx -9
addx 18
addx 1
addx 2
noop
noop
addx 9
noop
noop
noop
addx -1
addx 2
addx -37
addx 1
addx 3
noop
addx 15
addx -21
addx 22
addx -6
addx 1
noop
addx 2
addx 1
noop
addx -10
noop
noop
addx 20
addx 1
addx 2
addx 2
addx -6
addx -11
noop
noop
noop`;

let cmds = Input.split('\n')
	.map(cmd => cmd === 'noop' ? [cmd] : cmd.split(' '))
	.map(cmd => cmd[0] === 'noop' ? { cmd: cmd[0] } : { cmd: cmd[0], arg: +cmd[1] });

console.group('COMMAND LOG');
console.table(cmds);
console.groupEnd();

let x = 1;
let cyc = 0;

let sigs = cmds.map(cmd => {
	let arg = cmd.arg;
	cmd = cmd.cmd;
	let sigs = [ ];
	let sig = { };
	sig.cyc = ++cyc;
	sig.cmd = cmd;
	sig.x = x;
	sig.str = x * cyc;
	sigs = [...sigs, sig];
	if (cmd !== 'noop') {
		let sig = { };
		sig.cyc = ++cyc;
		sig.cmd = arg;
		sig.x = x;
		sig.str = x * cyc;
		x += arg;
		sigs = [...sigs, sig];
	}
	return sigs;
}).flat();

console.group('CPU SIGNALS');
console.table(sigs);
console.groupEnd();

let tgtCycs = [20, 60, 100, 140, 180, 220];
let sigStrSum = sigs.reduce((acc, curr) => tgtCycs.includes(curr.cyc) ? curr.str + acc : 0 + acc, 0);

console.log(`The signal strength sum (sigStrSum) for target cycles (tgtCycs) [${tgtCycs.join(', ')}] is \x1b[32m${sigStrSum}`);
