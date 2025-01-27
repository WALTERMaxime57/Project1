// NIGHT MODE

var $body = $("#body");
var $sidebar = $(".sidebar");
var $toggle = $(".toggle");
var $searchBtn = $(".search-box");
var $modeSwitch = $(".toggle-switch");
var $modeText = $(".mode-text");

$toggle.on("click", function () {
  $sidebar.toggleClass("close");
  console.log("YEP");
});
$searchBtn.on("click", function () {
  $sidebar.removeClass("close");
});
$modeSwitch.on("click", function () {
  $body.toggleClass("dark");

  if ($body.hasClass(".dark")) {
    $modeText.html("Mode Jour");
  } else {
    $modeText.html("Mode Nuit");
  }
});
