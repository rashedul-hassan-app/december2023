const fs = require("fs");
const symRegex = /\D/g;

let gears = [];

function isDigit(char) {
	return /\d/.test(char);
}

function processTestCase(testCase, q1, q2) {
	console.log(testCase);
	const line = testCase.split("\n");
	const inputArray = line.map((item) => item.split(""));

	const numberMatches = [];
	const symbolMatches = [];

	/** Filters out symbols and get rids of dots, storing in `symbolMatches` as an object format with props */
	for (let i = 0; i < inputArray.length; i++) {
		for (let j = 0; j < inputArray[i].length; j++) {
			if (!isDigit(inputArray[i][j]) && inputArray[i][j] !== ".") {
				symbolMatches.push({
					operator: inputArray[i][j],
					position: [i, j],
				});
			}
		}
	}

	let collection = "";
	for (let i = 0; i < inputArray.length; i++) {
		let numberFound = true;
		for (let j = 0; j < inputArray[i].length; j++) {
			if (isDigit(inputArray[i][j])) {
				collection = collection + inputArray[i][j];
				numberFound = true;
			} else {
				numberFound = false;
			}
			if (!numberFound && collection.length > 0) {
				numberMatches.push({
					number: collection,
					position: [i, j - 1],
					length: collection.length,
				});
				collection = "";
				numberFound = false;
			}
		}
		if (numberMatches.length > 0) {
			numberMatches.push({
				number: collection,
				position: [i, inputArray[i].length - 1],
				length: collection.length,
			});
			collection = "";
		}
	}
	// console.log("++ numberMatches ++");
	// console.log(numberMatches);

	// console.log("symbolMatches");
	// console.log(symbolMatches);

	for (const aNumber of numberMatches) {
		// console.log(aNumber.number);

		let cPosition = aNumber.position;
		let cLength = aNumber.length;
		// console.log(
		// 	`pos =${cPosition} length = ${cLength} loopStart = ${
		// 		cPosition[1] - cLength + 1
		// 	} loopRow =${cPosition[0]} Loop terminator ${
		// 		cPosition[1] - cLength + 1
		// 	} <= ${cPosition[1] - cLength + 1 + cLength}`
		// );

		for (
			let idxColStart = cPosition[1] - cLength + 1;
			idxColStart <= cPosition[1] - cLength + cLength;
			idxColStart++
		) {
			let col = idxColStart; // get column
			let row = cPosition[0]; // get row

			// console.log(`--------checking [${row}, ${col}]`);

			/**
			 * calculations required on top of position to get to the below destinations:
			 * top: -1, 0
			 * bottom: +1, 0
			 * left: 0, -1
			 * right: 0, +1
			 * top-left: -1, -1
			 * top-right: -1, +1
			 * bottom-left: +1, -1
			 * bottom-right: +1, +1
			 */
			if (
				checkPosition(aNumber.number, symbolMatches, row - 1, col) || //	top
				checkPosition(aNumber.number, symbolMatches, row + 1, col) || // 	bottom
				checkPosition(aNumber.number, symbolMatches, row, col - 1) || // 	left
				checkPosition(aNumber.number, symbolMatches, row, col + 1) || // 	right
				checkPosition(
					aNumber.number,
					symbolMatches,
					row - 1,
					col - 1
				) || //	TL
				checkPosition(
					aNumber.number,
					symbolMatches,
					row - 1,
					col + 1
				) || // 	TR
				checkPosition(
					aNumber.number,
					symbolMatches,
					row + 1,
					col - 1
				) || //	BL
				checkPosition(aNumber.number, symbolMatches, row + 1, col + 1) // 	BR
			) {
				// console.log("xxx Found xxx");
				aNumber.valid = true;
			} else {
				// console.log("x");
			}
		}
	}

	// const numbers = testCase.match(numRegex);
	// console.log(numbers);
	const unfilteredSymbols = testCase.match(symRegex);
	const symbols = unfilteredSymbols.filter(
		(item) => item !== "." && item != "\n"
	);

	approvedObj = numberMatches.filter((item) => item.valid);
	let sum = 0;
	const debugList = [];
	console.log("------------- start ==============");
	approvedObj.forEach((item) => {
		debugList.push(parseInt(item.number));
		sum = sum + parseInt(item.number);
	});

	// console.log(debugList.join(", "));
	console.log(`SUM = ${sum}`);

	// QUESTION 2
	console.log(symbolMatches);
	onlyGears = symbolMatches.filter((item) => item.operator === "*");
	console.log(onlyGears);
	console.log(numberMatches.filter((item) => item.number !== ""));
	console.log(gears);

	const combined = {};
	gears.forEach((item) => {
		if (!combined[item.pos]) {
			combined[item.pos] = new Set();
		}
		combined[item.pos].add(item.num);
	});

	let finalSum = 0;
	console.log("---- entries ---");
	Object.entries(combined).forEach(([key, set]) => {
		if (set.size === 2) {
			console.log(`${key}:`, set);
			const numArray = Array.from(set);
			const products = numArray[0] * numArray[1];
			finalSum += products;
		}
	});
	console.log("--- SUM ---");
	console.log(finalSum);
}

// amazing stuff, new thing learned, some
// checks if the [x,y] exists in the list of positions
const checkPosition = (num, arr, x, y) => {
	return (result = arr.some((item) => {
		// console.log(
		// 	// `considering: [${item.position[0]}, ${item.position[1]}] with [${x}, ${y}]`
		// );
		// console.log(item.operator);

		if (
			item.position[0] === x &&
			item.position[1] === y &&
			item.operator === "*"
		) {
			if (x + "" + y)
				gears.push({
					num: num,
					pos: x + "" + y,
				});
		}
		return item.position[0] === x && item.position[1] === y;
	}));
};

fs.readFile("input.txt", "utf8", (err, data) => {
	// fs.readFile("custom.txt", "utf8", (err, data) => {
	if (err) {
		console.error("Error reading the file:", err);
		return;
	}

	result = processTestCase(data, true, false);
});
