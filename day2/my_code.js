const fs = require("fs");

function processTestCase(testCase, q1, q2) {
	console.log(testCase);
	let valid = true;

	let max_red = 1,
		max_green = 1,
		max_blue = 1;

	game_id = parseInt(testCase.split(":")[0].split(" ")[1]);
	lines = testCase.trim().split(":")[1];

	events = lines.trim().split(";");

	for (let i = 0; i < events.length; i++) {
		mini_game = events[i].split(",");

		for (let j = 0; j < mini_game.length; j++) {
			num = parseInt(mini_game[j].trim().split(" ")[0]);
			txt = mini_game[j].trim().split(" ")[1];
			console.log(num + "---" + txt);

			if (txt == "red") {
				if (num > 12) {
					valid = false;
				}

				if (num >= max_red) {
					max_red = num;
				}
			}
			if (txt == "green") {
				if (num > 13) {
					valid = false;
				}

				if (num >= max_green) {
					max_green = num;
				}
			}
			if (txt == "blue") {
				if (num > 14) {
					valid = false;
				}

				if (num >= max_blue) {
					max_blue = num;
				}
			}
		}
		console.log(mini_game + valid);
		console.log(`maxes = r ${max_red} g ${max_green} b ${max_blue}`);
	}

	console.log(
		"==============================RETURNING with " +
			valid +
			` maxes = r ${max_red} g ${max_green} b ${max_blue}`
	);
	if (valid && q1) {
		return game_id;
	}

	if (q2) {
		return max_red * max_green * max_blue;
	}

	return 0;
}

fs.readFile("input.txt", "utf8", (err, data) => {
	// fs.readFile("custom.txt", "utf8", (err, data) => {
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
