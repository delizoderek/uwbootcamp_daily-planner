// Variables for holding the code controlled html elements
let currentDay = $("#currentDay");
let tablePlanner = $("#planner-table");
let allRows = $("textarea[name]");

// Variables for tracking the current hour and text in the planner timeslots
let currHour = 0;
let timeslotText = Array(allRows.length).fill("");

// Keeps track of the current day and current hour of the day. Calls renderTimeslotStyles to update the css class
let dayCounter = setInterval(function(){
    let today = moment();
    currHour = today.hour();
    currentDay.text(today.format("[Today is] dddd, MMMM Do, YYYY hh:mm:ss A"));
    renderTimeslotStyles();
},1000);

// Sets the background of all text areas, then loads in the stored values if they exist
function init(){
    // Set a default background
    allRows.addClass("form-control past");
    let tempArr = JSON.parse(localStorage.getItem("timeslot-text"));
    if(tempArr !== null){
        timeslotText = tempArr;
        for(let slotEl of allRows){
            let index = Math.floor(Number($(slotEl).attr("name")));
            $(slotEl).text(timeslotText[index - 9]);
        }
    }
}

// Sets the correct css class for the time slot depending on if it is in the past, present, or future
function renderTimeslotStyles(){
    for(let area of allRows){
        let slotNumber = Number($(area).attr("name"));
        //if the name is less than the current hour set class to past
        if(slotNumber < currHour /*currHour*/){
            $(area).removeClass("present");
            $(area).removeClass("future");
            $(area).addClass("past");
        } else if (slotNumber == currHour/*currHour*/){
            $(area).removeClass("future");
            $(area).removeClass("past");
            $(area).addClass("present");
        } else {
            $(area).removeClass("past");
            $(area).removeClass("present");
            $(area).addClass("future");
        }
    }
}

// Listens for when the save button is clicked, then saves the text to local storage
tablePlanner.on("click","#save",function(event){
    event.preventDefault();
    let saveBtn = event.target;
    let textArea = $(saveBtn).parent().siblings().children().first();
    let slotIndex = Number(textArea.attr("name")) - 9;
    timeslotText[slotIndex] = textArea.val();
    localStorage.setItem("timeslot-text",JSON.stringify(timeslotText));
});


init();