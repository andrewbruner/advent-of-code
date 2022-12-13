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

console.log('FILESYSTEM');
console.dir(fs, { depth: null });
console.log('REFERENCE');
console.dir(refs);


// log.forEach(line => {
// 	// if $ (command)
// 	if (line[0] === '$') {
// 		// if cd (change directory)
// 		if (line[1] === 'cd') {
// 			// if / (root directory)
// 			if (line[2] === '/') {
// 				nav.path = '';
// 			// else if .. (parent directory)
// 			} else if (line[2] === '..') {
// 				nav.path = nav.path.split('/');
// 				nav.path = nav.path.slice(0,nav.path.length-1)
// 				nav.path = nav.path.join('/');
// 			// else (directory name)
// 			} else {
// 				let dir = line[2];
// 				nav.path = `${nav.path}/${dir}`;
// 			}
// 		}
// 	// else if dir (directory name)
// 	} else if (line[0] === 'dir') {
// 		let dir = line[1];
// 		let path = `${nav.path}/${dir}`;
// 		let type = 'dir';
// 		let size = 0;
// 		ref[path] = { type, size };
// 		if (nav.path) {
// 			let parent = nav.path.split('/');
// 			parent = parent.slice(0, parent.length-1);
// 			ref[parent][dir] = ref[dir];
// 		} else {
// 			fs[dir] = ref[dir];
// 		}
// 	// else (file)
// 	} else {
// 		let file = line[1];
// 		let type = 'file'
// 		let size = parseInt(line[0]);
// 		ref[file] = { type, size };
// 		if (nav.path.length) {
// 			let parent = nav.path.slice(nav.path.length-1);
// 			ref[parent][file] = ref[file];
// 		} else {
// 			fs[file] = ref[file];
// 		}
// 	}
// });
// function updateDirSize(dir) {
// 	for (let prop in dir) {
// 		if (prop !== 'type' && prop !== 'size') {
// 			if (dir[prop].type === 'dir') {
// 				updateDirSize(dir[prop]);
// 			}
// 			dir.size += dir[prop].size;
// 		}
// 	}
// }
// updateDirSize(fs);

// let sums = [];
// for (let prop in ref) {
// 	if (ref[prop].type === 'dir') {
// 		if (ref[prop].size <= 100000)
// 			sums.push(ref[prop].size);
// 	}
// }

// sums = sums.reduce((acc, curr) => {
// 	if (acc + curr < 100000) {
// 		return acc + curr;
// 	} else {
// 		return acc;
// 	}
// });

// console.dir(fs, { depth: null });
// console.dir(ref);
// //console.dir(sums);
// //console.log(sum);