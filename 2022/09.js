import Input from './input/09.js';

let input = `R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2`;

let motions = Input.split('\n')
	.map(motion => motion.split(' '))
	.map(motion => [motion[0], parseInt(motion[1])]);

console.log('MOTIONS');
console.log(motions);

function Rope() {
	this.head = { x: 0, y: 0 };
	this.tail = { x: 0, y: 0 };
	this.moveHead = moveHead;
	this.moveTail = moveTail;
	this.visited = [[0, 0]];

	function moveHead(motion) {
		let dir = motion[0];
		let dist = motion[1];

		if (dir === 'U') {
			for (let i = 0; i < dist; i++) {
				this.head.y++
				this.moveTail(dir);
			}
		}
		if (dir === 'R') {
			for (let i = 0; i < dist; i++) {
				this.head.x++
				this.moveTail(dir);
			}
		}
		if (dir === 'D') {
			for (let i = 0; i < dist; i++) {
				this.head.y--
				this.moveTail(dir);
			}
		}
		if (dir === 'L') {
			for (let i = 0; i < dist; i++) {
				this.head.x--
				this.moveTail(dir);
			}
		}
	}

	function moveTail(dir) {
		if (dir === 'U') {
			if (this.head.y > this.tail.y + 1) {
				this.tail.x = this.head.x;
				this.tail.y = this.head.y - 1;
				this.visited.push([this.tail.x, this.tail.y])
			}
		}
		if (dir === 'R') {
			if (this.head.x > this.tail.x + 1) {
				this.tail.x = this.head.x - 1;
				this.tail.y = this.head.y;
				this.visited.push([this.tail.x, this.tail.y])
			}
		}
		if (dir === 'D') {
			if (this.head.y < this.tail.y - 1) {
				this.tail.x = this.head.x;
				this.tail.y = this.head.y + 1;
				this.visited.push([this.tail.x, this.tail.y])
			}
		}
		if (dir === 'L') {
			if (this.head.x < this.tail.x - 1) {
				this.tail.x = this.head.x + 1;
				this.tail.y = this.head.y;
				this.visited.push([this.tail.x, this.tail.y])
			}
		}
	}
}

let rope = new Rope();

motions.forEach(motion => rope.moveHead(motion));
rope.visited = rope.visited.map(pos => `${pos[0]},${pos[1]}`);
rope.visited = rope.visited.filter((pos, idx, arr) => arr.indexOf(pos) === idx);
console.log('visited', rope.visited);
console.log('unique visited', rope.visited.length);
