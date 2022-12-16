import Input from './input/07.js';
let input = `$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k`

function File(name, size, parentDir) {
	this.name = name;
	this.getSize = getSize;

	parentDir.contents.push(this);

	function getSize() {
		return size;
	}
}

function Dir(name, parentDir) {
	this.isDir = true;
	this.parentDir = parentDir;
	this.name = name;
	this.getSize = getSize;
	this.contents = [];

	if (parentDir) {
		parentDir.contents.push(this);
	}

	function getSize() {
		return this.contents.length ? this.contents.map(v => v.getSize()).reduce((acc, curr) => acc + curr) : 0;
	}
}

function Filesystem(input) {
	this.rootDir = new Dir('/', null);
	this.build = build;
	
	function build() {
		let log = input.split('\n').map(ln => ln.split(' '));
		let currDir = this.rootDir;
		log.forEach(ln => {
			if (ln[0] === '$') {
				if (ln[1] === 'cd') {
					let dir = ln[2];
					if (dir === '/') {
						currDir = this.rootDir;
					} else if (dir === '..') {
						currDir = currDir.parentDir;
					} else {
						currDir = currDir.contents.find(v => v.isDir && v.name === dir);
					}
				}
			} else if (ln[0] === 'dir') {
				let name = ln[1];
				new Dir(name, currDir);
			} else {
				let size = parseInt(ln[0]);
				let name = ln[1];
				new File(name, size, currDir);
			}
		});
		return this;
	}
}

let filesystem = new Filesystem(Input).build();

let sum = 0;

function addSum(item) {
	if (item.isDir) {
		item.contents.forEach(v => addSum(v));
		if (item.getSize() <= 100000) {
			sum += item.getSize();
		}
	}
}

addSum(filesystem.rootDir);


// PART 2

let rootDir = filesystem.rootDir;
let totalDiskSpace = 70_000_000;
let currInUse = filesystem.rootDir.getSize(); // 43_956_976
let currAvailable = totalDiskSpace - currInUse; // 26_043_024
let targetAvailable = 30_000_000;
let targetToDelete = targetAvailable - currAvailable; // 3_956_976


let candidates = [];
function getCandidates(v) {
	if (v.isDir) {
		v.contents.forEach(v => getCandidates(v));
		if (v.getSize() >= targetToDelete) {
			candidates.push(v);
		}
	}
}
getCandidates(rootDir);

let sizes = candidates.map(v => v.getSize());

let smallest = Math.min(...sizes);

console.log(smallest);
