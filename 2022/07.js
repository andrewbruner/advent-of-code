import input from './input/07.js';
// let input = `$ cd /
// $ ls
// dir a
// 14848514 b.txt
// 8504156 c.dat
// dir d
// $ cd a
// $ ls
// dir e
// 29116 f
// 2557 g
// 62596 h.lst
// $ cd e
// $ ls
// 584 i
// $ cd ..
// $ cd ..
// $ cd d
// $ ls
// 4060174 j
// 8033020 d.log
// 5626152 d.ext
// 7214296 k`;

// navigation object with current location
let nav = {
	loc: '/',
};

// references to all directories
let refs = {
	'/': { info: { type: 'dir', path: '/', size: 0 } },
};

// filesystem object
let fs = {
	'/': refs['/'],
};



// split input log into separate lines
let log = input.split('\n');
// split each line into separate components
log = log.map(ln => ln.split(' '));

log.forEach(ln => {
	if (ln[0] === '$') {
		if (ln[1] === 'cd') {
			if (ln[2] === '/') {
				nav.loc = '/';
			} else if (ln[2] === '..') {
				nav.loc = nav.loc.split('/');
				nav.loc = nav.loc.slice(0,nav.loc.length-1);
				nav.loc = nav.loc.join('/')
			} else {
				nav.loc = nav.loc += `/${ln[2]}`;
			}
		}
	} else if (ln[0] === 'dir') {
		let type = 'dir';
		let path = `${nav.loc}/${ln[1]}`;
		let size = 0;
		let dir = { info: { type, path, size } };
		refs[path] = dir;
		refs[nav.loc][path] = dir;
	} else {
		let type = 'file';
		let path = `${nav.loc}/${ln[1]}`
		let size = parseInt(ln[0]);
		let file = { info: { type, path, size } };
		refs[path] = file;
		refs[nav.loc][path] = file;
	}
});

function size(type) {
	let depth = 0;
	for (let ref in refs) {
		let curr = refs[ref].info.path.split('/').length;
		if (curr > depth) {
			depth = curr;
		}
	}
	while (depth >= 0) {
		for (let ref in refs) {
			if (refs[ref].info.type === type && ref !== '/') {
				let parent = refs[ref].info.path.split('/');
				if (parent.length === depth) {
					parent = parent.slice(0,parent.length-1);
					parent = parent.join('/');
					refs[parent].info.size += refs[ref].info.size;
				}
			}
		}
		depth--;
	}
}

size('file');
size('dir');

// console.log('FILESYSTEM');
// console.dir(fs, { depth: null });
// console.log('REFERENCE');
// console.dir(refs);

console.log(fs);

let dirs = [];
for (let ref in refs) {
	let size = refs[ref].info.size;
	if (size <= 100000) {
		dirs.push(size);
	}
}

dirs.forEach(dir => console.log(dir));
dirs = dirs.reduce((acc, curr) => acc + curr);
console.log(dirs);