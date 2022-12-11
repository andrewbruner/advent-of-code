//import input from './input/07.js';
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
7214296 k`;

let fs = {};
let ref = {};
let nav = {
	path: ''
};

let log = input.split('\n')
	.map(line => line.split(' '));

log.forEach(line => {
	// if $ (command)
	if (line[0] === '$') {
		// if cd (change directory)
		if (line[1] === 'cd') {
			// if / (root directory)
			if (line[2] === '/') {
				nav.path = [];
			// else if .. (parent directory)
			} else if (line[2] === '..') {
				nav.path = nav.path.slice(0,nav.path.length-1);
			// else (directory name)
			} else {
				nav.path = [...nav.path, line[2]];
			}
		}
	// else if dir (directory name)
	} else if (line[0] === 'dir') {
		let dir = line[1];
		ref[dir] = {};
		if (nav.path.length) {
			let parent = nav.path.slice(nav.path.length-1);
			ref[parent][dir] = ref[dir];
		} else {
			fs[dir] = ref[dir];
		}
	// else (file)
	} else {
		let file = line[1];
		let size = line[0];
		ref[file] = { size };
		if (nav.path.length) {
			let parent = nav.path.slice(nav.path.length-1);
			ref[parent][file] = ref[file];
		} else {
			fs[file] = ref[file];
		}
	}
});
console.dir(fs);