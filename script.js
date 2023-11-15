const input = document.querySelector('#fruit');
const suggestions = document.querySelector('.suggestions ul');

const fruit = ['Apple', 'Apricot', 'Avocado 🥑', 'Banana', 'Bilberry', 'Blackberry', 'Blackcurrant', 'Blueberry', 'Boysenberry', 'Currant', 'Cherry', 'Coconut', 'Cranberry', 'Cucumber', 'Custard apple', 'Damson', 'Date', 'Dragonfruit', 'Durian', 'Elderberry', 'Feijoa', 'Fig', 'Gooseberry', 'Grape', 'Raisin', 'Grapefruit', 'Guava', 'Honeyberry', 'Huckleberry', 'Jabuticaba', 'Jackfruit', 'Jambul', 'Juniper berry', 'Kiwifruit', 'Kumquat', 'Lemon', 'Lime', 'Loquat', 'Longan', 'Lychee', 'Mango', 'Mangosteen', 'Marionberry', 'Melon', 'Cantaloupe', 'Honeydew', 'Watermelon', 'Miracle fruit', 'Mulberry', 'Nectarine', 'Nance', 'Olive', 'Orange', 'Clementine', 'Mandarine', 'Tangerine', 'Papaya', 'Passionfruit', 'Peach', 'Pear', 'Persimmon', 'Plantain', 'Plum', 'Pineapple', 'Pomegranate', 'Pomelo', 'Quince', 'Raspberry', 'Salmonberry', 'Rambutan', 'Redcurrant', 'Salak', 'Satsuma', 'Soursop', 'Star fruit', 'Strawberry', 'Tamarillo', 'Tamarind', 'Yuzu'];


function clearList(){
	// to remove list items while the unordered list element has list items
	while(suggestions.firstChild){
		suggestions.removeChild(suggestions.firstChild);
	};
}

function search(str) {
	//creating array to put suggestions in
	let results = [];
	//creating a lowercase variable of the input value
	let lower = '';
	lower += str.toLowerCase();
	console.log(`current input: ${lower}`);

	for(let item of fruit){
		let smallFruit = item.toLowerCase();
		if (smallFruit.includes(lower)){
			results.push(item);
		};
	};

	return results;
}


function searchHandler(e) {
	//creating a variable with the value of the key pressed
	let typed = e.key;
	console.log(e);
	//logs for debugging
	console.log(`key pressed: ${typed}`);
	console.log(`Value of key pressed length: ${typed.length}`);

	//if the length of the key pressed is 1 to check if it's a letter, also if backspace was pressed
	if(typed.length === 1 || e.key === 'Backspace'){
		//if the input field is empty it clears the list
		if(input.value.length === 0){
			//calling clearList function, since there is nothing currently typed there will not be suggestions
			clearList();
		}
		//if the input value is not empty
		else{
		//calling the search function and saving the returned array to a variable
		const results = search(input.value);
		//creating a set saved as noDupes with the contents of the previous array, this removes any duplicates in the array
		const noDupes = [...new Set(results)];
		
		//logs for debugging
		console.log(noDupes);

		//calling the showSuggestions function inputting the set noDupes
		showSuggestions(noDupes);
		};
	}
	//if enter is pressed clear the list as the desired search is being made
	else if(typed === 'Enter'){
		//calling clearList function, since there shouldn't be suggestions if a fruit was searched
		clearList();
	};
}

function showSuggestions(results) {
	//calling clearList function, this clears the previous suggestions to allow refresh of new suggestions
	clearList();

	//creating a variable max with a value of 5, this can be changed for desired max amount of shown suggestions
	let max = 5;
	//if the results set has less than 5 suggestions it sets the maximum amount of suggestions to the lenght of the set
	if(results.length <= max){
		max = results.length;
	};
	//runs for the amount of maximum suggestions
	for(let i = 0;
		i < max;
		i++
		){
		//creating a new list item (suggestion)
		const nSuggestion = document.createElement('li');
		//setting the innertext of the new list element to the results set at the current index
		nSuggestion.innerText = results[i];
		//appending the list element as a child to the unordered list element
		suggestions.appendChild(nSuggestion);
		};
}

function useSuggestion(e) {
	//logs for debugging
	console.log(e.target);

	//runs if the clicked element was a list item
	if (e.target.tagName === 'LI'){
		//sets the input value as the clicked list elements inner text, selecting a fruit from given suggestions
		input.value = e.target.innerText;
		//calling clearList function, since a suggested fruit has been selected the suggestions are cleared
		clearList();
	};
}

input.addEventListener('keyup', searchHandler);
suggestions.addEventListener('click', useSuggestion);