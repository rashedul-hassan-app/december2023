const fs = require("fs");

function processTestCase(testCase, q1, q2) {
	console.log(testCase);
	return 0;
}

// fs.readFile("input.txt", "utf8", (err, data) => {
fs.readFile("custom.txt", "utf8", (err, data) => {
	if (err) {
		console.error("Error reading the file:", err);
		return;
	}

	const testCases = data.trim().split("\n");
	let total = 0;

	let goodOnes = [];
	// run all Testcase
	testCases.forEach((testCase) => {
		result = processTestCase(testCase, false, true);
		total += result;
		goodOnes.push(result);
	});
	console.log(goodOnes);
	console.log(total);
});
