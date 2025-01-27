//******************TASK MANAGER*********************//

//** VAR **//

var e = 1;
var $dateControl = $("#date");
var $inputTitle = $(".task-manager-input-title");
var $selectImportance = $(".task-manager-content-left-selected");
var $inputDatePicker = $(".task-manager-content-left-input-datepicker");
var $buttonAddEvent = $(".task-manager-content-left-button-add-event");

//** DATE VALUE **/

var today = new Date();

// Formatage en yyyy-mm-dd
var formattedDate =
  today.getFullYear() +
  "-" +
  ("0" + (today.getMonth() + 1)).slice(-2) +
  "-" +
  ("0" + today.getDate()).slice(-2);

$dateControl.val(formattedDate);
$inputDatePicker.attr("min", formattedDate);
$inputDatePicker.val(formattedDate);

$(window).on("load", function () {
  updateEventToBodyContent();
});

$dateControl.on("change", function () {
  updateEventToBodyContent();
});

//** CREATE EVENT **//

function changeDataToDateControl() {
  var nbrOfDataToDateControl = localStorage.getItem($dateControl.val());

  for (
    var nbrForChangeData = 1;
    nbrForChangeData <= nbrOfDataToDateControl;
    nbrForChangeData++
  ) {
    var aDataForDay = JSON.parse(
      localStorage.getItem($dateControl.val() + " " + nbrForChangeData)
    );

    var $bodyContentAddingEvent = $(".task-manager-content-right-ul");
    var $eventBar = $("<li>");
    var $eventImportance = $("<div>");
    var $eventTitle = $("<span>");

    $eventBar.id = aDataForDay.title + "-" + aDataForDay.importance;
    $bodyContentAddingEvent.append($eventBar);

    $eventImportance.id = aDataForDay.importance;
    var iColorImportance;
    if (aDataForDay.importance === "1") {
      iColorImportance = "red";
    } else if (aDataForDay.importance === "2") {
      iColorImportance = "orange";
    } else if (aDataForDay.importance === "3") {
      iColorImportance = "green";
    }
    $eventImportance.css("background", iColorImportance);
    $eventTitle.id = aDataForDay.title;
    $eventTitle.html(aDataForDay.title);
    $eventBar.append($eventImportance);
    $eventBar.append($eventTitle);
  }
}

function createDataInlocalStorage() {
  var aDataBar = {
    title: $inputTitle.val(),
    importance: $selectImportance.val(),
  };
  if (!localStorage.getItem($inputDatePicker.val())) {
    localStorage.setItem($inputDatePicker.val(), e);
    var dataNbrOfDate = localStorage.getItem($inputDatePicker.val());
    localStorage.setItem(
      $inputDatePicker.val() + " " + dataNbrOfDate,
      JSON.stringify(aDataBar)
    );
  } else {
    var dataNbrOfDateElse = localStorage.getItem($inputDatePicker.value);
    dataNbrOfDateElsePlusOne = dataNbrOfDateElse++;
    localStorage.setItem($inputDatePicker.value, dataNbrOfDateElse);
    localStorage.setItem(
      $inputDatePicker.val() + " " + dataNbrOfDateElse,
      JSON.stringify(aDataBar)
    );
  }
}

$buttonAddEvent.on("click", function () {
  if (!$inputTitle.val() || $selectImportance.val() === "0") {
    alert("Veuillez completer l'entiéreté des valeurs ci-dessus !");
  } else {
    var iColorImportance;
    if ($selectImportance.val() === "1") {
      iColorImportance = "red";
    } else if ($selectImportance.val() === "2") {
      iColorImportance = "orange";
    } else if ($selectImportance.val() === "3") {
      iColorImportance = "green";
    }
    addingEventToBodyContent(iColorImportance);
    createDataInlocalStorage();
    $dateControl.val($inputDatePicker.val());
    $inputTitle.val("");
    $selectImportance.val("0");
    $inputDatePicker.val(formattedDate);
  }
});

function addingEventToBodyContent(iColorImportance) {
  var $bodyContentAddingEvent = $(".task-manager-content-right-ul");
  var $eventBar = $("<li>");
  var $eventTitle = $("<span>");
  var $eventImportance = $("<div>");
  $eventBar.id = $inputTitle.val() + "-" + $inputDatePicker.val();
  $bodyContentAddingEvent.append($eventBar);

  $eventImportance.id = $selectImportance.val();
  $eventImportance.css("background", iColorImportance);

  $eventTitle.id = $inputTitle.val();
  $eventTitle.html($inputTitle.val());
  $eventBar.append($eventImportance);
  $eventBar.append($eventTitle);
}
function updateEventToBodyContent() {
  addingEventToBodyContent();
  var $bodyContentAddingEvent = $(".task-manager-content-right-ul");
  $bodyContentAddingEvent.html("");
  changeDataToDateControl();
}
