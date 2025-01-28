define(function () {
    return {
        createInput: function (sParent, sPlaceHolder ,sType, sClass ,fFunction) {
        var $input = $('<input type="' + sType + '">');
        $input.attr("placeholder", sPlaceHolder);
        $input.addClass(sClass);
        $input.on("change" ,function(){
          fFunction();
        })
        $(sParent).prepend($input);
        console.log($input);
      },

      createSelec : function (sParent, oOption, sClass){
        var $selec = $("<select>");
        $selec.addClass(sClass);
        $selec.add(oOption);
        $($selec).append(oOption);
        $(sParent).append($selec);
      },
    };
  
  
  });
