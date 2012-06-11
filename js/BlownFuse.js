//NOTE: Assumes jQuery is available

// BlownFuse v1.0
var BlownFuse = {}

var setDifficulty = function(diff) {
	switch (diff) {
		case 'easy':
			BlownFuse.rows = BlownFuse.columns = 4;
			BlownFuse.scrambleAmount = 10;
		break;
		case 'normal':
			BlownFuse.rows = BlownFuse.columns = 6;
			BlownFuse.scrambleAmount = 60;
		break;
		case 'hard':
			BlownFuse.rows = BlownFuse.columns = 8;
			BlownFuse.scrambleAmount = 100;
		break;
	}
	BlownFuse.lights = [];
	buildLights();
	scrambleLights();
}

var buildLights = function() {
	var lightContainer = document.getElementById("lights");
	var numOfLights = BlownFuse.rows * BlownFuse.columns;
	lightContainer.style.width = BlownFuse.columns*60 + "px";
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
    	BlownFuse.lights.push(light);
	}
}

var scrambleLights = function() {
	for (var i=0; i<BlownFuse.scrambleAmount; i++) {
		var randomNum = Math.floor(Math.random()*BlownFuse.lights.length);
		toggleLight(randomNum);
	}
}

var toggleLight = function(index) {
	var lightsToToggle = adjacentLights(index);
	$(BlownFuse.lights[index]).toggleClass("off");
	for (var i=0; i<lightsToToggle.length; i++) {
		$(lightsToToggle[i]).toggleClass("off");
	}
	if ($("#lights a.off").length < 1) {
		console.log("YOU WIN!!!");
	}
}

var adjacentLights = function(index) {
	//Will return an array of elements next to the provided element
	var result = [];
	var column = index%BlownFuse.columns;
    var row = Math.floor(index/BlownFuse.columns);
	for (var i=0; i<BlownFuse.lights.length; i++) {
		var lightRow = Math.floor(i/BlownFuse.columns);
		if (((i == index-1 || i == index+1) && lightRow == row) || /* left or right */
			(i == index-BlownFuse.columns || i == index+BlownFuse.columns)) { /* above or below */
			result.push(BlownFuse.lights[i]);
		}
	}
	return result;
}

window.onload = function () {
	setDifficulty('easy');
}