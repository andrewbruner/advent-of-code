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
	.map(motion => ({ dir: motion[0], dist: parseInt(motion[1]) }));

console.log('MOTIONS');
console.log(motions);

class Knot {
	constructor() {
		this.x = 0;
		this.y = 0;
		this.next = null;
	}
}

let head = new Knot();
let tail = new Knot();
head.next = tail;
let rope = { head, tail, };
let numKnots = 10;
for (let i = 2; i < numKnots; i++) {
	let knot = new Knot();
	rope.tail.next = knot;
	rope.tail = knot;
}
let visitedByTail = ['0,0'];

function moveNext(knot) {
	if (knot.next) {
		if (knot.next.x === knot.x) {
			if (knot.next.y < knot.y-1) {
				knot.next.y++;
				moveNext(knot.next);
			} else if (knot.next.y > knot.y+1) {
				knot.next.y--;
				moveNext(knot.next);
			}
		} else if (knot.next.y === knot.y) {
			if (knot.next.x < knot.x-1) {
				knot.next.x++;
				moveNext(knot.next);
			} else if (knot.next.x > knot.x+1) {
				knot.next.x--;
				moveNext(knot.next);
			}
		} else if (
			(knot.next.x < knot.x && knot.next.y < knot.y-1)
			|| (knot.next.x < knot.x-1 && knot.next.y < knot.y)
		) {
			knot.next.x++;
			knot.next.y++;
			moveNext(knot.next);
		} else if (
			((knot.next.x < knot.x-1 && knot.next.y > knot.y)
			|| (knot.next.x < knot.x && knot.next.y > knot.y+1))
		) {
			knot.next.x++;
			knot.next.y--;
			moveNext(knot.next);
		} else if (
			(knot.next.x > knot.x && knot.next.y > knot.y+1)
			|| (knot.next.x > knot.x+1 && knot.next.y > knot.y)
		) {
			knot.next.x--;
			knot.next.y--;
			moveNext(knot.next);
		} else if (
			(knot.next.x > knot.x+1 && knot.next.y < knot.y)
			|| (knot.next.x > knot.x && knot.next.y < knot.y-1)
		) {
			knot.next.x--;
			knot.next.y++;
			moveNext(knot.next);
		}
		if (!knot.next.next) {
			visitedByTail = [ ...visitedByTail, `${knot.next.x},${knot.next.y}`, ];
		}
	}
}

motions.forEach(motion => {
	if (motion.dir === 'U') {
		for (let i = 0; i < motion.dist; i++) {
			rope.head.y++;
			moveNext(rope.head);
		}
	} else if (motion.dir === 'R') {
		for (let i = 0; i < motion.dist; i++) {
			rope.head.x++;
			moveNext(rope.head);
		}
	} else if (motion.dir === 'D') {
		for (let i = 0; i < motion.dist; i++) {
			rope.head.y--;
			moveNext(rope.head);
		}
	} else if (motion.dir === 'L') {
		for (let i = 0; i < motion.dist; i++) {
			rope.head.x--;
			moveNext(rope.head);
		}
	}
});

visitedByTail = visitedByTail.filter((pos, idx, arr) => arr.indexOf(pos) === idx);;

console.log(visitedByTail.length);

// class Rope {
// 	constructor() {
// 		this.head = null;
// 		this.tail = null;
// 		this.visitedTailPositions = [];
// 	},
// 	moveHead(motion) {

// 	}
// 	followHead(prevKnot) {}
// }

// class Knot {
// 	constructor(prev, next = null) {
// 		this.prev = prev;
// 		this.next = next;
// 		this.coords = { x: 0, y: 0 };
// 	}
// }

// function buildRope({ numKnots = 2 } = { }) {
// 	let rope = new Rope();
// 	let head = new Knot(null);
// 	rope.head = head;
// 	rope.tail = head;
// 	let prevKnot = head;
// 	for (let i = 1; i < numKnots; i++)  {
// 		let nextKnot = new Knot(prevKnot);
// 		prevKnot.next = nextKnot;
// 		rope.tail = nextKnot;
// 		prevKnot = nextKnot;
// 	}
// 	return rope;
// }

// let rope = buildRope({ numKnots: 3 });
// console.dir(rope, { depth: null });

// // 	this.moveHead = moveHead;
// // 	this.moveTail = moveTail;
// // 	this.visited = [[0, 0]];

// // 	function moveHead(motion) {
// // 		let dir = motion[0];
// // 		let dist = motion[1];

// // 		if (dir === 'U') {
// // 			for (let i = 0; i < dist; i++) {
// // 				this.head.y++
// // 				this.moveTail(dir);
// // 			}
// // 		}
// // 		if (dir === 'R') {
// // 			for (let i = 0; i < dist; i++) {
// // 				this.head.x++
// // 				this.moveTail(dir);
// // 			}
// // 		}
// // 		if (dir === 'D') {
// // 			for (let i = 0; i < dist; i++) {
// // 				this.head.y--
// // 				this.moveTail(dir);
// // 			}
// // 		}
// // 		if (dir === 'L') {
// // 			for (let i = 0; i < dist; i++) {
// // 				this.head.x--
// // 				this.moveTail(dir);
// // 			}
// // 		}
// // 	}

// // 	function moveTail(dir) {
// // 		if (dir === 'U') {
// // 			if (this.head.y > this.tail.y + 1) {
// // 				this.tail.x = this.head.x;
// // 				this.tail.y = this.head.y - 1;
// // 				this.visited.push([this.tail.x, this.tail.y])
// // 			}
// // 		}
// // 		if (dir === 'R') {
// // 			if (this.head.x > this.tail.x + 1) {
// // 				this.tail.x = this.head.x - 1;
// // 				this.tail.y = this.head.y;
// // 				this.visited.push([this.tail.x, this.tail.y])
// // 			}
// // 		}
// // 		if (dir === 'D') {
// // 			if (this.head.y < this.tail.y - 1) {
// // 				this.tail.x = this.head.x;
// // 				this.tail.y = this.head.y + 1;
// // 				this.visited.push([this.tail.x, this.tail.y])
// // 			}
// // 		}
// // 		if (dir === 'L') {
// // 			if (this.head.x < this.tail.x - 1) {
// // 				this.tail.x = this.head.x + 1;
// // 				this.tail.y = this.head.y;
// // 				this.visited.push([this.tail.x, this.tail.y])
// // 			}
// // 		}
// // 	}
// // }

// // let rope = new Rope();

// // motions.forEach(motion => rope.moveHead(motion));
// // rope.visited = rope.visited.map(pos => `${pos[0]},${pos[1]}`);
// // rope.visited = rope.visited.filter((pos, idx, arr) => arr.indexOf(pos) === idx);
// // console.log('visited', rope.visited);
// // console.log('unique visited', rope.visited.length);
