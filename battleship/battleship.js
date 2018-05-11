
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


var model = {
	boardsize: 7,
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

model_test();