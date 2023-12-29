import input from './input.js';
// import input from './test.js';

// Records Array
const _records = input.split(/\n/)
    .map(x => x.split(/:\s+/)
        .map((y,i) => i
            ? y.split(/\s+/)
                .map(z => +z)
            : `${y.charAt(0).toLowerCase()}${y.slice(1)}`
        )
    );

// console.dir(_records, { depth: null });

// Records Object
const times = _records[0][1];
const distances = _records[1][1];
const records = times.map((time, index) => ({ time, distance: distances[index] }));

// console.dir(records, { depth: null });

const optionsArray = []
records.forEach(record => {
    let options = [];
    for (let i = 0; i <= record.time; i++) {
        let button = i;
        let speed = i;
        let distance = speed * (record.time - button);
        if (distance > record.distance) {
            options.push([button, distance]);
        }
    }
    optionsArray.push(options);
});

// console.dir(optionsArray);

let optionsArrayProduct = optionsArray.reduce((acc, curr) => curr.length * acc, 1);

console.log(optionsArrayProduct);