let currentDay = $("#currentDay");
let tablePlanner = $("#planner-table");
let allRows = $("textarea[name]");

let currHour = 0;
let timeslotText = Array(allRows.length);

// Time interval that updates the day
let dayCounter = setInterval(function(){
    let today = moment();
    currHour = today.hour();
    currentDay.text(today.format("[Today is] dddd, MMMM Do, YYYY hh:mm:ss a"));
    renderTimeslotStyles();
},1000);

function init(){
    // Set a default background
    allRows.addClass("past");

    let tempArr = JSON.parse(localStorage.getItem("timeslot-text"));
    if(tempArr !== null){
        timeslotText = tempArr;
        // TODO: If there is local storage set the textarea text
    }
}

function renderTimeslotStyles(){
    for(let area of allRows){
        let slotNumber = Number($(area).attr("name"));
        $(area).attr("class","");
        //if the name is less than the current hour set class to past
        if(slotNumber < currHour){
            $(area).addClass("past");
        } else if (slotNumber == currHour){
            $(area).addClass("present");
        } else {
            $(area).addClass("future");
        }
    }
}

tablePlanner.on("click","#save",function(event){
    event.preventDefault();
    let saveBtn = event.target;
    let textArea = $(saveBtn).parent().siblings().children().first();
    let slotIndex = Number(textArea.attr("name")) - 9;
    timeslotText[slotIndex] = textArea.val();
    localStorage.setItem("timeslot-text",JSON.stringify(timeslotText));
});

init();
// TODO: Color coding time slots based on current time
    // TODO: Get current hour
    // TODO: Loop through the textarea table rows and compare the hour timeslot with the current hour
// TODO: Click event for when the time slot is saved
// TODO: Saving the current planner to local storage
// TODO: Loading planner from local storage