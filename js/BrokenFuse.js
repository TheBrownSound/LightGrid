//NOTE: Assumes jQuery is available

// BrokenFuse v1.0
var BrokenFuse = {}

var setDifficulty = function(diff) {
	switch (diff) {
		case 'easy':
			BrokenFuse.rows = BrokenFuse.columns = 4;
			BrokenFuse.scrambleAmount = 10;
		break;
		case 'normal':
			BrokenFuse.rows = BrokenFuse.columns = 6;
			BrokenFuse.scrambleAmount = 60;
		break;
		case 'hard':
			BrokenFuse.rows = BrokenFuse.columns = 8;
			BrokenFuse.scrambleAmount = 100;
		break;
	}
	BrokenFuse.lights = [];
	buildLights();
	scrambleLights();
}

var buildLights = function() {
	var lightContainer = document.getElementById("lights");
	var numOfLights = BrokenFuse.rows * BrokenFuse.columns;
	lightContainer.style.width = BrokenFuse.columns*60 + "px";
	lightContainer.innerHTML = "";//Clears any exisiting elements
	for (var i = 0; i < numOfLights; i++) {
		var light = document.createElement('a');
		light.setAttribute('id', i);
		light.setAttribute('class', 'light');
		
    	light.onclick = function(num) {
        	return function() {
            	toggleLight(num);
        	}
    	}(i);

    	lightContainer.appendChild(light);
    	BrokenFuse.lights.push(light);
	}
}

var scrambleLights = function() {
	for (var i=0; i<BrokenFuse.scrambleAmount; i++) {
		var randomNum = Math.floor(Math.random()*BrokenFuse.lights.length);
		toggleLight(randomNum);
	}
}

var toggleLight = function(index) {
	var lightsToToggle = adjacentLights(index);
	$(BrokenFuse.lights[index]).toggleClass("off");
	for (var i=0; i<lightsToToggle.length; i++) {
		$(lightsToToggle[i]).toggleClass("off");
	}
}

var adjacentLights = function(index) {
	//Will return an array of elements next to the provided element
	var result = [];
	var column = index%BrokenFuse.columns;
    var row = Math.floor(index/BrokenFuse.columns);
	for (var i=0; i<BrokenFuse.lights.length; i++) {
		var lightRow = Math.floor(i/BrokenFuse.columns);
		if (((i == index-1 || i == index+1) && lightRow == row) || /* left or right */
			(i == index-BrokenFuse.columns || i == index+BrokenFuse.columns)) { /* above or below */
			result.push(BrokenFuse.lights[i]);
		}
	}
	return result;
}

window.onload = function () {
	setDifficulty('easy');
}