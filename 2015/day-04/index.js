import md5 from './md5.js';
import input from './input.js';

function $(input, isPart1 = true) {
	let i = 0;
	let hash = md5(input + i);
	if (isPart1) {
		while (hash.slice(0, 5) !== '00000') {
			hash = md5(input + ++i);
		}
	} else {
		while (hash.slice(0, 6) !== '000000') {
			hash = md5(input + ++i);
		}
	}
	return i;
}
console.log($(input));
console.log($(input, false));