// NIGHT MODE

var body = document.querySelector("body"),
  sidebar = body.querySelector(".sidebar"),
  toggle = body.querySelector(".toggle"),
  searchBtn = body.querySelector(".search-box"),
  modeSwitch = body.querySelector(".toggle-switch"),
  modeText = body.querySelector(".mode-text");

toggle.addEventListener("click", () => {
  sidebar.classList.toggle("close");
});
searchBtn.addEventListener("click", () => {
  sidebar.classList.remove("close");
});
modeSwitch.addEventListener("click", () => {
  body.classList.toggle("dark");

  if (body.classList.contains("dark")) {
    modeText.innerText = "Mode Jour";
  } else {
    modeText.innerText = "Mode Nuit";
  }
});

//******************TASK MANAGER*********************//

//** VAR **//
var e = 1;
var dateControl = document.getElementById("date");
var inputTitle = document.querySelector(".task-manager-input-title");
console.log(inputTitle);
var selectImportance = document.querySelector(
  ".task-manager-content-left-selected"
);
console.log(selectImportance);
var inputDatePicker = document.querySelector(
  ".task-manager-content-left-input-datepicker"
);
console.log(inputDatePicker);
var buttonAddEvent = document.querySelector(
  ".task-manager-content-left-button-add-event"
);
console.log(buttonAddEvent);

//** DATE VALUE **/

inputDatePicker.min = new Date().toISOString().split("T")[0];
inputDatePicker.valueAsDate = new Date();
dateControl.valueAsDate = new Date();

dateControl.addEventListener("change", () => {
  console.log(dateControl.value);
  updateEventToBodyContent();
});

//** CREATE EVENT **//

function changeDataToDateControl() {
  var nbrOfDataToDateControl = localStorage.getItem(dateControl.value);

  for (
    var nbrForChangeData = 1;
    nbrForChangeData <= nbrOfDataToDateControl;
    nbrForChangeData++
  ) {
    var dataForDay = JSON.parse(
      localStorage.getItem(dateControl.value + " " + nbrForChangeData)
    );
    console.log(dataForDay.title);
    console.log(dataForDay.importance);

    var bodyContentAddingEvent = document.querySelector(
      ".task-manager-content-right-ul"
    );
    var $eventBar = document.createElement("li");
    $eventBar.id = dataForDay.title + "-" + dataForDay.importance;
    bodyContentAddingEvent.appendChild($eventBar);

    var $eventImportance = document.createElement("div");
    $eventImportance.id = dataForDay.importance;
    var colorImportance;
    if (dataForDay.importance === "1") {
      colorImportance = "red";
    } else if (dataForDay.importance === "2") {
      colorImportance = "orange";
    } else if (dataForDay.importance === "3") {
      colorImportance = "green";
    }
    $eventImportance.style.background = colorImportance;
    var $eventTitle = document.createElement("span");
    $eventTitle.id = dataForDay.title;
    $eventTitle.innerHTML = dataForDay.title;
    $eventBar.appendChild($eventImportance);
    $eventBar.appendChild($eventTitle);
  }
}

function createDataInlocalStorage() {
  var databar = {
    title: inputTitle.value,
    importance: selectImportance.value,
  };
  if (!localStorage.getItem(inputDatePicker.value)) {
    localStorage.setItem(inputDatePicker.value, e);
    var dataNbrOfDate = localStorage.getItem(inputDatePicker.value);
    localStorage.setItem(
      inputDatePicker.value + " " + dataNbrOfDate,
      JSON.stringify(databar)
    );
    console.log(dataNbrOfDate);
  } else {
    var dataNbrOfDateElse = localStorage.getItem(inputDatePicker.value);
    dataNbrOfDateElsePlusOne = dataNbrOfDateElse++;
    localStorage.setItem(inputDatePicker.value, dataNbrOfDateElse);
    localStorage.setItem(
      inputDatePicker.value + " " + dataNbrOfDateElse,
      JSON.stringify(databar)
    );
  }
}

buttonAddEvent.addEventListener("click", () => {
  if (!inputTitle.value || selectImportance.value === "0") {
    alert("Veuillez completer l'entiéreté des valeurs ci-dessus !");
  } else {
    updateEventToBodyContent();
    console.log(inputTitle.value);
    console.log(selectImportance.value);
    console.log(inputDatePicker.value);
    var colorImportance;
    if (selectImportance.value === "1") {
      colorImportance = "red";
    } else if (selectImportance.value === "2") {
      colorImportance = "orange";
    } else if (selectImportance.value === "3") {
      colorImportance = "green";
    }
    console.log(colorImportance);
    addingEventToBodyContent(colorImportance);
    createDataInlocalStorage();
    dateControl.valueAsDate = inputDatePicker.valueAsDate;
    inputTitle.value = "";
    selectImportance.value = "0";
    inputDatePicker.valueAsDate = new Date();
  }
});
function addingEventToBodyContent(colorImportance) {
  var bodyContentAddingEvent = document.querySelector(
    ".task-manager-content-right-ul"
  );
  var $eventBar = document.createElement("li");
  $eventBar.id = inputTitle.value + "-" + inputDatePicker.value;
  bodyContentAddingEvent.appendChild($eventBar);

  var $eventImportance = document.createElement("div");
  $eventImportance.id = selectImportance.value;
  $eventImportance.style.background = colorImportance;
  var $eventTitle = document.createElement("span");
  $eventTitle.id = inputTitle.value;
  $eventTitle.innerHTML = inputTitle.value;
  $eventBar.appendChild($eventImportance);
  $eventBar.appendChild($eventTitle);
}
function updateEventToBodyContent() {
  var bodyContentAddingEvent = document.querySelector(
    ".task-manager-content-right-ul"
  );
  bodyContentAddingEvent.innerHTML = "";
  changeDataToDateControl();
}
