const listData = document.querySelector("[data-list]");
// Form button and input values
const input=document.querySelector('[data-new-list-item-text]');
const button=document.querySelector('[data-new-list-item-button]');


// right list
const heading=document.querySelector('.selected-list-task');
const taskInput=document.querySelector('[data-new-list-item-text-task]');
const taskAddButton=document.querySelector('[data-new-list-item-button-task]');
let taskElementsChecker = document.querySelectorAll('.tasks .task input');
const taskLabel=document.querySelectorAll('.tasks .task input label');
let taskClicked=document.querySelectorAll('.task');
const tasks = document.querySelector('.tasks');

// Creating a template element in main html and trying to access it using js
const taskTemplate=document.querySelector('#task-template');

let selectedItemId;
let i=0;
let selectedItemValue;
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
		selectedItemValue=targettedItemValue;
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

// Toggle strikethrough in task list

taskClicked.forEach(task=>{
task.addEventListener('click',gettingCheckedArray);
});



// Checking which checkbox was selected and making sure we apply a strikethrough on it
function gettingCheckedArray(){
	//Making an index variable so that we can change the elements of array
	let index=0;
	let notSelected=[];

	taskElementsChecker.forEach(task=>{
		index++;

		if (task.checked===true) {

			taskClicked[index-1].classList.add('checkedStrikeThrough');
		}
		else{

			notSelected.push(taskClicked[index-1]);

			notSelected.forEach(not=>{
				not.classList.remove('checkedStrikeThrough');
			});
			
		}
		
	});

}


// Task add button control
taskAddButton.addEventListener('click',add=>{
	add.preventDefault();
	// Loading the template into our js file
	const taskElement=document.importNode(taskTemplate.content,true);
	const checkbox=taskElement.querySelector('input');
	// checkbox.checked=false;
	let newIdforCheckbox=Date.now();
	checkbox.id=newIdforCheckbox;
	const label =taskElement.querySelector('label');
	label.htmlFor=newIdforCheckbox;
	let inputValue=taskInput.value;
	label.append(inputValue);
	tasks.appendChild(taskElement);
	taskInput.value='';

	// Updating after every button click about new element that was added

	taskElementsChecker = document.querySelectorAll('.tasks .task input');
	taskClicked=document.querySelectorAll('.task');


	// Toggle strikethrough in task list

	taskClicked.forEach(task=>{
	task.addEventListener('click',gettingCheckedArray);
	});

});

