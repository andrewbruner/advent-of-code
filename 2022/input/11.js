// export default [
// 	{
// 		items: [ 75, 63, ],
// 		operation(old) { return Math.floor((old * 3) / 3) },
// 		test(item) { return !(item % 11) ? 7 : 2 },
// 	},
//   {
// 		items: [ 65, 79, 98, 77, 56, 54, 83, 94, ],
// 		operation(old) { return Math.floor((old + 3) / 3) },
// 		test(item) { return !(item % 2) ? 2 : 0 },
// 	},
//   {
// 		items: [ 66, ],
// 		operation(old) { return Math.floor((old + 5) / 3) },
// 		test(item) { return !(item % 5) ? 7 : 5 },
// 	},
//   {
// 		items: [ 51, 89, 90, ],
// 		operation(old) { return Math.floor((old * 19) / 3) },
// 		test(item) { return !(item % 7) ? 6 : 4 },
// 	},
//   {
// 		items: [ 75, 94, 66, 90, 77, 82, 61, ],
// 		operation(old) { return Math.floor((old + 1) / 3) },
// 		test(item) { return !(item % 17) ? 6 : 1 },
// 	},
//   {
// 		items: [ 53, 76, 59, 92, 95, ],
// 		operation(old) { return Math.floor((old + 2) / 3) },
// 		test(item) { return !(item % 19) ? 4 : 3 },
// 	},
//   {
// 		items: [ 81, 61, 75, 89, 70, 92, ],
// 		operation(old) { return Math.floor((old * old) / 3) },
// 		test(item) { return !(item % 3) ? 0 : 1 },
// 	},
//   {
// 		items: [ 81, 86, 62, 87, ],
// 		operation(old) { return Math.floor((old + 8) / 3) },
// 		test(item) { return !(item % 13) ? 3 : 5 },
// 	},
// ];

export default [
	{
		items: [ 75, 63, ],
		operation(old) { return (old * 3) % (11 * 2 * 5 * 7 * 17 * 19 * 3 * 13) },
		test(item) { return !(item % 11) ? 7 : 2 },
	},
  {
		items: [ 65, 79, 98, 77, 56, 54, 83, 94, ],
		operation(old) { return (old + 3) % (11 * 2 * 5 * 7 * 17 * 19 * 3 * 13) },
		test(item) { return !(item % 2) ? 2 : 0 },
	},
  {
		items: [ 66, ],
		operation(old) { return (old + 5) % (11 * 2 * 5 * 7 * 17 * 19 * 3 * 13) },
		test(item) { return !(item % 5) ? 7 : 5 },
	},
  {
		items: [ 51, 89, 90, ],
		operation(old) { return (old * 19) % (11 * 2 * 5 * 7 * 17 * 19 * 3 * 13) },
		test(item) { return !(item % 7) ? 6 : 4 },
	},
  {
		items: [ 75, 94, 66, 90, 77, 82, 61, ],
		operation(old) { return (old + 1) % (11 * 2 * 5 * 7 * 17 * 19 * 3 * 13) },
		test(item) { return !(item % 17) ? 6 : 1 },
	},
  {
		items: [ 53, 76, 59, 92, 95, ],
		operation(old) { return (old + 2) % (11 * 2 * 5 * 7 * 17 * 19 * 3 * 13) },
		test(item) { return !(item % 19) ? 4 : 3 },
	},
  {
		items: [ 81, 61, 75, 89, 70, 92, ],
		operation(old) { return (old * old) % (11 * 2 * 5 * 7 * 17 * 19 * 3 * 13) },
		test(item) { return !(item % 3) ? 0 : 1 },
	},
  {
		items: [ 81, 86, 62, 87, ],
		operation(old) { return (old + 8) % (11 * 2 * 5 * 7 * 17 * 19 * 3 * 13) },
		test(item) { return !(item % 13) ? 3 : 5 },
	},
];
