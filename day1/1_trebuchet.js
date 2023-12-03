// const fs = require("fs");

// const tables = {
// 	one: 1,
// 	two: 2,
// 	three: 3,
// 	four: 4,
// 	five: 5,
// 	six: 6,
// 	seven: 7,
// 	eight: 8,
// 	nine: 9,
// 	zero: 0,
// };

// const myReplace = (inputStr) => {
// 	let result = inputStr;
// 	for (const [key, value] of Object.entries(tables)) {
// 		result = result.replaceAll(key, value);
// 	}

// 	return result;
// };

// // Function to process a single test case and return the result
// function processTestCase(testCase) {
// 	// console.log("-- start");
// 	for (let i = 0; i < testCase.length; i++) {
// 		let item = testCase.substring(0, i + 1);
// 		let returned = myReplace(item);

// 		if (item !== returned) {
// 			testCase = returned + testCase.substring(i + 1);
// 			i = -1;
// 		}
// 	}
// 	// console.log("end --");

// 	// console.log(`Parsed ${testCase}`);
// 	// let num = "";

// 	// for (let i = 0; i < testCase.length; i++) {
// 	// 	if (Number.isInteger(parseInt(testCase[i]))) {
// 	// 		num += testCase[i];
// 	// 		break;
// 	// 	}
// 	// }
// 	// for (let i = testCase.length; i > 0; i--) {
// 	// 	if (Number.isInteger(parseInt(testCase[i]))) {
// 	// 		num += testCase[i];
// 	// 		break;
// 	// 	}
// 	// }

// 	let digits = "";

// 	// Collect all digits in the string
// 	for (let i = 0; i < testCase.length; i++) {
// 		if (!isNaN(parseInt(testCase[i]))) {
// 			digits += testCase[i];
// 		}
// 	}

// 	let num;
// 	if (digits.length === 0) {
// 		num = 0;
// 	} else if (digits.length === 1) {
// 		num = parseInt(digits + digits);
// 	} else {
// 		num = parseInt(digits[0] + digits[digits.length - 1]);
// 	}

// 	num = parseInt(num);

// 	// console.log(typeof num);
// 	// console.log(num);

// 	return num;
// }

// fs.readFile("1_input.txt", "utf8", (err, data) => {
// 	if (err) {
// 		console.error("Error reading the file:", err);
// 		return;
// 	}

// 	// Split the input into lines, each line is a test case
// 	const testCases = data.trim().split("\n");
// 	let result = 0;
// 	// Process each test case and output the results
// 	testCases.forEach((testCase, index) => {
// 		let received = processTestCase(testCase);
// 		result = result + received;
// 		console.log(
// 			`${index + 1}-> for ${testCase}  - calc ${received}:`,
// 			result
// 		);
// 	});
// });

// // let received = processTestCase("eightwothree");
// // console.log(received);

const fs = require("fs");

const tables = {
	one: "1",
	two: "2",
	three: "3",
	four: "4",
	five: "5",
	six: "6",
	seven: "7",
	eight: "8",
	nine: "9",
	zero: "0",
};

const myReplace = (inputStr) => {
	let result = inputStr;
	for (const [key, value] of Object.entries(tables)) {
		let regex = new RegExp(key, "g"); // Create a global regex for each key
		result = result.replace(regex, value);
	}
	return result;
};

function processTestCase(testCase) {
	let transformed = myReplace(testCase);
	let digits = "";

	// Collect all digits in the string
	for (let char of transformed) {
		if (!isNaN(parseInt(char))) {
			digits += char;
		}
	}

	let firstDigit = digits.length > 0 ? digits[0] : "0";
	let lastDigit = digits.length > 1 ? digits[digits.length - 1] : firstDigit;

	return parseInt(firstDigit + lastDigit); // Combine to form a two-digit number
}

// Assuming the input is stored in a file named 'input.txt'
fs.readFile("1_input.txt", "utf8", (err, data) => {
	if (err) {
		console.error("Error reading the file:", err);
		return;
	}

	const testCases = data.trim().split("\n");
	let totalCalibrationValue = 0;

	testCases.forEach((testCase) => {
		totalCalibrationValue += processTestCase(testCase);
	});

	console.log("Total Calibration Value:", totalCalibrationValue);
});
