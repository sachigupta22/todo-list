const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

let LIST, id;
 //get item from local storage
let data = localStorage.getItem("TODO");
//check if data is not empty
if(data){
  LIST = JSON.parse(data);
  id = LIST.length;
  loadList("LIST");
}
else{
LIST = [];
id = 0;
}

//load items to the user interface
function loadList(array){
  array.forEach(function(item){
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

clear.addEventListener("click", function(){
  localStorage.clear();
  location.reload();
});

const dateobj = new Date();
function pad(n) {return n < 10 ? "0"+n : n;}

let longMonth = date.toLocaleString('en-us', { month: 'long' }); /* June */
let shortMonth = date.toLocaleString('en-us', { month: 'short' }); /* Jun */
let narrowMonth = date.toLocaleString('en-us', { month: 'narrow' }); /* J */
var  months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"];
var d = new Date();
var monthName=months[d.getMonth()]; // "July" (or current month)
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var dayName = days[d.getDay()];
dateElement.innerHTML = pad(dateobj.getDate())+" "+months[d.getMonth()]+", "+days[d.getDay()];

function addToDo(toDo, id, done, trash){
if(trash){ return; }
const DONE = done ? CHECK : UNCHECK;
const LINE = done ? LINE_THROUGH : "";
  const item = `
             <li class="item">
             <i class="fa ${DONE} co" job="complete" id="${id}"></i>
             <p class="text ${LINE}">${toDo}</p>
             <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
             </li?
             `;
 const position = "beforeend";
  list.insertAdjacentHTML(position, item);
}
//add an item to the list when user presses enter key
document.addEventListener("keyup",function(event){
   if(event.keyCode == 13){
    const toDo = input.value;
    if(toDo){
      addToDo(toDo, id, false, false);
      LIST.push({
        name : toDo,
        id : id,
        done : false,
        trash : false,
      });
      //add item to local storage
      localStorage.storeItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
  });

function completeToDo(element){
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

function removeToDo(element){
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

list.addEventListener("click", function(event){
  const element = event.target; //return the clicked element inside list
  const elementJob = element.attributes.job.value; //complete or delete
  if(elementJob == "complete"){
  completeToDo(element);
} else if (elementJob == "delete") {
  removeToDo(element);
}
//add item to local storage
localStorage.storeItem("TODO", JSON.stringify(LIST));
});

