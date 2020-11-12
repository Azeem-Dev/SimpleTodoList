const listData = document.querySelector("[data-list]");
// Form button and input values
const input=document.querySelector('[data-new-list-item-text]');
const button=document.querySelector('[data-new-list-item-button]');


// right list
const heading=document.querySelector('.selected-list-task');

let selectedItemId;
let listItemArray=[];
let i=0;


let list=[];

// EventListener on our button
button.addEventListener('click',function(event){
	// as form has a default behaviour of page refresh this line stops that bheaviour happening
	event.preventDefault();
	addingToList()
});


// adding value to a new list item
function addingToList(){
	inputIsEmpty();
}

// Checking whether input field is empty or filled
function inputIsEmpty(){

	if(!(input.value === '' || input.value==null)){

		let inputObj={
			id:""+Date.now(),
			value:input.value,
			tasks:[],
		}

		list.push(inputObj);

		createListItem(input.value);

	}
}

// Creating a new list item
function createListItem(value){
	let listItem=document.createElement('li');
	listItem.innerText=value;
	appendListItem(listItem,listData);
}


// Appending that list item to our list
function appendListItem(listItem,list){
	// creating a dataelement and setting it as list-id
	listItem.dataset.listId=(i++);
	list.appendChild(listItem);
	input.value="";
}


// Checking which item in the list was selected and adding a class to it while deleting other items same class

listData.addEventListener('click',e=>{

// saving id of every list item on this variable
let tempid;
let targettedItemValue;

// getting an array of complete list items
let listItems = document.querySelectorAll('.task-list li');

	if(e.target.tagName.toLowerCase()==='li'){
		// e.target is our clicked li
		// assigning a class to the clicked li
		e.target.classList.add('clicked');
		// Getting selected element listId
		selectedItemId=e.target.getAttribute('data-list-id');
		targettedItemValue=e.target.innerText;
		
	}

	// Checking our whole list items for clicked class
	listItems.forEach(li=>{
		// saving its listId to our temporary variable
		tempid=li.getAttribute('data-list-id');

		if(li.classList.contains('clicked') && tempid !== selectedItemId){
			li.classList.remove('clicked');
		}
	});


	heading.innerText=targettedItemValue;

});
