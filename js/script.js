$(document).ready(function () {
// planner data
    const plannerData = {
        planner: [
            {
                timeBlock: 8,
                available: true,
                task: ""
            },
            {
                timeBlock: 9,
                available: true,
                task: ""
            },
            {
                timeBlock: 10,
                available: true,
                task: ""
            },
            {
                timeBlock: 11,
                available: true,
                task: ""
            },
            {
                timeBlock: 12,
                available: true,
                task: ""
            },
            {
                timeBlock: 13,
                available: true,
                task: ""
            },
            {
                timeBlock: 14,
                available: true,
                task: ""
            },
            {
                timeBlock: 15,
                available: true,
                task: ""
            },
            {
                timeBlock: 16,
                available: true,
                task: ""
            },
            {
                timeBlock: 17,
                available: true,
                task: ""
            }
        ]
    }

    // localStorage.setItem("plannerData-jq", JSON.stringify(plannerData));
// get DOM elements
    let plannerList = $("#planner-list");
    let currentDay = $("#currentDay");

// get today's date
    const today = moment().format("MMMM Do YYYY");


// get current hour
    /*  hard code hour to test styles */
    //const currHour = 14;
    /* using moment will make the code work as intended. */
     const currHour = moment().format("H");

// get current minute
    // const currMin = moment().format("mm");

    // add today's date to the DOM
    currentDay.text(today)


    /*  populate planner list */
// function to add items to the planner
    function addItem(item) {
        let li = $("<li></li>");
        li.addClass("row");
        let timeVal = "";
        let task = "";

        // btn.on("click", saveItem(item.timeBlock));

        // get the appropriate style choice based on current time.
        let styleChoice = checkTime(item.timeBlock);

        // set the time display for x:00 am or pm
        if (parseInt(item.timeBlock) < 12) {
            timeVal = `${item.timeBlock}:00 am`;
        } else if (parseInt(item.timeBlock) === 12){
            timeVal = `${item.timeBlock}:00 pm`;
        } else {
            let temp = parseInt(item.timeBlock);
            temp = temp - 12;
            timeVal = `${temp}:00 pm`
        }

        // check if there is a task listed.
        if (item.task) {
            task = item.task
        }

        // setup the html for each list item.

        /* This version of the append uses template literals */
        li.append(`
            <h5 class="hour">${timeVal}</h5>
            <textarea id="text-${item.timeBlock}" class="description ${styleChoice}">${item.task}</textarea>
            <button 
                class="saveBtn"
                id="btn-${item.timeBlock}"
            >
                <i class="fas fa-save fa-2x"></i>                
            </button>  
        `)

        /* This version of the append doesn't use template literals */
        // li.append("<h5 class='hour'>" + timeVal + "</h5>" +
        //     '<textarea id="text-' + item.timeBlock + '" class="description '
        //     + styleChoice + '"' +
        //     ">" + task +
        //     "</textarea>" +
        //     "<button class='saveBtn' id='btn-"
        //     + item.timeBlock + "'"
        //     + " >"
        //     + "<i class='fas fa-save fa-2x'></i> "
        //     + "</button>"
        // )

        // append the item to the DOM
        plannerList.append(li)
    }


// function to check curr time against time blocks
    function checkTime(time) {
        let result = ""

        // compare the times.
        if (time === parseInt(currHour)) {
            result = "present";
        } else if (time < parseInt(currHour)) {
            result = "past"
        } else {
            result = "future"
        }
        return result
    }


// function populates the planner
    function populatePlanner() {
        // check if there's saved data and load it.
        let savedData = {}
        if (localStorage.getItem("plannerData-jq")) {
            savedData = JSON.parse(localStorage.getItem("plannerData-jq"));
            plannerData.planner = savedData.planner;
        }


        // populate the DOM with each time block.
        plannerData.planner.forEach(hour => addItem(hour));

        // call getButtons to get a reference to the button elements in the DOM.
        getButtons();

    }

// function that gets all the buttons on the DOM
    function getButtons() {
        // get a reference to all the buttons
        let btn = $("button");
        // btn.classList.add("saveBtn")
        /*
        add a click function to each button that will get each buttons unique id based on the unique event when
        clicked using the "this" keyword.
        Then, get only the number of the id to pass into the saveItems function using substring method.
         */

        btn.click(function () {
            let btnID = $(this).attr("id");
            let val = btnID.substr(4);
            saveItems(parseInt(val))
        })
    }


// function to save item and the planner.
    function saveItems(item) {
        let id = `#text-${item}`
        console.log(id);
        let task = $(id).val(); // get the task value.
        console.log(task)
        // loop through the array to update the task data.
        plannerData.planner.forEach(hour => {
            if (hour.timeBlock === item) {
                if (task !== "") {
                    hour.available = false;
                    hour.task = task
                } else {
                    hour.available = true;
                    hour.task = task
                }
                return hour
            } else return hour
        });

        // save the data to local storage.
        localStorage.setItem("plannerData-jq", JSON.stringify(plannerData));

    }


    populatePlanner();
})

