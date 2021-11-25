function classToggle() {
	var togs = document.getElementById("intro");
	togs.classList.toggle('shown');
    togs.classList.toggle('hidden');
	
	var x = document.getElementById("icon");
	if (x.src.endsWith("info-off.png")){
		x.src = 'http://gradey.loganmclain.com/images/info-on.png';
	} 

	else if (x.src.endsWith("info-on.png")){
	x.src = 'http://gradey.loganmclain.com/images/info-off.png';
	}
}

var allGrades = ["78.33|A+", "75.00|A", "71.67|A-", "68.33|B+","65.00|B", "61.67|B-", "58.33|C+", "55.00|C", "51.67|C-", "48.33|D+", "45.00|D", "41.67|D-","38.33|E+", "35.00|E","31.67|E-", "28.33|F+","25.00|F", "21.67|F-","18.33|G+", "15.00|G","11.67|G-", "0.00|NG"];

function resetForm(){
	document.getElementById("themath").style.display = "none";
	document.getElementById("calc").style.display = "inline";
}

function getNumGrades(){
	var numGrades = document.querySelector('input[name="numgrade"]:checked').value;
	resetForm();
	listGrades(numGrades);
}

function listGrades(numGrades) {
	///make sure the grades element is blank
	document.getElementById("grades").innerHTML = "";
	
	///make fun of anyone looking to average a single grade, ffs.	
	if (numGrades == "1") {
		alert("You need to get the average of one grade?  Dougal, how did you get into the college? Was it like, collect twelve crisp packets and become a lecturer?");
		radiobtn = document.getElementById("default");
		radiobtn.checked = true;
		getNumGrades();
	} 
	
	///Generate the select options for the chosen number of grades to be averaged. 
	else {
		var sentinel = 0;
		while (sentinel < numGrades) {
			var newSelect = document.createElement("select");
			newSelect.setAttribute('id', "criteria" + (sentinel + 1));
			newSelect.setAttribute('size', '22');
			newSelect.setAttribute('class', 'gradelist');
			document.getElementById("grades").appendChild(newSelect);  
				for (option in allGrades) {
					var pair = allGrades[option].split("|");
					var newOption = document.createElement("option");
					newOption.value = pair[0];
					newOption.label = pair[1];
					newOption.innerHTML = pair[1];
					newSelect.options.add(newOption);
				}
			sentinel++;
		}
	return numGrades;
	}
} 

function clearGrades() {
	var select = document.getElementById("setnumgrades");
	var numGrades = document.querySelector('input[name="numgrade"]:checked').value;
	for (step = 0; step < numGrades; step++) {
		var x = "criteria" + (step + 1);
		document.getElementById(x).selectedIndex = "-1";
	}
}


function sumGrades() {
	var select = document.getElementById("setnumgrades");
	var numGrades = document.querySelector('input[name="numgrade"]:checked').value;
	var resultsArray = []
	try {
			for (step = 0; step < numGrades; step++) {
			var x = "criteria" + (step + 1);
			var select_id = document.getElementById(x);
			var selected_result = select_id.options[select_id.selectedIndex].value;
			resultsArray.push(parseFloat(selected_result));
		}
		totalGrades(resultsArray);
	}
	
	catch(err){
		alert("You didn't select enough grades.");
	}
}

function totalGrades(resultsArray) {
	var numGrades = document.querySelector('input[name="numgrade"]:checked').value;
	var total = 0;
	for (step = 0; step < resultsArray.length; step++) {
		total = total + resultsArray[step];
	}
	var averageResult = parseFloat(total)/numGrades;
	roundedResult = Math.round(averageResult.toFixed(2));
	var output = convertGrade(roundedResult);

	
	if (isNaN(roundedResult)) {
		document.getElementById("result").innerHTML = "You have to select criteria ye big eejit." ;
	}
	
	else {
		
		//Output result in HTML document
		document.getElementById("result").innerHTML = output;
		
		//Lists the values the user has entered
		document.getElementById("youselected").innerHTML = "" ;
		var ul = document.getElementById("youselected");
		for (x = 0; x < resultsArray.length; x++) {
			var li = document.createElement("li");
  			li.appendChild(document.createTextNode(convertGrade(resultsArray[x])));
  			ul.appendChild(li);
		}
		
		//Lists the selected values in a table with their numerical equivilent
		document.getElementById("enteredgrades").innerHTML = "" ;
		var tbody = document.getElementById("enteredgrades");
		for (x = 0; x < resultsArray.length; x++) {
				row = tbody.insertRow();
        		cell = row.insertCell();
        		cell.innerHTML = convertGrade(resultsArray[x]);	
				cell = row.insertCell();
        		cell.innerHTML = resultsArray[x];
					
		}
		
		//Lists the rest of the factors used in the calculation of the average overall grade
		document.getElementById("total").innerHTML = total ;
		document.getElementById("num_grades").innerHTML = numGrades ;
		document.getElementById("average").innerHTML = averageResult;
		document.getElementById("rounded").innerHTML = roundedResult;
		document.getElementById("output").innerHTML = output;
		
		//swaps the visibility of the input and output divs
		document.getElementById("calc").style.display = "none";
		document.getElementById("themath").style.display = "inline";
	
	clearGrades();
	}
}



function convertGrade(roundedResult) {
		
		switch(true) {
			
			case (roundedResult <= 100.00 && roundedResult >= 76.67):
				return "A+";
				break;
		
			case (roundedResult <= 76.66 && roundedResult >= 73.33):
				return "A";
				break;
		
			case (roundedResult <= 73.32 && roundedResult >= 70.00):
				return "A-";
				break;
				
			case (roundedResult <= 69.90 && roundedResult >= 66.67):
				return "B+";
				break;
				
			case (roundedResult <= 66.66 && roundedResult >= 63.33):
				return "B";
				break;
				
			case (roundedResult <= 63.32 && roundedResult >= 60.00):
				return "B-";
				break;
				
			case (roundedResult <= 59.99 && roundedResult >= 56.67):
				return "C+";
				break;
				
			case (roundedResult <= 56.66 && roundedResult >= 53.33):
				return "C";
				break;

			case (roundedResult <= 53.32 && roundedResult >= 50.00):
				return "C-";
				break;
				
			case (roundedResult <= 49.99 && roundedResult >= 46.67):
				return "D+";
				break;
				
			case (roundedResult <= 46.66 && roundedResult >= 43.33):
				return "D";
				break;

			case (roundedResult <= 43.32 && roundedResult >= 40.00):
				return "D-";
				break;
				
			case (roundedResult <= 39.99 && roundedResult >= 36.67):
				return "E+";
				break;
				
			case (roundedResult <= 36.66 && roundedResult >= 33.33):
				return "E";
				break;

			case (roundedResult <= 33.32 && roundedResult >= 30.00):
				return "E-";
				break;
				
			case (roundedResult <= 29.99 && roundedResult >= 26.67):
				return "F+";
				break;
				
			case (roundedResult <= 26.66 && roundedResult >= 23.33):
				return "F";
				break;

			case (roundedResult <= 23.32 && roundedResult >= 20.00):
				return "F-";
				break;

			case (roundedResult <= 19.99 && roundedResult >= 16.67):
				return "G+";
				break;
				
			case (roundedResult <= 16.66 && roundedResult >= 13.33):
				return "G";
				break;

			case (roundedResult <= 13.32 && roundedResult >= 0.02):
				return "G-";
				break;
				
			case (roundedResult <= 0.01):
				return "NG";
				break;
				
			default:
				break;
				///return "Something went wrong, for feck sake.";
		}
}
