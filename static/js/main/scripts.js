define(["../controller/btns_controller", "../controller/input_controller"], function (oBtnsController, oInputController) {
  var $buttonAddEvent = oBtnsController.createBtns(".task-manager-content-left", "Ajouter l'évenement", "task-manager-content-left-button-add-event" ,function(){
    if (!$inputTitle.val() || $selectImportance.val() === "0") {
      alert("Veuillez completer l'entiéreté des valeurs ci-dessus !");
    } else {
      var iColorImportance =
        {
          1: "red",
          2: "orange",
          3: "green",
        }[$selectImportance.val()] || "grey";
      addingEventToBodyContent(iColorImportance);
      createDataInlocalStorage();
      $dateControl.val($inputDatePicker.val());
      $inputTitle.val("");
      $selectImportance.val("0");
      $inputDatePicker.val(formattedDate);
      var $bodyContentAddingEvent = $(".task-manager-content-right-ul");
      $bodyContentAddingEvent.html("");
      changeDataToDateControl();
    }
  });

  var $inputTitle = oInputController.createInput(".task-manager-content-left", "Titre ","text", "task-manager-input-title", null, null),
      $inputDatePicker = oInputController.createInput(".task-manager-content-left-datepicker", null, "date", "task-manager-content-left-input-datepicker", null, null),
      $dateControl = oInputController.createInput(".task-manager-top", null, "date", "task-manager-top-date", "change", function(){
      addingEventToBodyContent();
      var $bodyContentAddingEvent = $(".task-manager-content-right-ul");
      $bodyContentAddingEvent.html("");
      changeDataToDateControl();
  });

  $aOptionSelec = [
    "Importance",
    "Rouge",
    "Orange",
    "Vert",
  ];
  
  var $optionsSelectImportance = oInputController.createOptions($aOptionSelec, ".task-manager-content-left-selected"),
      $selectImportance = oInputController.createSelec(".task-manager-content-left-select", "task-manager-content-left-selected", $aOptionSelec);

  //******************TASK MANAGER*********************//

//** VAR **//

var e = 1;
$dateControl = $(".task-manager-top-date"),
$inputTitle = $(".task-manager-input-title"),
$selectImportance = $(".task-manager-content-left-selected"),
$inputDatePicker = $(".task-manager-content-left-input-datepicker");

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
    addingEventToBodyContent();
    var $bodyContentAddingEvent = $(".task-manager-content-right-ul");
    $bodyContentAddingEvent.html("");
    changeDataToDateControl();
});

// $dateControl.on("change", function () {
// updateEventToBodyContent();
// });


//** CREATE EVENT **//

function changeDataToDateControl() {
var nbrOfDataToDateControl = localStorage.getItem($(".task-manager-top-date").val());

for (
  var nbrForChangeData = 1;
  nbrForChangeData <= nbrOfDataToDateControl;
  nbrForChangeData++
) {
  var aDataForDay = JSON.parse(
      localStorage.getItem($dateControl.val() + " " + nbrForChangeData)
    ),
    $bodyContentAddingEvent = $(".task-manager-content-right-ul"),
    $eventBar = $("<li>"),
    $eventImportance = $("<div>"),
    $eventTitle = $("<span>");

  $bodyContentAddingEvent.append($eventBar);

  $eventImportance.id = aDataForDay.importance;
  var iColorImportance =
    {
      1: "red",
      2: "orange",
      3: "green",
    }[aDataForDay.importance] || "grey";
  $eventImportance.css("background", iColorImportance);
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
  var dataNbrOfDateElse = localStorage.getItem($inputDatePicker.val());
  dataNbrOfDateElsePlusOne = dataNbrOfDateElse++;
  localStorage.setItem($inputDatePicker.val(), dataNbrOfDateElse);
  localStorage.setItem(
    $inputDatePicker.val() + " " + dataNbrOfDateElse,
    JSON.stringify(aDataBar)
  );
}
}


function addingEventToBodyContent(iColorImportance) {
var $bodyContentAddingEvent = $(".task-manager-content-right-ul");
var $eventBar = $("<li>"),
  $eventTitle = $("<span>"),
  $eventImportance = $("<div>");

$bodyContentAddingEvent.append($eventBar);
$eventImportance.css("background", iColorImportance);
$eventTitle.html($(".task-manager-input-title").val());
$eventBar.append($eventImportance);
$eventBar.append($eventTitle);
}







});


