var $sidebar = $(".sidebar"),
    $searchBtn = $(".search-box"),
    $toggle = $(".toggle");

$toggle.on("click", function() {
  $sidebar.toggleClass("close");
});
$searchBtn.on("click", function() {
  $sidebar.removeClass("close");
});


$(document).ready(function () {
  var $themeSwitcher = $(".toggle-switch"),
      $switch = $(".switch-before"),
      $modeText = $(".mode-text"),
      $moon = $(".moon"),
      $sun = $(".sun");
  var isDarkTheme = false;

  // Fonction pour charger dynamiquement les variables CSS d'un fichier
  function loadCSSVariables(filePath) {
    return $.get(filePath).then(function (cssText) {
      var cssVariables = {};
      // Extraire uniquement les variables CSS
      var regex = /--([\w-]+):\s*([^;]+);/g;
      var match;
      while ((match = regex.exec(cssText)) !== null) {
        cssVariables["--" + match[1].trim()] = match[2].trim();
      }
      return cssVariables;
    });
  }

  // Fonction pour appliquer les variables CSS au document
  function applyCSSVariables(variables) {
    var $root = $(":root"); // L'élément :root
    $.each(variables, function (key, value) {
      $root.css(key, value);
    });
  }

  // Gestion du clic pour changer de thème
  $themeSwitcher.on("click", function () {
    var filePath = isDarkTheme
      ? "./static/css/variable/variable.css" // Mode Jour
      : "./static/css/variable/variable_black.css"; // Mode Nuit

    loadCSSVariables(filePath).then(function (variables) {
      applyCSSVariables(variables);
      isDarkTheme = !isDarkTheme;
      $modeText.text(!isDarkTheme ? "Mode Jour" : "Mode Nuit");
      if(isDarkTheme){
        $moon.css("opacity", 1);
        $sun.css("opacity", 0);
        $switch.css("left", "24px")
      }else{
        $moon.css("opacity", 0);
        $sun.css("opacity", 1);
        $switch.css("left", "5px")
      }
    });
  });
});