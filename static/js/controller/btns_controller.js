define(function () {
  return {
    createBtns: function (sParent, sLabel, sClass ,fFunction) {
      var $button = $("<button>");
      $button.addClass(sClass);
      $button.html(sLabel);
      $button.on("click", function(){
        fFunction();
      });
      $(sParent).append($button);

    },
  };


});
