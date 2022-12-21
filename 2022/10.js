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
	.map(cmd => cmd[0] === 'noop' ? { cmd: cmd[0], } : { cmd: cmd[0], arg: +cmd[1], });

console.log('\n\x1b[1mCOMMAND LOG\x1b[0m');
console.table(cmds);

let x = 1;
let cyc = 0;

let sigs = cmds.map(cmd => {
	let arg = cmd.arg;
	cmd = cmd.cmd;
	let sigs = [ ];
	let sig = { };
	sig.cyc = ++cyc;
	sig.cmd = arg ? `${cmd} ${arg}` : cmd;
	sig.x = x;
	sig.str = x * cyc;
	sigs = [ ...sigs, sig, ];
	if (cmd !== 'noop') {
		let sig = { };
		sig.cyc = ++cyc;
		sig.cmd = `${cmd} ${arg}`;
		sig.x = x;
		sig.str = x * cyc;
		x += arg;
		sigs = [ ...sigs, sig, ];
	}
	return sigs;
}).flat();

console.log('\n\x1b[1mCPU SIGNALS\x1b[0m');
console.table(sigs);

let tgtCycs = [ 20, 60, 100, 140, 180, 220, ];
let tgtSigStrs = sigs.filter(sig => tgtCycs.includes(sig.cyc))
	.map((sig, idx, arr) => ({
		cyc: sig.cyc,
		x: sig.x,
		str: sig.str,
		tot: arr.reduce((acc, curr, currIdx) => currIdx <= idx ? curr.str + acc : acc, 0),
	}));
console.log('\n\x1b[1mTARGET CPU SIGNAL STRENGTHS\x1b[0m');
console.table(tgtSigStrs);

let crt = '';
let crtRowBrks = [40, 80, 120, 160, 200, 240];
let sprPos = [0, 1, 2];
let sprPosOfs = 0;

sigs.forEach((sig, idx) => {
	if (crtRowBrks.includes(idx)) {
		sprPosOfs = idx;
		crt += '\n';
	}
	sprPos = [sig.x-1+sprPosOfs, sig.x+sprPosOfs, sig.x+1+sprPosOfs];
	if (sprPos.includes(idx)) {
		crt += '#';
	} else {
		crt += '.';
	}
});

console.log('\n\x1b[1mCRT DISPLAY\x1b[0m')
console.log(crt);