import Input from './input.js';

let input = Input;

let codeLength = 0;
let valueLength = 0;
let isEscaping = false;

for (let i = 0; i < input.length; i++) {
	let character = input[i];
	if (character !== '\n') {
		if (isEscaping) {
			if (character === 'x') {
				codeLength += 3;
				valueLength++;
				isEscaping = false;
				i += 2;
			} else {
				codeLength++;
				valueLength++;
				isEscaping = false;
			}
		} else if (character === '\\') {
			codeLength++;
			isEscaping = true;
		} else if (character === '"') {
			codeLength++;
		} else {
			codeLength++;
			valueLength++;
		}
	}
}

console.log(codeLength - valueLength);
