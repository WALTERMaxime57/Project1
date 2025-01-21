//******************TASK MANAGER*********************//

//** VAR **//

var $dateControl = $("date");
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

$dateControl.on("change", function () {
  console.log(dateControl.value);
  updateEventToBodyContent();
});

//** CREATE EVENT **//
var $buttonAddEvent = $(".task-manager-content-left-button-add-event");

$buttonAddEvent.click(function () {
  if (!inputTitle.value || selectImportance.value === "0") {
    alert("Veuillez completer l'entiéreté des valeurs ci-dessus !");
  } else {
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
    dateControl.valueAsDate = inputDatePicker.valueAsDate;
    inputTitle.value = "";
    selectImportance.value = "0";
    inputDatePicker.valueAsDate = new Date();
  }
});

function addingEventToBodyContent(colorImportance) {
  var $bodyContentAddingEvent = $(".task-manager-content-right-ul");
  var $eventBar = $("li");
  $eventBar.id = inputTitle.value + "-" + inputDatePicker.value;
  $bodyContentAddingEvent.append($eventBar);

  var $eventImportance = $("div");
  $eventImportance.id = selectImportance.value;
  $eventImportance.css("background", colorImportance);
  var $eventTitle = $("span");
  $eventTitle.id = inputTitle.value;
  $eventTitle.html(inputTitle.value);
  $eventBar.append($eventImportance);
  $eventBar.append($eventTitle);
}
function updateEventToBodyContent() {
  addingEventToBodyContent();
  var $bodyContentAddingEvent = $(".task-manager-content-right-ul");
  $bodyContentAddingEvent.html("");
}
