let currentDay = $("#currentDay");
let tablePlanner = $("#planner-table");
let allRows = $("textarea[name]");

let currHour = 0;
let timeslotText = Array(allRows.length).fill("");

// Time interval that updates the day
let dayCounter = setInterval(function(){
    let today = moment();
    currHour = today.hour();
    currentDay.text(today.format("[Today is] dddd, MMMM Do, YYYY hh:mm:ss A"));
    renderTimeslotStyles();
},1000);

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

function renderTimeslotStyles(){
    for(let area of allRows){
        let slotNumber = Number($(area).attr("name"));
        //$(area).attr("class","");
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

tablePlanner.on("click","#save",function(event){
    event.preventDefault();
    let saveBtn = event.target;
    let textArea = $(saveBtn).parent().siblings().children().first();
    let slotIndex = Number(textArea.attr("name")) - 9;
    timeslotText[slotIndex] = textArea.val();
    localStorage.setItem("timeslot-text",JSON.stringify(timeslotText));
});

init();