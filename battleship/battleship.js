

//视图： 展示消息，展示击中效果，展示未击中效果
var view = {
	displayMessage: function(msg) {
		var messageArea = document.getElementById("messageArea");
		messageArea.innerHTML = msg;
	},
	displayHit: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute('class', 'hit');
	},
	displayMiss: function(location) {
		var cell = document.getElementById(location);
		cell.setAttribute("class", "miss");
	}
};


function view_test() {
	view.displayMessage("hello world");
	view.displayHit("20");
	view.displayMiss("33");
}

// view_test();



//游戏区域、船只个数、位置、击中状态； 击中未击中状态切换方法
var model = {
	boardSize: 7,
	numShips: 3,
	shipLength: 3,
	shipsSunk: 0,
	
	ships: [
		{locations: ["10", "20", "30"], hits: ["", "", ""]},
		{locations: ["32", "33", "34"], hits: ["", "", ""]},
		{locations: ["63", "64", "65"], hits: ["", "", "hit"]}
	],

	fire: function(guess) {
		for (var i=0; i<this.shipLength; i++) {
			var ship = this.ships[i];
			var index = ship.locations.indexOf(guess);
			if (index >= 0) {
				ship.hits[index] = "hit";
				view.displayHit(guess);
				view.displayMessage("Hit!");
				if (this.isSunk(ship)) {
					this.shipsSunk++;
					view.displayMessage("You sank my battleship!");
				}
				return true;
			}
		}
		view.displayMiss(guess);
		view.displayMessage("Miss!");
		return false;
	},

	isSunk: function(ship) {
			if (ship.hits.indexOf("") == -1) {
				return true;
			} else {
				return false;
			}
	}
};


// 测试
function model_test() {
	model.fire("44");
	model.fire("45");
	model.fire("46");

	model.fire("63");
	model.fire("65");

	model.fire("10");
	model.fire("20");
	model.fire("30");
}

// model_test();










//验证、解析输入的位置
function parseGuess(guess) {
	var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

	if (guess === null || guess.length !== 2) {
		alert("oop, please enter a letter and a number on the board.");
	} else {
		var firstChar = guess.charAt(0);
		var row  = alphabet.indexOf(firstChar);
		var column = guess.charAt(1);

		if (isNaN(row) || isNaN(column)) {
			alert("oops, that's isn't on the board!");
		} else if (row < 0 || row >= model.boardSize || column < 0 || column >= model.boardSize) {
			alert("oops, that's off the board!");
		} else {
			return row + column ;
		}
		
	}
	return null;
}


function test_parseGuess() {
	console.log(parseGuess("A0"));
	console.log(parseGuess("AO"));
	console.log(parseGuess("B6"));
	console.log(parseGuess("G3"));
	console.log(parseGuess("H0"));
	console.log(parseGuess("A7"))
}

// test_parseGuess();


//射击计数、检测游戏结束与否
var controller = {
	guesses:0,
	processGuess: function(guess) {
		var location = parseGuess(guess);
		if (location) {
			this.guesses++;
			var hit = model.fire(location);
			if (hit && model.shipsSunk === model.numShips) {
				view.displayMessage("You sank all my battles, in " + this.guesses + " guesses");
			}

		}
	}
};












//点击事件
function handleFireButton() {
	var guessInput = document.getElementById("guessInput");
	var guess = guessInput.value;
	controller.processGuess(guess);
	guessInput.value = "";
}


//键盘事件
function handleKeyPress(e) {
	console.log(e.keyCode);
	var fireButton = document.getElementById("fireButton");
	if (e.keyCode == 13) {
		fireButton.click();
		return false;
	}
}

// 初始化函数
function init() {
	var fireButtton = document.getElementById("fireButton");
	fireButtton.onclick = handleFireButton;
	var guessInput = document.getElementById("guessInput");
	guessInput.onkeypress = handleKeyPress;
}

//页面加载完后执行代码
window.onload = init;









