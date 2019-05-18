var NumCircles = 6;
var colors =[];
var pickedColor;

var circles = document.querySelectorAll(".circle");
var titleColor = document.querySelector("#titleColor");
var selectionR = document.querySelector("#selectionR");
var h1 = document.querySelector("h1");
var ResetB=document.querySelector("#ResetButton");

init();

function init(){
	//mode button event listeners
	setupModeButtons();
	setupCircles();
	reset();
}

function setupModeButtons(){
	var modeButtons=document.querySelectorAll(".mode")
	for (var i=0; i<modeButtons.length;i++){
		modeButtons[i].addEventListener("click", function(){
			modeButtons[0].classList.remove("selected");
			modeButtons[1].classList.remove("selected");
			this.classList.add("selected");

			//if the text Content is Easy, its 3 circles, otherwise its 6 circles
			this.textContent === "EASY" ? NumCircles = 3: NumCircles = 6;
			reset();
		});
	}
}

function setupCircles(){
	for (var i=0; i<circles.length;i++){
		circles[i].addEventListener("click", function(){
			//save the clicked color into a variable
			var clickedColor  = this.style.backgroundColor;
			if (clickedColor === pickedColor){
				ResetB.innerHTML="Play Again?  "
				 selectionR.innerHTML = "CORRECT!"
				 //Once the correct color is clicked, change the color of all the circles to that color
				 changeColors(pickedColor);
				 //change the h1 color
				 h1.style.background=pickedColor;

			} 
			else {
				selectionR.innerHTML = "TRY AGAIN!"
				this.style.backgroundColor = "#232323";
			}
		});
	}
}

function reset(){
		//Generate the array with colors
		colors = generateRColors(NumCircles);
		//pick a target color
		pickedColor = pickColor();
		titleColor.innerHTML=pickedColor;

		//change the screen text accordingly
		selectionR.textContent = "";
		ResetButton.textContent = "New Colors?";
		h1.style.backgroundColor="steelblue"

		//Decide how many circles to display
		for (var i=0; i<circles.length;i++){
			//If a color exists (not undefined) then show all
			if (colors[i]){
				circles[i].style.display = "block";
				circles[i].style.background = colors[i];
			}
			//if a color is undefined for that number (i.e. 3-6) then hide the circle
			else {
				circles[i].style.display = "none";
			}

		}
}

function generateRColors(num){
	var arr=[];
		for (var i=0; i<num; i++){
			arr[i] = generateEachColor();
		}
	return arr;
}

function generateEachColor() {
	var r = Math.floor(Math.random() * 256);
	var g = Math.floor(Math.random() * 256);
	var b = Math.floor(Math.random() * 256);
	return "rgb(" + r + ", " + g + ", " + b + ")";
}


function changeColors(correctColor){
	for (var i=0; i<circles.length;i++){
		circles[i].style.backgroundColor=correctColor;
	}
}

function pickColor() {
	//Only picks colors from the updated the color array (either 1-3 or 1-6) because of the Numcircles variable
	var random = Math.floor(Math.random() * colors.length);
	return colors[random];
}


ResetB.addEventListener("click", function(){
		reset();
});
