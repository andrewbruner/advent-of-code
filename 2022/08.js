import Input from './input/08.js';
let input = `30373
25512
65332
33549
35390`;

// create 2D array of tree objects
let trees = Input.split('\n')
	.map(row => row.split('')
		.map(tree => ({ height: parseInt(tree), visibility: {}, viewingDistance: {}})));


function isTreeVisible(tree, prevTrees) {
	if (prevTrees.length === 0) {
		return true;
	}
	let tallerPrevTrees = prevTrees.filter(prevTree => prevTree.height >= tree.height);
	if (tallerPrevTrees.length) {
		return false;
	} else {
		return true;
	}
}

// north
let north = [];
trees.forEach((row, rowIdx) => row.forEach((tree, treeIdx) => {
	if (rowIdx === 0) {
		north.push([tree]);
	} else {
		north[treeIdx].push(tree);
	}
}));
// east
let east = []
trees.forEach((row, rowIdx) => {
	row.reverse();
	row.forEach((tree, treeIdx) => {
		if (treeIdx === 0) {
			east.push([tree]);
		} else {
			east[rowIdx].push(tree);
		}
	});
	row.reverse();
});

// south
let south = [];
trees.reverse();
trees.forEach((row, rowIdx) => row.forEach((tree, treeIdx) => {
	if (rowIdx === 0) {
		south.push([tree]);
	} else {
		south[treeIdx].push(tree);
	}
}));
trees.reverse();

// west
let west = trees;

function findVisibilities(dirArr) {
	dirArr.forEach(dir => {
		let arr = dir === 'north' ? north : dir === 'east' ? east : dir === 'south' ? south : west;
		arr.forEach((row, rowIdx) => row.forEach((tree, treeIdx) => {
			let prevTrees = arr[rowIdx].slice(0, treeIdx);
			if (isTreeVisible(tree, prevTrees)) {
				tree.visibility[dir] = true;
			} else {
				tree.visibility[dir] = false;
			}
		}));
	});
}
findVisibilities(['north', 'east', 'south', 'west']);

let numTreesVisible = 0;
trees.forEach(row => row.forEach(tree => {
	if (tree.visibility.north
		|| tree.visibility.east
		|| tree.visibility.south
		|| tree.visibility.west) {
			numTreesVisible++;
		}
}));

console.log(`numTreesVisible = ${numTreesVisible}`);

function findViewingDistances(dirArr) {
	dirArr.forEach(dir => {
		let treeArr = dir === 'north' ? north : dir === 'east' ? east : dir === 'south' ? south : west;
		treeArr.forEach((row, rowIdx) => row.forEach((tree, treeIdx) => {
			let viewingDistance = 0;
			let prevTrees = treeArr[rowIdx].slice(0, treeIdx);
			for (let i = prevTrees.length - 1; i >= 0; i--) {
				if (prevTrees[i].height < tree.height) {
					viewingDistance++;
				} else if (prevTrees[i].height >= tree.height) {
					viewingDistance++;
					break;
				} else if (prevTrees[i] === undefined) {
					break;
				}
			}
			tree.viewingDistance[dir] = viewingDistance;
		}));
	});
}

findViewingDistances(['north', 'east', 'south', 'west']);

//console.dir(trees, { depth: null });

function findHighestScenicScore(trees) {
	let highestScenicScore = 0;
	trees.forEach(row => row.forEach(tree => {
		let scenicScore = tree.viewingDistance.north * tree.viewingDistance.east * tree.viewingDistance.south * tree.viewingDistance.west;
		if (scenicScore > highestScenicScore) {
			highestScenicScore = scenicScore;
		}
	}));
	return highestScenicScore;
}

console.log(`highestScenicScore = ${findHighestScenicScore(trees)}`);
