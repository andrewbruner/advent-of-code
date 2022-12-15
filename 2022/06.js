// device
// communication system
// lock on to signal
// start-of-packet marker in datastream
// four different chars (protocol)

// start-of-message in datastream
// 14 distinct characters

import Input from './input/06.js';

const MarkerLength = 4;

let datastream = 'zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw';

function checkDatastream(datastream, options) {
	let markerLength = options.markerLength;
	dataLoop:
		for (let i = 0; i < datastream.length; i++) {
			let marker = datastream.substring(i, i + markerLength);
			markerLoop:
				for (let j = 1; j < marker.length; j++) {
					let char = marker[j];
					let substr = marker.substring(0, j);
					let isLastIdx = j === marker.length - 1;
					if (substr.includes(char)) break markerLoop;
					if (isLastIdx) return i + j + 1;
				}
		}
}

console.log(checkDatastream(Input, { markerLength: 14 }));

// // check if marker position is distinct
// if (signal.isDistinct) console.log(signal.position);
// // check for marker distinction with remaining signal characters
// for (let i = 0; i < datastream.length - MarkerLength; i++) {
// 	if (!signal.isDistinct) {
// 		let char = datastream[i + MarkerLength];
// 		let substr = datastream.substring(i + 1, i + MarkerLength);
// 		signal = { ...signal, position: i + MarkerLength + 1};
// 		console.log(substr, char);
// 		if (!substr.includes(char)) signal = { ...signal, isDistinct: true };
// 	}
// }
