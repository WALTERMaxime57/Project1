define(["../controller/btns_controller", "../controller/input_controller"], function (oBtnsController, oInputController) {
  var $buttonAddEvent = oBtnsController.createBtns(".task-manager-content-left", // sParents
    "Ajouter l'évenement", // sLabel
    "task-manager-content-left-button-add-event", // sClass
    function(){ // fFunction
    if (!$inputTitle.val() || $selectImportance.val() === "0") {
      alert("Veuillez completer l'entiéreté des valeurs ci-dessus !");
    } else {
      var oColorImportance =
        {
          1: "red",
          2: "orange",
          3: "green",
        }[$selectImportance.val()] || "grey";
      createDataInlocalStorage();
      addingEventToBodyContent(oColorImportance);
      $dateControl.val($inputDatePicker.val());
      $inputTitle.val("");
      $selectImportance.val("0");
      $inputDatePicker.val(sformattedDate);
      var $bodyContentAddingEvent = $(".task-manager-content-right-ul");
      $bodyContentAddingEvent.html("");
      changeDataToDateControl();
    }
  });

  var $inputTitle = oInputController.createInput(".task-manager-content-left", // sParents
    "Titre", //sPlaceHolder
    "text", //sType 
    "task-manager-input-title", //sClass
     null, //sFunction
     null),//sClass
      $inputDatePicker = oInputController.createInput(".task-manager-content-left-datepicker", // sParents
        null, //sPlaceHolder
        "date", //sType
        "task-manager-content-left-input-datepicker",//sClass
         null,//sFunction
          null),//fFunction
      $dateControl = oInputController.createInput(".task-manager-top", // sParents
         null, //sPlaceHolder
         "date", //sType
         "task-manager-top-date", //sClass
         "change", //sFunction
         function(){ //fFunction
      addingEventToBodyContent();
      var $bodyContentAddingEvent = $(".task-manager-content-right-ul");
      $bodyContentAddingEvent.html("");
      changeDataToDateControl();
  });

  var $aOptionSelec = [
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
var sformattedDate =
today.getFullYear() +
"-" +
("0" + (today.getMonth() + 1)).slice(-2) +
"-" +
("0" + today.getDate()).slice(-2);

$dateControl.val(sformattedDate);
$inputDatePicker.attr("min", sformattedDate);
$inputDatePicker.val(sformattedDate);

$(window).on("load", function () {
    addingEventToBodyContent();
    var $bodyContentAddingEvent = $(".task-manager-content-right-ul");
    $bodyContentAddingEvent.html("");
    changeDataToDateControl();
});
//** CREATE EVENT **//

function changeDataToDateControl() {
var iDataToDateControl = localStorage.getItem($(".task-manager-top-date").val());
  for (iChangeData = 1; iChangeData <= iDataToDateControl; iChangeData++) {
    var aDataForDay = JSON.parse(localStorage.getItem($dateControl.val() + " " + iChangeData)),
        $bodyContentAddingEvent = $(".task-manager-content-right-ul"),
        $eventBar = $("<li>"),
        $eventImportance = $("<div>"),
        $eventTitle = $("<span>");
        $bodyContentAddingEvent.append($eventBar);
        $eventImportance.id = aDataForDay.importance;
        var oColorImportance =
          {
          1: "red",
          2: "orange",
          3: "green",
          }[aDataForDay.importance] || "grey";
        $eventImportance.css("background", oColorImportance);
        $eventTitle.html(aDataForDay.title);
        $eventBar.append($eventImportance);
        $eventBar.append($eventTitle);
    }
}

function createDataInlocalStorage() {
var oDataBar = {
  title: $inputTitle.val(),
  importance: $selectImportance.val(),
};
if (!localStorage.getItem($inputDatePicker.val())) {
  localStorage.setItem($inputDatePicker.val(), e);
  var iNbrOfDate = localStorage.getItem($inputDatePicker.val());
  localStorage.setItem($inputDatePicker.val() + " " + iNbrOfDate,JSON.stringify(oDataBar));
} else {
  var iNbrOfDate = localStorage.getItem($inputDatePicker.val());
  iNbrOfDate++;
  localStorage.setItem($inputDatePicker.val(), iNbrOfDate);
  localStorage.setItem($inputDatePicker.val() + " " + iNbrOfDate, JSON.stringify(oDataBar));
}
}

function addingEventToBodyContent(oColorImportance) {
var $bodyContentAddingEvent = $(".task-manager-content-right-ul");
var $eventBar = $("<li>"),
  $eventTitle = $("<span>"),
  $eventImportance = $("<div>");
$bodyContentAddingEvent.append($eventBar);
$eventImportance.css("background", oColorImportance);
$eventTitle.html($(".task-manager-input-title").val());
$eventBar.append($eventImportance);
$eventBar.append($eventTitle);
}
});