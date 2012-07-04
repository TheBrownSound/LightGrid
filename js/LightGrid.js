// NOTE: Assumes jQuery is available

// LightGrid v1.0
var LightGrid = (function(){
	
	// Private Variables
	var lights = [];
	var timer;
	var elaspedTime = 0;
	var rows = 4;
	var columns = 4;
	var difficulty = "easy";
	var scrambleAmount = 10;

	// Private Methods
	function buildLights() {
		$("#lights").removeClass("complete");
		var lightContainer = document.getElementById("lights");
		$('.light').remove( );
		var numOfLights = rows * columns;
		lightContainer.style.width = columns*60 + "px";
		for (var i = 0; i < numOfLights; i++) {
			var light = document.createElement('a');
			light.setAttribute('id', i);
			light.setAttribute('class', 'light');
			
    		$(light).bind("click" ,function(num) {
    	    	return function() {
    	        	toggleLight(num);
    	    	}
    		}(i));
	
    		lightContainer.appendChild(light);
    		lights.push(light);
		}
	}

	function scrambleLights() {
		for (var i=0; i<scrambleAmount; i++) {
			var randomNum = Math.floor(Math.random()*lights.length);
			toggleLight(randomNum);
		}
	}

	function toggleLight(index) {
		var lightsToToggle = adjacentLights(index);
		$(lights[index]).toggleClass("off");
		for (var i=0; i<lightsToToggle.length; i++) {
			$(lightsToToggle[i]).toggleClass("off");
		}
		if ($("#lights a.off").length < 1) {
			winCondition();
		}
	}

	function adjacentLights(index) {
		// Will return an array of elements next to the provided element
		var result = [];
		var column = index % columns;
    	var row = Math.floor( index / columns );
		for (var i=0; i<lights.length; i++) {
			var lightRow = Math.floor( i / columns );
			if (((i == index-1 || i == index+1) && lightRow == row) || /* left or right */
				(i == index - columns || i == index + columns)) { /* above or below */
				result.push( lights[i] );
			}
		}
		return result;
	}

	function startTimer() {
		elaspedTime = 0;
		displayElapsedTime();
		if (timer) {
			window.clearInterval(timer);
		}
		timer = window.setInterval(addSecondToElapsedTime, 1000);
	}

	function addSecondToElapsedTime() {
		elaspedTime += 1000;
		displayElapsedTime();
	}

	function displayElapsedTime() {
		var seconds = elaspedTime / 1000;
		var m = Math.floor(seconds/60);
		var s = Math.round(seconds - (m * 60));
	
		// Add leading zeros to one-digit numbers.
		if (m < 10) {
		  m = "0" + m;
		}
		if (s < 10) {
		  s = "0" + s;
		}
		$("#timer span.time").html( m + ":" + s );
	}

	function winCondition() {
		$("#lights").addClass("complete");

		$('#lights .light').each(function(index) {
    		$(this).unbind("click");
		});

		window.clearInterval(timer);
		console.log("winCondition", "Complete!")
	}

	// Public
	return {
		// Variables
		modes: ["easy","normal","hard"],

		// Methods
		setMode: function(diff) {
			difficulty = diff;
			switch (difficulty) {
				case 'easy':
					rows = columns = 4;
					scrambleAmount = 10;
				break;
				case 'normal':
					rows = columns = 5;
					scrambleAmount = 60;
				break;
				case 'hard':
					rows = columns = 6;
					scrambleAmount = 100;
				break;
			}
			$(".button.selected").removeClass("selected");
			$(".button."+diff).addClass("selected");
			lights = [];
			buildLights();
			scrambleLights();
			startTimer();
		},

		reset: function() {
			LightGrid.setMode(difficulty);
		}
	}

})();// () Triggers function to return public methods

window.onload = function () {
	LightGrid.setMode(LightGrid.modes[0]);
}