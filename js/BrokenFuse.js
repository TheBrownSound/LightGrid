//NOTE: Assumes jQuery is available

// BrokenFuse v1.0
var BrokenFuse = {
	rows: 4,
	columns: 4,
	lights: []
}

var setDifficulty = function(diff) {
	switch (diff) {
		case 'easy':
			BrokenFuse.rows = BrokenFuse.columns = 4;
		break;
		case 'normal':
			BrokenFuse.rows = BrokenFuse.columns = 6;
		break;
		case 'hard':
			BrokenFuse.rows = BrokenFuse.columns = 8;
		break;
	}
	BrokenFuse.lights = [];
	buildLights();
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
            	toggleLights(num);
        	}
    	}(i);

    	lightContainer.appendChild(light);
    	BrokenFuse.lights.push(light);
	}
}

var toggleLights = function(index) {
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
		if ((i == index-1 || i == index+1) && lightRow == row) {
			result.push(BrokenFuse.lights[i]);
		} else if (i == index-BrokenFuse.columns || i == index+BrokenFuse.columns) {
			result.push(BrokenFuse.lights[i]);
		}
	}
	return result;
}

window.onload = function () {
	buildLights();
}